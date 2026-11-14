---
tags: [CodeArts, Telegram, TelegramBot, AI编程, Agent桥接, 远程开发]
created: 2026-11-02
updated: 2026-11-02
source_path: raw/notes/2026-11-02-codearts-telegram-bridge.md
---

# CodeArts Telegram Bridge：把手机变成 CodeArts 的远程终端

> 参照 claude-telegram-bot-bridge 思路，用 CodeArts CLI 原生无头模式实现 Telegram↔本地 Agent 桥接，零 SDK 依赖

## 核心观点

1. **CLI agent 的"最后一块拼图"是移动通道**：CLI agent 绑定终端，人离开电脑就失去控制权；Telegram bot（long polling，无公网暴露）+ 本机桥接进程是零基础设施的解法

2. **无需官方 SDK 也能桥接**：CodeArts CLI 的 `codearts run <消息> --format json [-s <会话ID>]` 原生无头能力完全够用——NDJSON 事件流（step_start/text/step_finish）给出回复文本与 sessionID，会话跨进程延续，省掉了 claude-agent-sdk 这类绑定依赖

3. **安全默认是底线**：Telegram bot 等于把电脑钥匙挂到聊天软件上，用户白名单必须强制（未配置拒绝启动）；消息走 argv 不经 shell；Token 只进 .env 且 gitignore

## 实操内容

### 架构链路

```
手机 Telegram ⇄ Telegram 服务器 ⇄ 本机 bot（long polling）
                                   └─ codearts run <msg> --format json [-s <会话ID>]
                                        └─ CodeArts Agent ⇄ 项目目录（沙箱）
```

### 核心命令

```bash
# 无头单条对话（输出 NDJSON 事件流）
codearts run "你的消息" --format json

# 延续会话（sessionID 从事件流里取）
codearts run "下一条消息" --format json -s ses_xxxxx

# 启动桥接 bot（首次自动建 venv 装依赖）
cd ~/文档/codearts-telegram-bridge
./start.sh -d        # 后台；--status 查看；--stop 停止
```

### 会话持久化

首次调用从 NDJSON 事件提取 `sessionID` 写入 `.bridge_session`，之后每次调用加 `-s` 参数，bot 重启也不丢会话。

### 环境避坑

| 坑 | 现象 | 解法 |
|---|---|---|
| PEP 668 锁死 pip 且无 ensurepip | `python3 -m venv` 失败 | `python3 -m venv --without-pip` + get-pip.py 在 venv 内装 |
| 系统代理变量 `ALL_PROXY=socks://...` | httpx 抛 `Unknown scheme` | bot 启动时移除该变量，显式走 `http://127.0.0.1:7897` |
| CodeArts 目录信任 | /tmp 下报"文件夹未被信任" | 在 `~/.codeartsdoer/cli-data/settings.json` 的 trustedFolders 加路径（/home/wanglei 前缀默认已信任） |

## 关键概念

- **[[CodeArts CLI]]**：华为云 AI 编程 CLI agent，本方案的执行底座
- **[[CodeArts Telegram Bridge]]**：本方案本体（bot.py 单文件 ~300 行 + start.sh）
- **NDJSON 事件流**：`codearts run --format json` 的输出协议，逐行 JSON，`text` 事件的 `part.text` 是回复
- **Long polling**：Telegram Bot API 拉取模式，无需公网 IP、webhook、端口暴露

## 实用信息

- 参考项目：terranc/claude-telegram-bot-bridge（MIT，Python + claude-agent-sdk，macOS 向）
- 与原项目差异：流式粒度 step 级；语音转录、/revert、/model 未实现
- Telegram 命令：`/new` 新会话、`/status` 状态、`/stop` 杀进程组中断
- 实测：跨进程会话延续（记 42 后追问答对）；手机连发两条真实任务零错误

## 原文精彩摘录

> Claude Code 类 CLI agent 绑定在终端里，人离开电脑就失去控制权。terranc/claude-telegram-bot-bridge 的思路：Telegram bot 做持久通道（认证、加密、推送都由 Telegram 承担），本机 bot 进程把消息桥接到 agent，手机随时随地指挥电脑干活。

> Telegram bot 等于把电脑钥匙挂到聊天软件上，用户白名单必须强制（未配置拒绝启动）；消息走 argv 不经 shell；Token 只进 .env 且 gitignore。

## 相关页面

- [[CodeArts CLI]]
- [[CodeArts Telegram Bridge]]
- [[AI编程开发]]
