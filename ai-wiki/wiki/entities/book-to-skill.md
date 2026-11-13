---
tags: [book-to-skill, AgentSkill, ClaudeCode, 知识管理, 开源]
created: 2026-11-14
updated: 2026-11-14
sources: [免费 AI 自学工具三件套]
---

# book-to-skill

> 把技术书、PDF、文档文件夹一键转成跨 Agent 标准 Skill：章节按需加载，用 `/你的书` 随时查、随时用

## 简介

book-to-skill 解决「书太厚、上下文太贵」的问题：它把一本书（或一个文件夹、glob、多文件）拆成结构化章节，生成一个 Agent Skill，放到 `~/.agents/skills/<slug>/`。之后在任何支持 Agent Skills 标准的宿主里，用 `/book-to-skill` 生成、用 `/你的书-slug 主题` 调用，Agent 只读相关章节，避免整本书塞进上下文。

## 关键信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/virgiliojr94/book-to-skill |
| Star | 37,769（2026-11-14） |
| 协议 | MIT |
| 技术 | Python |
| 支持格式 | PDF / EPUB / DOCX / Markdown / HTML / RTF / MOBI |
| 支持宿主 | GitHub Copilot CLI、Amp、Claude Code、Codex、Hermes Agent、OpenCode、OpenClaw |
| 数据来源 | [[免费 AI 自学工具三件套]] |

## 工作流

```bash
npx skills add virgiliojr94/book-to-skill   # 安装（跨 Agent）
/book-to-skill ./my-book.pdf                 # 指向文件/文件夹/glob
/your-book-slug replication                  # 之后按主题调用
```

- 生成位置：`~/.agents/skills/<slug>/`（Claude Code 会尝试软链到 `~/.claude/skills/`）
- 支持 analyze-only（只分析）、从分析稿再生成、更新/合并模式
- 生成后可发布到 GitHub（默认私有），任一台机器用 `npx skills add` 安装
- 官方称 token 可省 24–51 倍（取决于书的结构与调用方式）

## 评价

**优点**：

- 把「厚书」变成「可检索、可引用的技能」，比 RAG 更轻；
- 跨 Agent 标准，Claude Code / Codex / Copilot CLI 等都能用；
- 章节按需加载，确实能显著省 token；
- MIT，流程可审计。

**注意点**：

- 转换质量依赖书的结构与扫描清晰度（扫描版 PDF 需要 OCR）；
- 生成的 skill 仍需人工检查章节切分与索引；
- 版权：把书转成技能自用没问题，分发要谨慎。

## 相关页面

- [[免费 AI 自学工具三件套]]
- [[DeepTutor]]
- [[OpenMAIC]]
- [[Claude Code]]
