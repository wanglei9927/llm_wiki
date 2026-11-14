---
type: entity
name: CodeArts CLI
category: 开发工具
tags: [CodeArts, 华为云, CLI, Agent, 无头模式, GLM]
sources:
  - CodeArts Telegram 桥.md
created: 2026-11-02
updated: 2026-11-02
---

# CodeArts CLI

> 华为云 CodeArts 的 AI 编程 CLI Agent，自带完整无头（headless）能力

## 简介

CodeArts CLI 是华为云 CodeArts 团队的终端 AI 编程智能体（本机版本 26.10.13，由 GLM 系列模型驱动，运行时数据位于 `~/.codeartsdoer/`）。它提供 TUI 交互界面，同时具备一套完整的无头/服务器能力——这使它成为自动化桥接（如 Telegram bot）的理想底座。

## 核心能力

### 1. 无头模式（headless）

```bash
codearts run [消息..]        # 发送一条消息并输出结果
codearts serve               # 启动 headless server（--port/--hostname）
codearts attach <url>        # 连接到运行中的 server
```

`run` 支持 `--format json` 输出 NDJSON 事件流：`step_start` → `text`（`part.text` 为回复文本）→ `step_finish`（含 tokens/cost 统计），每个事件自带 `sessionID`。这意味着任何能读子进程输出的程序都能驱动它——不需要官方 SDK。

### 2. 会话管理

- `-c / --continue`：继续最近会话
- `-s / --session <id>`：继续指定会话
- `codearts session list`：列出全部会话（ID + 标题 + 更新时间）
- `codearts export [sessionID]`：导出会话数据为 JSON
- 会话跨进程持久：`codearts run -s <id>` 与 TUI 会话互通

### 3. 丰富的扩展面

- `-m/--model`：指定 provider/model；`--variant`：推理力度
- `--agent`：指定 agent；`--command`：执行斜杠命令
- `-f/--file`：附加文件
- `codearts mcp`：MCP 服务器管理；`codearts codebase`：代码库索引
- 技能系统：`.claude/skills/` 目录 + 全局技能（`~/.codeartsdoer/cli-data/system/skills/`）

### 4. 安全机制：目录信任

配置文件 `~/.codeartsdoer/cli-data/settings.json`：

```json
{"security": {"folderTrust": {"enabled": true},
  "trustedFolders": ["/home/wanglei", "/"]}}
```

未信任目录（如 /tmp）下执行 `codearts run` 会被拒绝："文件夹未被信任"。家目录前缀默认信任，项目放 `~` 下即可免配置。

## 实用信息

- **TUI 常用**：`codearts [目录]` 启动；斜杠命令 `/help` 等
- **统计**：`codearts stats` 查看 token 用量与成本
- **调试**：`codearts debug`；`--print-logs --log-level DEBUG` 打印日志
- **目录布局**：`~/.codeartsdoer/cli-data/`（settings.json、opencode.db 会话库、日志）、`~/.codeartsdoer/skills/`
- **信任/配置回写**：运行中的 codearts 进程可能回写 settings.json，手工修改注意竞态

## 实战应用

在 [[CodeArts Telegram Bridge]] 项目中，CodeArts CLI 的无头能力被用于驱动 Telegram 桥接：

1. `codearts run <消息> --format json` 子进程调用，NDJSON 逐行解析
2. 从事件流提取 `sessionID` 实现跨进程会话延续（实测：让 agent 记数字 42，新进程追问答对）
3. 遇到未信任目录时从 stderr 尾部识别"未被信任"字样，给出友好提示

## 相关页面

- [[CodeArts Telegram Bridge]]
- [[AI编程开发]]
- [[CodeArts Telegram 桥]]
