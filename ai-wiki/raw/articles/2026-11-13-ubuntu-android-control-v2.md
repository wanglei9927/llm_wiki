# Ubuntu Android Control V2.0（本机单手机版）

- 原文件：C:\Users\user\Desktop\Ubuntu-Android-Control-V2.0-本机单手机版.md
- 文档版本：V2.0，编写日期 2026-11-13
- 归档时间：2026-11-13
- 说明：Surface Go 3 + Ubuntu，一台安卓手机、USB 直连、登录后自动连接（ADB + scrcpy + systemd + XDG Autostart）

---

# Ubuntu Android Control V2.0
## Surface Go 3 + Ubuntu：单台安卓手机、本机控制、每日开机自动连接

- 文档版本：V2.0
- 编写日期：2026-11-13
- 适用场景：每天开机使用；一台安卓手机；仅在 Surface Go 3 本机投屏和键鼠控制
- 推荐链路：USB 数据线
- 组件：ADB + scrcpy + systemd user service + XDG 桌面自动启动
- 不包含：无线 ADB、局域网控制、公网访问、多手机管理、无人登录图形控制

---

## 0. 先看结论

本版本采用一条清晰的启动链：

```text
Ubuntu 登录进入桌面
        |
        v
XDG Autostart 启动 session-start.sh
        |
        +--> 将当前图形会话环境导入 systemd --user
        |
        v
systemd --user 启动 scrcpy-watchdog.service
        |
        v
watchdog 每 3 秒扫描 adb devices
        |
        +--> 没有授权设备：继续等待
        |
        +--> 发现一台授权设备：启动 scrcpy
        |                         |
        |                         +--> 正常运行
        |                         |
        |                         +--> 拔线/异常退出：退避后重新扫描
        |
        +--> 发现多台授权设备：不擅自选择，等待人工处理
```

**与旧版相比的关键变化：**

1. 删除 udev 自动启动规则，避免 udev 和 watchdog 两套机制重复启动。
2. 不再使用 `DISPLAY=:1` 这种固定值；从真实桌面会话导入 DISPLAY、Wayland 和 DBus 环境。
3. 只允许恰好一台已授权设备时启动，避免误控其他设备。
4. 由 watchdog 统一处理等待设备、断线重连和 scrcpy 意外退出。
5. 不关闭 Ubuntu 锁屏，不永久关闭 USB autosuspend，不强制关闭休眠。
6. 用 `systemctl --user stop` 作为暂停入口；否则用户主动关闭 scrcpy 窗口也会被 watchdog 视为退出并重新拉起。

> **运行边界：** 本方案会在用户登录 Ubuntu 桌面后启动。若开机停留在登录界面、用户尚未登录，图形界面 scrcpy 不会启动。若需要开机无人登录也能显示窗口，那是另一种需求，通常需要自动登录并承担相应的物理安全风险。

---

## 1. 部署前检查

### 1.1 确认 Ubuntu 版本和 CPU 架构

```bash
lsb_release -a
uname -m
echo "$XDG_SESSION_TYPE"
echo "$DISPLAY"
echo "$WAYLAND_DISPLAY"
```

Surface Go 3 常见为 `x86_64`，但以 `uname -m` 实际输出为准。

建议 Ubuntu 22.04 或 24.04。先完成系统更新：

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.2 安装 ADB、scrcpy 和辅助工具

```bash
sudo apt install -y adb scrcpy android-sdk-platform-tools-common usbutils
```

检查版本：

```bash
adb version
scrcpy --version
scrcpy --help | head -n 30
```

如果 `apt` 仓库提供的 scrcpy 版本较旧，但当前手机控制正常，可以先使用发行版版本，优先保证系统包依赖一致。若确实需要新版功能，再按照 scrcpy 官方 Linux 安装说明升级；不要从不明网站下载二进制包。

官方安装说明：
- https://github.com/Genymobile/scrcpy
- https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md

官方项目仓库是 scrcpy 的可信下载来源。官方 Linux 文档也提醒，发行版仓库版本可能落后于上游发布版本。

### 1.3 检查 ADB USB 权限

```bash
adb devices
```

第一次连接时，手机应弹出 RSA 调试授权窗口。选择“始终允许这台计算机进行调试”，然后确认：

```text
List of devices attached
设备序列号    device
```

如果出现 `unauthorized`：
1. 解锁手机屏幕；
2. 在手机上确认 USB 调试授权；
3. 重新执行 `adb devices`。

如果列表为空：
- 确认数据线支持数据传输，不是纯充电线；
- 更换 USB 口或数据线；
- 执行 `lsusb` 确认 USB 层能看到手机；
- 检查手机 USB 模式和开发者选项。

### 1.4 安卓手机端设置

在手机上：

1. 设置 → 关于手机 → 连续点击版本号，开启开发者选项。
2. 开启“USB 调试”。
3. 首次连接电脑时，确认 RSA 授权并勾选“始终允许”。
4. 小米等部分厂商机型如果能投屏但无法点击，再检查是否需要额外开启“USB 调试（安全设置）”。该选项不是所有品牌都需要，也不应在没有问题时盲目开启。

---

## 2. 先手动验证 scrcpy

先不要安装自动启动。插入手机，确认：

```bash
adb devices
```

然后运行基础命令：

```bash
scrcpy \
  --max-size=1024 \
  --max-fps=30 \
  --video-bit-rate=3M \
  --video-codec=h264 \
  --turn-screen-off \
  --stay-awake
```

说明：

| 参数 | 作用 |
|---|---|
| `--max-size=1024` | 限制画面宽和高的最大值，保持宽高比 |
| `--max-fps=30` | 限制最高帧率为 30 |
| `--video-bit-rate=3M` | 设置视频码率为 3 Mbps |
| `--video-codec=h264` | 优先使用兼容性较好的 H.264 |
| `--turn-screen-off` | 启动投屏后关闭手机物理屏幕 |
| `--stay-awake` | scrcpy 运行期间请求设备保持唤醒 |

剪贴板同步在 scrcpy 当前版本中默认启用，不要照搬旧手册中的 `--clipboard=copy` 参数。若不需要音频，可以在命令末尾加 `--no-audio`。

**先验证以下项目：**
- 画面正常；
- 鼠标点击和键盘输入正常；
- 手机息屏后仍能控制；
- 关闭 scrcpy 后手机屏幕能正常恢复；
- 重新插拔 USB 后能再次手动启动。

如果 H.264 无法启动，可先去掉 `--video-codec=h264` 让 scrcpy 自动选择编码器；不要一开始就强制 H.265。

---

## 3. 安装自动重连脚本

### 3.1 创建用户脚本目录

```bash
mkdir -p "$HOME/bin"
chmod 700 "$HOME/bin"
```

### 3.2 创建 watchdog 脚本

执行：

```bash
cat > "$HOME/bin/scrcpy-watchdog.sh" <<'EOF'
#!/usr/bin/env bash

set -u

export PATH="/usr/local/bin:/usr/bin:/bin"

# 可按设备性能调整
MAX_SIZE=1024
MAX_FPS=30
VIDEO_BIT_RATE="3M"
VIDEO_CODEC="h264"

# 设备扫描间隔与失败退避
SCAN_INTERVAL=3
RETRY_INITIAL=3
RETRY_MAX=30

log() {
    printf '%s [scrcpy-watchdog] %s\n' "$(date '+%F %T')" "$*"
}

get_ready_devices() {
    adb devices 2>/dev/null |
        awk 'NR > 1 && $2 == "device" { print $1 }'
}

log "watchdog started"

# 启动 ADB server。失败时后续循环仍会继续尝试。
adb start-server >/dev/null 2>&1 || true

retry_delay="$RETRY_INITIAL"

while true; do
    if ! command -v adb >/dev/null 2>&1; then
        log "ERROR: adb command not found; retry in ${RETRY_MAX}s"
        sleep "$RETRY_MAX"
        continue
    fi

    if ! command -v scrcpy >/dev/null 2>&1; then
        log "ERROR: scrcpy command not found; retry in ${RETRY_MAX}s"
        sleep "$RETRY_MAX"
        continue
    fi

    adb start-server >/dev/null 2>&1 || true

    mapfile -t devices < <(get_ready_devices)
    device_count="${#devices[@]}"

    if [ "$device_count" -eq 0 ]; then
        sleep "$SCAN_INTERVAL"
        continue
    fi

    if [ "$device_count" -gt 1 ]; then
        log "WARNING: found ${device_count} authorized devices; refusing to choose automatically"
        sleep "$SCAN_INTERVAL"
        continue
    fi

    serial="${devices[0]}"
    log "device ready: ${serial}; starting scrcpy"

    session_start="$(date +%s)"

    scrcpy \
        --serial="$serial" \
        --max-size="$MAX_SIZE" \
        --max-fps="$MAX_FPS" \
        --video-bit-rate="$VIDEO_BIT_RATE" \
        --video-codec="$VIDEO_CODEC" \
        --turn-screen-off \
        --stay-awake

    scrcpy_rc=$?
    session_end="$(date +%s)"
    session_duration=$((session_end - session_start))

    log "scrcpy exited: rc=${scrcpy_rc}, duration=${session_duration}s"

    # 稳定运行过一段时间，说明上次退避可以重置。
    if [ "$session_duration" -ge 60 ]; then
        retry_delay="$RETRY_INITIAL"
    else
        retry_delay=$((retry_delay * 2))
        if [ "$retry_delay" -gt "$RETRY_MAX" ]; then
            retry_delay="$RETRY_MAX"
        fi
    fi

    log "retry scan in ${retry_delay}s"
    sleep "$retry_delay"
done
EOF

chmod 700 "$HOME/bin/scrcpy-watchdog.sh"
```

脚本行为：
- 没有手机：每 3 秒扫描一次；
- 恰好一台已授权手机：启动 scrcpy；
- 多台已授权设备：不自动选择，避免误控；
- scrcpy 退出：重新扫描；
- 短时间内连续失败：重试间隔逐渐增加，最长 30 秒；
- 稳定运行超过 60 秒：重试间隔重置。

> 如果主动关闭 scrcpy 窗口，watchdog 会重新启动它。需要暂停自动控制时，使用后文的 `systemctl --user stop`，不要只关闭窗口。

---

## 4. 创建 systemd user service

创建目录：

```bash
mkdir -p "$HOME/.config/systemd/user"
```

创建服务：

```bash
cat > "$HOME/.config/systemd/user/scrcpy-watchdog.service" <<'EOF'
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

# 由 watchdog 自己负责设备等待和 scrcpy 重试；
# systemd 负责 watchdog 进程异常退出后的恢复。

[Install]
WantedBy=graphical-session.target
EOF
```

这里不写死 `DISPLAY=:0` 或 `DISPLAY=:1`。服务必须使用当前桌面会话提供的图形环境。

---

## 5. 创建桌面登录自动启动入口

为了确保 systemd user manager 获得当前图形会话环境，增加一个轻量级 XDG Autostart 启动器。

### 5.1 创建会话启动脚本

```bash
cat > "$HOME/bin/scrcpy-session-start.sh" <<'EOF'
#!/usr/bin/env bash

set -u

# 将当前图形会话环境导入 systemd --user。
vars=()
for name in DISPLAY WAYLAND_DISPLAY XAUTHORITY DBUS_SESSION_BUS_ADDRESS XDG_CURRENT_DESKTOP XDG_SESSION_TYPE; do
    if printenv "$name" >/dev/null 2>&1; then
        vars+=("$name")
    fi
done

if [ "${#vars[@]}" -gt 0 ]; then
    systemctl --user import-environment "${vars[@]}"
fi

systemctl --user daemon-reload
systemctl --user start scrcpy-watchdog.service
EOF

chmod 700 "$HOME/bin/scrcpy-session-start.sh"
```

### 5.2 创建 XDG Autostart 文件

```bash
mkdir -p "$HOME/.config/autostart"

cat > "$HOME/.config/autostart/scrcpy-watchdog.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Scrcpy Android Watchdog
Comment=Start local Android USB control after desktop login
Exec=$HOME/bin/scrcpy-session-start.sh
Terminal=false
X-GNOME-Autostart-enabled=true
EOF
```

这样每次进入 Ubuntu 桌面会话，自动启动器都会导入当前会话环境并启动 systemd 服务。

### 5.3 加载并启动

```bash
systemctl --user daemon-reload
systemctl --user start scrcpy-watchdog.service
```

检查状态：

```bash
systemctl --user status scrcpy-watchdog.service
```

查看日志：

```bash
journalctl --user -u scrcpy-watchdog.service -f
```

如果当前终端启动成功、但重启登录后没有弹窗，先检查：

```bash
echo "$DISPLAY"
echo "$WAYLAND_DISPLAY"
systemctl --user show-environment | grep -E 'DISPLAY|WAYLAND_DISPLAY|DBUS_SESSION_BUS_ADDRESS'
```

然后确认 `~/.config/autostart/scrcpy-watchdog.desktop` 存在且可读。

---

## 6. 日常使用

### 6.1 正常使用

1. 打开 Surface Go 3。
2. 登录 Ubuntu 桌面。
3. 插入安卓手机 USB 数据线。
4. 手机已授权时，通常数秒内自动弹出 scrcpy 窗口。
5. 拔线后 scrcpy 退出，watchdog 等待设备重新连接。

### 6.2 暂停自动启动

```bash
systemctl --user stop scrcpy-watchdog.service
```

停止后 watchdog 不会重新拉起 scrcpy。

### 6.3 恢复自动启动

```bash
systemctl --user start scrcpy-watchdog.service
```

### 6.4 临时关闭登录自动启动

```bash
mv "$HOME/.config/autostart/scrcpy-watchdog.desktop" \
   "$HOME/.config/autostart/scrcpy-watchdog.desktop.disabled"
```

恢复：

```bash
mv "$HOME/.config/autostart/scrcpy-watchdog.desktop.disabled" \
   "$HOME/.config/autostart/scrcpy-watchdog.desktop"
```

### 6.5 手动查看手机连接状态

```bash
adb devices -l
```

---

## 7. 开机自动连接的必要条件

本方案的“开机自动连接”具体指：**Ubuntu 开机并完成用户桌面登录后，自动启动 watchdog；手机插着 USB 或之后插入时，自动启动 scrcpy。**

| 场景 | 是否自动启动 scrcpy |
|---|---|
| 开机后自动登录桌面，手机已插线 | 是 |
| 开机后手动登录桌面，手机已插线 | 是 |
| 已进入桌面，之后插入手机 | 是 |
| 已进入桌面，拔线后重新插入 | 是 |
| 停留在 Ubuntu 登录界面，未登录 | 否 |
| 用户注销桌面会话 | 服务随图形会话结束 |
| 电脑关机或休眠 | 否 |

如果希望“开机后无需输入密码也自动弹出手机画面”，需要额外启用 Ubuntu 自动登录。**不建议在多人可接触设备或存有敏感数据的场景启用自动登录。**

---

## 8. 不建议默认执行的系统级优化

旧版手册建议关闭合盖休眠、关闭屏幕锁定、关闭所有 USB autosuspend。本版本不把这些作为默认部署步骤。

### 8.1 屏幕锁定

保留 Ubuntu 锁屏。scrcpy 不要求关闭 Ubuntu 锁屏。

### 8.2 合盖与休眠

每天使用的场景，不需要永久禁止休眠。合盖、睡眠后服务可能暂停或图形会话结束；恢复桌面后重新插拔 USB 或手动重启服务即可。

如果明确要求合盖持续控制，必须先确认 Surface Go 3 的散热、电源和桌面会话行为，再单独调整电源策略。

### 8.3 USB autosuspend

先保持 Ubuntu 默认 USB 电源管理。只有在确认 USB 会因自动挂起而反复掉线后，才针对手机对应的 USB 设备设置例外，不要一开始就全局关闭。

---

## 9. 故障排查

| 现象 | 排查 | 处理 |
|---|---|---|
| 插线没有窗口 | `adb devices -l` | 先确认 ADB 能看到设备且状态为 `device` |
| 状态为 `unauthorized` | 查看手机屏幕 | 解锁并确认 RSA 授权 |
| 能投屏但不能点击 | 检查厂商开发者选项 | 部分设备需开启 USB 调试（安全设置） |
| watchdog 没启动 | `systemctl --user status scrcpy-watchdog.service` | 检查服务文件、脚本权限和日志 |
| 窗口启动后立即关闭 | `journalctl --user -u scrcpy-watchdog.service -n 100` | 检查 scrcpy 参数、设备状态和版本兼容性 |
| 关闭窗口后又弹出 | 这是 watchdog 设计行为 | 用 `systemctl --user stop scrcpy-watchdog.service` 暂停 |
| 提示发现多台设备 | `adb devices -l` | 拔掉其他 Android/模拟器设备，保持只连接目标手机 |
| 登录后服务启动但无窗口 | 检查 DISPLAY / WAYLAND_DISPLAY | 从当前桌面终端运行 session-start 脚本并查看日志 |
| 画面卡顿 | 降低分辨率和帧率 | 改成 `MAX_SIZE=800`、`MAX_FPS=25` |
| 手机屏幕没有息屏 | 手动运行 scrcpy 参数测试 | 确认设备 ROM 对息屏控制的支持情况 |

常用日志：

```bash
journalctl --user -u scrcpy-watchdog.service -b
```

实时日志：

```bash
journalctl --user -u scrcpy-watchdog.service -f
```

---

## 10. 验收测试清单

部署完成后，按顺序验证：

- [ ] `adb devices` 能识别手机，状态为 `device`
- [ ] 手动运行 scrcpy，画面正常
- [ ] 鼠标点击、键盘输入正常
- [ ] 手机息屏后仍可控制
- [ ] `systemctl --user start scrcpy-watchdog.service` 能启动窗口
- [ ] scrcpy 窗口关闭后，watchdog 会重新拉起
- [ ] `systemctl --user stop scrcpy-watchdog.service` 后不会重新拉起
- [ ] 拔掉 USB 后 watchdog 持续等待
- [ ] 重新插线后自动恢复
- [ ] 重启 Ubuntu 并登录桌面后，自动启动正常
- [ ] 手机未授权时，不会误启动控制
- [ ] 同时出现多台设备时，watchdog 不会擅自选择

只有完成以上测试，才算本机部署验收通过。

---

## 11. 卸载与回滚

停止服务：

```bash
systemctl --user stop scrcpy-watchdog.service 2>/dev/null || true
systemctl --user disable scrcpy-watchdog.service 2>/dev/null || true
```

删除自动启动和服务文件：

```bash
rm -f "$HOME/.config/autostart/scrcpy-watchdog.desktop"
rm -f "$HOME/.config/systemd/user/scrcpy-watchdog.service"
rm -f "$HOME/bin/scrcpy-watchdog.sh"
rm -f "$HOME/bin/scrcpy-session-start.sh"

systemctl --user daemon-reload
systemctl --user reset-failed
```

如需卸载软件：

```bash
sudo apt remove scrcpy adb android-sdk-platform-tools-common
```

注意：如果这些软件原本还被其他 Android 开发工具使用，不要直接卸载。

本手册没有修改 logind、GNOME 锁屏、全局 USB autosuspend 或 ADB 私钥，因此不需要为这些项目做系统级回滚。

---

## 12. 性能参数调整建议

| 设备表现 | 建议参数 |
|---|---|
| 默认流畅 | 1024 / 30fps / 3M |
| 画面卡顿 | 800 / 25fps / 2M |
| 文字较多、需要清晰画面 | 1280 / 30fps / 4M |
| 不需要手机声音 | 增加 `--no-audio` |
| H.264 兼容性异常 | 去掉 `--video-codec=h264`，使用默认编码选择 |

不要只根据 Surface Go 3 的型号推断硬件解码能力；实际表现还受 CPU 型号、Ubuntu 图形栈、驱动、手机编码器和 USB 链路影响。

---

## 13. 安全建议

1. 只使用可信 USB 数据线和自己的手机。
2. 不要把 ADB TCP 端口暴露到公网。
3. 不要把 `~/.android/adbkey` 私钥上传到公开网盘或代码仓库。
4. 不需要时可在手机开发者选项中关闭 USB 调试。
5. 保留 Ubuntu 用户密码和屏幕锁定。
6. 不要以 root 身份运行 scrcpy 或 watchdog。
7. 手机弹出新的 ADB 授权请求时，先确认是自己的电脑再允许。

---

## 14. 参考资料

以下为上游项目文档，参数变化时以当前版本的 `scrcpy --help` 和官方文档为准：

- scrcpy 官方仓库：https://github.com/Genymobile/scrcpy
- Linux 安装说明：https://github.com/Genymobile/scrcpy/blob/master/doc/linux.md
- 视频参数：https://github.com/Genymobile/scrcpy/blob/master/doc/video.md
- 设备息屏与保持唤醒：https://github.com/Genymobile/scrcpy/blob/master/doc/device.md
- systemd 图形会话 target：https://www.freedesktop.org/software/systemd/man/latest/systemd.special.html

---

## 最终部署原则

**一台手机、一根 USB 线、一个 watchdog 服务、一套 systemd 管理。**

本版本的目标是每天开机登录后稳定自动连接，不追求无人登录、远程访问或多设备编排。先通过第 10 节全部验收，再考虑后续扩展。
