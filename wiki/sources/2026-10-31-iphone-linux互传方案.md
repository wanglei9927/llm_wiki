---
tags: [iPhone, iOS, 文件传输, LocalSend, USB]
created: 2026-10-31
updated: 2026-10-31
source_path: raw/notes/2026-10-31-iphone-linux互传方案.md
source_type: local_markdown
---

# 2026-10-31-iphone-linux互传方案

> Linux（Ubuntu 26.04）与 iPhone 互传文件的方案调研：LocalSend（已装）为主、USB 线为照片通道、Samba 为备选进阶；KDE Connect iOS 版因体验问题不推荐。

## 基本信息

- **来源**：本机调研与部署记录（原始副本：raw/notes/2026-10-31-iphone-linux互传方案.md）；LocalSend 官方仓库 localsend/localsend 与官网 localsend.org；It's FOSS、PCMag、OSTechNix 评测；KDE 官方论坛 iOS 使用反馈
- **日期**：2026-10-31
- **本机基线**：gvfs/libimobiledevice/usbmuxd 全套已装；ufw 不活动

## 核心观点

1. **LocalSend 是公认的 AirDrop 开源替代**：40k+ star，覆盖 iOS/Android/Windows/macOS/Linux，本地 Wi-Fi 直传、不经过互联网、无账号、HTTPS 加密（本地证书）、协议 v2 自动发现设备；PCMag/It's FOSS 等媒体一致好评。
2. **USB 照片通道零成本就绪**：Ubuntu GNOME 的 gvfs + libimobiledevice + usbmuxd 默认全装，插线后 Nautilus 直接挂载 iPhone 文件系统（AFC 协议），批量导 DCIM 照片视频是所有方案里最快最稳的。
3. **KDE Connect 的 iOS 端不推荐**：官方 iOS 版存在（App Store 上架），但社区反馈一致指出：iPhone 锁屏会卡住且传输不恢复、媒体文件发送前预处理耗时长、从 PC 向 iPhone 发送的入口受限——体验与 Android 端差距明显。
4. **Samba 共享是"常驻交换区"思路**：iOS「文件」App 原生支持 `smb://` 连接，Ubuntu 侧装 samba 建共享目录后，iPhone 可直接读写，无需任何 App；适合需要频繁交换的场景，代价是一次配置成本（本机未启用）。
5. **本机防火墙不阻塞**：ufw 状态不活动，LocalSend 所需的局域网端口（默认 53317）无需额外放行。

## 实操内容保留

### LocalSend 安装（本机已执行，2026-10-31）

```bash
curl -fsSLO https://github.com/localsend/localsend/releases/download/v1.18.2/LocalSend-1.18.2-linux-x86-64.deb
sudo apt install -y /tmp/LocalSend-1.18.2-linux-x86-64.deb
# 安装位置：/opt/localsend_app/；桌面入口：localsend_app.desktop
```

### 日常使用流程

```
无线互传：两端开 LocalSend（同一 Wi-Fi）→ 选文件 → 选自动发现的设备 → 对方确认 → 完成
照片导入：USB 插线 → iPhone「信任」→ Nautilus 侧边栏 iPhone → 拷 DCIM/
```

## 原文精彩摘录

> LocalSend is a free, open-source, cross-platform file sharing tool that allows you to share files to nearby devices. ——localsend.org

> Transfer photos, videos, folders, and text between Windows, macOS, Linux, Android, and iOS over your local Wi-Fi with HTTPS encryption, no account, and no cloud upload. ——localsend.dev

## 与其他素材的关联

- 属于 [[Linux系统配置]] 主题的移动设备互联方向；与 [[yazi]]（文件管理）互补——LocalSend 接收的文件落在下载目录，可用 y 快速整理。
- 与 [[2026-10-31-vim-init安装配置记录]] 同属本机工具链扩充记录。

## 相关页面

- [[LocalSend]]
- [[Linux系统配置]]
