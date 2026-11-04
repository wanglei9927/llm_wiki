# 原始素材：dsh-superagent-prototype 仓库 README

- 来源 URL：https://github.com/deepseek-ai/dsh-superagent-prototype（main 分支）
- 抓取时间：2026-11-02（webfetch 自动抓取）
- 仓库数据（抓取时）：4.6k stars、424 forks、1 commit、MIT
- 关联素材：raw/articles/2026-11-02-deepseek-harness-readme.md、raw/tweets/2026-11-02-superagent-prototype-tweets.md

## README 全文要点（逐字保留关键段）

# dsh-superagent

> **Research prototype for reference only, not an official DeepSeek product.** This code grew out of our team's day-to-day development work, with much of the engineering done by coding agents. Treat it as research code, not production-ready software. It may still contain bugs, and its coding style and engineering practices may be inconsistent. Review and adapt it before using it in your own environment.
>
> We have adapted it for publication, so it is not identical to our internal version or the implementation described in *Exploring Super-agent Design: Towards a More Autonomous Agent System*. Some designs discussed in the article are directions for future development and are not implemented in this prototype.

dsh-superagent is a proactive coding agent for one GitHub repository, packaged as a bundle for DeepSeek Harness. It listens to GitHub and, optionally, Feishu. When someone allowed asks the agent for work, it opens a work item, works on it in its own agent session and directory, and answers in the original conversation, for example with a pull request. A web panel shows what needs a person.

It is also a way of working with an agent: **take as little human attention as possible, and give as much value as possible.** An agent that can act for a whole team can also waste a whole team's attention, so it acts only when asked or when a rule the team wrote allows it, and speaks only when someone must act or can use a result. docs/000-philosophy.md explains the principle and what it asks of the operator.

## Setup

Setup has many steps, so an agent does it with you. Ask your coding agent:

> Read SETUP.md in this repository and set up dsh-superagent with me.

It asks one short question at a time, shows the full plan once, and then installs and configures everything. SETUP.md is what it follows.

## Documentation

Read the numbered documents in order; each builds only on the ones before it.

- 000 Philosophy（哲学）
- 001 Domain model（领域模型）
- 002 Authorization（授权）
- 003 Execution（执行）
- 004 Prompts（提示词）
- 005 Panel（面板）
- 006 Deployment（部署：手动安装、配置、升级与排错）
- 007 Architecture（架构）
- 008 Cookbook（食谱：添加一个 Source）

## Development

`pnpm check` runs the typecheck, the tests and the build.

License: MIT

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
