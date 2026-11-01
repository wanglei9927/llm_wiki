# iPhone ↔ Linux 文件互传方案研究与部署记录（2026-10-31）

> 本机（Surface Go 3 + Ubuntu 26.04.1）与 iPhone 互传文件的方案调研结论与部署事实。

## 来源

- 项目：https://github.com/localsend/localsend（官网 localsend.org）
- 辅助调研：It's FOSS / PCMag / OSTechNix 评测、KDE 官方论坛 iOS 反馈、xterm ctlseqs 无关
- 日期：2026-10-31

## 环境基线

- 本机已就绪：gvfs-backends 1.60.0、libimobiledevice 1.4.0、usbmuxd 1.1.1（GNOME 默认，USB 连 iPhone 全套支持）
- ufw 防火墙：**不活动**（局域网端口无阻塞）
- samba / openssh-server：未安装（SMB/SFTP 方案未启用）

## 方案对比结论

| 方案 | 优点 | 缺点 | 结论 |
|------|------|------|------|
| LocalSend（v1.18.2） | 最像 AirDrop：开源、无账号、不经云端、HTTPS 加密、iOS App Store 官方版、协议 v2 自动发现设备 | 两端都要装 App | **首选，已安装** |
| USB 线 + gvfs | 零安装已就绪；照片批量导入最快最稳 | 适合照片/视频为主 | 保留作照片通道 |
| Samba 共享 | iPhone「文件」App 原生 SMB，常驻交换目录 | 需装 samba 配共享 | 备选进阶 |
| PairDrop 网页 | 零安装 | 公共实例中转、体验一般 | 应急 |
| KDE Connect iOS | 有官方 iOS 端 | 锁屏卡传输、媒体预处理慢、PC→iPhone 入口受限（KDE 论坛多帖证实） | 不推荐 |

## 部署事实

```bash
# 安装（2026-10-31，v1.18.2 最新版）
curl -fsSLO https://github.com/localsend/localsend/releases/download/v1.18.2/LocalSend-1.18.2-linux-x86-64.deb
sudo apt install -y /tmp/LocalSend-1.18.2-linux-x86-64.deb
# 结果：/opt/localsend_app/ + 桌面入口 localsend_app.desktop
```

## 使用方式

1. iPhone：App Store 安装 LocalSend（免费）
2. 两端连同一 Wi-Fi → LocalSend 自动发现附近设备（无需配对码，首传需对方确认）
3. 发送：选文件 → 选目标设备；接收：默认保存到「下载」，可设置
4. USB 照片通道：插线 → iPhone 点「信任」→ Nautilus 侧边栏出现 iPhone → 拷 DCIM
