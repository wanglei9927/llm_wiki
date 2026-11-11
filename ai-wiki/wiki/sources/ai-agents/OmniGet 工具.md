---
tags: [工具, 下载器, 开源, MCP, AI-Agent, 媒体处理, Rust]
created: 2026-11-12
updated: 2026-11-12
source_path: raw/articles/2026-11-12-omniget-readme.md
---

# OmniGet：开源下载管理器与媒体工具箱

> 一个用 Tauri 2.0 + Rust + Svelte 写的开源桌面应用：支持 1,800+ 站点的视频/音频/图片/课程下载，内置 108 个工具，还带 MCP Server 可接进 AI Agent

## 基本信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/OpenSelena/omniget |
| Star / Fork | 5,595 / 698（2026-11-12 抓取） |
| License | GPL-3.0 |
| 技术栈 | Tauri 2.0、Rust、Svelte |
| 平台 | Windows / macOS / Linux（安装包 + 便携版 + MSI） |
| 规模 | 1,800+ 站点；108 个内置工具（MCP 暴露其中 37 个） |
| 简介一句话 | Download manager for courses (Udemy/Hotmart), YouTube, music & 1,800+ sites |
| 原始素材 | raw/articles/2026-11-12-omniget-readme.md |

## 核心观点

1. **「一个输入框」解决所有下载**：粘贴链接 → 预览画质 → 下载；yt-dlp 和 FFmpeg 自动安装并保持更新，不需要终端和命令行参数。

2. **不只是下载器**：内置 108 个工具，覆盖视频/音频/图片/PDF/文档/系统/手机/自动化等 25 类；官方定位是「下载 + 转写 + 转换 + 管理」的媒体工具箱。

3. **对 AI Agent 友好**：内置 MCP Server（beta），把 37 个工具通过 Model Context Protocol 暴露给 Claude Code、Claude Desktop、Cursor、VS Code、Goose、Codex；另有 `claude-plugin/` 支持 Claude Code 插件方式。

4. **课程下载是差异化能力**：支持 Udemy、Hotmart、Kiwify、Coursera 类课程资源，配合批量、播放列表整批、按章节拆分、跳过已存在文件等规则。

5. **本地优先**：所有处理在本机执行（whisper.cpp 转写、TTS、OCR、PDF 处理、图片压缩等），只有命名站点相关的工具才会联网。

## 实操内容保留

### 安装（三种方式）

- Windows：`omniget_x.y.z_x64-setup.exe`（安装）、`x64-portable.exe`（免安装）、`x64_en-US.msi`（企业部署）
- macOS / Linux：GitHub Releases 提供对应包
- 首次使用：yt-dlp 与 FFmpeg 自动安装，无需配置 PATH

### 核心能力清单

| 类别 | 能力 |
|---|---|
| 下载 | 1,800+ 站点、批量/播放列表、字幕（SRT/VTT/ASS）、缩略图与元数据嵌入、按章节拆分、限速、并发、代理 |
| 媒体 | 音视频格式互转、压缩、剪辑、合并/拆分、GIF |
| 转写 | whisper.cpp 语音转文字、TTS、OCR |
| 文档 | PDF 合并/拆分/渲染/文本提取/清理、EPUB/PDF 阅读 |
| 站点专项 | X 帖子/线程/资料/趋势、Instagram 资料、Reddit 线程归档、Twitch 聊天/表情、Pinterest 画板备份 |
| 系统 | 磁盘/缓存扫描、启动项、已安装应用列表、大文件/gallery 下载（aria2、gallery-dl） |
| AI | API Key 本地保险库（OpenRouter/DeepSeek/SiliconFlow/New API，可导出给 Claude Code、Codex）、LLM 价格对比 |

### 接入 AI Agent（MCP）

- 应用内路径：Tools → AI → MCP server 打开，暴露 37 个工具；页面直接给出 Claude Code / Claude Desktop / Cursor / VS Code / Goose / Codex 的配置片段，复制即可。
- 另有 `claude-plugin/`：不装桌面应用也能让 Claude Code 拉取并转写媒体。

### 同类对比（README 自述）

| 方案 | 安装 | 费用 |
|---|---|---|
| 一个下载器 | 下载一个文件、打开 | 免费 |
| yt-dlp 命令行 | Python、PATH、FFmpeg、参数 | 免费 |
| 商业下载器 | 安装 + license key | 付费 |

## 原文精彩摘录

> OmniGet puts all of that behind one text box. Paste a link, see a preview with quality options, click download.（README）

> Each tile is one job: an isolated Rust command with JSON in and JSON out, which is also what lets AI agents drive them through the built-in MCP server.（README）

> 内置 108 个工具，还带 MCP Server，能接进 AI Agent！（推文）

> 白嫖、开源、没广告！Windows、macOS、Linux 全都支持，命令行不用折腾。（推文）

## 关键概念

- [[OmniGet]]：本页对应的实体页（能力矩阵、MCP 集成、评价）
- [[工具集]]：知识库的工具总览主题页
- [[MCP 模型上下文协议]]：OmniGet 接入 AI Agent 的协议基础

## 相关页面

- [[OmniGet]]
- [[工具集]]
- [[MCP 模型上下文协议]]
- [[GIF 工厂]]
