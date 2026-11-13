---
tags: [Ubuntu, Android, scrcpy, ADB, systemd, 投屏, 教程]
created: 2026-11-13
updated: 2026-11-13
source_path: raw/articles/2026-11-13-ubuntu-android-control-v2.md
---

# Ubuntu 安卓投屏控制：单手机、本机、登录后自动连接（V2.0）

> 一份可直接照做的部署手册：Surface Go 3 上跑 Ubuntu，用 USB 连一台安卓手机，登录桌面后由 systemd user service 自动拉起 scrcpy，拔线重插也能自动恢复

## 基本信息

| 项目 | 内容 |
|---|---|
| 文档 | Ubuntu Android Control V2.0（本机单手机版） |
| 编写日期 | 2026-11-13 |
| 适用场景 | 每天开机使用；一台安卓手机；仅本机投屏 + 键鼠控制 |
| 推荐链路 | USB 数据线（不含无线 ADB / 局域网 / 公网 / 多手机） |
| 组件 | ADB + scrcpy + systemd user service + XDG 桌面自动启动 |
| 硬件示例 | Surface Go 3（x86_64），Ubuntu 22.04 / 24.04 |
| 原始素材 | raw/articles/2026-11-13-ubuntu-android-control-v2.md |

## 核心观点

1. **一条启动链，职责单一**：桌面登录 → XDG Autostart 导入会话环境 → systemd --user 启动 `scrcpy-watchdog.service` → watchdog 每 3 秒扫 `adb devices` → 恰好一台授权设备时启动 scrcpy；拔线或退出则退避重试。

2. **V2.0 相比旧版的关键修正**：删掉 udev 自动启动（避免与 watchdog 双启动）、不再写死 `DISPLAY=:1`（从真实会话导入 DISPLAY/Wayland/DBus）、只允许恰好一台授权设备（避免误控）、统一由 watchdog 处理等待/重连/退出。

3. **不默认做系统级「优化」**：保留 Ubuntu 锁屏、不永久禁止休眠、不全局关闭 USB autosuspend；只有确认掉线才做针对性例外。

4. **暂停入口明确**：关掉 scrcpy 窗口会被 watchdog 重新拉起，正确暂停方式是 `systemctl --user stop scrcpy-watchdog.service`。

5. **边界写清楚**：方案只在「登录桌面之后」生效；停留在登录界面不会弹窗；想无人登录自动弹窗需另开自动登录并承担物理安全风险。

## 实操内容保留

### 手动验证 scrcpy（先别装自动启动）

```bash
adb devices
scrcpy --max-size=1024 --max-fps=30 --video-bit-rate=3M \
       --video-codec=h264 --turn-screen-off --stay-awake
```

- 剪贴板同步当前版本默认开启，不要照搬旧手册的 `--clipboard=copy`
- 不需要声音加 `--no-audio`；H.264 起不来就先去掉 `--video-codec` 让 scrcpy 自选编码器

### 自动重连 watchdog（核心逻辑）

- 每 3 秒 `adb devices`，只接受状态为 `device` 的设备
- 0 台：继续等；恰好 1 台：启动 scrcpy；多台：拒绝自动选择
- scrcpy 退出后：本次运行 ≥60 秒则重置退避，否则指数退避（3s → 6s → … → 30s 封顶）

### systemd user service

```ini
[Unit]
Description=Android scrcpy USB watchdog
After=graphical-session.target
PartOf=graphical-session.target

[Service]
Type=simple
ExecStart=%h/bin/scrcpy-watchdog.sh
Restart=on-failure
RestartSec=5
KillMode=control-group
TimeoutStopSec=10

[Install]
WantedBy=graphical-session.target
```

### XDG 自启动导入会话环境

`~/.config/autostart/scrcpy-watchdog.desktop` 调用 `scrcpy-session-start.sh`，把 `DISPLAY / WAYLAND_DISPLAY / XAUTHORITY / DBUS_SESSION_BUS_ADDRESS / XDG_CURRENT_DESKTOP / XDG_SESSION_TYPE` 导入 `systemctl --user`，再 `systemctl --user start scrcpy-watchdog.service`。

### 验收清单（节选）

- `adb devices` 状态为 `device`；手动 scrcpy 画面/鼠标/键盘正常
- 手机息屏后仍可控制；关窗口后 watchdog 重新拉起；`stop` 后不再拉起
- 拔线持续等待、重插自动恢复；重启 Ubuntu 登录后自动启动
- 多台设备时不擅自选择；未授权时不误启动

### 故障排查要点

| 现象 | 排查 |
|---|---|
| 插线没窗口 | `adb devices -l` 确认状态为 `device` |
| `unauthorized` | 解锁手机，确认 RSA 授权 |
| 能投屏不能点击 | 部分厂商需开「USB 调试（安全设置）」 |
| 服务没起 | `systemctl --user status scrcpy-watchdog.service` |
| 登录后启动但无窗口 | 检查 DISPLAY / WAYLAND_DISPLAY，手动跑 session-start 看日志 |

### 性能参数

| 场景 | 参数 |
|---|---|
| 默认流畅 | 1024 / 30fps / 3M |
| 卡顿 | 800 / 25fps / 2M |
| 文字多需清晰 | 1280 / 30fps / 4M |

## 原文精彩摘录

> 一台手机、一根 USB 线、一个 watchdog 服务、一套 systemd 管理。（最终部署原则）

> 关掉 scrcpy 窗口会被 watchdog 视为退出并重新拉起；需要暂停时用 `systemctl --user stop`，不要只关窗口。

> 若需要开机无人登录也能显示窗口，那是另一种需求，通常需要自动登录并承担相应的物理安全风险。

## 关键概念

- [[scrcpy]]：本手册使用的投屏/控制工具实体页
- [[工具集]]：知识库工具总览

## 相关页面

- [[scrcpy]]
- [[工具集]]
