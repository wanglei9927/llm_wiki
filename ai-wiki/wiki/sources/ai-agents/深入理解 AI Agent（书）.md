---
tags: [AI-Agent, 书籍, 开源, 李博杰, 上下文工程, MCP, 多Agent, 学习资源]
created: 2026-11-12
updated: 2026-11-12
source_path: raw/articles/2026-11-12-ai-agent-book-readme.md
---

# 深入理解 AI Agent：设计原理与工程实践（李博杰）

> 一本 57,764★ 的开源 AI Agent 书：围绕「Agent = LLM + 上下文 + 工具」公式，10 章从原理讲到工程实战，配 109 个可运行实验，正文与 PDF/EPUB 全部开源（Apache-2.0）

## 基本信息

| 项目 | 内容 |
|---|---|
| 书名 | 《深入理解 AI Agent：设计原理与工程实践》 |
| 作者 | 李博杰（Bojie Li） |
| 仓库 | https://github.com/bojieli/ai-agent-book |
| Star / Fork | 57,764 / 6,699（2026-11-12） |
| 协议 | Apache-2.0 |
| 语言 | 中文原版 + 14 种社区翻译（共 15 种） |
| 规模 | 10 章正文 + 109 个配套实验 + 配图；Python 3.11–3.13 |
| 版本 | 书稿 2.0（2026-10 更新，章节有重排） |
| 在线阅读 | https://bojieli.github.io/ai-agent-book/astro/ |
| 补充素材 | raw/articles/2026-11-12-ai-agent-book-readme.md |

## 核心观点

1. **核心公式：Agent = LLM + 上下文 + 工具**。书里反复强调：模型能力之外的竞争力在 **Harness 工程**——上下文怎么组织、工具怎么给、记忆怎么存、怎么评估与进化。

2. **十章递进，覆盖从入门到生产**：入门 → 上下文工程 → 用户记忆与知识库 → 工具（MCP）→ Coding Agent → 交互扩展（异步/语音/Computer Use/机器人）→ 评估 → 模型后训练 → 持续进化 → 多 Agent 协作。

3. **实验驱动**：109 个配套实验按章组织（第 2 章 10 个、第 5 章 16 个、第 8 章 19 个等），支持 `uv sync --locked --extra chN` 复现，也有外部仓库复现轨道；不是「只读理论」。

4. **全球社区参与**：15 种语言（英/西/印尼/阿/繁中/俄/泰米尔/越/日/土/韩/匈/希伯来/葡巴），社区翻译并行推进；在线阅读支持章节折叠、高亮与笔记。

5. **2.0 版结构更合理**：把原「异步交互」与「多模态 Agent」合并为新的第 6 章「交互：观察与动作空间的扩展」，评估/后训练/持续进化依次后移。

## 实操内容保留

### 获取方式

- 离线（推荐）：[PDF](https://github.com/bojieli/ai-agent-book/releases/download/latest/AI-Agents-in-Depth-zh-CN.pdf) / EPUB，链接始终指向 main 最新构建
- 在线阅读：https://bojieli.github.io/ai-agent-book/astro/
- 正文源码：`book/introduction.md`、`book/chapter1.md` ~ `chapter10.md`、`book/afterword.md`

### 运行配套实验

```bash
# 推荐：用仓库里的 uv.lock，环境可复现
uv sync --locked --extra ch1

# 没有 uv 时
python -m pip install -e ".[ch1]"

# 运行示例
uv run python chapter1/context/main.py
```

- 需要模型 Key 的实验：复制 `.env.example` 为 `.env`，填入至少一个提供商 Key；部分实验要求目录内 `.env` 或环境变量
- 只有实验 README/CLI 明确写 `ollama` 时，才用 `--provider ollama` 本地模型
- `all` 是不含本地训练栈的 CPU 友好组合，不代表每个实验
- 第 8 章部分组件需要 Python 3.12+

### 十章速览

| 章 | 主题 | 一句话核心 | 实验数 |
|---|---|---|---|
| 1 | AI Agent 入门 | Agent = LLM + 上下文 + 工具；Harness 工程才是竞争力 | 4 |
| 2 | 上下文工程 | 上下文决定能力上限：KV Cache、提示工程、Agent Skills、压缩 | 10 |
| 3 | 用户记忆与知识库 | 跨会话记忆、RAG、结构化索引、知识图谱 | 12 |
| 4 | 工具 | MCP 协议、感知/执行/协作三类工具、主动工具发现 | 5 |
| 5 | Coding Agent 与通用 Agent | 代码是「能创造新工具的工具」 | 16 |
| 6 | 交互：观察与动作空间扩展 | 异步/事件驱动、语音、Computer Use、机器人 | 14 |
| 7 | Agent 评估 | 评估环境、指标、统计显著性、评估驱动选型 | 14 |
| 8 | 模型后训练 | 预训练/SFT/RL 三阶段；何时 SFT、何时 RL | 19 |
| 9 | Agent 持续进化 | 从运行轨迹获得学习信号，更新知识/指令/程序/参数 | 9 |
| 10 | 多 Agent 协作 | 协作框架、上下文共享/隔离、涌现的「Agent 社会」 | 6 |

## 原文精彩摘录

> Agent = LLM + 上下文 + 工具——本书围绕这个核心公式，用 10 章把 AI Agent 从原理讲到工程实战。（README）

> 全书正文、配图、109 个配套实验全部开源，欢迎亲手把实验跑一遍。（README）

> 上下文决定能力上限：KV Cache、提示工程、Agent Skills、上下文压缩。（第 2 章一句话核心）

> 群体智能高于个体：协作框架、上下文共享/隔离、涌现的「Agent 社会」。（第 10 章一句话核心）

## 关键概念

- [[深入理解 AI Agent]]：本页对应的实体页（章节结构、阅读路径、评价）
- [[AI Agent 智能体]]：Agent 基础概念
- [[MCP 模型上下文协议]]：第 4 章核心协议
- [[RAG 知识库]]：第 3 章核心主题
- [[DeepSeek Harness]]：本书 Harness 理念的落地实现之一

## 相关页面

- [[深入理解 AI Agent]]
- [[AI Agent 智能体]]
- [[MCP 模型上下文协议]]
- [[DeepSeek Harness]]
