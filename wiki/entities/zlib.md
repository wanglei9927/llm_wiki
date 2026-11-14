---
tags: [zlib, Z-Library, 电子书, CLI, TUI, MCP, Kindle, 微信读书]
created: 2026-11-14
updated: 2026-11-14
sources: [2026-11-14-zlib安装与使用]
---

# zlib

> heartleo/zlib——Z-Library 开源命令行工具（Go 编写，MIT 协议），定位"给你和你的 AI Agent 用的 Z-Library CLI"。2026-11-14 本机安装 v0.0.14，尚未登录。

## 简介

zlib（zlib-cli）是 heartleo 维护的 Z-Library 客户端（GitHub 1.9k star / 137 fork），把搜书、下载、推送整合进一个 Go 单二进制：命令行子命令（可 `--json` 脚本化）、全功能终端交互界面（TUI，vim 风格键位 + `/` 命令面板）、以及 stdio MCP server 三种形态。功能覆盖按年份/语言/格式过滤搜索、收藏/推荐/热门/下载历史浏览、每日配额查询、Kindle SMTP 推送、微信读书扫码导入书架。对国内用户的杀手锏是 `zlib doctor`——自动探测当前网络可达的 Z-Library 镜像域名，并支持信任自备镜像和配置代理，直击 Z-Library 域名频繁漂移的痛点。

## 关键信息

| 项 | 值 |
|----|-----|
| 仓库 | github.com/heartleo/zlib（MIT） |
| 语言 | Go（单二进制，无运行时依赖） |
| 官网 | zlib.heartleo.dev |
| AI 集成 | MCP server（`zlib mcp`，可 `--read-only`）+ Claude Code / Codex 插件 |
| 本机版本 | v0.0.14，/usr/local/bin/zlib（2026-11-14 install.sh 安装） |
| 前置条件 | Z-Library 账号；免费账号有每日下载配额 |

## 核心特性

1. **搜索与浏览**：按年份、语言、格式（epub/pdf/mobi 等）过滤，可排序；收藏夹、推荐、热门榜、下载历史一应俱全。
2. **下载**：按 `id:hash` 精确下载，可选目录，支持封面预览（终端支持度见 docs/covers.md）。
3. **Kindle 推送**：配置 Kindle 邮箱 + SMTP 后 `zlib kindle send ./book.epub` 一条命令投递。
4. **微信读书导入**：扫码登录后 `zlib weread import` 把书直接送进微信读书书架——同类工具中少见。
5. **网络韧性**：doctor 探测镜像、mirrors 信任自定义域名、config network 配代理，三层兜底。
6. **Agent 友好**：MCP server 让 AI 助手代搜代下，read-only 模式收窄权限；官方建议登录由用户本人完成，密码不进对话上下文。

## 不同素材中的观点

- 来自 [[2026-11-14-zlib安装与使用]]：安装与首次使用三步（doctor→login→tui）；15 个子命令速查；TUI 键位表；MCP 注册命令；配额/域名漂移/cookie 登录等注意事项；本机 v0.0.14 走代理安装的事实。

## 实用信息

- **安装**：本机走官方 install.sh（装 /usr/local/bin，需 sudo，经 127.0.0.1:7897 代理成功）；备选 brew / winget / Releases 二进制；自更新用 `zlib update`
- **基本用法**：`zlib doctor` 找域名 → `zlib login --domain <域名>` 登录 → `zlib tui` 交互使用或直接用 search/download 子命令；`--json` 输出可脚本化
- **适用场景**：终端搜书下书、推 Kindle / 微信读书、把搜书能力接入 AI Agent（MCP）
- **注意事项**：登录凭据存本地；未登录时配置目录尚未生成（首次 login/config 后产生）；免费账号配额有限；域名漂移时优先重跑 `zlib doctor`；登录失败可从浏览器导入 cookies（docs/troubleshooting.md）

## 相关页面

- [[2026-11-14-zlib安装与使用]]
- [[aliyunpan]]
- [[Linux系统配置]]
