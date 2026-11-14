---
tags: [scrcpy, Android, 投屏, 远程控制, ADB, 开源工具]
created: 2026-11-13
updated: 2026-11-13
sources: [Ubuntu 安卓投屏控制]
---

# scrcpy

> Genymobile 开源的 Android 屏幕镜像与控制工具：通过 USB（或 TCP/IP）把手机画面投到电脑，并用键鼠操作手机，低延迟、无需 root

## 简介

scrcpy（读作 screen copy）把 Android 设备的画面解码后显示在电脑窗口里，同时把键鼠事件回传给手机。它不需要在手机上装 App，依赖 ADB 连接；USB 下延迟通常在几十毫秒级，适合在电脑上回微信、演示、自动化操作或调试。

它是「本机控制手机」这类需求的默认工具，常配合 ADB、systemd/launchd 做成开机自动连接（见 [[Ubuntu 安卓投屏控制]]）。

## 关键信息

| 项目 | 内容 |
|---|---|
| 作者/组织 | Genymobile（开源） |
| 协议 | Apache-2.0 |
| 平台 | Windows / macOS / Linux（服务端为 Android，需 API 21+） |
| 依赖 | ADB、FFmpeg（打包版自带） |
| 连接方式 | USB 数据线、TCP/IP（`adb tcpip`） |
| 数据来源 | [[Ubuntu 安卓投屏控制]] |

## 常用参数

| 参数 | 作用 |
|---|---|
| `--max-size=1024` | 限制画面最大宽高（保持比例） |
| `--max-fps=30` | 限制帧率 |
| `--video-bit-rate=3M` | 视频码率 |
| `--video-codec=h264` | 指定编码器（兼容性优先） |
| `--turn-screen-off` | 投屏时关闭手机物理屏幕 |
| `--stay-awake` | 运行期间保持设备唤醒 |
| `--no-audio` | 不转发音频 |
| `--serial=<序列号>` | 多设备时指定目标 |

## 与 ADB、systemd 的关系

- **ADB**：scrcpy 靠 `adb devices` 识别设备；首次连接需在手机上确认 RSA 授权。
- **自动化**：外部脚本可周期性扫描 `adb devices`，恰好一台授权设备时拉起 scrcpy，退出后重试（即 watchdog 模式）。
- **systemd（Linux）**：用 `systemd --user` 服务托管 watchdog，配合 XDG Autostart 导入图形会话环境，实现登录后自动连接与异常恢复。

## 评价

**优点**：

- 开源免费、跨平台、低延迟，键鼠/剪贴板/音频都能转发；
- 不需要 root，不需要手机端装 App；
- 参数丰富，低配设备可降分辨率/帧率/码率；
- 与 ADB 生态无缝配合，容易脚本化。

**注意点**：

- 需要开启 USB 调试，部分厂商还要额外开「USB 调试（安全设置）」才能点击；
- 多设备/模拟器同时连接时要用 `--serial` 指定，脚本应拒绝自动选择；
- 无线 ADB 暴露到公网有安全风险，不要把 ADB 端口开到公网；
- 发行版仓库版本可能落后于上游，升级以官方文档为准。

## 相关页面

- [[Ubuntu 安卓投屏控制]]
- [[工具集]]
