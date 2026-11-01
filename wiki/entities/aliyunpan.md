---
tags: [aliyunpan, 阿里云盘, 同步, 云存储, CLI]
created: 2026-11-01
updated: 2026-11-01
sources: [2026-11-01-aliyunpan部署记录]
---

# aliyunpan

> tickstep/aliyunpan——开源的阿里云盘命令行客户端（Go 编写，仿 Linux shell 设计），本机用它与阿里云盘做文件同步与下载。2026-11-01 部署 v0.4.0，systemd 同步服务已常驻运行并通过端到端验证。

## 简介

aliyunpan 是社区维护的阿里云盘 CLI（GitHub 40k+ star 级项目，作者 tickstep），把阿里云盘变成终端里的"远程文件夹"：支持仿 shell 交互模式（Tab 补全、通配符）、文件/目录下载（断点续传、并行分片）、上传（秒传检测、排除规则）、**同步备份**（本地目录 ↔ 云盘目录自动保持同步）、多账号、备份盘/资源库切换、相册批量下载、回收站等。阿里官方没有 Linux 客户端，它是 Linux 用户使用阿里云盘的主力方案。

本机于 2026-11-01 通过官方 apt 源安装 v0.4.0，配置了 systemd 常驻同步服务（云盘 `/同步盘` → 本地 `~/阿里云盘同步/`），端到端验证通过。

## 安装与登录

- **安装**：官方 apt 源（file.tickstep.com），随 apt 升级自动更新——本机已装
- **登录**：`aliyunpan login` 打印 OAuth 链接（5 分钟有效）→ 浏览器**一次授权 + 一次扫码** → 完成。唯一需要人工的环节。
- **限制**：阿里云盘单账号最多 10 台设备同时在线；下载加速需 VIP 开通「三方应用权益包」（阿里官方限制，未开通时限速）

## 同步服务（本机架构）

| 项 | 值 |
|----|-----|
| 本地目录 | `~/阿里云盘同步/` |
| 云盘目录 | `/同步盘`（备份盘） |
| 模式/策略 | **upload（本机 → 云盘备份）/ increment（增量，删除不传播）** |
| 任务数 | **5 个**（公共/视频/图片/文档/音乐 五个 XDG 目录，多任务配置文件模式） |
| 服务 | systemd user service `aliyunpan-sync`（enabled 开机自启，崩溃自动重启），ExecStart = `sync start`（无参，读 /etc/aliyunpan/sync_drive/ 配置） |
| 日志 | `journalctl --user -u aliyunpan-sync -f` |

工作循环：扫描 → 对比 → 执行，永久循环；**重启服务可触发立即扫描**（验证同步的技巧）。

## 使用方式

- **交互模式**：终端直接跑 `aliyunpan`，进入仿 shell 界面（ls/cd/download/upload/sync/recycle 全功能，Tab 补全）
- **直接子命令**（自动化推荐）：`aliyunpan who/ls/mkdir/download/upload/sync start ...` 可非交互执行
- **已知局限**：管道喂命令会 panic（v0.4.0）；`du` 等部分命令只在交互模式存在
- **配套产出**：skill（`~/.claude/skills/aliyunpan-sync/SKILL.md`，六工作流）+ 使用手册（`~/文档/aliyunpan使用手册.md`）

## 不同素材中的观点

- 来自 [[2026-11-01-aliyunpan部署记录]]：apt 安装一键命令；登录流程细节；sync 模式与策略语义（increment 删除不传播）；systemd 服务配置与四个踩坑点（管道 panic、du 缺失、restart 触发扫描、目录独占原则）；端到端验证数据。
- 来自 [[2026-11-01-aliyunpan目录重构]]：**apt 版配置目录是 /etc/aliyunpan**（非 ~/.aliyunpan，README 未明示）；多任务必须用 sync_drive_config.json（命令行参数仅支持单目录对）；云盘 mv 重命名根目录不可用（用建新+删旧）；五目录 upload 增量备份架构落地并端到端验证。

## 实用信息

- **安装**：apt 源（本机已装，随系统更新）；也支持 brew/winget/docker
- **基本用法**：`aliyunpan who` 验登录；`aliyunpan download <云盘路径>` 下载；`aliyunpan upload <本地> <云盘>` 上传；五目录自动备份交给 systemd 服务
- **适用场景**：本机 XDG 目录自动备份到云盘（现役）、阿里云盘文件临时下载/上传、脚本化云盘操作
- **注意事项**：配置目录在 /etc/aliyunpan（sudo 修改）；云盘同步目录必须与本地目录独占使用；设备数上限 10 台；下载限速需 VIP 三方权益包解除；token 长期未用失效就重新 login

## 相关页面

- [[2026-11-01-aliyunpan部署记录]]
- [[2026-11-01-aliyunpan目录重构]]
- [[LocalSend]]
- [[yazi]]
- [[Linux系统配置]]
