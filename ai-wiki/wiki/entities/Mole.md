---
tags: [Mole, 系统清理, 磁盘分析, 卸载工具, 电脑优化, macOS, Windows, CLI]
created: 2026-11-14
updated: 2026-11-14
sources: [Mole 系统清理工具]
---

# Mole

> tw93 开源的 Mac / Windows 电脑清理工具：`mo clean` 清缓存、`mo uninstall` 卸载 + 清残留、`mo analyze` 看磁盘、`mo status` 看资源；74,995★、GPL-3.0，先 `--dry-run` 再动手

## 简介

Mole 把「清理、卸载、优化、磁盘分析、实时监控」收进一个终端命令 `mo`。macOS 上它相当于 CleanMyMac + AppCleaner + DaisyDisk + iStat Menus 的开源合体；Windows 上相当于 CCleaner + IObit Uninstaller + WinDirStat + 任务管理器。仓库提供免费 CLI，官网另售原生 App（删除前逐项确认、800+ 应用残留库等）。

对 AI 工作流友好：提供 `llms.txt`、跨 Agent Skill、Claude Code/Codex 插件与 DSH 插件 `dsh-mole`，Agent 删除前会先 `--dry-run`。

## 关键信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/tw93/Mole |
| 官网 | https://mole.fit |
| Star | 74,995（2026-11-14） |
| 协议 | GPL-3.0 |
| 平台 | macOS 12+（main）、Windows 10/11（windows 分支）、Linux（linux 分支） |
| 语言 | Shell + Go |
| 数据来源 | [[Mole 系统清理工具]] |

## 本机快速使用（Windows 10/11）

```powershell
# 安装（二选一）
scoop install mole
iwr -useb https://raw.githubusercontent.com/tw93/Mole/windows/quick-install.ps1 | iex

# 先预览，再执行
mo clean --dry-run
mo clean
mo analyze D:\
mo status
```

常用命令：

| 命令 | 作用 |
|---|---|
| `mo` | 交互菜单（不知道用哪个就敲这个） |
| `mo clean` | 深度清理临时文件/缓存/日志/浏览器残留 |
| `mo uninstall` | 卸载应用并清残留（`--list` 列出应用） |
| `mo optimize` | 刷新 DNS、优化系统盘、检查磁盘健康 |
| `mo analyze` | 磁盘占用 TUI，找大文件 |
| `mo status` | CPU/内存/磁盘/网络/进程实时看板 |
| `mo purge` | 清理项目构建产物（可配扫描目录） |
| `mo installer` | 查找并删除安装包 |
| `mo history` | 查看历史操作 |

安全要点：任何清理前先 `--dry-run`；`--system` 需要管理员权限；`mo clean --whitelist` 可保护不想被清的路径；卸载 App 建议人工确认。

## 平台差异

- **macOS**：`brew install mole` 或脚本安装；额外有 `mo touchid`（Touch ID 授权 sudo）、`mo slim`（移除 universal App 的 Intel 代码）等。
- **Windows**：Scoop 或 PowerShell 脚本安装，装到 `%LOCALAPPDATA%\Programs\mole-cli`，脚本首次可能需 Git/Go。
- **Linux**：独立分支，命令同构。
- **原生 App**：Mac / Windows 版单独下载（mole.fit），CLI 与 App 是两套东西。

## 评价

**优点**：

- 一个 CLI 覆盖清理/卸载/分析/监控，替代多个收费工具；
- 默认提供 `--dry-run`、白名单、历史记录，风险可控；
- 跨平台、GPL 开源、更新频繁（2026-11-14 仍在推）；
- 对 Agent 友好（Skill/插件/llms.txt），适合让 AI 辅助清理。

**注意点**：

- 清理类工具本身有误删风险，务必先 dry-run，重要数据先备份；
- 原生 App 是商业产品，免费的是 CLI；
- Windows 脚本安装需要 Git（必要时 Go），Scoop 更省事；
- 只从 GitHub / Scoop / mole.fit 下载，警惕第三方「Mole 加速版」。

## 相关页面

- [[Mole 系统清理工具]]
- [[工具集]]
