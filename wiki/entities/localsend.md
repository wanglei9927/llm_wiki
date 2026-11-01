---
tags: [LocalSend, AirDrop, 文件传输, iOS, 局域网]
created: 2026-10-31
updated: 2026-10-31
sources: [2026-10-31-iphone-linux互传方案]
---

# LocalSend

> 开源跨平台的 AirDrop 替代品：在同一局域网内的 iPhone/Android/Windows/macOS/Linux 设备间直接互传文件，无账号、不经云端、HTTPS 加密。本机 2026-10-31 安装 v1.18.2，作为与 iPhone 互传的主力工具。

## 简介

LocalSend 是 Flutter 编写的开源文件共享应用（GitHub localsend/localsend，40k+ star），定位于"跨生态的 AirDrop"：iOS 与 Android、Linux 与 Windows/macOS 之间都能像 AirDrop 一样快速传文件。它的工作方式是纯局域网点对点：设备间通过本地网络自动发现（无需登录任何账号），传输走 HTTPS（应用自签名本地证书加密），文件**从不经过任何云端服务器**——哪怕断网，只要设备在同一 Wi-Fi/热点下就能互传。

支持的传输内容：任意文件、文件夹（整目录结构保留）、文本/剪贴板片段、以及相册照片视频（iOS 端通过系统分享面板可以直接从相册分享到 LocalSend）。协议已迭代到 v2，允许不同版本客户端互通，社区还有 CLI 版（localsend-cli）适合脚本化传输。

## 安装方式（本机）

```bash
curl -fsSLO https://github.com/localsend/localsend/releases/download/v1.18.2/LocalSend-1.18.2-linux-x86-64.deb
sudo apt install -y /tmp/LocalSend-1.18.2-linux-x86-64.deb
```

- 版本：v1.18.2（2026-10-31 时最新），安装位置 `/opt/localsend_app/`，桌面入口 `localsend_app.desktop`（应用列表里叫 LocalSend）
- 本机 ufw 防火墙不活动，其使用的局域网端口（默认 53317 TCP/UDP）无需放行；若日后启用 ufw，需放行 53317
- 替代安装渠道：Flathub（flatpak）；频繁更新，建议跟随 GitHub Releases

## 工作原理

1. **发现**：应用启动后在本地网络广播发现包，同网段运行 LocalSend 的设备自动出现在设备列表（也可手动输入 IP 添加）
2. **握手**：首次向某设备发送时，对方会弹出确认请求（可勾选"记住"，之后免确认快速发送）
3. **传输**：HTTPS 加密的点对点 HTTP 传输，接收方实时显示进度；接收目录默认为系统下载文件夹，可在设置中修改或按发送者分目录
4. **iOS 端**：App Store 免费安装；从相册/文件 App 通过系统分享菜单调起 LocalSend 发送；接收的照片进入相册或文件

## 本机使用策略（与 iPhone）

- **日常互传**：两端开 LocalSend（同一 Wi-Fi），即选即传——主力方式
- **照片批量导入**：USB 数据线 + Nautilus（gvfs/libimobiledevice 已就绪），比无线快且稳，适合导出整个 DCIM
- **组合**：无线传零散文件、有线批量导照片，两条通道互补

## 不同素材中的观点

- 来自 [[2026-10-31-iphone-linux互传方案]]：对比调研结论——KDE Connect iOS 端存在锁屏卡传输、预处理慢、入口受限三大体验问题故不采用；Samba（iOS 文件 App 原生 SMB）适合常驻交换目录但需配置成本，列为备选；PairDrop 网页方案作应急；USB+gvfs 已就绪作照片通道。最终采用 LocalSend v1.18.2 deb 安装。

## 实用信息

- **安装**：官方 GitHub Releases 下载对应架构 deb（x86-64/arm64），apt 安装；或 Flathub。
- **基本用法**：两端开应用 → 自动发现 → 选文件发送 → 对方确认接收；文本/链接也可直接传。
- **适用场景**：iPhone ↔ Linux 日常文件交换、无网络环境下（开热点不联网）设备间传文件、不想让文件上云的隐私场景。
- **注意事项**：两端必须在同一局域网（路由器开了 AP 隔离会导致发现失败，可手动 IP 添加）；iOS 端从相册分享大量照片时保持 App 前台；接收目录默认「下载」，注意定期清理。

## 相关页面

- [[2026-10-31-iphone-linux互传方案]]
- [[yazi]]
- [[Linux系统配置]]
