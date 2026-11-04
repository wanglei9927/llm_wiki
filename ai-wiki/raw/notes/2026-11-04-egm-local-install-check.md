# EGM 本机安装核查记录（Claude Code）

> 2026-11-04 对 Claude Code 环境中已安装的 `egm@egm` 插件做的一次实测核查。
> 本素材为第一手本机记录：读取插件清单、配置、7 个 SKILL.md、9 个 persona 文件和官方 Claude Code 集成文档，逐字摘录关键约束。

## 核查方法

- 读取 `~/.claude/plugins/installed_plugins.json`
- 读取 `~/.claude/settings.json`（`enabledPlugins` / `extraKnownMarketplaces`）
- 遍历插件目录 `~/.claude/plugins/cache/egm/egm/0.1.0/`
- 读取 `plugin.json`、`skills/*/SKILL.md`、`agents/*.md`、`docs/claude.md`

## 安装事实

| 项 | 值 |
|---|---|
| 插件坐标 | `egm@egm` |
| 版本 | `0.1.0` |
| 安装时间 | `2026-11-03T16:35:07Z` |
| 作用域 | `user` |
| 安装路径 | `C:\Users\user\.claude\plugins\cache\egm\egm\0.1.0` |
| git commit | `464db031e7dd1b9a79803ac8ea45f55c7c20c5bc` |
| 启用状态 | `settings.json` → `enabledPlugins["egm@egm"] = true` |
| Marketplace 源 | `github` → `google/elephant-goldfish-model` |
| 许可 | Apache-2.0（非 Google 官方支持产品） |

## 七个 skill 的 frontmatter 原文

- `egm-bootstrap`：Bootstrap directory README.md files across a repository subtree.
- `egm-brainstorm`：Interactive ideation and brainstorming skill for the Elephant & Goldfish Model (EGM). Helps turn half-baked concepts into structured hypotheses via clarifying questions, review, and iterative refinement. Produces an RFC summary for human review or more detailed design with egm-draft.
- `egm-draft`：Drafts a design document section-by-section using the concepts brief from egm-brainstorm (or user notes). This is the second step in the Elephant-Goldfish (EGM) feature flow.
- `egm-drift-report`：Runs drift detection on all design documents to check for document and code consistency. Produces an actionable report with differences.
- `egm-resolve`：The Elephant resolution skill. Ingests flat deficiency reports from concurrent Goldfish reviewers, applies automated fixes for PROPOSE FIX items via UI multiple-choice gates, and presents interactive negotiation/re-sync checkpoints.
- `egm-review`：Orchestrates the EGM Goldfish Review Protocol. Executes five review phases: Initial Zoom Out Review, Comprehension Review, Design Critique, Intermediate Zoom Out Review, and Implementation Readiness.
- `egm-review-loop`：Executes the Antagonistic-Review process from the Elephant-Goldfish Model (EGM) via an automated multi-agent review loop to audit documents against qualitative standards and structural templates, and automatically apply approved fixes.

七个 SKILL.md 的 frontmatter 都包含 `disable-model-invocation: true`。

## 九个 reviewer persona 原文描述

- `egm-bootstrap-orchestrator`：Orchestrates directory README documentation, partitions subtrees, and coordinates worker subagents.
- `egm-codebase-details`：Pedantic Technical Quality Auditor verifying that documentation accurately and exhaustively matches actual codebase implementation and existing library reuse opportunities.
- `egm-comprehension`：Naive Reader persona auditing documents with zero assumed institutional knowledge, flagging undefined terms, acronyms, and comprehension gaps.
- `egm-design`：Hostile Design Critic persona focused on system architecture, scalability, infrastructure economics, and unmitigated risks.
- `egm-implementation-readiness`：Pragmatic Tech Lead persona verifying that implementation plans contain unambiguous, fully actionable execution instructions without leaving design decisions to the implementer.
- `egm-structural`：Structural Layout Validator and Document Architect persona focused on symmetry, heading hierarchy, formatting, and template compliance.
- `egm-style`：Technical Copy Editor persona focused on clarity, precision, brevity, objective framing, and stripping fluff.
- `egm-synthesizer`：Intermediate Swarm Compiler and Aggregator coordinating parallel Goldfish reviewers, deduplicating findings, and compiling deliverable reports.
- `egm-zoom-out`：Skeptical Architect persona focused on high-altitude simplicity, minimalism, YAGNI, and codebase reuse.

所有 Goldfish persona 都声明三条通用约束：严格只读（无写文件/编译工具）、零对话历史（stateless）、禁止闲聊。

## docs/claude.md 关键原文

> Use Claude Code 2.1.271 or later for `omitClaudeMd` support. Older versions must not be treated as verified Goldfish isolation environments.

> Enable the installed plugin with `claude plugin enable egm@egm`. Start messages with `/egm:egm-brainstorm`, `/egm:egm-draft`, or `/egm:egm-review`. Skills retain `disable-model-invocation: true`: their absence from automatic skill discovery is expected. The `Skill` tool refuses these skills, so to run another EGM skill (for example `egm-review-loop` or `egm-resolve` during review Stages 7 and 9), read its `SKILL.md` and follow it in the same thread. Do not use the `Skill` tool for EGM skills. Keep drafting and orchestration in the main context.

> Write briefs, drafts, and reports to the user's working directory. The per-session scratchpad is not the artifact directory: it belongs to one session, and the deliverables must outlive it. If the user's prompt or agent instructions file (`CLAUDE.md` or `AGENTS.md`) has a line `EGM artifact directory: <path>`, write them to that folder instead.

> In Claude Code, `egm:egm-synthesizer` may spawn reviewers (nesting is allowed up to 3 levels by default), or the main context may dispatch reviewers directly.

## 调用实测结论

1. **不能用 Skill 工具触发**：7 个 skill 都是 `disable-model-invocation: true`，不会进入自动 skill 发现列表，`Skill` 工具会直接拒绝。只能由用户输入 `/egm:egm-<name>`。
2. **评审依赖全新上下文子代理**；官方明确，宿主没有子代理工具时评审直接停止，不允许在同一上下文假装评审。
3. **草稿与编排留在主上下文**；`egm-review-loop` / `egm-resolve` 在评审第 7/9 阶段由主上下文读 `SKILL.md` 后同线程执行。
4. **产物默认落工作目录**；可用 `EGM artifact directory: <path>` 覆盖，相对路径按工作目录解析。
5. **`egm:egm-synthesizer` 可再派发评审员**，Claude Code 默认允许最多 3 层嵌套。
