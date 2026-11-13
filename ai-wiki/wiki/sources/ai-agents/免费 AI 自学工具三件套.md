---
tags: [AI学习, 教育, 开源, DeepTutor, book-to-skill, OpenMAIC, 工具]
created: 2026-11-14
updated: 2026-11-14
source_path: raw/tweets/2026-11-14-ai-learning-tools-tweet.md
---

# 免费 AI 自学工具三件套：DeepTutor、book-to-skill、OpenMAIC

> @Chenfacai0 推荐的三个「省钱自学」开源项目：长期记忆型家教 DeepTutor（58,888★）、把技术书变成 Agent Skill 的 book-to-skill（37,769★）、一键生成互动教室的 OpenMAIC（43,462★）

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 推文 @Chenfacai0（2026-11-12） |
| 核对时间 | 2026-11-14（GitHub API 与 README 核对） |
| 工具数 | 3 个，全部开源免费 |
| 原始素材 | raw/tweets/2026-11-14-ai-learning-tools-tweet.md；三份 README 摘录见 raw/articles/2026-11-14-* |

| 工具 | 出品 | Star | 协议 | 技术 | 一句话 |
|---|---|---|---|---|---|
| DeepTutor | 港大数据智能实验室（HKUDS） | 58,888 | Apache-2.0 | Python | 终身个性化家教：聊天/测验/研究/掌握路径 + 记忆 |
| book-to-skill | virgiliojr94 | 37,769 | MIT | Python | 技术书/PDF 一键转 Agent Skill，章节按需加载 |
| OpenMAIC | 清华 MAIC | 43,462 | MIT | TypeScript | 一键生成多 Agent 互动教室，可导出 PPT |

## 核心观点

1. **三件工具覆盖「学什么—怎么记—怎么练」**：DeepTutor 负责长期陪跑（记忆 + 掌握路径），book-to-skill 负责把书变成可随时调用的技能，OpenMAIC 负责把主题变成可上课的互动教室。

2. **DeepTutor 的差异化是「记忆」**：它会记住你学到哪、哪薄弱，把聊天、测验、研究、掌握路径串成一条学习流；2026-11 已发桌面版（macOS/Windows），不再只是 Web/CLI。

3. **book-to-skill 的差异化是「token 经济」**：把整本书切成按需加载的章节，推文称 token 可省 24–51 倍；生成的是跨 Agent 标准 skill，Claude Code、Copilot CLI、Codex、OpenClaw 等都能直接用。

4. **OpenMAIC 的差异化是「课堂感」**：AI 老师讲课、AI 同学讨论、随堂测验、模拟实验，还能导出 PPT，适合做培训/教学演示。

5. **星标热度需冷静看**：三个项目都在 3.7 万–5.9 万星，属于「工具型爆款」；但本地部署与模型 API 成本、中文支持程度仍需自己试。

## 实操内容保留

### DeepTutor

```bash
pip install -U "deeptutor[full]"   # 全量 Web + CLI；裸 deeptutor 只装核心
```

- 桌面版下载：macOS（Apple Silicon / Intel）、Windows x64，见 Releases
- Docker 快速试用：仓库提供 Docker 部署（GHCR 预构建镜像）
- 生态：EduHub 技能社区；论文 arXiv:2604.26962

### book-to-skill

```bash
npx skills add virgiliojr94/book-to-skill   # 跨 Agent 安装
/book-to-skill ./my-book.pdf                 # 生成 skill
/your-book-slug replication                  # 之后按主题调用
```

- 支持 PDF / EPUB / DOCX / Markdown / HTML / RTF / MOBI，也支持文件夹、glob、多文件
- 生成到 `~/.agents/skills/<slug>/`，Copilot CLI、Amp、Codex、OpenCode、OpenClaw 原生发现；Claude Code 会尝试软链到 `~/.claude/skills/`
- 支持 analyze-only、从分析稿再生成、更新/合并模式；可发布到 GitHub 供 `npx skills add` 安装

### OpenMAIC

```bash
pnpm install
cp .env.example .env.local     # 填 OPENAI_API_KEY 或改用其他 provider
pnpm db:up                     # 本地 Postgres（Docker）
pnpm dev
```

- 在线 Demo：https://open.maic.chat/
- 支持 Lemonade 本地 AI、FunASR 本地语音识别、OpenClaw 集成
- 论文：JCST'26；版本 v1.5.0-rc.2（2026-11-12）

## 原文精彩摘录

> 长期记忆型家教、把书变成技能、一键生成教室，自学的朋友可以直接冲了。（推文）

> 技术书或 PDF 一键就能转成 Agent Skill，框架和章节按需加载，token 大概能省 24 到 51 倍。（推文）

> Welcome to DeepTutor — a local-first, open-source AI tutoring workspace that turns any topic into a structured, personalized learning path.（DeepTutor README）

> Get an immersive, multi-agent learning experience in just one click.（OpenMAIC README）

## 关键概念

- [[DeepTutor]]
- [[book-to-skill]]
- [[OpenMAIC]]

## 相关页面

- [[DeepTutor]]
- [[book-to-skill]]
- [[OpenMAIC]]
- [[工具集]]
