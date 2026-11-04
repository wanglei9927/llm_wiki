---
tags: [zlib, Z-Library, 电子书, CLI, 终端工具, Agent集成, Kindle]
created: 2026-11-03
updated: 2026-11-03
source_path: raw/tweets/zlib CLI 终端电子书工具-tweet.md
---

# zlib：把 Z-Library 搬进终端的 CLI（含 Agent 集成）

> Go 编写的开源命令行工具（1364 star）：不开网页即可完成 Z-Library 搜书、下载、额度查询、推送 Kindle，并官方适配 Claude Code / Codex 插件与 MCP 模式

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 推文 @0xGky（2026-11-02）+ GitHub 仓库研究（2026-11-03） |
| 推文链接 | https://x.com/0xGky/status/2117287115801195001 |
| 仓库 | https://github.com/heartleo/zlib（Go，MIT，1364 star，2026-04 创建） |
| 互动数据 | 推文 1.77 万浏览 · 305 喜欢 |
| 原始素材 | raw/tweets/zlib CLI 终端电子书工具-tweet.md |

## 核心观点

1. **产品定位**："A Z-Library CLI for you and your AI agents"——把 Z-Library 的搜索/下载/推送链路做成命令行 + TUI，再通过官方插件和 MCP 暴露给 AI Agent，实现"跟 Agent 说一句话就找书下载发 Kindle"。

2. **功能全集**：搜索（按年份/语言/格式过滤、排序）、下载（可自选目录）、收藏/推荐/热门浏览、下载历史、每日额度查询（zlib profile）、推送到 Kindle（SMTP 配置，zlib kindle send）、TUI 持久 shell（/ 唤起命令面板，j/k 导航，Ctrl+S 搜索）、主题切换。

3. **网络层设计**：`zlib doctor` 自动探测可用镜像域名；支持信任自定义镜像、配置代理——应对 Z-Library 域名频繁变更的现状。

4. **Agent 集成三通道**：①Claude Code 插件：`/plugin marketplace add heartleo/zlib` → `/plugin install zlib@zlib-plugin-cc`；②Codex 插件：`codex plugin marketplace add heartleo/zlib` → `codex plugin add zlib@zlib`；③MCP server：`claude mcp add -s user zlib -- zlib mcp`（支持 `--read-only` 隐藏下载/历史删除/Kindle 推送）。安全设计：登录由用户自己在终端执行（`zlib login`），密码不进入对话上下文；插件在 zlib 缺失时首次使用自动安装。

5. **命令速查**：`zlib search "dune" --ext epub --json`（--json 供脚本）、`zlib favorites/recommended/most-popular/history/profile`、`zlib download "id:hash"`、`zlib kindle send ./book.epub`、`zlib tui`。

## 实操内容保留

安装：
```bash
brew install heartleo/tap/zlib          # macOS/Linux
winget install --id heartleo.zlib --exact  # Windows
```

快速开始：
```sh
zlib doctor                              # 探测可用域名
zlib login --domain https://z-lib.gd     # 用探测结果里的域名登录
zlib tui                                 # 进入终端界面
```

Agent 接入（官方路径）：
```text
# Claude Code 插件
/plugin marketplace add heartleo/zlib
/plugin install zlib@zlib-plugin-cc

# MCP（只读模式加 --read-only）
claude mcp add -s user zlib -- zlib mcp
```

示例指令（推文原话）："帮我找《The Pragmatic Programmer》，下载后发到 Kindle。"

## 原文精彩摘录

> 电子书党用着很爽的开源工具：zlib，直接把 Z-Library 搬进了终端。……网页不用开，命令行里就能搜书、下载、查看下载记录、查询每日额度、推送到 Kindle，代理与自定义域名也都支持。——@0xGky

> Log in yourself with `zlib login` so your password stays out of chat.——README（密码不进 Agent 对话的设计）

## 关键概念

- zlib：Z-Library 的终端客户端与 Agent 插件（本文档唯一素材，详见下方合规备注）
- zlib doctor：镜像域名探测命令（仅 1 篇素材提及）
- Agent 工具的安全边界：登录态由用户终端持有、工具只暴露会话、MCP 提供 --read-only——值得其他 CLI Agent 工具借鉴（仅 1 篇素材提及）

## 合规备注（重要）

Z-Library 是大规模未授权电子书分发站点，多次被多国执法下架。本页仅作工具信息记录；**不基于该工具编写自动化下载 skill 或工作流**。如需使用，请自行评估所在地法律与版权风险。

## 相关页面

- [[AI编程开发]]
- [[黑客书架书榜网站]]（同属"找书"主题的正版信息源）
