# 操作日志

> 记录知识库的所有变更历史

---

## 2026-11-01 — 消化工程素材：wiki-summarize 知识库梳理技能

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

## 2026-11-01 — 消化官方文档：DeepSeek Harness 实操指南（模型配置/CLI/SDK）

- **操作**：用户要求补充"可实操的内容"，webfetch 抓取 dsh 三篇官方实操文档（providers.zh.md 模型配置、apps/cli README 入口模式、python-sdk.md SDK 教程），完整处理并与既有 DeepSeek Harness 素材关联
- **新增页面**：
  - 原始素材 1 篇（raw/articles/2026-11-01-deepseek-harness-guides.md）
  - 素材摘要 1 篇（DeepSeek Harness 实操指南：模型配置、CLI 模式与 Python SDK，含 CLI 入口模式表、SDK 代码、网关排错表）
- **更新页面**：
  - [[DeepSeek Harness]] 实体页（新增"模型配置（多提供商）"与"Python SDK（程序化调用）"节，扩充五种入口模式与 danger-full-access 注意事项，sources 回填）
- **当前知识库规模**：26 篇素材，5 个主题页，25 个实体页
- **状态**：完成

---

## 2026-11-01 — 消化官方文档：DeepSeek Harness README 与使用指南（完整处理）

- **操作**：用户要求深挖 @Super_Nius 推文推荐的 GitHub 项目用法，webfetch 抓取仓库 README（中英文）与 Web UI 使用指南，素材 >1000 字走完整处理
- **新增页面**：
  - 原始素材 1 篇（raw/articles/2026-11-01-deepseek-harness-readme.md）
  - 素材摘要 1 篇（DeepSeek Harness 官方 README 与 Web UI 指南，含实操命令与原文摘录）
  - 实体页 1 篇（**DeepSeek Harness**，正文含定义/特性/双素材观点/安装用法/注意事项/适用场景）
- **更新页面**：
  - [[DeepSeek]] 实体页（追加官方定位观点，编程开发场景行改为实体链接，sources 回填）
  - [[AI Agent 智能体]] 实体页（追加 harness 概念与 Agent 能力边界观点，sources 回填）
  - [[AI编程开发]] 主题页（新增"Agent 基础设施：DeepSeek Harness"节，sources 回填）
  - [[2026-11-01-deepseek-harness-tweet]] 摘要页（"待创建"概念标注升级为 [[DeepSeek Harness]] 实体链接）
- **当前知识库规模**：25 篇素材，5 个主题页，25 个实体页
- **状态**：完成

---

## 2026-11-01 — 消化 X 推文：DeepSeek Harness（Super-agent 架构）

- **操作**：消化 @Super_Nius 2026-10-31 推文（DeepSeek deepseek-harness 项目解读，短素材简化处理；webfetch 自动抓取成功）
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/2026-11-01-deepseek-harness-tweet.md）
  - 素材摘要 1 篇（DeepSeek Harness：Super-agent 双层架构开源项目）
- **更新页面**：
  - [[DeepSeek]] 实体页（编程开发场景与"不同素材中的观点"追加 Super-agent 架构信息，sources 回填）
  - [[AI Agent 智能体]] 实体页（"不同素材中的观点"追加会话孤岛问题与双层架构，sources 回填）
- **待创建概念**（纯文本标注）：DeepSeek Harness / Super-agent、事件触发 Agent（各仅 1 篇素材提及，积累后创建实体页）
- **当前知识库规模**：24 篇素材，5 个主题页，24 个实体页
- **状态**：完成

---

## 2026-11-01 — 消化 X 推文：PixelFX 232 种游戏特效开源

- **操作**：消化 @Tao_Builds 2026-10-31 推文（PixelFX 项目推荐，短素材简化处理；webfetch 自动抓取成功）
- **新增页面**：
  - 原始素材 1 篇（raw/tweets/2026-11-01-pixelfx-tweet.md，知识库首个 X/Twitter 类素材）
  - 素材摘要 1 篇（PixelFX：232 种代码化游戏特效开源）
- **待创建概念**（纯文本标注）：PixelFX、程序化特效（各仅 1 篇素材提及，积累后创建实体页）
- **当前知识库规模**：23 篇素材，5 个主题页，24 个实体页
- **状态**：完成

---

## 2026-11-01 — CodeArts Telegram Bridge 实体页更新：开机自启配置

- **操作**：补充 systemd user 服务开机自启配置（codearts-tg + enable-linger）、重启后重连说明、代理前提条件
- **实体页**：[[CodeArts Telegram Bridge]] 实用信息节更新
- **状态**：完成

---

## 2026-11-01 — 消化工程实战素材 CodeArts Telegram Bridge

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

## 2026-11-01 — 摘要页质量修复

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
