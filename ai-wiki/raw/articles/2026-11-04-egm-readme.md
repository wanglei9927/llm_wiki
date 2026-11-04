# Elephant-Goldfish Model (EGM) — 原始素材与文档研究

- 仓库：https://github.com/google/elephant-goldfish-model
- 官网：https://egm.dev
- 抓取时间：2026-11-04
- 抓取方式：x.com 直连不通，GitHub 经本机代理 127.0.0.1:7897 抓取；抓取 README.md、docs/getting_started.md、docs/harnesses.md、docs/faq.md、docs/index.md、docs/designs/architecture.md、skills/egm-brainstorm/SKILL.md、skills/egm-review/SKILL.md、agents/design_critic.md
- 仓库元数据（GitHub API，2026-11-04）：11143 stars · 751 forks · Python · Apache-2.0 · 创建 2026-09-13 · 最近推送 2026-11-03 · 375 个文件

---

## README 原文要点（英文逐字节选）

> Thousands of Google engineers use EGM, an open-source plugin, to draft specs with deep-context agents and stress-test them with zero-context subagents before writing code.

> **Elephant** holds your project context and drafts the specification. **Goldfish** reviewers examine the draft and referenced source material without the earlier conversation, helping expose unstated assumptions and blind spots. **You** make the architectural trade-offs and approve the specification before implementing.

> Use it when a feature needs design decisions before implementation. For a small, clear bug fix, use your normal coding workflow.

四步首次设计：

```text
/egm-brainstorm Add webhook delivery to this project.   # 讨论需求与取舍，产出 concepts_brief.md
/egm-draft                                              # 把 brief 变成 design_draft.md，逐节确认
/egm-review design_draft.md                             # 零上下文评审，列出问题
# （人类）选择要处理的发现 → 批准设计 → 让 agent 实现
```

安装：

```sh
# Antigravity CLI
agy plugin install https://github.com/google/elephant-goldfish-model
# Claude Code
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm
# Codex
codex plugin marketplace add google/elephant-goldfish-model
codex plugin add egm@egm
```

## docs/getting_started.md（工作流）

- EGM 是 Spec-Driven Development（SDD）的一种实现，理论来源是 Dave Rensin 的文章《Elephants, Goldfish, and the New Golden Age of Software Engineering》。
- 核心循环：`/egm-brainstorm`（6 视角 Goldfish 压测概念 → concepts_brief.md）→ `/egm-draft`（逐节写 docs/designs/ 下的设计文档）→ `/egm-review`（零上下文多阶段评审）→ 人类评审（发 PR）→ 实现。
- 漂移检测：`/egm-drift-report` 对比已入库文档与当前代码，发现分叉后由人类决定改文档还是改代码；建议每周一次。
- 引导既有代码库：`/egm-bootstrap <path>` 自底向上递归生成目录 README 层级（叶子目录 → 父目录 → 根目录），建立代码库上下文；人类仍需审查输出。
- 推荐项目结构：
  ```text
  path/to/project
  ├── _agents/skills/<project>_elephant/SKILL.md   # 可选：项目上下文加载技能
  └── docs/designs/
      ├── SITEMAP.md
      └── FEATURE.md
  ```
- 可选的 `<project>-elephant` 自定义技能：只需说明项目是什么，并给出最相关上下文的链接。

## docs/harnesses.md（宿主适配）

- 支持的宿主与安装：Antigravity CLI/App/IDE、Claude Code、Claude Cowork、OpenAI Codex、ChatGPT/ChatGPT Work、omp、Muse；**不支持** Antigravity IDE standalone（缺少 fresh-context 子代理工具）。
- 每个宿主共享同一份 `skills/`、`agents/`、`resources/`，不复制 skill 文本。
- 子代理委派映射：Antigravity `invoke_subagent`；Claude Code `Agent`(Task)；Codex `spawn_agent`；omp `task`。没有命名 persona 的宿主就 spawn 通用子代理并让它先读 `agents/<file>.md`。
- **Goldfish 评审必须有全新上下文**；宿主没有子代理工具时评审直接停止，不会在同一上下文里假装评审。
- 产物目录可在 `CLAUDE.md` / `AGENTS.md` 里声明：`EGM artifact directory: .dev/docs`。
- 已知限制：Codex / Antigravity 存在「指令文件泄漏」报告（fork 隔离只保证父轮次隔离，不保证项目/用户指令文件被排除）；Claude 评审适配器设置 `omitClaudeMd: true`。
- 支持状态：Antigravity CLI、Claude Code、Codex 通过自动化安装与端到端 fixture；其余宿主有社区验证但自动化不足。

## docs/index.md（理念）

- **Elephant**：记得一切——把系统的历史、用户旅程、逻辑组件等上下文喂给 LLM，让它能自然讨论系统如何组合；只读代码做不到这一点。
- **Goldfish**：三秒记忆（官方脚注：这是迷思，但比喻好用）——让 LLM 在没有「答案是怎么来的」上下文的情况下评审产出，减少幻觉带来的自我确认。
- **Humans**：拥有结果。AI 是工具不是决策者；人类负责引导设计讨论、挑战建议、做决定。
- 收益：速度（前置对齐减少返工）、准确性（前置设计细节给 AI 明确参照）、团队（交接/onboarding/triage 更容易）。

## docs/faq.md（官方 FAQ 要点）

- EGM 不是唯一方案，只是其中一种；结果由你负责。
- 产出三件套：设计文档（peer-reviewed spec）、实现清单（改哪些文件、怎么验证）、增强的上下文循环（README 层级等）。
- SWE 不会消失，但代码生成会更多交给 agent，人类转向治理意图与评审架构决策。
- 文档多了可能造成评审瓶颈：建议只用 EGM 做「现在最重要的事」，不要什么都写设计文档。
- 不一定提升速度：小改动可能不值得；比较总时间、有效发现和返工后再判断。
- 零上下文 agent 能完全理解设计文档吗？不一定，LLM 非确定；像带新工程师一样判断。

## skills / agents 样例

- `skills/egm-brainstorm/SKILL.md`：frontmatter `disable-model-invocation: true`；要求「Artifact-First」——禁止在聊天里贴大段方案，必须先写文件再给链接；必须先多轮开放式澄清、用户确认 readiness 后才能 spawn 子代理。
- `agents/design_critic.md`（persona `egm-design`）：严格只读、无状态、无寒暄；BRAINSTORM 模式关注成本与配额经济（峰值 QPS、存储、DB 查询、LLM token 预算）。
- `skills/egm-review/SKILL.md`：五阶段评审——Initial Zoom Out、Comprehension、Design Critique、Intermediate Zoom Out、Implementation Readiness；硬性规则包括禁止谄媚（banned adjectives）、先批评后肯定、生成反方论点。
