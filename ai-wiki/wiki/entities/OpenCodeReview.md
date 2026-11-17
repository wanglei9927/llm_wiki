---
tags: [OpenCodeReview, 代码评审, AI 编程, 阿里, code-review]
created: 2026-11-17
updated: 2026-11-17
sources: [OpenCodeReview 代码评审工具]
---

# OpenCodeReview

> OpenCodeReview（open-codereview.ai）是阿里集团开源的 AI 代码评审 CLI 工具，源自内部官方 AI 代码评审助手，采用「确定性工程 × LLM Agent」混合架构，主打比通用 agent 更高的评审精准度与更低的 token 成本。

## 它是什么

一个 AI 驱动的代码评审命令行工具：读取 Git diff，把变更文件交给一个带工具调用能力的 Agent（可配置 LLM，OpenAI & Anthropic 兼容），生成**行级精准**的结构化评审意见。Agent 能读完整文件、搜索代码库、检查其他变更文件以获取上下文，产出的是深层评审而非只停留在 diff 表面的反馈。除 diff 评审外，`ocr scan` 还能审整个文件/目录，用于审计陌生代码库。

项目背景：两年间作为阿里集团内部官方 AI 代码评审助手，服务数万开发者、识别数百万缺陷，经大规模验证后孵化开源。53.5k★、4.4k fork（2026-11），Go 编写，Apache-2.0。

## 核心架构：确定性工程 × Agent 混合

设计哲学是「让确定性的工程逻辑和 LLM Agent 各司其职，各做各擅长的」。

### 确定性工程（硬约束，保证不出错）

| 环节 | 作用 |
|---|---|
| 精准文件选择 | 确定哪些文件要审、哪些要过滤，不漏重要变更 |
| 智能文件打包 | 相关文件合成一个评审单元（如 `message_en.properties` + `message_zh.properties`），每个 bundle 作为独立上下文的 sub-agent 运行——分而治之，超大 changeset 下也稳定，天然支持并发 |
| 细粒度规则匹配 | 按文件特征匹配评审规则，收紧模型注意力，从源头消除信息噪音；模板引擎比纯语言规则引导更稳定可预测 |
| 外部定位 + 反思模块 | 独立的「评论定位」与「评论反思」模块，系统提升 AI 反馈的位置准确率与内容准确率 |

### Agent（动态决策，只做它擅长的）

- **场景化 prompt**：针对代码评审深度优化的 prompt 模板，提升效果同时降低 token。
- **场景化工具集**：从大规模生产数据的 tool-call 轨迹蒸馏（调用频率分布、单工具重复率、新工具对调用链的影响），得到比通用 agent 工具包更稳定、可预测的专用工具集。

## 主要能力

- **diff 评审**：`ocr review` 审当前变更，行级精准评论。
- **全量扫描**：`ocr scan` 审整个文件/目录。
- **内置多语言规则集**：NPE（空指针）、线程安全、XSS、SQL 注入等。
- **两种模式**：
  - **Native**：用 OCR 自己的 provider 配置与完整流水线。
  - **Delegation**：复用宿主 agent 的模型与鉴权，无需单独 API key；OCR 只提供流水线与护栏（文件选择、规则解析、覆盖要求、结构化报告）。

## 实用信息

- **安装**：`npm install -g @alibaba-group/open-code-review`，得到全局 `ocr` 命令。
- **Agent Skill**：`npx skills add alibaba/open-code-review`（支持 Claude Code / Codex / Cursor / Kimi Code）。
- **配置**：`ocr config provider` + `ocr config model`（Native 模式）；Delegation 模式无需单独配模型。
- **前置**：Git >= 2.41。
- **适用场景**：CI 流水线里的自动代码评审、陌生代码库审计、替代「用通用 agent 手动审代码」的低效做法。

## 不同素材中的观点

来自 [[OpenCodeReview 代码评审工具]]：

- 通用 agent 审代码的三大痛点（覆盖不全、位置漂移、质量不稳）根因是「纯语言驱动架构缺乏硬约束」，OpenCodeReview 用确定性工程给评审流程加硬约束来解。
- AACR-Bench 基准（50 仓库/200 PR/10 语言/1,505 条专家标注）显示：同模型下 precision/F1 更高、token 约 1/9、更快，但 Recall 更低（刻意用召回换精准、减少误报）。

## 评价与注意

- **优点**：行级精准、token 省、内置规则集、双模式降低接入门槛、阿里大规模验证背书。
- **注意**：Recall 低于通用 agent，适合「宁漏勿错」的 CI 拦截场景；Native 模式需自配模型 provider；与 [[Elephant-Goldfish Model]]（设计/评审双角色工作流）定位不同——EGM 是角色化工作流，OpenCodeReview 是工程化评审流水线。

## 相关页面

- [[OpenCodeReview 代码评审工具]]
- [[Claude Code]]
- [[Elephant-Goldfish Model]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
- [[工具集]]
