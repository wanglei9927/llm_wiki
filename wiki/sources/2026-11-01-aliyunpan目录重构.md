---
tags: [aliyunpan, 阿里云盘, 同步, 备份, 多任务]
created: 2026-11-01
updated: 2026-11-01
source_path: raw/notes/2026-11-01-aliyunpan目录重构.md
source_type: local_markdown
---

# 2026-11-01-aliyunpan目录重构

> 应用户要求重构 aliyunpan 同步架构：云盘目录改名 surface-go-ubuntu，五个 XDG 标准目录（公共/视频/图片/文档/音乐）全部纳入 upload 增量备份，切换到多任务配置文件模式。

## 基本信息

- **来源**：本机重构记录（原始副本：raw/notes/2026-11-01-aliyunpan目录重构.md）
- **日期**：2026-11-01
- **验证**：5 任务加载确认 + 端到端上传验证通过

## 核心观点

1. **配置目录真相**：apt 版 aliyunpan 的配置目录是 **/etc/aliyunpan**（凭据、命令历史、上传状态、同步配置全在此），README 未明示——`sync start`（无参）读 /etc/aliyunpan/sync_drive/sync_drive_config.json，放 ~/.aliyunpan 无效。
2. **多任务必须用配置文件**：`sync start` 命令行参数只支持单目录对；多任务（本例 5 个）用 syncTaskList 数组定义，服务 ExecStart 改为无参数 `sync start`。
3. **模式语义**：upload = 本机→云盘备份（本机删除不传播，increment 策略下）；download = 云盘→本机。云盘为空、内容源在本机时 upload 是唯一安全选择。
4. **云盘 mv 重命名根目录不可用**（报"指定目标文件夹不存在"），用"建新目录树 + 删旧目录"替代；`mkdir` 会自动创建父级路径。
5. **端到端验证通过**：~/公共 放测试文件 → restart 服务触发立即扫描 → 云盘 /surface-go-ubuntu/公共 出现该文件。

## 实操内容保留

### 多任务配置（/etc/aliyunpan/sync_drive/sync_drive_config.json 节选）

```json
{
 "configVer": "1.0",
 "syncTaskList": [
  {"name": "公共目录备份", "localFolderPath": "/home/wanglei/公共",
   "panFolderPath": "/surface-go-ubuntu/公共", "mode": "upload",
   "policy": "increment", "driveName": "backup"},
  {"name": "视频目录备份", "localFolderPath": "/home/wanglei/视频",
   "panFolderPath": "/surface-go-ubuntu/视频", "mode": "upload",
   "policy": "increment", "driveName": "backup"},
  {"name": "图片目录备份", "localFolderPath": "/home/wanglei/图片",
   "panFolderPath": "/surface-go-ubuntu/图片", "mode": "upload",
   "policy": "increment", "driveName": "backup"},
  {"name": "文档目录备份", "localFolderPath": "/home/wanglei/文档",
   "panFolderPath": "/surface-go-ubuntu/文档", "mode": "upload",
   "policy": "increment", "driveName": "backup"},
  {"name": "音乐目录备份", "localFolderPath": "/home/wanglei/音乐",
   "panFolderPath": "/surface-go-ubuntu/音乐", "mode": "upload",
   "policy": "increment", "driveName": "backup"}
 ]
}
```

### 服务与验证

```ini
# ~/.config/systemd/user/aliyunpan-sync.service
ExecStart=/usr/local/bin/aliyunpan sync start    # 无参数：读 /etc/aliyunpan/sync_drive/ 配置
```

```bash
systemctl --user daemon-reload && systemctl --user restart aliyunpan-sync
journalctl --user -u aliyunpan-sync --since "1 min ago" | grep 任务   # 确认 5 任务加载
echo test > ~/公共/上传测试.txt && systemctl --user restart aliyunpan-sync
aliyunpan ls /surface-go-ubuntu/公共                                  # 云盘出现测试文件 ✓
```

## 原文精彩摘录

> 网盘目录必须和本地目录独占使用，不要用作其他用途，不然备份可能会有问题。——docs/manual.md

> increment，增量备份文件，目标目录多余的文件不会被删除。只会把源目录修改的文件，新增的文件备份到目标目录。——docs/manual.md

## 与其他素材的关联

- 是 [[aliyunpan]] 实体页的架构演进记录（单目录 download → 五目录 upload 备份）。
- 与 [[2026-11-01-aliyunpan部署记录]] 构成完整部署-重构链路。

## 相关页面

- [[aliyunpan]]
- [[Linux系统配置]]
