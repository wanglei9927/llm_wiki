---
tags: [EGM, 学习手册, 规格驱动开发, AI Agent, 设计评审, 工作流]
created: 2026-11-04
updated: 2026-11-04
sources: [EGM 设计评审工作流, EGM 本机安装核查]
---

# EGM 学习手册（中文入门）

> 面向第一次接触 EGM 的读者：先搞懂它是什么、再决定怎么用、最后结合你自己的工作流落地。读完这一页，你就能判断值不值得投入，并知道第一步该做什么。

## 0. 三分钟版本

**EGM = 让 AI 先写设计文档、再用「失忆的 AI」挑刺、最后由人拍板。**

三个角色一句话记住：

- 🐘 **大象** = 记得你项目一切的 AI，负责写设计
- 🐟 **金鱼** = 只看到文档、看不到聊天记录的 AI，负责挑刺
- 🧑 **你** = 做取舍、批准设计的人

它解决的问题不是「AI 不会写代码」，而是「AI 写代码太快，但写之前的思考没人管」。它的核心创新不是提示词技巧，而是**用上下文隔离强制评审者保持怀疑**——金鱼不知道方案怎么来的，所以不会替作者补漏洞。

---

## 1. 这是什么？

### 1.1 一句话定义

EGM（Elephant-Goldfish Model）是 Google 开源的 **Spec-Driven Development（规格驱动开发）** 实现：在写代码之前，用两个上下文不同的 AI 角色把「要做什么、为什么这么做、怎么验证」写成一份可评审的设计文档。

### 1.2 为什么它有效

普通 AI 自查的问题：你让同一个 AI「检查一下这个方案」，它记得自己是怎么想的，于是倾向于说「没问题」。这是 LLM 的自我确认偏差。

EGM 的解法是物理隔离：金鱼运行在**全新的子代理**里，只拿到设计文档和文档引用的源码。它被迫像一个刚入职的新人一样读文档——文档没写清楚的，它就只能问。

### 1.3 和普通 AI 编码流程的区别

| 维度 | 普通流程 | EGM |
|---|---|---|
| 起点 | 直接说「帮我实现 X」 | 先 brainstorm，把需求问清楚 |
| 设计 | 散落在聊天里 | 落成 `docs/designs/*.md`，可发 PR |
| 评审 | 自己检查 / 或没有 | 零上下文多角色评审，输出问题清单 |
| 决策 | 边写边改 | 人先批准设计，再写代码 |
| 维护 | 文档很快过期 | `egm-drift-report` 周期性对齐文档与代码 |

### 1.4 产出物（官方说法）

1. **设计文档**：被同行评审过的技术规格，写清意图、系统不变量、方向。
2. **实现清单**：改哪些文件、怎么改、怎么验证。
3. **增强的上下文**：README 层级等，让后续 AI 更懂你的代码库。

---

## 2. 怎么用？

### 2.1 先选宿主（决定你有没有金鱼）

EGM 支持 Antigravity、Claude Code、Claude Cowork、Codex、ChatGPT、omp、Muse。**关键门槛：宿主必须有「全新上下文的子代理」能力**，否则金鱼评审直接不执行。

最省事的是 Claude Code：

```sh
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm
```

装完**重开会话**。命令带 `/egm:` 前缀。

### 2.2 第一次设计：四步走

选一个「需要做设计决策」的功能（别选一行就能改完的 bug），例如「给项目加 webhook 投递」：

```text
第 1 步  /egm:egm-brainstorm 给项目加 webhook 投递
         → 它会连问你几轮（重试策略？重复事件？幂等键？）
         → 产出 concepts_brief.md

第 2 步  /egm:egm-draft
         → 把简报扩成设计文档，每写完一节停下来等你确认
         → 产出 design_draft.md

第 3 步  /egm:egm-review design_draft.md
         → 五阶段评审，输出一大堆问题（这是设计如此）

第 4 步  （你）挑要处理的问题 → 批准 → 让 agent 按设计实现
```

**重要心态**：评审会给你很多反馈，**不是每条都要改**。它的价值是让你看到「原来这里我没想清楚」，而不是替你做决定。

### 2.3 七个技能速查

| 想做什么 | 用哪个 |
|---|---|
| 只有一个模糊想法 | `egm-brainstorm` |
| 有笔记/简报，想变成正式设计 | `egm-draft` |
| 设计写完了，想被挑刺 | `egm-review` |
| 评审意见太多，想逐条处理 | `egm-resolve` |
| 接手一个没有文档的老项目 | `egm-bootstrap` |
| 想按固定评审组跑任务 | `egm-review-loop` |
| 怀疑文档和代码已经对不上 | `egm-drift-report`（建议每周） |

### 2.4 项目里会多出什么

```text
docs/designs/
├── SITEMAP.md      # 设计索引
└── FEATURE.md      # 设计规格
```

可选加一个项目上下文技能 `_agents/skills/<project>_elephant/SKILL.md`，告诉 AI「这个项目是什么、去哪找相关上下文」。

产物目录可自定义：在 `CLAUDE.md` 或 `AGENTS.md` 里写 `EGM artifact directory: .dev/docs`。

### 2.5 什么时候别用

- 一行就能改完的 bug 修复
- 你已经完全想清楚、没有取舍空间的小改动
- 赶时间且可回滚的实验性代码

官方原话：小改动用你平时的编码流程就行。

### 2.6 本机（Claude Code）调用注意

本机已装 `egm@egm` v0.1.0（2026-11-03，user 作用域，已启用）。实测后有三条容易踩的：

1. **只能用斜杠命令**：7 个 skill 都是 `disable-model-invocation: true`，不会出现在自动 skill 列表里，`Skill` 工具也会拒绝。必须输入 `/egm:egm-brainstorm` 这类命令。
2. **评审中途的 skill 不走 `Skill` 工具**：`egm-review` 第 7/9 阶段要用 `egm-review-loop` / `egm-resolve` 时，官方做法是读对应 `SKILL.md` 并在当前线程执行；草稿与编排始终留在主上下文。
3. **产物写工作目录**：默认落在当前工作目录；若 `CLAUDE.md` / `AGENTS.md` 写了 `EGM artifact directory: <path>`，就写到那里。会话临时目录不算交付物位置。

另外 Claude Code 需 **2.1.271+** 才有 `omitClaudeMd`，更早版本不应当作已验证的隔离环境。

---

## 3. 怎么结合你现在的工作流？

你现在有三块东西：**DSH（本会话的 agent 环境）**、**个人知识库（llm-wiki / ai-wiki）**、**IP 工作区（D:\aiproject\dsh，带 AGENTS.md + speckit）**。分开说。

### 3.1 在 DSH 里用 EGM

**现状：不能直接装**（官方 harness 列表没有 DSH，安装器不认 DSH 的插件格式）。两条路：

**路线 A（推荐先做）——在 Claude Code 里跑通，把产物带回来**
用 Claude Code 装 EGM，跑完 brainstorm/draft/review，把 `docs/designs/*.md` 提交到项目仓库。DSH 这边读这些文档做事，等于「设计在 Claude Code，执行在 DSH」。

**路线 B——手工移植 skill**
1. 把仓库的 `skills/egm-*`、`agents/*.md`、`resources/` 复制到 `~/.dsh/skills/` 下的一个目录（注意：`~/.dsh/skills` 只扫描一层 `<name>/SKILL.md`，需要把每个 skill 目录平铺）。
2. 把 SKILL.md 里写死的工具名改掉：`invoke_subagent` / `Agent` / `spawn_agent` → DSH 的 `subagent`、`spawn_teammate`；`${CLAUDE_PLUGIN_ROOT}` → 实际安装路径。
3. 评审提示里显式声明「把工作区 AGENTS.md 的约定当作评审标准」——因为 DSH 会给子代理注入工作区指令，这和官方承认的「指令文件泄漏」是同一类问题。
4. 先只移植 `egm-review` 试水（它最独立），验证可行再补 brainstorm/draft。

> 结论：**短期别在 DSH 里硬装**；用路线 A 最省事，路线 B 适合你确认要长期用之后再做。

### 3.2 和知识库（llm-wiki）怎么配合

- **设计文档入知识库**：每份 `docs/designs/*.md` 可以作为素材消化进 ai-wiki（走 `llm-wiki` 的 ingest），实体页记录「为什么这么设计」。
- **drift-report 当知识库体检**：`egm-drift-report` 的「文档 ↔ 代码」漂移检测，和 `wiki-summarize` 的「知识库体检」是同一类动作；可以约定每月各跑一次。
- **反向借鉴**：EGM 的「零上下文评审」可以搬进你的 wiki 流程——让一个没读过你笔记的 subagent 只看 wiki 页面，检查「一个新人能不能读懂」。

### 3.3 和 IP 工作区（speckit）怎么配合

你 IP 工作区已经在用 speckit（specify → plan → tasks → implement）和 architect 评审。EGM 和它们是**同层但不同侧重**：

| EGM 环节 | speckit 对应 | 差异 |
|---|---|---|
| brainstorm | specify / clarify | EGM 更强调多轮追问 + 多视角压测 |
| draft | plan | EGM 输出 `docs/designs/`，speckit 输出 `specs/<feature>/` |
| review | architect 评审 | EGM 用零上下文子代理自动评审，architect 是人类点名的角色 |
| drift-report | （无对应） | EGM 独有，可补 speckit 的长期维护缺口 |

**落地建议**：在 IP 工作区里，把 EGM 的 review 当作 architect 评审之前的「机器初筛」——先让金鱼挑一遍，人类架构师再看剩下的硬问题。注意那边的红线：AI 不碰 git 状态，设计文档写完由人提交。

### 3.4 推荐落地节奏

1. **第 1 周**：在 Claude Code 里装好，挑一个真实的中等功能完整跑一次（brainstorm → draft → review）。
2. **第 2 周**：把这次产物入库到 ai-wiki，写一篇「这次 EGM 用下来哪里有用、哪里是噪音」的复盘。
3. **第 3–4 周**：决定是否移植到 DSH；如果要，先移植 `egm-review` 单点验证。
4. **长期**：把 `egm-drift-report` 和 `wiki-summarize` 一起排进每周/每月的维护仪式。

---

## 4. 学习路径（按周）

| 阶段 | 目标 | 具体动作 |
|---|---|---|
| 第 0 天 | 建立直觉 | 读本页第 1 节 + 官方 README 的 "How it works"；不用装 |
| 第 1 天 | 跑通一次 | 在 Claude Code 装好，拿一个小功能跑 brainstorm |
| 第 2–3 天 | 走完闭环 | draft → review → 挑问题 → 实现 |
| 第 1 周 | 形成判断 | 记录：哪些评审发现是真问题？花了多少 token/时间？ |
| 第 2 周 | 接入习惯 | 规定「什么级别的改动必须走 EGM」，写进项目 AGENTS.md |
| 第 3 周起 | 维护 | 每周跑一次 drift-report；每月复盘一次 |

---

## 5. 常见坑（来自官方 FAQ + 实践推演）

1. **把它当银弹**：官方自己说「不一定提升速度」，小改动可能纯亏。先用一个真实功能做对照实验再下结论。
2. **评审意见全盘照收**：金鱼会「按设计」给出大量反馈，其中一部分是噪音。人类的职责就是筛。
3. **设计文档写成流水账**：金鱼只能挑出「含糊」，挑不出「你没写」。文档要写清意图、不变量、取舍理由，而不是步骤复述。
4. **以为零上下文=完全隔离**：官方承认 Codex/Antigravity 仍可能把项目 `AGENTS.md` 注入子代理；DSH 同理。要显式声明评审标准。
5. **忘了维护**：设计文档不维护就会过期，drift-report 不是可选项。
6. **跳过人类评审**：EGM 不替代人；PR 里的人工评审仍然是长期一致性的保障。

---

## 6. 一页检查清单

- [ ] 我选的这个改动，确实需要先做设计决策吗？
- [ ] 宿主有 fresh-context 子代理吗？
- [ ] brainstorm 时我把边界和约束说清楚了吗？
- [ ] 设计文档写清了「为什么」而不只是「做什么」吗？
- [ ] 评审发现我逐条判断过，而不是全收/全扔了吗？
- [ ] 批准设计之后才让 AI 写代码吗？
- [ ] 设计文档提交进仓库（可被人类 PR 评审）了吗？
- [ ] 我把它排进每周 drift-report 了吗？

## 相关页面

- [[Elephant-Goldfish Model]]
- [[EGM 设计评审工作流]]
- [[EGM 本机安装核查]]
- [[AI编程开发]]
- [[Claude Code]]
- [[DeepSeek Harness]]
