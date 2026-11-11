---
tags: [工具, 下载器, 开源, MCP, AI-Agent, Rust]
created: 2026-11-12
updated: 2026-11-12
sources: [OmniGet 工具]
---

# OmniGet

> 开源的桌面下载管理器 + 媒体工具箱：1,800+ 站点下载、108 个内置工具、whisper 转写、格式转换，并内置 MCP Server 供 AI Agent 调用

## 简介

OmniGet 想解决的是「下载工具碎片化」：以前要装一个 yt-dlp、一个 Instagram 下载器、一个 Pinterest 插件、一个 Python 字幕脚本，还要记各种命令行参数。OmniGet 把这些收进一个「粘贴链接 → 预览 → 下载」的窗口，并把周边能力（转写、转换、PDF、压缩、站点专项）做成 108 个可搜索的工具瓦片。

技术上是 Tauri 2.0 + Rust + Svelte 的桌面应用，Windows / macOS / Linux 都有安装包；首次启动会自动装好 yt-dlp 和 FFmpeg。

## 关键信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/OpenSelena/omniget |
| Star | 5,595（2026-11-12） |
| 协议 | GPL-3.0 |
| 技术栈 | Tauri 2.0 / Rust / Svelte |
| 站点支持 | 1,800+（YouTube、X、TikTok、B 站、小红书、Instagram、Pinterest、Reddit、Twitch、Telegram 等） |
| 工具数 | 108 个内置工具；MCP 暴露 37 个 |
| 数据来源 | [[OmniGet 工具]] |

## 能力矩阵

- **下载**：批量、播放列表、字幕、元数据、按章节拆分、限速/并发/代理、规则自动归档、频道自动追更
- **媒体处理**：格式互转、压缩、剪辑、合并拆分、视频转 GIF
- **AI 能力**：whisper.cpp 转写、TTS、OCR、LLM 价格对比、API Key 本地保险库
- **文档**：PDF 合并/拆分/渲染/文本提取/清理、EPUB/PDF 阅读
- **站点专项**：X 帖子/线程/趋势、Instagram 资料、Reddit 线程归档、Twitch 聊天/表情、Pinterest 画板备份
- **系统**：磁盘/缓存扫描、启动项、已安装应用、aria2/gallery-dl 大文件与画廊

## 与 AI Agent 的集成

- **MCP Server（beta）**：Tools → AI → MCP server 打开，37 个工具通过本地 bridge 暴露，带 per-install token；配置片段可直接粘贴到 Claude Code、Claude Desktop、Cursor、VS Code、Goose、Codex。
- **Claude Code 插件**：仓库内 `claude-plugin/` 可在不装桌面应用的情况下拉取并转写媒体。
- 这意味着 Agent 可以「让 OmniGet 下载 → whisper 转写 → 返回文本」，是视频素材进入知识库/AI 工作流的一条捷径。

## 评价

**优点**：

- 一个工具覆盖「下载 + 转写 + 转换 + 整理」，省掉多套命令行工具；
- 对 Agent 生态友好（MCP + Claude Code 插件），不是封闭 GUI；
- 本地优先、免费、无广告，跨平台。

**注意点**：

- MCP Server 仍是 beta，配置与工具数可能变化；
- GPL-3.0：二次分发/商用需遵守 GPL；
- 下载课程/付费内容存在版权与平台条款风险，自己使用需判断合规边界；
- 依赖自动安装 yt-dlp/FFmpeg，首次启动需要网络。

## 不同素材中的观点

- **[来源: [[OmniGet 工具]]]** 推文把它包装成「啥都能干的开源宝贝」，README 的实际定位更克制：核心是下载管理器，108 工具是围绕「拿到文件之后」的延伸；真正对 AI 工作流有价值的点，是 whisper 转写与 MCP 暴露，而不是「下载」本身。

## 相关页面

- [[OmniGet 工具]]
- [[工具集]]
- [[MCP 模型上下文协议]]
- [[GIF 工厂]]
