# CodeArts Telegram Bridge 技术总结

> 2026-11-01 参照 terranc/claude-telegram-bot-bridge 实现的 CodeArts↔Telegram 桥接，已上线实测通过。
> 本素材为作者（wanglei）与 CodeArts 协作过程中沉淀的第一手工程记录。

## 项目背景与目标

Claude Code 类 CLI agent 绑定在终端里，人离开电脑就失去控制权。terranc/claude-telegram-bot-bridge 的思路：Telegram bot 做持久通道（认证、加密、推送都由 Telegram 承担），本机 bot 进程把消息桥接到 agent，手机随时随地指挥电脑干活。本文将该思路移植到华为云 CodeArts CLI。

## 架构原理

```
手机 Telegram ⇄ Telegram 服务器 ⇄ 本机 bot（long polling，无公网暴露）
                                   └─ codearts run <msg> --format json [-s <会话ID>]
                                        └─ CodeArts Agent ⇄ 项目目录（沙箱）
```

- 底层不用 claude-agent-sdk，改用 CodeArts CLI 原生无头能力 `codearts run --format json`，零 SDK 依赖
- 输出是 NDJSON 事件流：`step_start` / `text` / `step_finish`，`text` 事件的 `part.text` 即回复文本，事件自带 `sessionID`
- 会话延续：首次从事件流提取 sessionID 存入 `.bridge_session` 文件，后续调用追加 `-s <sessionID>`；重启 bot 不丢会话
- 回复超 3900 字符按行边界分片发送；处理期间每 4 秒心跳一次 Telegram"输入中"状态
- `/stop` 用 `os.killpg` 杀整个进程组（codearts run 会 spawn 子进程）

## 技术选型与环境事实

- Python 3.14 + venv + python-telegram-bot 22.8；本机 pip 被 PEP 668 锁死且无 ensurepip，用 `python3 -m venv --without-pip` + get-pip.py 方案，不碰系统包
- Telegram API 走本机代理 `http://127.0.0.1:7897`；系统 `ALL_PROXY=socks://127.0.0.1:7897` 的 `socks://` scheme 会让 httpx 抛 `Unknown scheme`，bot 启动时自动移除该环境变量
- CodeArts 目录信任机制：`~/.codeartsdoer/cli-data/settings.json` 的 `security.folderTrust.trustedFolders`；`/home/wanglei` 前缀已信任，/tmp 下的目录会被拒绝运行

## 安全设计

1. `ALLOWED_USER_IDS` 白名单强制：未配置直接拒绝启动（任何找到 bot 的人都能操控电脑）
2. 消息以 argv 传参调用 codearts（不经 shell，无注入风险）
3. 项目目录即 CodeArts 沙箱；Token 存 .env 且 gitignore，泄露可到 @BotFather `/revoke` 重置

## 命令与运维

- Telegram 侧：直接发消息即对话；`/new` 新会话、`/status` 状态、`/stop` 中断
- 本机：`./start.sh -d` 后台启动（日志 logs/bot.log）、`--status`、`--stop`；systemd user service 模板见项目 README
- 与原项目差异：流式粒度为 step 级（非逐 token）；语音转录、/revert、/model 未实现

## 实测记录

2026-11-01 上线当天：跨进程会话延续测试（让 bot 记数字 42 后追问答对）通过；真实使用中用户从手机连发"你好"和 GitHub 研究任务，处理零错误。

## 参考

- 参考项目：https://github.com/terranc/claude-telegram-bot-bridge （MIT，Python + claude-agent-sdk）
- 本地项目：/home/wanglei/文档/codearts-telegram-bridge/（bot.py 单文件 + start.sh + README）
