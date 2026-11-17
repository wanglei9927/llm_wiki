---
tags: [OpenCodeReview, 代码评审, AI 编程, 阿里, code-review, 工具]
created: 2026-11-17
updated: 2026-11-17
source_path: raw/articles/2026-11-17-open-code-review.md
---

# OpenCodeReview：阿里 AI 代码评审工具

> GitHub alibaba/open-code-review（53.5k★ / 4.4k fork / Apache-2.0 / Go）——源自阿里集团内部官方 AI 代码评审助手，两年服务数万开发者、识别数百万缺陷后孵化的开源 CLI 工具。

## 基本信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/alibaba/open-code-review |
| 官网 | https://open-codereview.ai |
| 语言 | Go（npm 包 `@alibaba-group/open-code-review`） |
| 协议 | Apache-2.0 |
| 热度 | 53,511★ / 4,404 fork / 354 issue（2026-11-17） |
| 定位 | 混合架构代码评审工具：确定性流水线 + LLM Agent |
| 兼容 | OpenAI & Anthropic 兼容；Windows/macOS/Linux；Claude Code / Codex / Cursor / Kimi Code |

## 核心观点

1. **用「确定性工程 × Agent 混合」解决通用 agent 审代码的三大痛点**：通用 agent（如 Claude Code + Skill）审代码存在覆盖不全（大 changeset 上挑着审）、位置漂移（行号/文件引用跑偏）、质量不稳（自然语言驱动难调试、prompt 微调就波动）。根因是「纯语言驱动的架构缺乏对评审流程的硬约束」。

2. **确定性工程负责「不能出错」的步骤**：精准文件选择（决定哪些文件要审、哪些过滤）、智能文件打包（把 `message_en.properties` 和 `message_zh.properties` 合并成一个 sub-agent 评审单元，大 changeset 下分而治之、天然支持并发）、细粒度规则匹配（模板引擎按文件特征匹配规则，比纯语言规则引导更稳定）、外部定位 + 反思模块（独立模块系统提升 AI 反馈的位置与内容准确率）。

3. **Agent 只做「动态决策」**：场景化 prompt（深度优化、降 token）+ 场景化工具集（从大规模生产数据的 tool-call 轨迹蒸馏而来——调用频率分布、单工具重复率、新工具对调用链的影响——比通用工具包更稳定可预测）。

4. **Benchmark 数据**（AACR-Bench：50 个热门开源仓库、200 个真实 PR、10 种语言、80+ 高级工程师交叉标注 1,505 条 ground-truth）：相比通用 agent（Claude Code），**Precision 与 F1 显著更高，token 只有约 1/9，评审更快**；Recall 更低——这是「用召回换精准、减少误报」的刻意取舍。

5. **两种使用模式**：Native（用 OCR 自己的 provider 配置 + 完整评审流水线）vs Delegation（复用宿主 agent 的模型与鉴权，无需单独 API key，OCR 只提供流水线与护栏：文件选择、规则解析、覆盖要求、结构化报告）。

## 实操内容保留

**安装**：

```bash
npm install -g @alibaba-group/open-code-review   # 得到全局 ocr 命令
```

**Agent Skill 方式**（Claude Code / Codex / Cursor / Kimi Code）：

```bash
npx skills add alibaba/open-code-review
```

**配置 LLM（Native 模式）**：

```bash
ocr config provider   # 选内置 provider 或自定义
ocr config model      # 为当前 provider 选模型
```

**评审命令**：

```bash
ocr review            # 审当前 git diff
ocr scan              # 审整个文件/目录（审计陌生代码库）
```

**前置依赖**：Git >= 2.41。

## 原文精彩摘录

> Open Code Review is an AI-powered code review CLI tool. It originated as Alibaba Group's internal official AI code review assistant — over the past two years, it has served tens of thousands of developers and identified millions of code defects.

> The root cause: a purely language-driven architecture lacks hard constraints on the review process.

> Compared to general-purpose agents (Claude Code), Open Code Review achieves significantly higher Precision and F1 with the same underlying model, while consuming only ~1/9 of the tokens and completing reviews faster. Note that its Recall is lower than general-purpose agents — a deliberate trade-off favoring precision over noise.

## 关键概念

- [[OpenCodeReview]]（实体）
- 关联：[[Claude Code]]、[[Elephant-Goldfish Model]]、[[AI Agent 智能体]]

## 相关页面

- [[OpenCodeReview]]
- [[AI编程开发]]
- [[工具集]]
