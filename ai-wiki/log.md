# 操作日志

> 记录知识库的所有变更历史

---

## 2026-11-14 — 记录「免费 AI 自学工具三件套」（1 摘要 + 3 实体）

- **操作**：解析推文 @Chenfacai0 的 3 个仓库；用 GitHub API 核对星标/协议/语言，抓取 README 摘录
- **新增页面**：
  - 原始素材 4 篇（推文 + DeepTutor/OpenMAIC/book-to-skill README 摘录）
  - 素材摘要 1 篇（[[免费 AI 自学工具三件套]]：对比表、三工具用法、星标核对）
  - 实体页 3 篇（[[DeepTutor]]、[[book-to-skill]]、[[OpenMAIC]]）
- **同步**：[[工具集]] 新增「AI 学习与教育」分类
- **当前知识库规模**：51 篇素材，7 个主题页，46 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-13 — 归档《Ubuntu 安卓投屏控制 V2.0》本机部署手册（摘要 + scrcpy 实体）

- **操作**：从桌面读取 `Ubuntu-Android-Control-V2.0-本机单手机版.md`（630 行），按 llm-wiki 规范归档为 raw 素材 + 摘要页 + 实体页
- **新增页面**：
  - 原始素材 1 篇（raw/articles/2026-11-13-ubuntu-android-control-v2.md）
  - 素材摘要 1 篇（[[Ubuntu 安卓投屏控制]]：启动链、参数、watchdog、systemd、验收与排错）
  - 实体页 1 篇（[[scrcpy]]：参数、与 ADB/systemd 的关系、评价）
- **同步**：[[工具集]] 补入「桌面与效率」与「最近记录」
- **当前知识库规模**：50 篇素材，7 个主题页，43 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-12 — 收录《深入理解 AI Agent》开源书（摘要 + 实体页）

- **操作**：抓取 `bojieli/ai-agent-book` 的 README（43KB）与 GitHub 元数据；核对 10 章结构、109 实验、15 种语言、2.0 版章节调整
- **新增页面**：
  - 原始素材 1 篇（raw/articles/2026-11-12-ai-agent-book-readme.md）
  - 素材摘要 1 篇（[[深入理解 AI Agent（书）]]：公式、十章速览、实验运行、原文摘录）
  - 实体页 1 篇（[[深入理解 AI Agent]]：章节结构、阅读路径、评价）
- **判断**：57,764★、Apache-2.0、实验可复现；「Agent = LLM + 上下文 + 工具」与知识库已有 MCP/RAG/DSH 页面可直接互相引用
- **当前知识库规模**：49 篇素材，7 个主题页，42 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-12 — 补强 PixelFX（仓库已增至 244 特效，新建实体页）

- **操作**：抓取 `patch-gg/pixelfx` 的 README（12KB）与 GitHub 元数据；核对 244 个特效 / 21 分类 / Claude Code Skill / MIT
- **更新**：
  - 原素材页 [[PixelFX 游戏特效库]] 更新：232→244 种、6,926★、MIT、Claude Code Skill、代码示例与导出说明
  - 新增补充素材（raw/articles/2026-11-12-pixelfx-readme.md）
  - 新建实体页 [[PixelFX]]（分类结构、使用方式、评价）
  - [[工具集]] 补入「设计与前端」与「待评估」
- **当前知识库规模**：48 篇素材，7 个主题页，41 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-12 — 记录 DeskBox 桌面整理工具（摘要 + 实体，补入工具集）

- **操作**：抓取 `Tianyu199509/DeskBox` 的 README.zh-CN.md（28KB）与 GitHub 元数据；核对 Native AOT、离线安装、13 语言、格子组/叠放/自动整理等能力
- **新增页面**：
  - 原始素材 1 篇（raw/articles/2026-11-12-deskbox-readme.md）
  - 素材摘要 1 篇（[[DeskBox 桌面整理工具]]：功能清单、下载安装、原文摘录）
  - 实体页 1 篇（[[DeskBox]]：能力概览、评价与注意点）
- **同步**：[[工具集]] 新增「桌面与效率」分类，并加入「待评估/最近记录」
- **判断**：8,875★、GPL-3.0、WinUI 3 原生质感，是 Fences 的可靠开源替代；仅 Windows，桌面布局类工具首次使用建议小范围试
- **当前知识库规模**：48 篇素材，7 个主题页，40 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-12 — 记录 OmniGet 工具并建立「工具集」主题页（摘要 + 实体 + 主题）

- **操作**：从推特 @Chenfacai0 链接定位仓库 `OpenSelena/omniget`；抓取 README（55KB）、GitHub 元数据，核对 MCP Server（37 工具）、108 内置工具、跨平台安装
- **判断**：值得入库——5,595★、GPL-3.0、近期活跃；对 AI 工作流的实际价值是 whisper 转写 + MCP，而非单纯下载
- **新增页面**：
  - 原始素材 2 篇（raw/tweets/2026-11-12-omniget-tweet.md 推文；raw/articles/2026-11-12-omniget-readme.md README）
  - 素材摘要 1 篇（[[OmniGet 工具]]：能力清单、MCP 接入、同类对比）
  - 实体页 1 篇（[[OmniGet]]：能力矩阵、Agent 集成、评价与风险）
  - 主题页 1 篇（[[工具集]]：七类工具索引，链接 Claude Code、DSH、MCP、Looseleaf 等已有实体页）
- **当前知识库规模**：47 篇素材，7 个主题页，39 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-11 — 研究 GIF 工厂开源动效 Skill（摘要页 + 实体页）

- **操作**：从推特 @Leviwoyun 链接定位仓库 `WoYun520/gif-factory`；抓取 README、GUIDE、根 SKILL 与两个子 SKILL（动态签名、电影片头）、40 字形目录、仓库树（769 文件）
- **新增页面**：
  - 原始素材 2 篇（raw/tweets/2026-11-11-gif-factory-tweet.md 推文原文；raw/articles/2026-11-11-gif-factory-readme.md 仓库文档摘录）
  - 素材摘要 1 篇（[[GIF 工厂技能]]：七类用途、40 字形、签名节奏参数、依赖矩阵、DSH 适配）
  - 实体页 1 篇（[[GIF 工厂]]：技能构成、工作流、评价与风险）
- **关键结论**：这是「说明 + 脚本」型技能包，格式兼容 DSH；不生图模型，实际使用需外部生图 + FFmpeg；片头 40 字形与签名节奏是工程化最强的两块
- **当前知识库规模**：46 篇素材，6 个主题页，38 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-05 — 补全英语阅读调研的课程链接（摘要页）

- **问题**：摘要页初稿只保留了课程名，未带 URL，用户查阅时看不到 B 站/YouTube 链接
- **修复**：在 [[英语阅读课程调研]] 中新增「课程清单（带链接）」16 条核心资源（入门/精读/长难句/原著/应试），并注明完整 64 个链接在原始素材与总报告中
- **补充**：应用户要求，已收录**全部 43 组资源 / 65 个链接**（从总报告自动提取，含补充加餐 3 条），摘要页不再只放精选
- **状态**：完成

---

## 2026-11-05 — 调研英语阅读课程（YouTube + Bilibili，摘要页 + 实体页）

- **操作**：派两个研究代理并行调研——YouTube 解析搜索页 ytInitialData + 频道/播放列表页核对（16 组资源、37 个链接）；Bilibili 搜索 API（23 关键词、477 条结果）+ view 接口核对（28 条课程）；全部链接 curl 实测 HTTP 200
- **新增页面**：
  - 原始素材 1 篇（raw/notes/2026-11-05-english-reading-courses.md，两份分报告的合并版）
  - 素材摘要 1 篇（[[英语阅读课程调研]]：按水平选主线、四周训练组合、选课避坑）
  - 实体页 1 篇（[[英语阅读能力]]：能力构成、CEFR/RAZ/书虫分级、精读与泛读训练法）
- **关键结论**：阅读提升靠「精读拆透 + 泛读读完」的配比；优质课程都带文本/PDF；不按播放量选课
- **当前知识库规模**：45 篇素材，6 个主题页，37 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 盘点 Google 开源（star 前 100 分类清单 + 实体页）

- **操作**：GitHub API 抓取 org:google（2,892 仓库）按 star 前 100 + 最近更新 25 个；脚本生成分类清单（每个仓库一句用途说明）
- **新增页面**：
  - 原始素材 1 篇（raw/articles/Google 开源项目盘点-full.md，100 个仓库的完整清单）
  - 素材摘要 1 篇（[[Google 开源项目盘点]]：核心观点、全量分类清单、评价、API 复现命令）
  - 实体页 1 篇（[[Google 开源]]：组织边界、分类概览、浏览方式）
- **关键结论**：2026 年 Google 在 google 组织的重心是 AI Agent 工具链（ADK 四语言、skills、agents-cli、ax、langextract）；TensorFlow/K8s/Flutter 等不在 google 组织
- **当前知识库规模**：44 篇素材，6 个主题页，36 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 核查本机 EGM 插件安装与调用方式（摘要页 + 两页补强）

- **操作**：读取 `installed_plugins.json`、`settings.json`、插件 `plugin.json`、7 个 `SKILL.md`、9 个 persona 与 `docs/claude.md`，核对本机 `egm@egm` 的实际安装状态与调用约束
- **新增页面**：
  - 原始素材 1 篇（raw/notes/EGM 本机安装核查.md，安装事实 + skill/persona 原文 + 官方文档摘录）
  - 素材摘要 1 篇（[[EGM 本机安装核查]]：已装 v0.1.0、7 skill 强制手动调用、评审的上下文约束）
- **更新页面**：
  - 实体页 [[Elephant-Goldfish Model]]：新增「本机安装现状（Claude Code，2026-11-04 实测）」节，sources 回填至 2 篇
  - 综合分析 [[EGM 学习手册]]：新增 2.6「本机调用注意」，sources 回填至 2 篇
- **关键新信息**：`egm@egm` v0.1.0 / user 作用域 / 已启用；7 个 skill 全部 `disable-model-invocation: true`，`Skill` 工具会拒绝，只能 `/egm:egm-*`；产物默认写工作目录；Claude Code 需 2.1.271+
- **当前知识库规模**：43 篇素材，6 个主题页，35 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 记录 Protocol Explorer 网络协议教学站（摘要 + 实体页）

- **操作**：直连超时，经代理抓取站点 HTML + 主 JS bundle（218KB）+ manifest/robots/sitemap；从 meta 与 bundle 内教学文本提取信息
- **新增页面**：
  - 原始素材 1 篇（raw/articles/Protocol Explorer 网络协议教学.md，meta 原文 + 技术观察 + 教学文本摘录）
  - 素材摘要 1 篇（[[Protocol Explorer 网络协议教学]]：定位、覆盖协议、学习路径、评价与局限）
  - 实体页 1 篇（[[Protocol Explorer]]：关键信息、核心能力、访问与使用、适用边界）
- **关键新信息**：作者 Dilum Sanjaya；alpha；纯前端静态站 + 严格 CSP + PWA；14 协议 / 14 语言；疑似闭源；大陆需代理
- **当前知识库规模**：42 篇素材，6 个主题页，35 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 新增综合分析：Looseleaf 上手指南（用法 / 动效 / 视频）

- **背景**：围绕 Looseleaf 的两段实用讨论——「怎么用比较方便」与「能不能做视频/动态效果」——整理成独立指南，避免散落在对话里
- **新增页面**：综合分析 1 篇（[[Looseleaf 上手指南]]：三条使用路线、五个坑、10 个动效 token 与 Boil/draw-on/Sketchpad、视频三条路含 Remotion 注意点）
- **联动更新**：实体页 [[Looseleaf]] 与摘要页 [[Looseleaf 手绘组件库]] 的「相关页面」已指向指南
- **当前知识库规模**：41 篇素材，6 个主题页，34 个实体页，4 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 研究 Looseleaf 手绘风组件库（摘要 + 实体页）

- **操作**：GitHub 经代理抓取 README 全文 + 仓库树（2,894 文件）+ package.json + notes/registry.md 研究补充；GitHub API 取元数据
- **澄清**：用户描述为「GitHub 知识库」，实际是 shadcn/ui 生态的**组件库 + 文档站**，已在摘要页说明
- **新增页面**：
  - 原始素材 1 篇（raw/articles/Looseleaf 手绘组件库-readme.md，README 全文 + 结构/技术/registry 研究）
  - 素材摘要 1 篇（[[Looseleaf 手绘组件库]]：定位、技术实现、安装用法、评价与局限）
  - 实体页 1 篇（[[Looseleaf]]：关键信息、核心特性、技术原理、实用信息、适用场景）
- **关键新信息**：269 stars、MIT、React 19 + Tailwind v4 + Radix；123 组件 / 61 blocks；绘制为纯函数 + 种子生成 SVG；registry 消费者测试 1,317 项
- **当前知识库规模**：41 篇素材，6 个主题页，34 个实体页，3 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 消化 Dan Koe 长文《How to fix your entire life in 1 day》（双语精读）

- **操作**：X 直连被阻断；经 fxtwitter API 拿到 X Article 完整正文（218 块 / 5,501 词，31,033 字符），全文存 raw
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/Dan Koe 人生重启双语精读.md，英文原文全文存档 + 元数据）
  - 素材摘要 1 篇（[[Dan Koe 人生重启双语精读]]：七部分中英对照精读、词汇表、一日协议问题清单中英对照、英语学习提示）
  - 实体页 1 篇（[[Dan Koe]]：身份、代表作、写作特征、阅读入口）
- **用户目标**：中英对照学习英语，兼顾读懂文章；页面按「先盲读英文 → 对照译文 → 记搭配 → 复述」设计
- **当前知识库规模**：40 篇素材，6 个主题页，33 个实体页，3 篇综合分析
- **状态**：完成

---

## 2026-11-04 — 消化 Google EGM（摘要 + 实体页 + 中文学习手册）

- **操作**：GitHub 经代理抓取 README + getting_started / harnesses / faq / index / architecture 文档 + brainstorm/review skill 与 design_critic persona 样例；GitHub API 取元数据
- **新增页面**：
  - 原始素材 1 篇（raw/articles/EGM 设计评审工作流.md，README 要点 + 6 篇文档研究 + skill/persona 样例）
  - 素材摘要 1 篇（[[EGM 设计评审工作流]]：三角色、七技能、五阶段评审、评价与局限）
  - 实体页 1 篇（[[Elephant-Goldfish Model]]：关键信息、支持宿主表、DSH 适配评估）
  - 综合分析 1 篇（[[EGM 学习手册]]：是什么/怎么用/结合现有工作流/学习路径/检查清单）
- **关键新信息**：11,143 stars、7 skills、9 personas、Apache-2.0；Goldfish 评审必须有 fresh-context 子代理，否则直接停止；官方承认指令文件泄漏边界
- **当前知识库规模**：39 篇素材，6 个主题页，32 个实体页，3 篇综合分析
- **状态**：完成

---

## 2026-11-03 — 二次核查：Understand Anything 仓库结构与 DSH 适配评估

- **操作**：补读 README 全文、仓库目录树（612 文件）、package.json、plugin.json、样例 skill/agent；GitHub API 取实时元数据
- **更新页面**：
  - 实体页 [[Understand Anything]]：星标更新为 90,199；补仓库构成（11 agent/81 skill/v2.9.8）、独立阅读器、17 平台、**无 MCP**、「DSH 适配评估」与「与代码索引的定位差异」两节
  - 摘要页 [[Understand Anything 代码理解插件]]：新增「二次核查补充」段，修正评价里的数字口径
- **关键结论**：UA 当前不能直接装进 DSH（无 MCP、安装器无 dsh、skill/agent 协议差异）；可行路径为看图 / 消费 `.ua/knowledge-graph.json` / 移植确定性脚本，其中消费 JSON 性价比最高
- **当前知识库规模**：38 篇素材，6 个主题页，31 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-03 — 消化推文：@wanerfu 报道 Understand Anything 爆红（摘要 + 实体页）

- **操作**：x.com 直连被网络阻断，经 vxtwitter 镜像抓推文全文；本机代理 127.0.0.1:7897 校验原页可达（HTTP 200）；补抓官方 README（20KB）做研究补充
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/Understand Anything 代码理解插件.md，推文逐字 + README 研究补充）
  - 素材摘要 1 篇（[[Understand Anything 代码理解插件]]：核心观点、入门知识点拆解、评价、入门学习路径、命令速查、原文摘录）
  - 实体页 1 篇（[[Understand Anything]]：关键信息、9 项核心特性、Tree-sitter + LLM 原理、多 agent 流水线、安装与用法）
- **关键新信息**：655 → 56,400 stars；Egonex 接手；Tree-sitter 管结构、LLM 管语义；数据落点 `.ua/knowledge-graph.json`；`/understand-knowledge` 可分析 Karpathy 式 wiki
- **当前知识库规模**：38 篇素材，6 个主题页，31 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-03 — 消化数据集：open-index/hacker-news（HN 全量存档，完整处理）

- **操作**：webfetch 故障，改 curl 抓 HF README raw（26KB 全文）+ HF API 元信息（433 likes/43.9 万下载），完整处理
- **新增页面**：
  - 原始素材 1 篇（raw/articles/Hacker News 全量数据集-readme.md，README 全文逐字保留）
  - 素材摘要 1 篇（[[Hacker News 全量数据集]]：两层 Parquet 结构、字段表、HN 全景统计、DuckDB hf:// 直查 SQL、三种 Python 用法、使用注意事项）
  - 实体页 1 篇（[[Hacker News]]：平台概况 + 三渠道数据获取表）
- **关键新信息**：4306 万评论/626 万 story 全量；得分中位数 0、千分以上仅 0.03%；每天 UTC 零点整月重抓去重；ODC-By 许可
- **当前知识库规模**：37 篇素材，6 个主题页，30 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-03 — 消化推文：@0xGky 介绍 zlib CLI（完整处理，skill 请求拒做）

- **操作**：fxtwitter API 抓推文全文 + GitHub 仓库 README 研究补充
- **用户请求说明**：用户要求"生成一个 skill"，因 zlib 是 Z-Library（大规模盗版电子书站点）的客户端，为它编写自动化下载/推 Kindle 的 skill 属于便利侵权，已明确拒绝并告知用户官方自带 Claude Code/Codex 插件可自行安装
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/zlib CLI 终端电子书工具-tweet.md，推文逐字+仓库研究补充+合规备注）
  - 素材摘要 1 篇（[[zlib CLI 终端电子书工具]]：功能全集、Agent 三通道集成（插件/MCP/--read-only）、命令速查、合规备注）
- **当前知识库规模**：36 篇素材，6 个主题页，29 个实体页，2 篇综合分析
- **状态**：完成（skill 部分拒做，原因已记录）

---

## 2026-11-03 — 消化网站：黑客书架 Hacker Books 中文版（完整处理）

- **操作**：webfetch 抓取首页成功但书单为 JS 渲染拿不到；从开源仓库 app.js 定位数据接口 /data/books-top.json（Top 600）与 /data/books.json（全量 15362 本）、/data/meta.json（统计），完整处理
- **新增页面**：
  - 原始素材 2 篇（raw/articles/黑客书架书榜网站.md 站点介绍+字段说明；2026-11-03-hackerbooks-top600.json Top 600 原始数据）
  - 素材摘要 1 篇（[[黑客书架书榜网站]]：站点介绍、Top 10 全榜单、Top 50 观察、数据字段速查、数据直取 URL）
  - 实体页 1 篇（[[黑客书架]]）
- **关键新信息**：全库 15362 本书/27 万次提及/5.6 万评论者；排序按"去重提及人数"防刷榜；Top 50 中科幻约 1/4、纯技术书仅约 10 本
- **当前知识库规模**：35 篇素材，6 个主题页，29 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-02 — 消化 X 长文：数字生命卡兹克《我这套 Agent 自动化系统》（完整处理）

- **操作**：webfetch 抓取失败（X Article），改用 fxtwitter API 成功获取全文（约 8400 字），完整处理
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/卡兹克 Agent 自动化系统-article.md，正文逐字保留，图片位置标注）
  - 素材摘要 1 篇（[[卡兹克 Agent 自动化系统]]：事件中台 rules.json 路由/去重/单一出口、内网长轮询接单、多模型分工调度、本地双 Mac Mini 架构、CI 中台五步、票拟批红决策边界与七类必过人清单、两份决定文件）
  - 实体页 1 篇（[[数字生命卡兹克]]：人物背景、AIHOT 与成长轨迹）
- **更新页面**：[[AI编程开发]] 主题页（新增"Agent 自动化系统实战"小节，sources 回填至 18 篇）、index.md、overview.md
- **关键新信息**：审查数据（298 PR 审出 333 条问题、306 条合并前修复）；CI 五步中位数两三分钟；与 DeepSeek Super-agent 事件驱动架构互相独立验证
- **当前知识库规模**：34 篇素材，6 个主题页，28 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-02 — 创建个人笔记页「我的笔记与心得」

- **操作**：应用户要求创建个人随笔文章页（区别于素材消化流程，不进 sources/entities），存 `ai-wiki/notes/`（新目录），index 新增"个人笔记"节
- **新增页面**：notes/我的笔记与心得.md（随笔活页，首条：「天未亮赶车」）
- **工作模式**：今后用户说"记录这段话/这段心得"= 追加到该页顶部（新小节带日期），不建新页
- **状态**：完成

---

## 2026-11-02 — 消化 X 推文：fq-book《这本书能让你连接互联网》学习文档（完整处理）

- **操作**：用户要求整理成详细学习文档；webfetch 抓取推文（@lumxss，15.1 万浏览热帖）+ fq-book 仓库 README（master 分支）+ 全书目录（docs/_sidebar.md，13 篇章 60+ 小节）
- **新增页面**：
  - 原始素材 2 篇（raw/tweets/这本书能让你连接互联网-tweet.md；raw/articles/这本书能让你连接互联网-readme.md 含 README 摘录与完整目录）
  - 素材摘要 1 篇（**fq-book 学习文档**：全书结构地图 + 三阶段学习路线 + 核心概念速览（代理/隧道/VPN、DNS 污染、TCP RST、SNI 阻断、NAT、纯净 IP）+ 排障工具箱（Wireshark/curl -v/traceroute/cip.cc）+ 开发者代理配置（git/终端/ssh）+ 合规边界说明）
- **定位说明**：以网络原理学习为主线；原书"方法论"实操章节仅做目录级索引；CC BY-NC 协议与作者免责声明如实转述
- **当前知识库规模**：33 篇素材，6 个主题页，27 个实体页，2 篇综合分析
- **状态**：完成

---

## 2026-11-02 — 消化 X 推文：DSH Go 安卓客户端（社区第三方）

- **操作**：消化 @NFT_Chen 2026-11-01 推文（社区项目 DSH Go：安卓手机本机运行 DSH 引擎 + SSH 接管电脑端，短素材简化处理；webfetch 自动抓取成功）
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/DeepSeek Harness Go 版.md）
  - 素材摘要 1 篇（DSH Go：把 DeepSeek Harness 装进安卓口袋，含五步安装实操与单 Key 安全建议）
- **更新页面**：
  - [[DeepSeek Harness]] 实体页（观点节追加社区生态视角，sources 回填至 7 篇）
  - [[DSH 入门学习路径]] 综合分析页（资源清单加 DSH Go 行，素材索引加第 8 条）
- **关键新信息**：Android 8+ 本机跑完整引擎（内置 Ubuntu 免 Root 免 Termux）；SSH/Remote 断档接力；评论区安全建议——非官方包单独开 API Key
- **当前知识库规模**：32 篇素材，6 个主题页，27 个实体页，1 篇综合分析
- **状态**：完成

---

## 2026-11-02 — 消化 X 长文：Claude Code 实战开发术【完全版】

- **操作**：经本地代理用 Jina Reader 抓取 @29meat_ai 日文长文（约 3.5 万字节），完整处理
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/Claude Code 实战开发术.md）
  - 素材摘要 1 篇（Claude Code 实战开发术：六条实战术、Prompt 模板、端到端流程与 NG 清单）
  - 实体页 1 篇（Claude Code）
  - 主题页 1 篇（Claude Code 实战开发术）
- **更新页面**：
  - [[AI编程开发]] 主题页（新增实战术小节，sources 回填）
  - index.md、wiki/overview.md
- **当前知识库规模**：28 篇素材，6 个主题页，27 个实体页
- **状态**：完成

---

## 2026-11-02 — 消化 dsh-superagent-prototype 素材并生成 DSH 入门学习路径（完整处理）

- **操作**：用户（dsh 小白）要求系统学习 dsh 并上手；webfetch 抓取 2 条推文（@IAmHuTu、@meow2149）、superagent-prototype 仓库 README、官网 deepseek.com/harness，共 3 篇新素材；按用户诉求首次生成综合分析（学习路径）页
- **新增页面**：
  - 原始素材 3 篇（raw/tweets/Super-agent 原型推文合集.md 合并两条推文；raw/articles/DSH Super-agent 原型-readme.md；raw/articles/DeepSeek Harness 官网.md）
  - 素材摘要 3 篇（superagent-prototype-tweets 合并摘要、dsh-superagent-prototype 仓库深读、official-site 官网全景）
  - **综合分析 1 篇（DSH 入门学习路径：五步路线 + 概念词典 + 安装对比 + 常见坑 + 资源清单 + 视角对比）**
- **更新页面**：
  - [[DeepSeek Harness]] 实体页（观点节追加官网/社区/原型仓库 3 个视角，sources 回填至 6 篇）
  - [[AI编程开发]] 主题页（Agent 基础设施节追加 Super-agent 落地两路与实验数据，sources 回填）
- **关键新信息**：桌面端安装包（小白最简入口）；创造模式对话生成插件；官方"智能体团队（实验性）"插件；superagent-prototype 实验数据（中位数 12.4 分钟 / P95 15.7 vs 传统 29.5 分钟）；"注意力经济学"设计哲学
- **当前知识库规模**：合并冲突解决后实际为 31 篇素材（与 Claude Code 会话并行，本条目记录为合并前快照 30 篇）
- **状态**：完成

---

## 2026-11-02 — 消化工程素材：wiki-summarize 知识库梳理技能

- **操作**：梳理 `.claude/skills/wiki-summarize` 的 SKILL.md、扫描脚本与复用说明，整理为可复用知识页（完整处理）
- **新增页面**：
  - 素材摘要 1 篇（wiki-summarize：知识库梳理技能，含六步流程、扫描器输出、报告模板与 Git 纪律）
  - 实体页 1 篇（wiki-summarize 知识库梳理技能，含适用范围、健康检查项、配置与设计取舍）
- **更新页面**：
  - index.md（新增条目与统计）
  - wiki/overview.md（统计与最近更新）
- **当前知识库规模**：27 篇素材，5 个主题页，26 个实体页
- **状态**：完成

---

## 2026-11-02 — 消化官方文档：DeepSeek Harness 实操指南（模型配置/CLI/SDK）

- **操作**：用户要求补充"可实操的内容"，webfetch 抓取 dsh 三篇官方实操文档（providers.zh.md 模型配置、apps/cli README 入口模式、python-sdk.md SDK 教程），完整处理并与既有 DeepSeek Harness 素材关联
- **新增页面**：
  - 原始素材 1 篇（raw/articles/DeepSeek Harness 官方指南.md）
  - 素材摘要 1 篇（DeepSeek Harness 实操指南：模型配置、CLI 模式与 Python SDK，含 CLI 入口模式表、SDK 代码、网关排错表）
- **更新页面**：
  - [[DeepSeek Harness]] 实体页（新增"模型配置（多提供商）"与"Python SDK（程序化调用）"节，扩充五种入口模式与 danger-full-access 注意事项，sources 回填）
- **当前知识库规模**：26 篇素材，5 个主题页，25 个实体页
- **状态**：完成

---

## 2026-11-02 — 消化官方文档：DeepSeek Harness README 与使用指南（完整处理）

- **操作**：用户要求深挖 @Super_Nius 推文推荐的 GitHub 项目用法，webfetch 抓取仓库 README（中英文）与 Web UI 使用指南，素材 >1000 字走完整处理
- **新增页面**：
  - 原始素材 1 篇（raw/articles/DeepSeek Harness README.md）
  - 素材摘要 1 篇（DeepSeek Harness 官方 README 与 Web UI 指南，含实操命令与原文摘录）
  - 实体页 1 篇（**DeepSeek Harness**，正文含定义/特性/双素材观点/安装用法/注意事项/适用场景）
- **更新页面**：
  - [[DeepSeek]] 实体页（追加官方定位观点，编程开发场景行改为实体链接，sources 回填）
  - [[AI Agent 智能体]] 实体页（追加 harness 概念与 Agent 能力边界观点，sources 回填）
  - [[AI编程开发]] 主题页（新增"Agent 基础设施：DeepSeek Harness"节，sources 回填）
  - [[DeepSeek Harness 发布推文]] 摘要页（"待创建"概念标注升级为 [[DeepSeek Harness]] 实体链接）
- **当前知识库规模**：25 篇素材，5 个主题页，25 个实体页
- **状态**：完成

---

## 2026-11-02 — 消化 X 推文：DeepSeek Harness（Super-agent 架构）

- **操作**：消化 @Super_Nius 2026-10-31 推文（DeepSeek deepseek-harness 项目解读，短素材简化处理；webfetch 自动抓取成功）
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/DeepSeek Harness 发布推文.md）
  - 素材摘要 1 篇（DeepSeek Harness：Super-agent 双层架构开源项目）
- **更新页面**：
  - [[DeepSeek]] 实体页（编程开发场景与"不同素材中的观点"追加 Super-agent 架构信息，sources 回填）
  - [[AI Agent 智能体]] 实体页（"不同素材中的观点"追加会话孤岛问题与双层架构，sources 回填）
- **待创建概念**（纯文本标注）：DeepSeek Harness / Super-agent、事件触发 Agent（各仅 1 篇素材提及，积累后创建实体页）
- **当前知识库规模**：24 篇素材，5 个主题页，24 个实体页
- **状态**：完成

---

## 2026-11-02 — 消化 X 推文：PixelFX 232 种游戏特效开源

- **操作**：消化 @Tao_Builds 2026-10-31 推文（PixelFX 项目推荐，短素材简化处理；webfetch 自动抓取成功）
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/PixelFX 游戏特效库.md，知识库首个 X/Twitter 类素材）
  - 素材摘要 1 篇（PixelFX：232 种代码化游戏特效开源）
- **待创建概念**（纯文本标注）：PixelFX、程序化特效（各仅 1 篇素材提及，积累后创建实体页）
- **当前知识库规模**：23 篇素材，5 个主题页，24 个实体页
- **状态**：完成

---

## 2026-11-02 — CodeArts Telegram Bridge 实体页更新：开机自启配置

- **操作**：补充 systemd user 服务开机自启配置（codearts-tg + enable-linger）、重启后重连说明、代理前提条件
- **实体页**：[[CodeArts Telegram Bridge]] 实用信息节更新
- **状态**：完成

---

## 2026-11-02 — 消化工程实战素材 CodeArts Telegram Bridge

- **操作**：消化自产工程总结素材（CodeArts↔Telegram 桥接项目技术记录）
- **新增页面**：
  - 素材摘要 1 篇（CodeArts Telegram Bridge：把手机变成 CodeArts 远程终端）
  - 实体页 2 篇（CodeArts CLI、CodeArts Telegram Bridge）
- **更新页面**：
  - [[AI编程开发]] 主题页（新增"Agent 远程化"内容与相关页面）
  - index.md / overview.md 统计与最近更新
- **当前知识库规模**：22 篇素材，5 个主题页，24 个实体页
- **管理约定**：此后与 CodeArts 协作沉淀的知识总结统一进入本知识库管理
- **状态**：完成

---

## 2026-11-02 — 摘要页质量修复

- **操作**：运行 lint-wiki.sh 健康检查，按结果修复 8 篇素材摘要页
- **修复问题**：
  - 补充"实操内容保留"节：AI 架构图教程、AI 游戏开发、小红书爆款公式
  - 补充"原文精彩摘录"节：上述 3 篇 + DeepSeek Excel/Word/VSCode 集成、Python 本地部署、Cline iOS App 开发
- **检查结果**：链接完整性、sources 字段、内容必填节全部通过（0 警告 0 错误）
- **状态**：完成

---

## 2026-04-29 — 知识库质量全面修复和优化

- **操作**：全面检查并修复知识库质量问题
- **修复问题**：
  - 实体页 sources 字段为空（12 个实体页已补充来源信息）
  - 素材摘要缺少实操内容和原文摘录（5 篇鱼皮系列已补充）
  - 断链问题（创建了 7 个新实体页：Embedding 嵌入、ReAct、GitHub Copilot、Apache Tika、豆包、语雀 AI、独立开发者）
  - 链接空格不一致问题（已统一修复）
- **新增实体页**：7 个
- **实体页总数**：22 个
- **状态**：完成

---

## 2026-04-29 — 批量消化 鱼皮 AI 指南 系列素材

- **操作**：批量消化 5 篇 鱼皮 AI 指南 系列素材
- **新增页面**：
  - 素材摘要 5 篇（开篇、核心概念、工具链、编程技巧、编程技术）
  - 实体页 12 篇（Spring AI、LangChain4j、LangGraph、RAG 知识库、AI Agent 智能体、MCP 模型上下文协议、Cursor、Dify、Ollama、通义灵码、Playwright、Mermaid 作图）
  - 主题页 1 篇（鱼皮 AI 指南）
- **更新页面**：
  - [[AI编程开发]] 主题页（大幅扩展，增加框架、RAG、Agent 等内容）
- **当前知识库规模**：21 篇素材，5 个主题页，15 个实体页
- **状态**：完成

---

## 2026-04-29 — 批量消化 AI 编程开发素材

- **操作**：批量消化 5 篇 AI 编程开发相关素材
- **新增页面**：
  - 素材摘要 5 篇（VSCode 集成、Python 本地部署、架构图教程、游戏开发案例、iOS App 开发）
  - 主题页 1 篇（AI 编程开发）
- **当前知识库规模**：16 篇素材，4 个主题页，3 个实体页
- **状态**：完成

---

## 2026-04-29 — 批量消化 AI 创意设计素材

- **操作**：批量消化 3 篇 AI 创意设计相关素材
- **新增页面**：
  - 素材摘要 3 篇
  - 主题页 1 篇（AI 创意设计）
- **状态**：完成

---

## 2026-04-29 — 批量消化 AI 内容创作素材

- **操作**：批量消化 5 篇 AI 内容创作相关素材
- **新增页面**：
  - 素材摘要 5 篇
  - 实体页 3 篇（DeepSeek、DeepSeek Agent、提示词工程）
  - 主题页 1 篇（AI 内容创作）
- **状态**：完成

---

## 2026-04-29 — 初始化

- **操作**：创建知识库
- **主题**：AI 学习笔记
- **状态**：完成
