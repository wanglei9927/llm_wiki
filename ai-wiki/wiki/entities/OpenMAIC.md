---
tags: [OpenMAIC, 多Agent, 教育, 互动课堂, 开源]
created: 2026-11-14
updated: 2026-11-14
sources: [免费 AI 自学工具三件套]
---

# OpenMAIC

> 清华 MAIC 开源的「一键互动教室」：输入主题或文档，AI 老师讲课、AI 同学讨论、随堂测验 + 模拟实验，还能导出 PPT

## 简介

OpenMAIC（Open Multi-Agent Interactive Classroom）把一节课拆成多个 Agent 协作完成：老师 Agent 负责讲解，同学 Agent 负责提问与讨论，系统还会生成随堂测验、模拟实验，并把课程内容导出为 PPT。它适合快速把「一份资料/一个主题」变成可演示、可互动的课程。

## 关键信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/THU-MAIC/OpenMAIC |
| 在线 Demo | https://open.maic.chat/ |
| Star | 43,462（2026-11-14） |
| 协议 | MIT |
| 技术 | Next.js 16 / React 19 / TypeScript / Tailwind 4 |
| 论文 | JCST'26 |
| 数据来源 | [[免费 AI 自学工具三件套]] |

## 核心能力

- **多 Agent 课堂**：AI 老师 + AI 同学 + 讨论/追问
- **随堂测验与模拟实验**：边学边练
- **PPT 导出**：一键把课程变成演示材料
- **PBL v3**：AI 导师带着按里程碑做项目
- **知识库**：上传资料、文件夹管理、`@` 引用
- **本地化选项**：Lemonade 本地 AI、FunASR 本地语音识别
- **Agent 集成**：OpenClaw 工作台

## 快速开始

```bash
pnpm install
cp .env.example .env.local     # 至少填一个 provider 的 Key
pnpm db:up                     # 本地 Postgres（Docker）
pnpm dev
```

版本节奏很快：v1.5.0-rc.2（2026-11-12）重构首页为工作台。

## 评价

**优点**：

- 「一键开课」的体验完整：讲解、讨论、测验、实验、导出都有；
- 多 Agent 协作是差异化，适合培训/教学演示；
- MIT 开源，可自托管，支持本地模型。

**注意点**：

- Next.js 全栈项目，部署与依赖较重（Postgres、pnpm、模型 Key）；
- 课堂内容质量依赖所配模型；
- 版本迭代快，rc 功能可能变动；
- 生成内容的准确性仍需人工审核。

## 相关页面

- [[免费 AI 自学工具三件套]]
- [[DeepTutor]]
- [[book-to-skill]]
