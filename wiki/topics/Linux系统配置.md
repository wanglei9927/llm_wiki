---
tags: [Linux, Ubuntu, Surface, 系统配置, 运维]
created: 2026-10-31
updated: 2026-11-14
sources: [2026-10-31-yazi快捷键速查, 2026-10-31-ibus-libpinyin用户词典, 2026-10-31-vim-init安装配置记录, 2026-10-31-iphone-linux互传方案, 2026-10-31-zram部署记录, 2026-11-01-aliyunpan部署记录, 2026-11-14-zlib安装与使用, 2026-11-14-zlib技能创建]
---

# Linux系统配置

> 本机（Surface Go 3 + Ubuntu 26.04.1 LTS）系统配置与工具链的知识体系：硬件基座、终端环境、效率工具、中文输入、权限管理与 AI 协作的全景记录。

## 核心观点

1. **硬件基座是低功耗 2 核设备**：Surface Go 3（Pentium Gold 6500Y，2C2T），操作系统 Ubuntu 26.04.1 LTS，内核为 linux-surface（针对 Surface 触屏/触控笔/传感器优化的内核分支，已含 Surface 补丁集）——一切配置决策都应围绕"低性能设备的资源纪律"展开。（来源：知识库建档记录）
2. **文件管理以 yazi 为中枢**：v26.9.1 官方 deb 安装，附带 9 个预览/搜索增强依赖（ffmpeg、7zip、poppler-utils、fd-find、ripgrep、fzf、zoxide、imagemagick、xsel）一次装齐；`y` 包装函数实现"退出即跟随目录"的工作流闭环。（来源：[[yazi]]、[[2026-10-31-yazi快捷键速查]]）
3. **终端字体是图标可用性的前提**：yazi 图标依赖 Nerd Font 私有区字符；Ubuntu apt 源无 Nerd Font 包，需从 GitHub Releases 安装。实测经验：终端用标准 "Nerd Font" 变体（图标双宽饱满）而非 Mono 变体（图标压扁），JetBrainsMono 同字号偏大、10 号最平衡——最终方案 Ptyxis + "JetBrainsMono Nerd Font" 10。（来源：[[yazi]]）
4. **中文输入靠用户词典定制术语优先级**：ibus-libpinyin 1.16.5，296 条用户词典覆盖数据库/运维/开发高频术语，统一频率 100 压过系统词库；导入走 GUI（gsettings 键 + 引擎监听执行），导入后 `ibus restart` 生效。（来源：[[ibus-libpinyin]]、[[2026-10-31-ibus-libpinyin用户词典]]）
5. **低性能设备全链路资源纪律**：yazi 压缩 `[tasks]` 段全部 worker 并发（file_workers=2、preload_workers=1 等）、预览质量 60、图片内存上限 256MB；软件安装优先官方 deb/预编译包，避免 cargo 源码编译。（来源：[[yazi]]）
6. **权限管理采用受控免密**：`/etc/sudoers.d/wanglei-nopasswd` 配置 wanglei 全部 sudo 免密，使 AI Agent（CodeArts）能直接执行 apt/systemctl 等 root 操作；破坏性操作（删文件、改系统配置、重启）仍需先说明征得同意。（来源：知识库建档记录）
7. **知识管理即配置管理**：本知识库由 CodeArts 按 llm-wiki skill 工作流维护（不装 Claude Code/uv/Node.js），配置事实"消化"为互相链接的 wiki 页面，替代零散的聊天记录式记忆。（来源：知识库建档记录）
8. **编辑器选型：vim-init 框架 + 43 插件分组管理**：Vim 9.1 配置采用韦易笑的轻量框架（7 模块全中文注释、`g:bundle_group` 分组开关、filetype 插件懒加载、ALE 异步检查降优先级），装齐 43 个插件到 `~/.vim/bundles/`；无人值守装插件必须用 `script -qec` 伪终端包裹 `PlugInstall --sync`（普通 ex 模式会中断）。（来源：[[vim-init]]、[[2026-10-31-vim-init安装配置记录]]）
9. **移动设备互联：LocalSend 为主、USB 为辅**：与 iPhone 互传采用 LocalSend v1.18.2（开源 AirDrop 替代，局域网直传不经云端、HTTPS 加密），USB 线 + gvfs/libimobiledevice（系统默认已装）作照片批量导入通道；KDE Connect iOS 端因锁屏卡传输、预处理慢等问题不采用。（来源：[[LocalSend]]、[[2026-10-31-iphone-linux互传方案]]）
10. **内存分级交换：zram（lz4）优先 + 磁盘兜底**：8GB 内存设备部署 zram 3.6G（lz4 算法，priority 100）优先承接换出页，磁盘 /swap.img 4G（priority -1）兜底，交换总量 4G → 7.6G；换出速度提升几十倍且不磨损 SSD；zram 不支持休眠（需持久 swap，现有 4G 磁盘 swap 本就不足以休眠 7.2G 内存）。（来源：[[zram]]、[[2026-10-31-zram部署记录]]）
11. **云存储备份：aliyunpan CLI + systemd 常驻服务（五目录 upload）**：阿里云盘官方无 Linux 客户端，采用开源 CLI（v0.4.0，apt 源）配 systemd user service，将本机五个 XDG 目录（公共/视频/图片/文档/音乐）增量备份到云盘 `/surface-go-ubuntu/`（increment，本机删除不传播）；apt 版配置目录在 **/etc/aliyunpan**；自动化必须用直接子命令模式（管道模式会 panic）。（来源：[[aliyunpan]]、[[2026-11-01-aliyunpan部署记录]]、[[2026-11-01-aliyunpan目录重构]]）

12. **电子书获取：zlib CLI（CLI+TUI+MCP 三形态）**：Z-Library 开源命令行工具（Go 单二进制 v0.0.14，install.sh 经代理安装），doctor 探测可达镜像解决域名漂移痛点，支持推送 Kindle 与微信读书，MCP server 可接入 AI Agent（read-only 收窄权限）。（来源：[[zlib]]、[[2026-11-14-zlib安装与使用]]）

## 素材汇总表

| 素材 | 类型 | 核心内容 | 摘要页 |
|------|------|----------|--------|
| yazi快捷键速查（2026-10-31） | 本地 Markdown | yazi v26.9.1 官方键位的 17 类中文速查，组合键前缀机制 | [[2026-10-31-yazi快捷键速查]] |
| ibus-libpinyin用户词典（2026-10-31） | 本地文本 | 296 条 `短语\tpinyin\t频率` 词条，数据库/运维术语，频率 100 | [[2026-10-31-ibus-libpinyin用户词典]] |
| vim-init安装配置记录（2026-10-31） | 安装事实记录 | skywind3000/vim-init 安装三步、7 模块结构、10 分组 43 插件、伪终端非交互安装 | [[2026-10-31-vim-init安装配置记录]] |
| iphone-linux互传方案（2026-10-31） | 调研+部署记录 | 五方案对比（LocalSend/USB/Samba/PairDrop/KDE Connect），LocalSend v1.18.2 落地 | [[2026-10-31-iphone-linux互传方案]] |
| zram部署记录（2026-10-31） | 内核优化部署 | zram 3.6G/lz4/priority 100 落地，交换 4G→7.6G，四个踩坑点 | [[2026-10-31-zram部署记录]] |
| aliyunpan部署记录（2026-11-01） | 部署+验证记录 | apt 源 v0.4.0、OAuth 登录、systemd 同步服务落地、管道 panic 踩坑 | [[2026-11-01-aliyunpan部署记录]] |
| aliyunpan目录重构（2026-11-01） | 架构变更记录 | 云盘目录改名 surface-go-ubuntu，五 XDG 目录 upload 备份，配置目录 /etc/aliyunpan 发现 | [[2026-11-01-aliyunpan目录重构]] |
| zlib安装与使用（2026-11-14） | 安装+使用指南 | Z-Library CLI v0.0.14 安装、doctor→login→tui 三步、命令速查、MCP 接入 | [[2026-11-14-zlib安装与使用]] |
| zlib技能创建（2026-11-14） | 配套产出记录 | zlib skill 六工作流建成、四条铁律、技能清单刷新 SKILLS_DOC 踩坑 | [[2026-11-14-zlib技能创建]] |

## 知识体系

### 硬件与内核
Surface Go 3 是 2 核低功耗平板 PC，决定了"轻量优先"的选型基调。linux-surface 内核替代主线内核提供触屏/触控笔/加速度计等 Surface 硬件支持；涉及电源管理、传感器优化的操作应基于该内核进行。内存分级交换已落地：zram（lz4，3.6G，priority 100）优先 + 磁盘 /swap.img（4G，priority -1）兜底，systemd-zram-generator 开机自动创建。

### 桌面环境与终端
GNOME（Ubuntu 26.04.1 默认）+ Ptyxis 终端。Ptyxis 的配置是扁平 dconf schema（`use-system-font`、`font-name` 键），改字体一条 gsettings 命令即生效且实时渲染；字体体系为 JetBrainsMono Nerd Font 10（用户级安装于 `~/.local/share/fonts/JetBrainsMonoNF/`）。

### 效率工具链
以 yazi 为文件管理中枢、vim-init 为编辑器配置（43 插件：LeaderF 文件/函数搜索、ALE 异步检查、gutentags 标签体系），外围 fd（文件名搜索）、ripgrep（内容搜索）、fzf（模糊跳转）、zoxide（目录记忆）四大搜索件全部装齐；键位体系 vim 风格，详细速查见素材摘要页。

### 移动设备互联
与 iPhone 的传输双通道：LocalSend（局域网无线互传主力，不经云端）+ USB 线 gvfs 挂载（照片批量导入，libimobiledevice 全套系统默认已装）；Samba 共享（iOS 文件 App 原生 SMB）列为备选未启用；ufw 未启用故无需放行端口。

### 云存储与备份
阿里云盘经开源 CLI（aliyunpan v0.4.0）接入：systemd user service 常驻，本机五个 XDG 目录（公共/视频/图片/文档/音乐）→ 云盘 `/surface-go-ubuntu/` 增量备份（upload/increment，删除不传播）；配置目录 /etc/aliyunpan；临时下载/上传单命令随时可用；配套 skill（~/.claude/skills/aliyunpan-sync/）与使用手册（~/文档/aliyunpan使用手册.md）。iCloud 照片自动备份（icloudpd）为待评估备选。

### 电子书资源
Z-Library 经开源 CLI（zlib v0.0.14）接入：单二进制覆盖 CLI/TUI/MCP 三形态；首次使用 doctor→login→tui 三步（需 Z-Library 账号）；doctor 镜像探测 + mirrors 自定义域名 + 代理配置三层网络兜底；下载的书可推 Kindle（SMTP）或导入微信读书（扫码）；已登录（Standard，日配额 10）并端到端验证搜索；配套 skill（~/.claude/skills/zlib/，六工作流：status/search/download/kindle/weread/browse，四条铁律：下载先征同意/先查配额/完整 id:hash/密码不进对话）让 CodeArts 按规范代搜代下。

### 中文输入
ibus-libpinyin 智能拼音 + 296 条用户词典（数据库、备份恢复、API 等术语，频率 100）；词典源文件 `~/文档/user_dictionary.txt` 需自行备份（引擎无导出功能）。

### 权限与自动化
sudoers.d 全部免密 + AI Agent（CodeArts）直接执行 root 操作的模式，把"安装软件、改系统配置"从人工输入密码流程变成 Agent 自治流程，同时保留破坏性操作的人工确认。

### 知识管理
本知识库（`~/文档/linux-wiki`）按 llm-wiki 方法论维护：素材进 raw/、知识编译为 entities/topics/sources 页面、互相以 `[[双向链接]]` 关联、变更记录于 log.md。

## 综合分析

### 不同素材的交叉视角
三份素材从"键盘输入"（输入法词典）、"文件操作"（yazi 键位）、"代码编辑"（vim-init）三个端口切入同一主题——**输入与编辑效率**：词典解决"术语打得出且优先"，yazi 解决"文件管得快且准"，vim-init 解决"代码改得顺"。三者键位哲学统一（vim 风格组合键），且共同印证了低性能设备上的选型倾向：轻量、本地化、键盘驱动、懒加载/限流（vim-init 的 filetype 懒加载与 ALE nice 降优先级，正是 yazi 限 worker 同一思路）。

### 趋势与判断
系统配置正从"零散的 dotfiles + 聊天记录"向"结构化知识库"迁移：配置事实被编译为互相链接的 wiki 页后，重装/迁移系统时可按页面逐项还原，AI Agent 也能直接消费这些页面作为上下文（agentic 运维的雏形）。终端工具链已初具形态（文件管理 + 编辑器 + 搜索件 + 输入法定制），后续素材方向：内核调优、备份策略、网络配置。

### 未解决的问题
- ibus-libpinyin 词典的带声调拼音格式（如 `shu4ju3ku4`）是否被引擎接受，未实测；
- GitHub CLI（gh 2.46.0）已装但未执行 `gh auth login` 授权，远程仓库操作暂不可用；
- linux-surface 内核的电源管理/续航调优尚未系统化整理进本知识库。

## 相关页面

- [[yazi]]
- [[vim-init]]
- [[LocalSend]]
- [[zram]]
- [[aliyunpan]]
- [[zlib]]
- [[ibus-libpinyin]]
- [[2026-11-14-zlib安装与使用]]
- [[2026-11-14-zlib技能创建]]
- [[2026-10-31-yazi快捷键速查]]
- [[2026-10-31-ibus-libpinyin用户词典]]
- [[2026-10-31-vim-init安装配置记录]]
- [[2026-10-31-iphone-linux互传方案]]
- [[2026-10-31-zram部署记录]]
- [[2026-11-01-aliyunpan部署记录]]
