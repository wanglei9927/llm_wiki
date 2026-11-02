---
type: entity
name: CodeArts Telegram Bridge
category: 开发工具
tags: [Telegram, TelegramBot, Agent桥接, 远程开发, CodeArts, 开源]
sources:
  - 2026-11-02-codearts-telegram-bridge.md
created: 2026-11-02
updated: 2026-11-02
---

# CodeArts Telegram Bridge

> 把 Telegram 变成 CodeArts CLI 的远程终端：手机随时对话、改代码、跑任务

## 简介

CodeArts Telegram Bridge 是一个轻量级 Telegram 桥接机器人（2026-11-01 由 wanglei 参照 terranc/claude-telegram-bot-bridge 实现），把 Telegram 消息桥接到本机的 CodeArts CLI，实现"手机上的 CodeArts"。整个系统只有三个角色：

1. **Telegram**：承担认证、加密、消息推送，long polling 拉取消息，无需公网 IP / webhook / 端口暴露
2. **桥接进程**（bot.py 单文件约 300 行 + start.sh）：把用户消息转成 `codearts run` 无头调用，解析 NDJSON 事件流回传
3. **CodeArts Agent**：在 `--path` 指定的项目目录沙箱内执行一切实际操作

## 核心价值

### 1. 移动化：突破终端绑定

CLI agent 绑定在电脑终端上，通勤、开会、沙发上时彻底失联。桥接后手机发一句话就能让电脑里的 agent 干活：修 bug、查构建结果、跑技能命令，回来时工作已完成。

### 2. 零依赖桥接：不需要官方 SDK

原参考项目依赖 claude-agent-sdk（Python），且与 Claude CLI 强绑定。本方案发现 CodeArts CLI 自带完整无头能力——`codearts run <消息> --format json` 输出 NDJSON 事件流（step_start/text/step_finish），`text` 事件的 `part.text` 即回复文本，每个事件自带 `sessionID`。用 subprocess 直接驱动 CLI，零 SDK 依赖，升级 CodeArts 不破坏桥接。

### 3. 会话持久

首次调用从事件流提取 sessionID 存入 `.bridge_session` 文件，之后每次调用追加 `-s <sessionID>`；bot 重启、电脑重启都不丢对话上下文。`/new` 命令随时开新会话。

### 4. 安全默认

- **白名单强制**：`ALLOWED_USER_IDS` 未配置时拒绝启动——bot 等于把电脑钥匙挂到聊天软件上，任何找到 bot 的人都能操控电脑
- **无 shell 注入**：消息以 argv 传参调用 codearts，不经 shell 拼接
- **沙箱边界**：项目目录即 CodeArts 信任的工作区
- **Token 卫生**：Token 只存 .env（gitignore），泄露可到 @BotFather `/revoke` 重置

## 功能清单

| 命令/能力 | 说明 |
|---|---|
| 直接发文本 | 作为消息发给 CodeArts，自动延续会话 |
| `/new` | 开启新会话 |
| `/status` | 项目目录、当前会话、忙碌状态 |
| `/stop` | `os.killpg` 杀整个进程组，立即中断 |
| typing 心跳 | 处理期间每 4 秒刷一次"输入中"状态 |
| 长消息分片 | 超 3900 字符按行边界分片发送，代码块不被拦腰切断 |
| 队列保护 | 处理中收到新消息会提示等待，防并发冲突 |

## 与 claude-telegram-bot-bridge 的对比

| 能力 | 原项目 | 本项目 |
|---|---|---|
| 底层 | claude-agent-sdk | codearts CLI 无头模式（subprocess） |
| 流式输出 | 逐 token 编辑消息 | step 级粒度 + typing 心跳，完成后发送 |
| 语音消息 | 支持（ffmpeg + Whisper） | 暂不支持 |
| /revert、/model | 支持 | 暂不支持 |
| 平台 | macOS/WSL | Linux 原生（Ubuntu + Python 3.14 实测） |

## 实用信息

- **运行**：`./start.sh -d` 后台（日志 logs/bot.log）、`--status`、`--stop`；首次运行自动创建 venv 并装依赖（`python3 -m venv --without-pip` + get-pip.py，绕过 PEP 668）
- **开机自启（2026-11-01 已配置）**：systemd user 服务 `codearts-tg`（`~/.config/systemd/user/codearts-tg.service`，Restart=on-failure）+ `loginctl enable-linger` 实现不登录桌面也开机即启。管理：`systemctl --user status/restart codearts-tg`、日志 `journalctl --user -u codearts-tg -f`。前提：代理软件（Clash，7897）需开机运行，bot 有重试机制，代理就绪后自动恢复
- **重启后重连**：无需任何操作——Telegram 对话关系、白名单、会话上下文（.bridge_session）全部持久在本机文件，bot 进程拉起即恢复
- **配置**：`.env` 填 `TELEGRAM_BOT_TOKEN`、`ALLOWED_USER_IDS`，可选 `PROXY_URL`（默认 http://127.0.0.1:7897）、`CODEARTS_TIMEOUT`
- **systemd**：README 提供 user service 模板，开机自启 + 崩溃自动拉起
- **实测**（2026-11-01）：跨进程会话延续（记数字 42 后追问答对）；手机连发"你好"与 GitHub 研究任务，处理零错误

## 已知坑与解法

1. **系统代理变量**：`ALL_PROXY=socks://127.0.0.1:7897` 的 `socks://` scheme 让 httpx 抛 `Unknown scheme`——bot 启动时自动移除该环境变量，显式走 http 代理
2. **CodeArts 目录信任**：/tmp 等未信任目录会报"文件夹未被信任"，需把路径加入 `~/.codeartsdoer/cli-data/settings.json` 的 `trustedFolders`（/home/wanglei 前缀默认信任）
3. **venv 半成品**：依赖中断后 venv 存在但 pip 缺失，start.sh 已按"python → pip → 依赖"三级检查补齐

## 相关页面

- [[CodeArts CLI]]
- [[AI编程开发]]
- [[2026-11-02-codearts-telegram-bridge]]
