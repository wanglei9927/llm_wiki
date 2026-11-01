# aliyunpan 同步目录重构记录（2026-11-01）

> 应用户要求重构同步架构：云盘目录改名 + 从单目录切换到五标准目录备份模式。

## 变更需求（用户提出）

1. 云盘目录 `/同步盘` 名称不清晰 → 改名 `surface-go-ubuntu`
2. 废弃本地目录 `~/阿里云盘同步`
3. 五个 XDG 标准目录全部纳入同步：公共、视频、图片、文档、音乐

## 变更后架构

**模式：upload（本机 → 云盘备份），策略 increment（增量，删除不传播）。**

| 本地目录 | 云盘目录 |
|----------|----------|
| /home/wanglei/公共 | /surface-go-ubuntu/公共 |
| /home/wanglei/视频 | /surface-go-ubuntu/视频 |
| /home/wanglei/图片 | /surface-go-ubuntu/图片 |
| /home/wanglei/文档 | /surface-go-ubuntu/文档 |
| /home/wanglei/音乐 | /surface-go-ubuntu/音乐 |

模式选择依据：云盘为空、内容源头在本机 → upload 备份是唯一安全合理方向（download 无内容可下；increment 保证本机删除不传播到云端副本）。

## 关键操作

```bash
# 云盘：新建目录树（mkdir 自动创建父级）
aliyunpan mkdir /surface-go-ubuntu/公共 /视频 /图片 /文档 /音乐 逐个执行
# 旧目录 /同步盘 删除（内容仅测试文件，进回收站可恢复）
aliyunpan rm /同步盘
# mv 重命名根目录报"指定目标文件夹不存在"——放弃 mv，直接建新删旧

# 本地：删除 ~/阿里云盘同步（仅测试文件）

# 多任务配置（/etc/aliyunpan/sync_drive/sync_drive_config.json，5 任务 upload/increment）
# systemd 服务 ExecStart 改为：/usr/local/bin/aliyunpan sync start（无参数，读配置文件）
```

## 重要发现（踩坑）

1. **apt 版 aliyunpan 的配置目录是 /etc/aliyunpan**（不是 README 暗示的 ~/.aliyunpan）！凭据 aliyunpan_config.json、命令历史、上传状态全在这里。`sync start`（无参）读 /etc/aliyunpan/sync_drive/sync_drive_config.json。
2. **多任务必须用配置文件**：sync start 命令行参数只支持单目录对；多任务用 sync_drive_config.json 的 syncTaskList 数组，服务启动用无参数 `sync start`。
3. **mv 重命名云盘根目录失败**（"指定目标文件夹不存在"）——用"建新 + 删旧"替代。
4. **删除 /etc/aliyunpan/sync_drive/sync_drive_config.json 后归 wanglei 所有**（chown），服务（wanglei 身份）可读写。

## 端到端验证（通过）

```
echo test > ~/公共/上传测试.txt → restart 服务触发扫描 → aliyunpan ls /surface-go-ubuntu/公共
→ 上传测试.txt 出现在云盘 ✓
5 任务加载日志确认：公共/视频/图片/文档/音乐目录备份 全部"备份本地文件（上传）"
```

## 提醒

- 首扫会上传五目录全部现有内容（视频/图片大目录耗时长），之后增量
- 手册与 skill 已同步更新（路径/目录对/配置位置）
