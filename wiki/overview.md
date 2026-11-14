# 快速导航

> 我的知识库 · 最后更新 2026-11-14

| 类别 | 数量 | 入口 |
|------|------|------|
| 素材 | 8 | yazi快捷键速查、用户词典、vim-init、iphone互传、zram部署、aliyunpan部署、aliyunpan重构、zlib安装与使用 |
| 实体 | 7 | [[yazi]]、[[vim-init]]、[[LocalSend]]、[[zram]]、[[aliyunpan]]、[[zlib]]、[[ibus-libpinyin]] |
| 主题 | 1 | [[Linux系统配置]] |
| 对比分析 | 0 | （待积累） |
| 综合分析 | 0 | （待积累） |

## 这个知识库是什么

记录本机（Surface Go 3 + Ubuntu 26.04.1 LTS + linux-surface 内核）的系统配置知识：效率工具（yazi 文件管理、vim-init 编辑器）、移动设备互联（LocalSend ↔ iPhone）、内核优化（zram 分级交换）、云存储备份（aliyunpan 五目录 ↔ 阿里云盘）、电子书获取（zlib ↔ Z-Library）、中文输入（ibus-libpinyin 用户词典）、终端字体（JetBrainsMono Nerd Font）、权限管理（sudoers 免密）等配置事实，由 CodeArts 按 llm-wiki skill 工作流持续维护。

## 最近更新

- **2026-11-14**：安装 zlib v0.0.14（Z-Library 开源 CLI，官方 install.sh 经代理装 /usr/local/bin）；消化为 [[zlib]] 实体页与素材摘要，[[Linux系统配置]] 新增"电子书资源"子方向；尚未登录。
- **2026-11-01**：aliyunpan 同步架构重构：云盘目录改名 `/surface-go-ubuntu`，本机五个 XDG 目录（公共/视频/图片/文档/音乐）全部 upload 增量备份到云盘；发现配置目录真相 /etc/aliyunpan；消化为目录重构素材并更新 [[aliyunpan]] 实体页。
- **2026-11-01**：部署 aliyunpan v0.4.0（apt 源）+ systemd 同步服务，端到端验证通过；生成 aliyunpan-sync skill 与使用手册；消化为 [[aliyunpan]] 实体页与素材摘要。
- **2026-10-31**：部署 zram（lz4/3.6G/优先级 100）+ 磁盘 swap 分级交换，交换总量 4G→7.6G（内核优化项目第一项），消化为 [[zram]] 实体页与素材摘要。
- **2026-10-31**：调研 Linux ↔ iPhone 互传五方案，安装 LocalSend v1.18.2，消化为 [[LocalSend]] 实体页与素材摘要；确认 USB 照片通道就绪。
- **2026-10-31**：安装 skywind3000/vim-init（Vim 9.1 + 43 插件，伪终端非交互安装），消化为 [[vim-init]] 实体页与素材摘要。
- **2026-10-31**：创建知识库；消化 yazi 快捷键速查文档与 ibus-libpinyin 用户词典，建立 [[yazi]]、[[ibus-libpinyin]] 实体页与 [[Linux系统配置]] 主题页。
