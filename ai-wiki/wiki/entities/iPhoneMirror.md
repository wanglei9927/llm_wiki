---
tags: [iPhoneMirror, 投屏, iPhone, iPad, AirPlay, Windows, 开源工具]
created: 2026-11-22
updated: 2026-11-22
sources: [iPhoneMirror 投屏工具]
---

# iPhoneMirror

> iPhoneMirror 是 Windows 上的本地 iPhone/iPad 投屏与反向控制工具，通过 USB 或局域网 AirPlay 把手机画面投到电脑并采集系统声音，本地渲染、无云端中转，可以理解成 iOS 版的 [[scrcpy]]。

## 它是什么

一个面向 Windows 10/11 x64 的开源投屏工具（GPL-3.0），把 iPhone/iPad 的屏幕镜像与声音采集、蓝牙/反向控制统一到同一套预览、截图、独立窗口、OBS 与多设备会话能力里。与 scrcpy 的定位一致——都是「把手机画面搬到电脑、用键鼠操作手机」，差别在 scrcpy 管 Android（走 ADB），iPhoneMirror 管 iOS（走 Apple 私有 USB 协议 + AirPlay）。

架构上分工明确：**C++ 核心**负责 Apple 私有 USB 协议、QuickTime/CoreMedia 解析、H.264 解码、D3D11 渲染与 WASAPI 音频；**WPF 主程序**负责设备列表、会话控制与界面；**独立无线宿主**负责 AirPlay 协议与解码，通过有界命名管道传递媒体帧；**`iPhoneMirror.Driver.exe`** 单独负责驱动安装/修复/卸载。

## 平台与协议

| 项 | 内容 |
|---|---|
| 平台 | **仅 Windows 10/11 x64**（官方构建） |
| 协议 | GPL-3.0-only |
| 语言 | C#（界面）+ C++（采集核心） |
| 版本 | 1.8.5-pre5（公开预览，未商业签名） |
| 连接 | USB 有线（私有 Screen Capture）、局域网 AirPlay |
| 渲染 | D3D11 / DirectComposition |
| 音频 | WASAPI（USB 48kHz PCM / AirPlay PCM） |
| 解码 | Media Foundation（硬件优先，自动回退软件） |
| 前置 | Apple Devices（Microsoft Store）或 iTunes 的 Apple Mobile Device Support |

**非 Windows 平台**：官方不支持（Windows ARM64 也因 USB 内核驱动与无线运行库无 ARM64 版而不支持）。Linux 有社区移植（@furruka，独立维护），鸿蒙 PC 有 @zhangziqizZ 移植，功能与发布以各自仓库为准。

## 主要功能

- **双通道统一**：USB 与 AirPlay 共用同一套设备/预览/音频/OBS/多设备工作流。
- **多设备并发**：每台设备独立会话、独立窗口、可排序，同时投屏互不干扰。
- **按机型适配**：根据 `ProductType` 识别 iPhone X/刘海/灵动岛、iPad 各系列，匹配独立圆角与裁切。
- **OBS 友好**：独立无 UI 窗口可直接 Window Capture，截图直接读解码帧、不含软件 UI。
- **蓝牙/USB 反向控制**：BLE HID 鼠标/键盘（配 iOS 辅助触控，免装 App 免越狱）；USB/无线反向控制走 CoreDevice 桥接器（需开发者模式）。
- **画面调节**：仅本地预览的亮度/对比度/饱和度/伽马。
- **驱动管理**：独立 `iPhoneMirror.Driver.exe` 按设备检查、一键安装/修复/卸载，主程序只读状态不改系统驱动。

## 实用信息

- **安装**：Releases 下 `iPhoneMirror-Setup-v*-x64.exe`（管理员安装默认到 `C:\Program Files\iPhoneMirror`），或 ZIP 免安装版解压运行 `iPhoneMirror.exe`。自带 .NET 运行时与驱动管理器。
- **有线用法**：数据线连接 → 解锁并信任电脑 → 左侧「驱动」安装 → 「投屏来源」选设备 → 「开始投屏」。
- **无线用法**：同一局域网 → 设置 AirPlay 接收端名称/分辨率 → 手机控制中心「屏幕镜像」选接收端。
- **省资源**：分辨率可降到 540p、帧率 30fps；多设备并发数量取决于 CPU/GPU/内存与带宽。
- **适用场景**：演示、录制（OBS）、自动化操作、回微信/刷手机、多设备展示。

## 耗电说明

- **电脑端**：H.264 走 D3D11/Media Foundation 硬件解码，比软解省电；GPU 不支持硬解时自动回退软件解码（CPU 与功耗上升）。持续投屏占 GPU/CPU，多设备/高分辨率/高帧率加重负载。
- **手机端**：USB 有线插着充电、基本不额外耗电；AirPlay 无线需持续编码 + 传输，明显耗手机电。

## 不同素材中的观点

来自 [[iPhoneMirror 投屏工具]]：

- 官方只支持 Windows 10/11 x64，技术栈（D3D11/WPF/WASAPI/Media Foundation/libusb0）锁死，ARM64 都因缺内核驱动而不支持。
- Linux/鸿蒙 PC 靠社区 fork 移植，非官方维护，不与原版同步。
- 双通道统一（USB + AirPlay）+ 多设备独立会话是它与「常见通用投屏方案」的核心差异；OBS 无 UI 独立窗口是一大卖点。
- 耗电分两端：电脑硬件解码省电、软件解码费电；手机 USB 有线充电、AirPlay 无线明显耗电。

## 评价与注意

- **优点**：本地无云、双通道统一、多设备、OBS 友好、免装 App/免越狱、驱动独立管理。
- **注意**：公开预览未商业签名（SmartScreen 会提示）；Apple Screen Capture 与 AirPlay 都是私有协议，未来 iOS 更新可能失效；蓝牙反控只有指针级单指操作，不能注入多指触控；无内建视频编辑器。

## 相关页面

- [[iPhoneMirror 投屏工具]]
- [[scrcpy]]
- [[Ubuntu 安卓投屏控制]]
- [[工具集]]
