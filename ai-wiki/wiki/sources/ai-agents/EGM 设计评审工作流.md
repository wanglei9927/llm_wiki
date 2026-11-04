---
tags: [EGM, Elephant-Goldfish, Google, Spec-Driven-Development, AI Agent, 设计评审, 开源]
created: 2026-11-04
updated: 2026-11-04
source_path: raw/articles/EGM 设计评审工作流.md
---

# Elephant-Goldfish Model（EGM）：用「大象 + 金鱼」双角色把 AI 设计评审做成流程

> Google 开源的一套 AI 设计-评审工作流：大象（带完整项目上下文的 agent）写设计文档，金鱼（零上下文的子代理）挑刺，人类拍板做取舍；配套 7 个 skill，支持 Antigravity / Claude Code / Codex 等 9 个宿主

## 基本信息

| 项目 | 内容 |
|---|---|
| 素材类型 | GitHub 仓库（README + 6 篇官方文档 + skill/persona 样例） |
| 项目 | Elephant-Goldfish Model（EGM），Google 开源，Apache-2.0，非官方 Google 产品 |
| 仓库 | https://github.com/google/elephant-goldfish-model · 官网 https://egm.dev |
| 热度 | 11,143 stars · 751 forks（2026-11-04） |
| 规模 | 375 个文件；7 个 skill、9 个 reviewer persona；Python 工具链 |
| 理论来源 | Dave Rensin《Elephants, Goldfish, and the New Golden Age of Software Engineering》 |
| 原始素材 | raw/articles/EGM 设计评审工作流.md |

## 核心观点

1. **它解决的是「AI 写代码之前的设计环节」**：README 原话是 "draft specs with deep-context agents and stress-test them with zero-context subagents before writing code"。不是又一个新的编程 agent，而是给现有 agent 加一套**设计-评审协议**。

2. **「大象 + 金鱼」是一组反直觉的上下文设计**：大象记得所有项目历史、需求、既往决策，负责把模糊想法变成规格；金鱼**故意只看到设计文档和它引用的源码**，看不到之前的对话——因为如果评审者知道「这个方案是怎么来的」，就会替作者补全漏洞，暴露不出隐含假设。

3. **人类是第三个角色，而且必须是决策者**：官方原话 "You own the outcomes"。金鱼会给出大量反馈（by design），人类挑要处理的；设计批准前不写代码。AI 是工具不是决策者。

4. **落地形态是 7 个可单独使用的 skill**：`egm-brainstorm`（概念压测，6 视角金鱼）→ `egm-draft`（逐节写设计文档）→ `egm-review`（五阶段零上下文评审）→ `egm-resolve`（处理评审发现）→ 可选 `egm-bootstrap`（给存量代码库生成 README 层级上下文）、`egm-review-loop`（配置一组评审者跑特定任务）、`egm-drift-report`（文档与代码漂移检测，建议每周一次）。

5. **有明确的「别用」边界**：小 bug 修复别用 EGM，用正常编码流程；不要给所有改动都写设计文档，否则评审会变成瓶颈。官方 FAQ 承认「不一定提升速度」，要自己比较总时间、有效发现和返工。

6. **对宿主有硬要求**：金鱼评审必须有**全新上下文的子代理**；宿主没有子代理工具时，评审直接停止而不是在同一上下文里假装评审。这决定了它能不能接进某个工具。

## 它是什么（翻译与解释）

EGM 是 **Spec-Driven Development（规格驱动开发）** 的一种实现。它的比喻对应三个角色：

| 角色 | 记忆 | 职责 |
|---|---|---|
| **Elephant（大象）** | 项目全部上下文：需求、历史决策、代码结构 | 探索问题、起草规格（design doc） |
| **Goldfish（金鱼）** | 只有设计文档 + 引用的源码，**没有之前的对话** | 找缺失的假设、含糊的需求、实现风险 |
| **You（人类）** | 目标与约束 | 做架构取舍、批准设计、决定做什么 |

为什么这样有效：LLM 有自我确认倾向——如果评审者看过「方案怎么来的」，它会顺着作者的思路补全，而不是像新人一样问「这里为什么这么设计」。把上下文剥掉，等于强制它当一次「刚入职的读者」。

## 怎么用（官方流程）

### 安装（选一个宿主）

```sh
# Claude Code
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm

# Codex
codex plugin marketplace add google/elephant-goldfish-model
codex plugin add egm@egm

# Antigravity CLI
agy plugin install https://github.com/google/elephant-goldfish-model
```

装完**重开一个会话**。在 Claude Code / Antigravity 里命令带 `/egm:` 前缀（如 `/egm:egm-brainstorm`）；Codex 从 skill 选择器里选。

### 第一次设计（以「给项目加 webhook 投递」为例）

```text
/egm-brainstorm Add webhook delivery to this project.   # 讨论需求与取舍 → concepts_brief.md
/egm-draft                                              # 逐节生成 design_draft.md，每节停下等你反馈
/egm-review design_draft.md                             # 金鱼五阶段评审，输出问题清单
# 人类：挑选要处理的发现 → 批准 → 让 agent 按设计实现
```

### 七个技能（可以按需单用，不必走全套）

| 技能 | 用途 |
|---|---|
| `egm-brainstorm` | 把半成品想法压测成结构化概念简报，产出 `concepts_brief.md` |
| `egm-draft` | 把简报/笔记写成正式设计文档（`docs/designs/`，逐节确认） |
| `egm-review` | 五阶段零上下文评审：Zoom Out → Comprehension → Design Critique → Zoom Out → Implementation Readiness |
| `egm-resolve` | 逐条处理评审发现，和人类达成修改共识 |
| `egm-bootstrap` | 给存量代码库自底向上递归生成 README 层级，建立上下文 |
| `egm-review-loop` | 按配置的一组 reviewer 执行特定评审任务 |
| `egm-drift-report` | 扫描设计文档与代码的漂移，人工决定改文档还是改代码；建议每周跑 |

### 项目里会多出什么

```text
docs/designs/
├── SITEMAP.md      # 设计索引
└── FEATURE.md      # 设计规格
_agents/skills/<project>_elephant/SKILL.md   # 可选：项目上下文加载技能
```

产物目录可以在 `CLAUDE.md` / `AGENTS.md` 里声明 `EGM artifact directory: .dev/docs`。

## 实操内容保留

> 原文是文档与命令（无应用代码），以下命令逐字保留。

**安装（三选一）**：

```sh
# Claude Code
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm

# Codex
codex plugin marketplace add google/elephant-goldfish-model
codex plugin add egm@egm

# Antigravity CLI
agy plugin install https://github.com/google/elephant-goldfish-model
```

**核心闭环**：

```text
/egm:egm-brainstorm Add webhook delivery to this project.   # → concepts_brief.md
/egm:egm-draft                                              # → design_draft.md，逐节确认
/egm:egm-review design_draft.md                             # 零上下文五阶段评审
# 人类挑选发现 → 批准设计 → 让 agent 实现
```

**周期维护**：

```text
/egm:egm-drift-report     # 对比 docs/designs 与代码，发现漂移（建议每周一次）
/egm:egm-bootstrap <path> # 对存量代码库递归生成 README 层级
```

**产物目录自定义**（写进 `CLAUDE.md` 或 `AGENTS.md`）：

```text
EGM artifact directory: .dev/docs
```

## 评价

### 亮点

- **把「上下文隔离」做成了制度**：不是靠提示词说「请挑刺」，而是用 fresh context 的物理隔离强制评审者不知情——这是它和普通「AI 自查」最本质的区别。
- **角色分工干净**：大象管记忆、金鱼管怀疑、人类管取舍，各自有明确的失败模式（大象会自我确认，金鱼会提太多，人类会偷懒）。
- **有产出物、可入库、可审查**：设计文档进 `docs/designs/`，能发 PR 给人评审，也能做漂移检测——比"聊天里聊完就忘"可持续。
- **明确说"什么时候别用"**：官方 FAQ 承认不一定提速、可能造成评审瓶颈，这种克制在工具营销里少见。
- **工程完成度高**：9 个宿主、自动化安装 fixture、端到端测试、明确的不支持清单（如 Antigravity IDE standalone）。

### 局限与待验证

- **必须有 fresh-context 子代理**：宿主不支持就没有金鱼评审，等于残废；且官方承认 Codex/Antigravity 存在「指令文件泄漏」——子代理仍可能看到项目 `AGENTS.md`，严格意义上不算完全零上下文。
- **不是零成本**：每次评审 spawn 多个子代理、每个都要读设计文档和源码，token 与时间开销明显；小改动不划算。
- **评审质量依赖设计文档质量**：文档写得含糊，金鱼只能挑出「含糊」本身；官方也承认零上下文 agent 不一定能完全理解设计。
- **可能制造新的瓶颈**：设计和评审都要人参与，文档一多，人工评审就成了新瓶颈。
- **DSH 目前不在官方支持列表**（详见实体页的适配评估）。

### 适合谁

- 有「设计先行」习惯的团队，或者想给 AI 编码加一道质量闸的个人开发者
- 正在做**架构级/跨模块**改动，需要提前暴露隐含假设的人
- 想学习「怎么让 LLM 互相评审而不互相吹捧」的提示词工程实践者

## 原文精彩摘录

> Thousands of Google engineers use EGM, an open-source plugin, to draft specs with deep-context agents and stress-test them with zero-context subagents before writing code.

> **Elephant** holds your project context and drafts the specification. **Goldfish** reviewers examine the draft and referenced source material without the earlier conversation, helping expose unstated assumptions and blind spots.

> A Goldfish review needs a fresh context. If a harness has no subagent tool, the review skills stop instead of running in the same context.

> EGM is one of the ways teams are making LLMs work better. It is not *the* way. … Regardless of the tool you choose, please remember: *You own the outcomes.*

## 关键概念

- [[Elephant-Goldfish Model]]：本素材的主体，含完整机制与适配评估（实体页）
- [[EGM 学习手册]]：面向入门的中文学习手册（综合分析页）
- Spec-Driven Development（SDD）：先写规格再写代码的开发范式
- Fresh-context review：零上下文评审，靠隔离而非提示词来减少自我确认
- [[AI编程开发]]：本素材归属的知识领域

## 相关页面

- [[Elephant-Goldfish Model]]
- [[EGM 学习手册]]
- [[AI编程开发]]
- [[Claude Code]]
