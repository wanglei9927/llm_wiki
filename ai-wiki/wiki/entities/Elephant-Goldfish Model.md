---
tags: [EGM, Google, 规格驱动开发, AI Agent, 设计评审, 多代理, 开源工具]
created: 2026-11-04
updated: 2026-11-04
sources: [2026-11-04-egm-readme]
---

# Elephant-Goldfish Model（EGM）

> Google 开源的 AI 设计-评审工作流：带完整项目上下文的「大象」agent 起草设计规格，零上下文的「金鱼」子代理挑刺，人类做架构取舍；以 7 个 skill 的形式分发给 Antigravity、Claude Code、Codex 等 9 个宿主，Apache-2.0，11,143 stars（2026-11-04）

## 简介

EGM 不是又一个编程 agent，而是一套**加在现有 agent 上的设计协议**。它要回答的问题是：AI 写代码越来越快，但「写之前想清楚」这一环没人管——设计决策散落在聊天记录里，AI 的隐含假设没人挑战，等到代码写完才发现方向错了。

EGM 的做法是把一次软件设计拆成三个角色：**Elephant** 持有项目的全部上下文（需求、历史决策、代码结构），负责把模糊想法扩写成可执行的规格；**Goldfish** 是刻意「失忆」的评审者，只拿到设计文档和它引用的源码，用新人视角找漏洞；**人类**负责拍板。项目的理论来源是 Dave Rensin 的文章《Elephants, Goldfish, and the New Golden Age of Software Engineering》，实现上是 Spec-Driven Development（SDD）的一种落地。

## 关键信息

| 项目 | 内容 |
|---|---|
| 全名 | Elephant-Goldfish Model（EGM） |
| 仓库 / 官网 | https://github.com/google/elephant-goldfish-model · https://egm.dev |
| 许可 | Apache-2.0（**非** Google 官方支持产品） |
| 语言 / 版本 | Python 工具链 + Markdown skill/persona；仓库 375 个文件 |
| 热度 | 11,143 stars · 751 forks（2026-11-04） |
| 创建 / 最近推送 | 2026-09-13 / 2026-11-03 |
| 组成 | 7 个 skill（`skills/`）+ 9 个 reviewer persona（`agents/`）+ 共享运行时规则（`resources/`） |
| 核心要求 | Goldfish 评审必须有**全新上下文子代理**；宿主没有该能力则评审停止 |

## 三个角色

| 角色 | 上下文 | 职责 | 失败模式 |
|---|---|---|---|
| Elephant | 项目全部上下文 | 探索问题、起草规格 | 自我确认，顺着已有方案写 |
| Goldfish | 只有文档 + 引用源码 | 找隐含假设、含糊需求、实现风险 | 反馈过多、可能误解设计 |
| Human | 目标与约束 | 做取舍、批准设计、决定做什么 | 偷懒放行 |

## 七个技能

| 技能 | 作用 |
|---|---|
| `egm-brainstorm` | 多轮澄清 + 6 视角金鱼压测，产出 `concepts_brief.md` |
| `egm-draft` | 把简报写成 `docs/designs/` 下的设计文档，逐节确认 |
| `egm-review` | 五阶段零上下文评审：Initial Zoom Out → Comprehension → Design Critique → Intermediate Zoom Out → Implementation Readiness |
| `egm-resolve` | 逐条处理评审发现，和人类确认改法 |
| `egm-bootstrap` | 对存量代码库自底向上递归生成 README 层级，建立上下文 |
| `egm-review-loop` | 按配置的一组 reviewer 执行指定评审任务 |
| `egm-drift-report` | 检测设计文档与代码的漂移，人工决定改哪边；建议每周一次 |

## 关键机制

- **Fresh-context 评审**：金鱼在独立子代理里运行，没有父对话历史。这是硬约束——宿主没有子代理工具时，评审直接停止，不允许「同一上下文里假装评审」。
- **Artifact-first**：skill 被硬性要求把方案/草稿/报告写进文件再给链接，禁止在聊天里贴大段内容，保证产物可追溯、可评审。
- **五阶段评审 + 9 个 persona**：zoom-out（全局视角）、comprehension（可理解性）、design_critic（架构与成本）、implementation_readiness（可实施性）等分工，评审规则包含「禁止谄媚、先批评后肯定、必须给反方论点」。
- **双时间尺度**：设计阶段用 brainstorm/draft/review；维护阶段用 drift-report 做周期性对齐。
- **项目上下文技能**：可选的 `<project>_elephant` SKILL.md 只做一件事——告诉 agent 项目是什么，并给出最相关上下文的链接。

## 支持的宿主（官方文档）

| 宿主 | 安装方式 | 子代理 |
|---|---|---|
| Antigravity CLI / App / IDE 扩展 | `agy plugin install <repo>` 或 `/plugin` | `invoke_subagent` |
| Claude Code | `claude plugin marketplace add … && claude plugin install egm@egm` | Agent（Task）工具 |
| Claude Cowork | claude.ai/plugins 或 Cowork 面板 | Cowork subagents |
| OpenAI Codex | `codex plugin marketplace add … && codex plugin add egm@egm` | 原生 spawn/wait |
| ChatGPT / ChatGPT Work | 插件上传或工作区导入 | 原生 spawn/wait |
| omp | `omp plugin marketplace add …` | `task` 工具 |
| Muse | `muse plugins install <本地路径>` | 原生子代理（通用回退） |
| Antigravity IDE standalone | **不支持**（无 fresh-context 子代理） | — |

## 在 DeepSeek Harness（DSH）里的适配评估

**结论：概念上匹配，但不能直接安装；需要手工搬运 + 少量适配，建议先在 Claude Code / Codex 上跑通再考虑移植。**

匹配的地方：

- DSH 有 **SKILL.md 技能系统**（支持 `name`、`description`、`disable-model-invocation`、`user-invocable` 等 frontmatter），EGM 的 7 个 skill 就是标准 SKILL.md。
- DSH 有 **subagent / teammate**（独立上下文），理论上可以承担 Goldfish 的「零上下文评审」角色。
- DSH 支持 `/技能名` 的用户显式调用，可对应 `/egm-brainstorm` 这类命令。

不匹配的地方：

1. **没有 dsh 安装器**：官方 harness 列表不含 DSH，`plugin.json` / marketplace 也不认 DSH 的 cordis bundle。
2. **工具名硬编码**：skill 正文里写死了 `invoke_subagent` / `Agent` / `spawn_agent` / `${CLAUDE_PLUGIN_ROOT}`，需要改成 DSH 的对应工具（subagent / spawn_teammate）和路径。
3. **review 依赖「fresh context」语义**：DSH 的 subagent 是独立上下文，但 DSH 也会注入工作区指令（AGENTS.md 等），和官方承认的「指令文件泄漏」是同一种边界问题，需要在评审提示里显式要求把项目约定当评审标准。
4. **产物目录约定**：可用 `EGM artifact directory` 思路，在 DSH 会话里直接指定输出目录。

## 不同素材中的观点

- **[来源: [[2026-11-04-egm-readme]]]** 官方 README 与 docs 强调三件事：上下文隔离是评审有效性的前提（"A Goldfish review needs a fresh context"）、人类拥有结果（"You own the outcomes"）、以及「不是所有改动都值得走 EGM」（小 bug 用正常流程）。FAQ 还主动承认可能不提升速度、可能制造评审瓶颈——这种自我限制说明它把自己定位成**协议**而不是**银弹**。

## 相关页面

- [[2026-11-04-egm-readme]]
- [[EGM 学习手册]]
- [[AI编程开发]]
- [[Claude Code]]
- [[DeepSeek Harness]]
