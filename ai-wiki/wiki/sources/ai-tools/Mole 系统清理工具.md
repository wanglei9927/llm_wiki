---
tags: [Mole, 系统清理, 磁盘分析, 卸载, macOS, Windows, 开源, 命令行]
created: 2026-11-14
updated: 2026-11-14
source_path: raw/articles/2026-11-14-mole-readme.md
---

# Mole：开源 Mac / Windows 系统清理工具（CLI + 原生 App）

> tw93 开源的「电脑清理全家桶」：一条命令搞定深度清理、应用卸载、系统优化、磁盘分析、实时监控；74,995★、GPL-3.0，macOS / Windows / Linux 都有分支，还带 DSH 插件与 Agent Skill

## 基本信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/tw93/Mole |
| 官网 | https://mole.fit（Mac / Windows 原生 App 单独下载） |
| Star / Fork | 74,995 / 2,700（2026-11-14） |
| 协议 | GPL-3.0 |
| 语言 | Shell（另有 Go 写的原生工具） |
| 平台 | macOS 12+（main 分支）、Windows 10/11（windows 分支）、Linux（linux 分支） |
| DSH 集成 | `dsh plugin --profile <name> add dsh-mole` |
| 原始素材 | raw/articles/2026-11-14-mole-readme.md；Windows 中文 README 见 raw/articles/2026-11-14-mole-windows-readme-zh.md |

## 核心观点

1. **把四个工具塞进一条命令**：macOS 上对标 CleanMyMac + AppCleaner + DaisyDisk + iStat Menus；Windows 上对标 CCleaner + IObit Uninstaller + WinDirStat + 任务管理器。

2. **安全优先的设计**：所有清理命令都支持 `--dry-run` 先看清单；Agent Skill 装上后，Claude Code/Codex/Cursor 删东西前会先 dry-run，卸载 App 和需要管理员权限的步骤留给人。

3. **免费 CLI 与付费 App 分离**：仓库里是免费开源 CLI（`mo`）；Mole for Mac / Windows 是官网单独下载的原生 App（删除前逐项确认、800+ 应用残留、风扇控制等），`brew install mole` / `scoop install mole` 只装 CLI。

4. **跨平台同构**：macOS / Windows / Linux 三个分支命令基本一致（clean / uninstall / optimize / analyze / status / purge / installer），Windows 用 PowerShell 5.1，装到 `%LOCALAPPDATA%\Programs\mole-cli`。

5. **对 AI 工作流友好**：提供 `llms.txt` 给 Agent 读、`npx skills add tw93/Mole` 装跨 Agent 技能、Claude Code/Codex 插件市场、DeepSeek Harness 插件 `dsh-mole`。

## 实操内容保留

### 安装

**Windows（本机适用）**：

```powershell
# Scoop（推荐，若已装 Scoop）
scoop install mole

# 或脚本安装（需要 Git；源码与发布版不一致时需要 Go）
iwr -useb https://raw.githubusercontent.com/tw93/Mole/windows/quick-install.ps1 | iex
```

**macOS**：

```bash
brew install mole
# 或
curl -fsSL https://raw.githubusercontent.com/tw93/mole/main/install.sh | bash
```

**装给 AI Agent 用**：

```powershell
npx skills add tw93/Mole -a claude-code codex cursor -g -y
# Claude Code: /plugin marketplace add tw93/Mole → /plugin install mole@mole
# DeepSeek Harness: dsh plugin --profile <name> add dsh-mole
```

### 命令速查（Windows / macOS 通用）

| 命令 | 作用 |
|---|---|
| `mo` | 交互式菜单 |
| `mo clean` | 深度清理（缓存/日志/浏览器残留/已卸载 App 残留） |
| `mo uninstall` | 卸载应用 + 清理残留 |
| `mo optimize` | 刷新 DNS/缓存、优化系统盘、检查磁盘健康 |
| `mo analyze` | 交互式磁盘分析（TUI），找大文件（`mo analyze D:\` 指定盘） |
| `mo status` | 实时 CPU/内存/磁盘/网络/进程看板 |
| `mo purge` | 清理项目构建产物（可配置扫描目录） |
| `mo installer` | 查找并删除安装包 |
| `mo update` / `mo remove` | 更新 / 完全卸载 Mole |

### 安全用法（重要）

```powershell
mo clean --dry-run        # 先预览要删什么
mo uninstall --dry-run
mo optimize --dry-run
mo purge --dry-run
mo history                # 查看历史操作
mo clean --whitelist      # 配置受保护路径
mo clean --system         # 系统级清理（需管理员）
```

### 来源可信提示

Mole 只通过 GitHub 仓库、Scoop 和 mole.fit 官网发布；自称「基于 Mole」的第三方 App、让你往终端粘贴编码命令的网站都与它无关。

## 原文精彩摘录

> All-in-one CLI toolkit: Combines CleanMyMac, AppCleaner, DaisyDisk, and iStat Menus style workflows in one terminal command.（README）

> 装上后 Claude Code、Codex、Cursor 等 Agent 删东西前会先用 `--dry-run` 把清单给你看，卸载 App 和要管理员权限的步骤留给你自己跑。（Windows 中文 README）

> Mole 只通过这个 GitHub 仓库、Scoop 和 Windows 版官网 mole.fit 发布，自称基于 Mole 的其他 App…都和 Mole 无关。（Windows 中文 README）

## 关键概念

- [[Mole]]：实体页（含本机 Windows 安装与速查）
- [[工具集]]：知识库工具总览

## 相关页面

- [[Mole]]
- [[工具集]]
