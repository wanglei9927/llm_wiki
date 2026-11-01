---
tags: [zram, 内存, 内核, 压缩, 交换空间]
created: 2026-10-31
updated: 2026-10-31
sources: [2026-10-31-zram部署记录]
---

# zram

> Linux 内核的压缩内存块设备：在 RAM 里划一块区域，把换出的内存页压缩存放，充当比磁盘快几十倍的交换设备。本机已作为 Surface Go 3 内核优化项目的第一项落地。

## 简介

zram（compressed RAM block device）是内核标准模块（drivers/block/zram）：创建一块**虚拟块设备**，写入它的数据被实时压缩后存放在 RAM 中，读取时解压。最常见的用途就是做成交换设备（swap on zram）：当物理内存吃紧时，内核把不活跃页"换出"到 zram——实际是以压缩形式继续留在 RAM 里，只占原始体积的 1/2~1/3（lz4 实测压缩比 2~3:1）。

与磁盘 swap 对比：zram 的读写是内存级速度（微秒级）加少量 CPU 压缩开销，磁盘 swap 是毫秒级 I/O——相差几十到上百倍，且不磨损 SSD。代价是消耗 CPU 周期做压缩，因此算法选择要匹配 CPU 能力。zram 的局限：**不支持休眠**（hibernate 需要把内存写到非易失存储），断电即失，所以它与磁盘 swap 是互补而非替代关系。

## 算法选择

内核支持（本机 linux-surface 7.2.13）：lzo-rle（默认）、lzo、lz4、lz4hc、zstd、deflate、842。

| 算法 | 压缩比 | 速度 | 适合 |
|------|--------|------|------|
| **lz4** | 中 | **极快** | 低功耗/少核 CPU（本机选择） |
| zstd | 高 | 中等 | CPU 富余、追求内存效率 |
| lzo-rle | 中 | 快 | 内核默认值 |

本机选择 lz4：Pentium 6500Y 只有 2C2T 且是低功耗 U 系列，压缩开销必须最小化。

## 本机部署（2026-10-31）

- 工具：`systemd-zram-generator` 1.2.1（Ubuntu 官方源的标准实现，开机经 systemd generator 自动创建设备，无需 enable）
- 配置 `/etc/systemd/zram-generator.conf`：`zram-size = min(ram / 2, 4096)`（3.6G 虚拟设备）、`compression-algorithm = lz4`、`swap-priority = 100`
- 分级交换结构：zram（priority 100，快）优先承接换出页，磁盘 `/swap.img`（priority -1，4G）兜底收溢出——交换总量 4G → **7.6G**
- 验证：`zramctl`（看算法/压缩比）、`swapon --show`（看优先级）、`free -h`（看总量）

## 踩坑经验（运维要点）

1. **`cat /sys/class/zram-control/hot_add` 会真的创建一个设备**（用默认算法）——好奇读接口 = 改变系统状态
2. `hot_remove` 的参数是**数字设备号**（删 zram0 写 `echo 0`），写 "zram0" 字符串会 Invalid argument
3. 设备被占用（已 swapon 或被进程持有）时 `comp_algorithm` 不可写；**可靠重建顺序**：stop 服务 → hot_remove 删设备 → `modprobe -r zram && modprobe zram` 重载模块 → start 服务
4. systemd-zram-setup@zram0 是 oneshot 服务，`active (exited)` 即正常；`swapon --show` 输出可能延迟刷新
5. 查看实时压缩比：`zramctl` 的 COMPR/TOTAL/DATA 列；算法支持清单：`cat /sys/block/zram0/comp_algorithm`（方括号标记当前值）

## 不同素材中的观点

- 来自 [[2026-10-31-zram部署记录]]：部署参数（3.6G/lz4/priority 100）、与磁盘 swap 分级共存结构、四个踩坑点与可靠重建顺序、休眠限制说明；评估阶段确认 linux-surface 内核模块与七种算法支持齐全。

## 实用信息

- **安装**：`apt install systemd-zram-generator` + 写 `/etc/systemd/zram-generator.conf`（本机已配好，重启自动生效）
- **基本用法**：`zramctl` 查状态；`swapon --show` 查优先级；`systemctl restart systemd-zram-setup@zram0` 重新应用配置
- **适用场景**：小内存设备扩容（4~8GB RAM 的笔记本/平板）、无休眠需求的桌面、SSD 磨损敏感场景
- **注意事项**：zram 不支持休眠（需持久 swap 兜底）；压缩消耗 CPU——弱 CPU 选 lz4 而非 zstd；监控 `zramctl` 的 TOTAL 列，若接近虚拟设备大小说明该扩容或加磁盘 swap

## 相关页面

- [[2026-10-31-zram部署记录]]
- [[Linux系统配置]]
