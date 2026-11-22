---
tags: [iPhoneMirror, 投屏, iPhone, iPad, AirPlay, Windows, 镜像, 工具]
created: 2026-11-22
updated: 2026-11-22
source_path: raw/articles/2026-11-22-iphonemirror.md
---

# iPhoneMirror：Windows 上的 iPhone 投屏工具

> GitHub RayrenSX/iPhoneMirror（1,961★ / 148 fork / GPL-3.0 / C#+C++）——Windows 10/11 x64 上通过 USB 或 AirPlay 进行低延迟 iPhone/iPad 屏幕与系统声音采集，本地渲染、无云端中转。

## 基本信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/RayrenSX/iPhoneMirror |
| 热度 | 1,961★ / 148 fork（2026-11） |
| 协议 | GPL-3.0-only |
| 语言 | C#（WPF 主程序）+ C++（采集核心） |
| 当前版本 | 1.8.5-pre5（公开预览版，未商业签名） |
| 平台 | **仅 Windows 10/11 x64**（ARM64 不支持） |
| 定位 | iOS 版的「scrcpy」：本机投屏 + 反向控制 |

## 核心观点

1. **官方只支持 Windows，且技术栈锁死**：渲染用 D3D11/DirectComposition、音频用 WASAPI、界面用 WPF、解码走 Media Foundation、USB 走 libusb0 内核过滤驱动——全是 Windows 专属组件，因此 Windows ARM64 都因「USB 内核驱动和无线运行库缺 ARM64 版」而不支持，更不用说其它系统。

2. **Linux 靠社区移植，非官方**：官方 README 明确列出两个第三方 fork——@furruka 的 Linux 移植（Linux 原生界面 + 音视频 + 设备通信适配）、@zhangziqizZ 的 HarmonyOS（鸿蒙 PC）移植。二者独立维护，功能范围/发布包/限制以各自仓库为准，不与原版同步。

3. **双通道统一（USB + AirPlay）**：USB 私有 Screen Capture 与局域网 AirPlay 用同一套设备/预览/音频/OBS 工作流；多设备各持独立会话和独立窗口可同时运行；H.264/CoreMedia 在本机解码，媒体不经过项目云端中转，USB 场景完全不依赖网络。

4. **按机型族适配外形**：根据 Apple `ProductType` 识别 iPhone X/刘海/灵动岛、iPad 各系列，为每台设备匹配独立圆角与裁切，而不是统一圆角。

5. **耗电分层**：本机 H.264 走 D3D11/Media Foundation **硬件解码**（不支持时自动回退软件解码，CPU 与功耗会上升）；手机端 USB 有线插着充电基本不额外耗电，AirPlay 无线则因持续编码 + 传输而明显耗手机电。可手动降 540p/30fps 省资源。

## 实操内容保留

**安装**：前往 Releases 下载 `iPhoneMirror-Setup-v*-x64.exe`（安装向导支持简繁中文/英/日），管理员安装默认到 `C:\Program Files\iPhoneMirror`；或下载 `iPhoneMirror-v*-win-x64.zip` 免安装版解压运行 `iPhoneMirror.exe`。两者都自带 .NET 运行时和 `iPhoneMirror.Driver.exe` 驱动管理器。

**前置**：目标电脑需 Apple USB 支持——Microsoft Store 版「Apple Devices」或含 Apple Mobile Device Support 的 iTunes 桌面版；缺失时驱动管理器自动补齐。

**有线连接步骤**：① 数据线连 iPhone/iPad，解锁并「信任此电脑」→ ② 左侧「驱动」一键安装/修复 → ③ 「投屏来源」选设备 → ④ 「开始投屏」。有线默认「A 演示模式（推荐）」；B AirPlay（实验）、C 爱思模式（固定 1565×1565）按需选择。

**AirPlay 无线**：电脑与手机同一局域网 → 设置「无线 AirPlay」接收端名称与分辨率（原画 / 1080p60 / 720p30 / 540p30）→ 应用 → 手机控制中心「屏幕镜像」选接收端。

**分辨率/FPS**：仅限制本地渲染（原生/1080p/720p/540p，24/30/60/120 FPS），不降低 USB 原始传输画质。

## 原文精彩摘录

> iPhoneMirror 是一个面向 Windows 10/11 x64 的本地 iPhone/iPad 投屏与蓝牙、USB/无线反向控制工具，目标是在不依赖云端中转的情况下，将 USB 有线采集和局域网 AirPlay 接收统一到同一套预览、音频、截图、独立窗口、OBS 和多设备会话能力中。

> 官方构建目前仅支持 Windows x64；Windows ARM64 因 USB 内核驱动和无线运行库缺少 ARM64 版本而不受支持。

> 硬件解码是否可用取决于 Windows MFT、GPU 驱动和设备；不支持时会自动回退到软件解码，预览仍使用 D3D11。

## 关键概念

- [[iPhoneMirror]]（实体）
- 关联：[[scrcpy]]（Android 投屏的 iOS 对应物）

## 相关页面

- [[iPhoneMirror]]
- [[scrcpy]]
- [[Ubuntu 安卓投屏控制]]
- [[工具集]]
