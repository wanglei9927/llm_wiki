# LLM Wiki - 个人 AI 知识库系统

基于 [Karpathy llm-wiki](https://github.com/karpathy/llm-wiki) 方法论，利用 AI 持续构建和维护你的个人知识库。支持从多种素材源（网页、推特、公众号、小红书、知乎、YouTube、PDF、本地文件）自动整理为结构化的 wiki。

把碎片化的信息变成持续积累、互相链接的知识库。你只需要提供素材，AI 做所有的整理工作。

## 🤔 什么是 LLM-wiki？

LLM Wiki：用大语言模型把你的零散知识，自动整理成一部结构化的"个人百科全书"。传统的做法是，每次你想问 AI 一个问题，AI 都要重新翻一遍你的所有资料，找到相关的再回答你（这叫 RAG，检索增强生成）。这就好比你每次问图书管理员一个问题，他都要把整个图书馆的书重新翻一遍。Karpathy 说，这太蠢了。正确的做法是：让 AI 当一个"知识编译器"，先把你的所有资料读一遍，整理成一本结构清晰、彼此关联的百科全书。以后你再提问，AI 直接翻这本百科书就行了。

知识库的价值在于**知识被编译一次，然后持续维护**，而不是每次重新推导。

## 核心能力 — LLM Wiki Skill

利用 Claude Code 的 Skill 机制（位于 `.claude/skills/llm-wiki-skill/`），让 AI 自动完成知识库的采集、整理、质量控制和维护。

**支持的工作流：**

| 工作流 | 说明 |
|--------|------|
| `init` | 初始化新知识库，创建目录结构和配置 |
| `ingest` | 消化单篇素材（URL / 文件 / 粘贴文本），自动提取实体和主题 |
| `batch-ingest` | 批量处理多文件（.md / .txt / .pdf / .html） |
| `query` | 查询知识库，返回带来源引用的综合回答 |
| `digest` | 深度综合报告，跨素材分析特定主题 |
| `lint` | 健康检查：孤立页面、断链、内容质量 |
| `status` | 查看知识库状态：来源分布、页面统计、近期活动 |
| `graph` | 生成 Mermaid 知识图谱，可视化实体关系 |

**支持的素材源：**

| 类型 | 提取方式 |
|------|---------|
| 网页文章 | `baoyu-url-to-markdown` |
| X / Twitter | `baoyu-url-to-markdown` |
| 微信公众号 | `wechat-article-to-markdown` |
| YouTube | `youtube-transcript` |
| 知乎 | `baoyu-url-to-markdown` |
| PDF | 直接读取 |
| 本地文件 (.md / .txt) | 直接读取 |
| 小红书 | 手动粘贴文本 |

## 知识库目录结构

```
ai-wiki/
├── .wiki-schema.md      # 知识库配置和质量标准
├── index.md             # 内容索引
├── log.md               # 操作日志
├── overview.md          # 快速导航（位于 wiki/ 下）
├── raw/                 # 原始素材（AI 只读，不会修改）
│   ├── articles/        # 网页文章
│   ├── tweets/          # 推特内容
│   ├── wechat/          # 公众号文章
│   ├── xiaohongshu/     # 小红书内容
│   ├── zhihu/           # 知乎内容
│   ├── pdfs/            # PDF 文件
│   └── notes/           # 笔记和文本
└── wiki/                # 结构化 wiki 内容（AI 写，你看）
    ├── entities/        # 实体页（工具、概念、人物）
    ├── topics/          # 主题页（研究领域）
    ├── sources/         # 来源摘要
    ├── comparisons/     # 对比分析
    └── synthesis/       # 综合分析
```

**详细使用步骤：**

❯ ai-guide 是收集回来的资料，现在需求为需要你利用 llm-wiki skill 对这些资料进行分析整理成 wiki，请你完成

![](./图片1.png)

## 快速开始

无需安装任何依赖。在 Claude Code 中打开本项目，直接用自然语言操作：

```
# 初始化知识库
"帮我初始化一个知识库"

# 添加素材
"帮我消化这篇 https://example.com/article"

# 批量消化
"把 ai-wiki/raw/notes/ 里的新文件都整理一下"

# 查询知识库
"关于 RAG 技术，我的知识库里有什么？"

# 健康检查
"检查一下知识库的状态"

# 生成知识图谱
"画个知识图谱"
```

所有内容都是本地 Markdown 文件，用 Obsidian 或任何编辑器都能查看。

## 项目结构

```
llm-wiki/
├── .claude/
│   └── skills/
│       └── llm-wiki-skill/         # 知识库构建 Skill（核心）
│           ├── SKILL.md            # Skill 定义和工作流
│           ├── scripts/            # 辅助脚本（init/lint 等）
│           └── templates/          # 页面模板
├── ai-wiki/                        # 知识库数据（AI 学习笔记）
│   ├── raw/                        # 原始素材
│   └── wiki/                       # 结构化 wiki 内容
├── stock-wiki/                     # 另一个知识库实例
├── stock-data/                     # 素材数据
└── README.md
```

## 质量标准

知识库遵循严格的质量规范：

- **实体页**：至少 1500 字，禁止占位符文本，必须标注来源
- **来源摘要**：必须包含"实操内容保留"和"原文精彩摘录"部分
- **主题页**：至少 5 个核心要点，需要知识结构
- **链接一致性**：所有 `[[链接]]` 必须与实际文件名匹配
- **健康检查**：`bash .claude/skills/llm-wiki-skill/scripts/lint-wiki.sh ai-wiki links sources content`

## 参考资料

- [Karpathy llm-wiki](https://github.com/karpathy/llm-wiki)
- [Claude Agent SDK 教程](https://github.com/kenneth-liao/claude-agent-sdk-intro)（见 `参考.md`）
- [llm-wiki-skill](https://github.com/sdyckjq-lab/llm-wiki-skill)
- 特别感谢佬友：https://linux.do/
