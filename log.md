# 操作日志

> 记录知识库的所有变更历史

---

## 2026-11-14 ingest | zlib技能创建

- **操作**：消化配套产出事实（~/.claude/skills/zlib/SKILL.md 建成，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-11-14-zlib技能创建.md
- **更新页面**：
  - wiki/entities/zlib.md（简介/关键信息表/不同素材中的观点/相关页面追加 skill 产出）
  - wiki/topics/Linux系统配置.md（电子书资源子方向补 skill 事实；素材汇总表、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-11-14-zlib技能创建.md（SKILL.md 副本）
- **产出结果**：skill ~/.claude/skills/zlib/SKILL.md（六工作流+四铁律）；技能清单已刷新（SKILLS_DOC 环境变量覆盖脚本 Windows 硬编码路径——踩坑已记录）
- **关联**：登录已完成（Standard，日配额 10），CLI 通道端到端验证通过

---

## 2026-11-14 ingest | zlib安装与使用

- **操作**：消化安装与使用事实（heartleo/zlib Z-Library CLI，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-11-14-zlib安装与使用.md
  - 实体页：wiki/entities/zlib.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（新增观点 12：电子书获取；新增"电子书资源"知识体系子方向；素材汇总表、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-11-14-zlib安装与使用.md
- **部署结果**：v0.0.14 官方 install.sh 经代理 127.0.0.1:7897 安装到 /usr/local/bin/zlib；尚未登录（需 Z-Library 账号，doctor→login→tui 三步待用户执行）

---

## 2026-11-01 ingest | aliyunpan目录重构

- **操作**：消化同步架构变更（用户要求：云盘目录改名 surface-go-ubuntu、废弃 ~/阿里云盘同步、五个 XDG 目录纳入同步）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-11-01-aliyunpan目录重构.md
- **更新页面**：
  - wiki/entities/aliyunpan.md（同步架构表改为五目录 upload、配置目录 /etc/aliyunpan、观点补充）
  - wiki/topics/Linux系统配置.md（观点 11 改写：五目录 upload 备份；素材汇总表、云存储与备份子方向、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-11-01-aliyunpan目录重构.md
- **变更结果**：云盘 /surface-go-ubuntu/{公共,视频,图片,文档,音乐}；5 任务 upload/increment 加载确认；端到端上传验证通过；旧 /同步盘 已删（回收站）；~/阿里云盘同步 已删

---

## 2026-11-01 ingest | aliyunpan部署记录

- **操作**：消化部署与验证事实（aliyunpan CLI 接入阿里云盘，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-11-01-aliyunpan部署记录.md
  - 实体页：wiki/entities/aliyunpan.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（新增观点 11：云存储同步；新增"云存储与备份"知识体系子方向；素材汇总表、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-11-01-aliyunpan部署记录.md
- **部署结果**：v0.4.0 apt 安装；登录成功（汪磊dae）；同步服务 aliyunpan-sync 常驻（enabled）；端到端验证通过
- **关联产出**：skill ~/.claude/skills/aliyunpan-sync/SKILL.md + 使用手册 ~/文档/aliyunpan使用手册.md

---

## 2026-10-31 ingest | zram部署记录

- **操作**：消化内核优化部署事实（Surface Go 3 内核优化项目第一项，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-10-31-zram部署记录.md
  - 实体页：wiki/entities/zram.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（新增观点 10：内存分级交换；"硬件与内核"子方向补充分级交换结构；素材汇总表、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-10-31-zram部署记录.md
- **部署结果**：/dev/zram0 3.6G/lz4/priority 100 激活，与 /swap.img 分级共存，交换总量 7.6G

---

## 2026-10-31 ingest | iphone-linux互传方案

- **操作**：消化方案调研与部署事实（Linux ↔ iPhone 文件互传，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-10-31-iphone-linux互传方案.md
  - 实体页：wiki/entities/localsend.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（新增观点 9：移动设备互联；素材汇总表、新增"移动设备互联"知识体系子方向、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-10-31-iphone-linux互传方案.md
- **部署结果**：LocalSend v1.18.2 deb 安装完成（/opt/localsend_app/）；ufw 不活动无需放行；USB 照片通道确认就绪

---

## 2026-10-31 ingest | vim-init安装配置记录

- **操作**：消化本机安装事实（skywind3000/vim-init + Vim 9.1，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-10-31-vim-init安装配置记录.md
  - 实体页：wiki/entities/vim-init.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（新增观点 8：编辑器选型；素材汇总表、效率工具链、综合分析、相关页面同步更新）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-10-31-vim-init安装配置记录.md
- **验证结果**：43 个插件装齐（~/.vim/bundles/），配置加载无错误

---

## 2026-10-31 ingest | ibus-libpinyin用户词典

- **操作**：消化本地文件 `~/文档/user_dictionary.txt`（296 行，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-10-31-ibus-libpinyin用户词典.md
  - 实体页：wiki/entities/ibus-libpinyin.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（纳入词典素材观点）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-10-31-ibus-libpinyin用户词典.txt

---

## 2026-10-31 ingest | yazi快捷键速查

- **操作**：消化本地文件 `~/文档/yazi快捷键速查.md`（v26.9.1 官方键位中文速查，完整处理）
- **新增页面**：
  - 素材摘要：wiki/sources/2026-10-31-yazi快捷键速查.md
  - 实体页：wiki/entities/yazi.md
- **更新页面**：
  - wiki/topics/Linux系统配置.md（纳入键位与字体配置观点）
  - index.md、wiki/overview.md
- **原始素材**：raw/notes/2026-10-31-yazi快捷键速查.md

---

## 2026-10-31 init | 知识库创建

- **操作**：按 llm-wiki skill init 工作流创建知识库
- **路径**：/home/wanglei/文档/linux-wiki
- **主题**：我的 Linux 系统配置
- **工具**：bash init-wiki.sh（官方脚本）+ 记录路径到 ~/.llm-wiki-path
