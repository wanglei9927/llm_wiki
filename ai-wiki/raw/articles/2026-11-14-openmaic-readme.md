# OpenMAIC README（摘录）

- 仓库：https://github.com/THU-MAIC/OpenMAIC
- 抓取时间：2026-11-14，main 分支

---

<!-- <p align="center">
  <img src="assets/logo-horizontal.png" alt="OpenMAIC" width="420"/>
</p> -->

<p align="center">
  <img src="assets/banner.png" alt="OpenMAIC Banner" width="680"/>
</p>

<p align="center">
  Get an immersive, multi-agent learning experience in just one click
</p>

<p align="center">
  <a href="https://lcn6dqn3m0yr.feishu.cn/wiki/CkQSwHFdzibQFvkGzwPcmUOfnXg"><img src="https://img.shields.io/badge/%F0%9F%93%98%20User%20Guide-v1.0.0%20%C2%B7%20English-4F8EF7?style=for-the-badge" alt="v1.0.0 User Guide (English)"/></a>
  &nbsp;&nbsp;
  <a href="https://my.feishu.cn/wiki/UIfKw9Knti0LcKkTxDNcqlUrnzh"><img src="https://img.shields.io/badge/%F0%9F%93%99%20%E4%BD%93%E9%AA%8C%E6%8C%87%E5%8D%97-v1.0.0%20%C2%B7%20%E4%B8%AD%E6%96%87-FF6B35?style=for-the-badge" alt="v1.0.0 体验指南（中文）"/></a>
</p>

<p align="center">
  <a href="https://jcst.ict.ac.cn/en/article/doi/10.1007/s11390-025-6000-0"><img src="https://img.shields.io/badge/Paper-JCST'26-blue?style=flat-square" alt="Paper"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License: MIT"/></a>
  <a href="https://open.maic.chat/"><img src="https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square" alt="Live Demo"/></a>
  <a href="#-agent-workbench-integration"><img src="https://img.shields.io/badge/OpenClaw-Integration-F4511E?style=flat-square" alt="OpenClaw Integration"/></a>
  <a href="#lemonade-local-ai"><img src="https://img.shields.io/badge/Lemonade-Local_AI-FFD43B?style=flat-square" alt="Lemonade Local AI"/></a>
  <a href="https://github.com/THU-MAIC/OpenMAIC/stargazers"><img src="https://img.shields.io/github/stars/THU-MAIC/OpenMAIC?style=flat-square" alt="Stars"/></a>
  <br/>
  <a href="https://discord.gg/p8Pf2r3SaG"><img src="https://img.shields.io/badge/Discord-Join_Community-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"/></a>
  &nbsp;
  <a href="community/feishu.md"><img src="https://img.shields.io/badge/Feishu-Community-00D6B9?style=for-the-badge&logo=bytedance&logoColor=white" alt="Feishu Community"/></a>
  <br/>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README-zh.md">Simplified Chinese</a>
  <br/>
  <a href="https://open.maic.chat/">Live Demo</a> · <a href="#-quick-start">Quick Start</a> · <a href="#lemonade-local-ai">Lemonade</a> · <a href="#funasr-local-asr">FunASR</a> · <a href="#-features">Features</a> · <a href="#-use-cases">Use Cases</a> · <a href="#-agent-workbench-integration">OpenClaw</a>
</p>

## 🗞️ News

- **2026-11-12** — [v1.5.0-rc.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.5.0-rc.2): **A brand-new home, redesigned end to end** (release candidate) — the home page becomes the workbench, with the course beside the conversation and one full-screen classroom for learning and editing. Off by default (`NEXT_PUBLIC_WORKBENCH_ENABLED`).
- **2026-11-09** — [v1.4.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.4.2): **course-level undo** for manual edits and agent runs; sandboxes open to every admitted owner.
- **2026-11-05** — [v1.4.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.4.1): edits and learner progress kept through background syncs; faster loading on slow connections.
- **2026-11-04** — [v1.4.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.4.0): **PBL v3** — build a working project with an AI tutor, milestone by milestone. One-way upgrade.
- **2026-11-02** — [v1.3.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.3.1): DeepSeek Token Plan (one key for chat, web search and web fetch) and reliability fixes.
- **2026-10-29** — [v1.3.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.3.0): **knowledge base** — uploads kept, foldered and `@`-mentionable; one-way upgrade.
- **2026-10-18** — [v1.2.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.2.1): web research — Kimi, DeepSeek and Firecrawl search, and a hosted `webFetch` reader.
- **2026-10-16** — [v1.2.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.2.0): **server-first is stable** — generation survives closed tabs, models live in `openmaic.yml`, classroom export to PPTX and HTML.

<details>
<summary>Earlier releases</summary>

- **2026-10-05** — [v1.1.3](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.1.3): security — course documents served by `/api/persistence` carry only sanitized slide HTML ([GHSA-6c52-8h4v-5xvg](https://github.com/THU-MAIC/OpenMAIC/security/advisories/GHSA-6c52-8h4v-5xvg)).
- **2026-09-28** — [v1.1.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.1.2): security — provider requests connect only to validated addresses and refuse redirects ([GHSA-g87c-cm4q-cw5x](https://github.com/THU-MAIC/OpenMAIC/security/advisories/GHSA-g87c-cm4q-cw5x)).
- **2026-09-27** — [v1.1.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.1.1): security — hardened MinerU Cloud parsing ([GHSA-cpjc-vgjh-c5jp](https://github.com/THU-MAIC/OpenMAIC/security/advisories/GHSA-cpjc-vgjh-c5jp)).
- **2026-09-24** — [v1.1.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.1.0): agentic classroom chat (ask about any slide element, interactive, or whiteboard drawing); settings rebuilt around the course workflow; Token Plan connections.
- **2026-09-15** — [v1.0.3](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.0.3): security — access-code tokens expire, render-service network policy, pinned audio connections, Next.js RCE patch.
- **2026-09-14** — [v1.0.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.0.2): security — SSRF and DNS-rebinding fixes, classroom overwrite fix.
- **2026-09-06** — [v1.0.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.0.1): security and stability; tightens two defaults.
- **2026-08-27** — [v1.0.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v1.0.0): agent workbench, durable sessions, reusable skills, session materials, provider-neutral capabilities.
- **2026-08-14** — [v0.3.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.3.2): video export hardening, server-backed persistence and asset registry, `@openmaic/generation`, four new locales, FunASR.
- **2026-07-21** — [v0.3.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.3.1): one-click MP4 export, direct slide editing, smarter "Edit with AI", expanded document parsing.
- **2026-06-28** — [v0.3.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.3.0): PBL v2, "Edit with AI" editor agent, `@openmaic/*` SDKs on npm, relicensed to MIT.
- **2026-06-02** — [v0.2.2](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.2.2): MAIC Editor Pro Mode, editable outlines, offline classroom export.
- **2026-04-26** — [v0.2.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.2.1): VoxCPM2 TTS with voice cloning, per-model thinking config, course completion page.
- **2026-04-20** — [v0.2.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.2.0): Deep Interactive Mode — 3D, simulations, games, mind maps, online programming.
- **2026-04-14** — [v0.1.1](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.1.1): language inference, ACCESS_CODE, classroom ZIP export/import, Ollama.
- **2026-03-26** — [v0.1.0](https://github.com/THU-MAIC/OpenMAIC/releases/tag/v0.1.0): discussion TTS, immersive mode, keyboard shortcuts.

</details>

Full history in the [changelog](CHANGELOG.md).

## 📖 Overview

**OpenMAIC** (Open Multi-Agent Interactive Classroom) is an open-source AI platform that turns any topic or document into a rich, interactive classroom experience. Powered by multi-agent orchestration, it generates slides, quizzes, interactive simulations, and project-based learning activities — all delivered by AI teachers and AI classmates who can speak, draw on a whiteboard, and engage in real-time discussions with you. The built-in OpenMAIC Skill works with [OpenClaw](https://github.com/openclaw/openclaw) as well as agent workbenches such as Codex, DeepSeek, and WorkBuddy, so you can generate classrooms from messaging apps like Feishu, Slack, or Telegram, or right inside your IDE.

https://github.com/user-attachments/assets/8f3f1e5f-1468-4e93-8054-afeeea683a61

### Highlights

- **One-click lesson generation** — Describe a topic or attach your materials; the AI builds a full lesson in minutes
- **Multi-agent classroom** — AI teachers and peers lecture, discuss, and interact with you in real time
- **Rich scene types** — Slides, quizzes, interactive HTML simulations, and project-based learning (PBL)
- **Whiteboard & TTS** — Agents draw diagrams, write formulas, and explain out loud
- **[Export anywhere](packages/docs/content/docs/getting-started.mdx#export-a-classroom)** — A `.pptx` that keeps every scene, one offline `.html` file that plays the whole lesson, or a classroom ZIP to move it to another deployment
- **[Agent workbench integration](#-agent-workbench-integration)** — The OpenMAIC Skill supports OpenClaw, Codex, DeepSeek, WorkBuddy, and more — generate classrooms from Feishu, Slack, Telegram, 20+ messaging apps, or your IDE

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 22.19
- **pnpm** >= 10
- **PostgreSQL** 16 — courses are stored on the server. For local development
  `pnpm db:up` starts one in Docker for you.

### 1. Clone & Install

```bash
git clone https://github.com/THU-MAIC/OpenMAIC.git
cd OpenMAIC
pnpm install
```

### 2. Configure

```bash
cp .env.example .env.local            # API keys and server options
cp openmaic.example.yml openmaic.yml  # which models the server uses
```

The copied example needs only `OPENAI_API_KEY` in `.env.local` (or change its provider to one you have a key for); everything else in it is commented out until you want it. `openmaic.yml` declares **providers** (accounts the server can call) and gives each **slot** (a use of AI: the outline, slide content, text to speech, web search, …) a model. Keys stay in `.env.local` and are referenced as `${VAR}`:

```yaml
providers:
  openai:
    preset: openai
    apiKey: ${OPENAI_API_KEY}      # OPENAI_API_KEY=sk-... in .env.local
  anthropic:
    preset: anthropic
    apiKey: ${ANTHROPIC_API_KEY}

slots:
  llm: openai:gpt-5.5              # the default chat model
  course.outline: anthropic:claude-sonnet-4-6
  video: null                      # turn a capability off
```

The slots you write are the server's defaults; users can change them, or connect services of their own, in the app's model settings unless you `lock` them or set `allowUserKeys: false`. The server validates the file at startup and names every mistake by its field (or, for broken YAML, its line).

| To learn about | Read |
| --- | --- |
| Slots, presets, fallbacks, `lock`, `allowUserKeys`, `OPENMAIC_SECRET_KEY` | [Configuration](packages/docs/content/docs/configuration.mdx) |
| Every provider preset and model ID | [Supported models](packages/docs/content/docs/supported-models.mdx) |
| Upgrading: provider variables, `server-providers.yml`, `DEFAULT_MODEL` and `MODEL_FALLBACK` still work without `openmaic.yml`; `MODEL_ROUTES` must become slots | [Migrating from the legacy configuration](packages/docs/content/docs/configuration.mdx#migrating-from-the-legacy-configuration) |
| Which models users may pick: a provider whose key the server holds and that selects an upstream model offers only the models in its `models` list (`*_MODELS`), plus the slot, default and fallback models | [Model authorization](packages/docs/content/docs/configuration.mdx#model-authorization-for-server-managed-providers) |

**Providers:** OpenAI, Azure OpenAI, Anthropic, Amazon Bedrock, Google Gemini, DeepSeek, Qwen, Kimi, MiniMax, Grok (xAI), OpenRouter, TokenDance, Doubao, Tencent Hunyuan/TokenHub, Xiaomi MiMo, GLM (Zhipu), Ollama, [Lemonade](#lemonade-local-ai) and [FunASR](#funasr-local-asr) (local), and any OpenAI-compatible API.

> [!TIP]
> **Recommended setup:** OpenMAIC is at its best with every modality turned on — generated illustrations, narration, video clips, web search, and web fetch. A token plan configures the capabilities it supports with one key (see the examples below). Choose a fast long-context model such as `deepseek-v4.1-flash` as the default.

<details>
<summary><b>More examples</b>: token plans, Xiaomi MiMo and GLM, Amazon Bedrock</summary>

MiniMax token plan quick example (one key for chat, image, video, TTS and web search; `tokendance` works the same way):

```yaml
providers:
  minimax:
    preset: minimax
    apiKey: ${MINIMAX_API_KEY}

slots:
  llm: minimax:MiniMax-M3
  image: minimax                   # a provider id alone: the plan's default model
  video: minimax
  tts: minimax
  webSearch: minimax
```

TokenDance quick example with a fast long-context default model:

```yaml
providers:
  tokendance:
    preset: tokendance
    apiKey: ${TOKENDANCE_API_KEY}

slots:
  llm: tokendance:deepseek-v4.1-flash
  image: tokendance
  video: tokendance
  tts: tokendance
  webSearch: tokendance
```

Xiaomi MiMo Token Plan and GLM (Zhipu) quick example:

```yaml
providers:
  mimo:
    preset: xiaomi
    apiKey: ${MIMO_API_KEY}
    baseUrl: https://token-plan-cn.xiaomimimo.com/v1
  glm:
    preset: glm
    apiKey: ${GLM_API_KEY}
    baseUrl: https://open.bigmodel.cn/api/paas/v4   # or https://api.z.ai/api/paas/v4

slots:
  llm: mimo:mimo-v2.5-pro
  course.content: glm:glm-5.1
```

Use `https://token-plan-sgp.xiaomimimo.com/v1` or `https://token-plan-ams.xiaomimimo.com/v1` for the Singapore or Europe Token Plan clusters.

Amazon Bedrock quick example:

```yaml
providers:
  bedrock:
    preset: bedrock
    models: [us.anthropic.claude-sonnet-5, us.anthropic.claude-opus-4-8]

slots:
  llm: bedrock:us.anthropic.claude-sonnet-5
```

Bedrock uses AWS environment credentials or the AWS SDK credential provider chain, with the region from `BEDROCK_REGION` (for example `BEDROCK_REGION=us-east-1` in `.env.local`). For temporary credentials, set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN`, or use an AWS profile / role available to the runtime.

</details>

### 3. Start the database

```bash
pnpm db:up
```

Then uncomment the local `DATABASE_URL` line in `.env.local`:

```env
DATABASE_URL=postgres://openmaic:openmaic-dev@127.0.0.1:5432/openmaic
```

`pnpm db:up` starts a development PostgreSQL on `127.0.0.1:5432` (set `OPENMAIC_DB_PORT` for another port). It is its own Compose project, `openmaic-dev-db`, shared by every checkout on this machine, with its own container and volume, so it never touches the database of a `docker compose up` stack. `pnpm db:down` stops it and keeps the data. Any other PostgreSQL works too.

### 4. Run

```bash
pnpm dev
```

Open **http://localhost:3000** and start learning! Without a `DATABASE_URL` the
server refuses to start and tells you how to provide one (see
[Server-backed persistence](#server-backed-persistence-postgresql)).

### 5. Build for Production

```bash
pnpm build && DATABASE_URL=postgres://... pnpm start
```

Keep the server running as a long-running process (a process manager or a
container): course generation runs inside it and continues after the browser
leaves the page. See the
[Deployment guide](packages/docs/content/docs/deployment.mdx) for the required
configuration and for upgrading from 1.1.x.

### Docker Deployment

```bash
cp .env.example .env.local
# Edit .env.local with your API keys, then:
docker compose up --build
```

Open **http://localhost:3000**. The stack is two containers, the app and PostgreSQL. Courses, generated media and runtime sessions live in the named volumes `openmaic-postgres` and `openmaic-data`, which survive `docker compose down` and rebuilds; `docker compose down -v` deletes them. To configure models with `openmaic.yml`, create it from `openmaic.example.yml` and uncomment its mount in `docker-compose.yml`; otherwise connect a model service in the model settings once the app is running.

The Compose file is a **personal installation**: it runs in [single-user mode](#server-backed-persistence-postgresql) (every browser sees one shared library) and listens on `127.0.0.1:3000` only. To serve other machines, protect it first:

1. Set a long random `ACCESS_CODE` in `.env.local` ([details](#optional-access_code-shared-deployments)). Without it, anyone who can reach the port owns, edits and can delete the whole library.
2. Before the first start, set `PERSISTENCE_POSTGRES_PASSWORD` to a random value of letters and digits.
3. Publish on the network address:

   ```bash
   OPENMAIC_PUBLISH_ADDRESS=0.0.0.0 docker compose up -d --build
   ```

`OPENMAIC_PUBLISH_ADDRESS`, `OPENMAIC_PORT` and `PERSISTENCE_POSTGRES_PASSWORD` come from your shell or a `.env` file next to `docker-compose.yml`, not from `.env.local`. Overriding the Compose defaults, rotating the database password and the full upgrade notes are in [Hosting and identity](packages/docs/content/docs/hosting.mdx#docker-compose-as-a-personal-installation).

> [!IMPORTANT]
> **Upgrading a Compose deployment?** PostgreSQL now always starts, the app is published on `127.0.0.1` only, and every visitor is the same single owner. If `.env.local` sets `PERSISTENCE_SHARED_OWNER_ID`, also set `OWNER_SINGLE_USER=false`, or the app refuses to start. Read [Upgrading a Compose deployment](packages/docs/content/docs/hosting.mdx#upgrading-a-compose-deployment) first.

<details>
<summary><b>Slow-network / China build acceleration</b></summary>

Docker builds support two optional build arguments. Both are empty by default,
so the standard command above keeps using the upstream Alpine and npm
registries.

- `ALPINE_MIRROR` is an Alpine mirror hostname without `https://`.
- `NPM_REGISTRY` is a complete npm registry URL.

Use public mirror endpoints only. Do not embed usernames, passwords, or access
tokens in these build arguments because Docker may record them in image metadata
or build provenance.

With Docker Compose:

```bash
ALPINE_MIRROR=mirrors.tuna.tsinghua.edu.cn \
NPM_REGISTRY=https://registry.npmmirror.com \
docker compose up --build
```
