---
tags: [aliyunpan, 阿里云盘, 同步, 备份, CLI]
created: 2026-11-01
updated: 2026-11-01
source_path: raw/notes/2026-11-01-aliyunpan部署记录.md
source_type: local_markdown
---

# 2026-11-01-aliyunpan部署记录

> tickstep/aliyunpan CLI（阿里云盘开源命令行客户端）在本机的完整部署：apt 源安装 v0.4.0、OAuth 登录、systemd 同步服务（云盘→本地增量下载），端到端验证通过。

## 基本信息

- **来源**：本机部署记录（原始副本：raw/notes/2026-11-01-aliyunpan部署记录.md）；官方 README 与 docs/manual.md
- **日期**：2026-11-01
- **账号**：汪磊dae（三方权益包未开通——下载限速是阿里官方限制）

## 核心观点

1. **apt 源安装是官方支持的方式**：file.tickstep.com 源 + GPG 签名，安装后随 apt 升级；程序在 /usr/local/bin/aliyunpan。
2. **登录必须用户浏览器参与**：`aliyunpan login` 打印 OAuth 链接（5 分钟有效），浏览器一次授权 + 一次扫码，CLI 自动收 token——这是全流程唯一需要人工的环节。
3. **同步是"扫描-对比-执行"循环**：`sync start` 是阻塞常驻进程；模式 upload（本地→云盘）/ download（云盘→本地）；策略 increment（增量，删除不传播，默认安全）/ exclusive（镜像，删源删目标，慎用）。
4. **systemd user service 优于官方 nohup 建议**：日志进 journal、开机自启、崩溃自动重启（Restart=on-failure）；本机服务 aliyunpan-sync.service 已 enabled。
5. **重启服务 = 触发立即扫描**：sync 默认周期性扫描间隔较长，验证同步用 `systemctl --user restart aliyunpan-sync` 立即触发。
6. **自动化只能用直接子命令模式**：v0.4.0 管道模式（stdin 交互）会 panic（CmdLiner.Pause 空指针）；`aliyunpan who/ls/download/upload/sync start` 等直接子命令均可非交互执行；`du` 等部分命令只在交互模式存在。

## 实操内容保留

### 安装（官方 apt 一键）

```bash
sudo curl -fsSL http://file.tickstep.com/apt/pgp | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg > /dev/null && echo "deb [signed-by=/etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg arch=amd64,arm64] http://file.tickstep.com/apt aliyunpan main" | sudo tee /etc/apt/sources.list.d/tickstep-aliyunpan.list > /dev/null && sudo apt-get update && sudo apt-get install -y aliyunpan
```

### 同步服务（~/.config/systemd/user/aliyunpan-sync.service）

```ini
[Service]
ExecStart=/usr/local/bin/aliyunpan sync start -ldir %h/阿里云盘同步 -pdir /同步盘 -mode download -drive backup -policy increment
Restart=on-failure
RestartSec=30
```

管理：`systemctl --user enable --now aliyunpan-sync` / `journalctl --user -u aliyunpan-sync -f` / `restart` 触发立即扫描。

### 端到端验证（通过）

```bash
aliyunpan upload /tmp/同步测试.txt /同步盘    # 3 秒上传成功
systemctl --user restart aliyunpan-sync       # 触发立即扫描
ls ~/阿里云盘同步/                             # 同步测试.txt 自动出现，内容正确
```

## 原文精彩摘录

> 备份功能支持指定备份策略：increment，增量备份文件，目标目录多余的文件不会被删除。只会把源目录修改的文件，新增的文件备份到目标目录。如果源目录有文件删除，或者目标目录有其他文件新增是不会被删除。——docs/manual.md

> 网盘目录必须和本地目录独占使用，不要用作其他用途，不然备份可能会有问题。——docs/manual.md

## 与其他素材的关联

- 与 [[LocalSend]] 组成双云/端通道：LocalSend 管局域网点对点（iPhone ↔ Surface），aliyunpan 管云端同步（阿里云盘 ↔ Surface），两者都不依赖同一网络。
- 属于 [[Linux系统配置]] 主题"云存储与备份"方向；与 [[yazi]] 配合：同步落地的文件用 y 快速整理。

## 相关页面

- [[aliyunpan]]
- [[Linux系统配置]]
