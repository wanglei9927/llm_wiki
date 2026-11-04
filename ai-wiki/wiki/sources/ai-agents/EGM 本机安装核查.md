---
tags: [EGM, Claude Code, 插件安装, Skill, 设计评审, 本地核查]
created: 2026-11-04
updated: 2026-11-04
source_path: raw/notes/EGM 本机安装核查.md
---

# EGM 在 Claude Code 的本机安装与调用核查

> 实测确认：`egm@egm` v0.1.0 已于 2026-11-03 安装并启用；7 个 skill 全部 `disable-model-invocation: true`，只能通过 `/egm:egm-*` 手动调用，`Skill` 工具会拒绝；评审必须使用全新上下文子代理，草稿与编排留在主上下文。

## 基本信息

| 项目 | 内容 |
|---|---|
| 素材类型 | 本机安装核查（配置 + 官方文档 + skill/persona 原文） |
| 插件 | `egm@egm` v0.1.0（Google EGM，Apache-2.0，非官方支持产品） |
| 安装时间 / 作用域 | 2026-11-03 / `user` |
| 启用状态 | `settings.json` → `enabledPlugins["egm@egm"] = true` |
| 安装路径 | `C:\Users\user\.claude\plugins\cache\egm\egm\0.1.0` |
| Marketplace | `github` → `google/elephant-goldfish-model` |
| 原始素材 | raw/notes/EGM 本机安装核查.md |

## 核心观点

1. **本机装的是完整插件，不只是 skill 目录**：`installed_plugins.json` 记录 `egm@egm` 版本 `0.1.0`、安装于 `2026-11-03T16:35:07Z`、作用域 `user`；`settings.json` 中 `enabledPlugins["egm@egm"] = true`，说明处于启用状态而不是仅下载。

2. **7 个 skill 全部禁止模型自动调用**：`egm-bootstrap`、`egm-brainstorm`、`egm-draft`、`egm-drift-report`、`egm-resolve`、`egm-review`、`egm-review-loop` 的 `SKILL.md` frontmatter 都带 `disable-model-invocation: true`。因此它们不出现在自动 skill 发现列表中，这是设计预期，不是安装失败。

3. **`Skill` 工具会拒绝这些 skill**：官方 `docs/claude.md` 明确要求用 `/egm:egm-<name>` 触发；当 `egm-review` 进行到第 7/9 阶段需要 `egm-review-loop` 或 `egm-resolve` 时，做法是**读取对应 `SKILL.md` 并在当前线程执行**，而不是调用 `Skill` 工具。

4. **上下文分工是硬约束**：草稿（draft）与编排（orchestration）必须留在主上下文（Elephant）；Goldfish 评审必须运行在全新上下文子代理中。宿主没有子代理能力时，评审直接停止，不允许「同一上下文假装评审」。

5. **产物必须落在工作目录而不是会话临时目录**：默认写到用户工作目录；如果 `CLAUDE.md` / `AGENTS.md` 含 `EGM artifact directory: <path>`，则写到该目录，相对路径按工作目录解析。官方特别说明：per-session scratchpad 只属于单次会话，交付物必须能跨会话存在。

6. **9 个 persona 都是只读、无记忆、不闲聊**：`egm-codebase-details`（技术事实核查）、`egm-comprehension`（零背景新人）、`egm-design`（敌意设计批判）、`egm-implementation-readiness`（可实施性）、`egm-structural`（结构）、`egm-style`（文风）、`egm-zoom-out`（简化/YAGNI）、`egm-synthesizer`（汇总去重）、`egm-bootstrap-orchestrator`（README 编排）。所有 Goldfish persona 都声明无写文件/编译工具、零对话历史、禁止闲聊。

## 实操内容保留

### 命令 / 调用

```text
/egm:egm-brainstorm   # 概念压测 → concepts_brief.md
/egm:egm-draft        # 逐节写 design_draft.md
/egm:egm-review       # 五阶段零上下文评审
/egm:egm-resolve      # 逐条处理评审发现
/egm:egm-review-loop  # 按配置的一组 reviewer 执行评审
/egm:egm-bootstrap    # 给存量代码库生成 README 层级
/egm:egm-drift-report # 检测文档与代码漂移
```

### 配置

```text
# settings.json
"enabledPlugins": { "egm@egm": true }
"extraKnownMarketplaces": {
  "egm": { "source": { "source": "github", "repo": "google/elephant-goldfish-model" } }
}
```

```text
# CLAUDE.md 或 AGENTS.md（可选，自定义产物目录）
EGM artifact directory: <path>
```

### 关键约束

- Claude Code **2.1.271+** 才有 `omitClaudeMd` 支持；更早版本不应视为已验证的 Goldfish 隔离环境。
- 评审需要 fresh-context 子代理；没有子代理工具时评审停止。
- `egm:egm-synthesizer` 可再派发评审员，Claude Code 默认允许最多 3 层嵌套；主上下文也可直接派发。
- `egm-review-loop` / `egm-resolve` 在第 7/9 阶段通过「读 `SKILL.md` + 同线程执行」运行，不用 `Skill` 工具。

## 原文精彩摘录

> Skills retain `disable-model-invocation: true`: their absence from automatic skill discovery is expected. The `Skill` tool refuses these skills, so to run another EGM skill (for example `egm-review-loop` or `egm-resolve` during review Stages 7 and 9), read its `SKILL.md` and follow it in the same thread. Do not use the `Skill` tool for EGM skills. Keep drafting and orchestration in the main context.

> Write briefs, drafts, and reports to the user's working directory. The per-session scratchpad is not the artifact directory: it belongs to one session, and the deliverables must outlive it.

> Use Claude Code 2.1.271 or later for `omitClaudeMd` support. Older versions must not be treated as verified Goldfish isolation environments.

## 关键概念

- [[Elephant-Goldfish Model]]：EGM 的完整机制与支持宿主（实体页）
- [[EGM 学习手册]]：中文入门与工作流结合方案（综合分析页）
- [[EGM 设计评审工作流]]：官方 README 与文档的原始消化（摘要页）
- [[Claude Code]]：本机宿主
- [[AI编程开发]]：所属知识领域

## 相关页面

- [[Elephant-Goldfish Model]]
- [[EGM 学习手册]]
- [[EGM 设计评审工作流]]
- [[Claude Code]]
- [[AI编程开发]]
