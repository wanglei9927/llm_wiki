# aliyunpan 部署记录（2026-11-01）

> tickstep/aliyunpan CLI 部署、登录、同步服务配置与端到端验证的全过程记录。

## 来源

- 项目：https://github.com/tickstep/aliyunpan（v0.4.0，官方 apt 源 file.tickstep.com）
- 命令手册：docs/manual.md（793 行，已通读关键章节）
- 日期：2026-11-01

## 关键事实

### 安装（apt 一键）

```bash
sudo curl -fsSL http://file.tickstep.com/apt/pgp | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg > /dev/null && echo "deb [signed-by=/etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg arch=amd64,arm64] http://file.tickstep.com/apt aliyunpan main" | sudo tee /etc/apt/sources.list.d/tickstep-aliyunpan.list > /dev/null && sudo apt-get update && sudo apt-get install -y aliyunpan
```

- 安装位置：/usr/local/bin/aliyunpan，v0.4.0
- 凭据目录：~/.aliyunpan/

### 登录（OAuth，用户浏览器参与）

`aliyunpan login` 打印链接（5 分钟有效）→ 浏览器打开 → **一次授权 + 一次扫码** → CLI 自动收 token。登录成功：昵称"汪磊dae"，三方权益包未开通（下载限速是阿里官方限制，VIP 开通「三方应用权益包」才加速）。

### 同步架构（本机约定）

| 项 | 值 |
|----|-----|
| 本地目录 | ~/阿里云盘同步/ |
| 云盘目录 | /同步盘（备份盘） |
| 模式 | download（云→本地，增量，删除不传播） |
| 服务 | systemd user service：~/.config/systemd/user/aliyunpan-sync.service（enabled） |
| 启动参数 | sync start -ldir ~/阿里云盘同步 -pdir /同步盘 -mode download -drive backup -policy increment |

### 端到端验证（2026-11-01 实测通过）

```
aliyunpan upload /tmp/同步测试.txt /同步盘   → 3 秒上传成功
systemctl --user restart aliyunpan-sync      → 触发立即扫描
~/阿里云盘同步/同步测试.txt                    → 自动出现，内容正确
```

## 踩坑与经验

1. **管道模式 panic**：`echo "cmd" | aliyunpan` 触发 CmdLiner.Pause 空指针崩溃（v0.4.0 已知局限）——自动化一律用**直接子命令模式**（`aliyunpan who`、`aliyunpan sync start ...` 均可非交互执行，已实测）
2. **du 命令在子命令模式不存在**（"未找到命令: du"），交互模式里才有——子命令模式命令集是交互模式的子集
3. **restart 服务可触发立即扫描**：sync 默认周期性扫描（间隔较长），重启服务立即扫一轮，验证同步用这招
4. **sync start 是阻塞常驻进程**：官方建议 nohup，本机用 systemd user service 更规范（日志进 journal、开机自启、崩溃自动重启）
5. **云盘目录必须与本地目录独占**：不要把 /同步盘 用于其他用途，否则同步行为不可预期
6. **多任务**：需要多个目录对时用 ~/.aliyunpan/sync_drive/sync_drive_config.json（syncTaskList 数组：name/localFolderPath/panFolderPath/mode/policy/driveName）
7. **设备数限制**：阿里云盘单账号最多 10 台设备同时在线

## skill 与文档产出

- skill：~/.claude/skills/aliyunpan-sync/SKILL.md（status/login/download/upload/sync-manage/troubleshoot 六工作流）
- 使用手册：~/文档/aliyunpan使用手册.md
