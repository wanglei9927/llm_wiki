# 原始素材：DeepSeek Harness 官方 README 与 Web UI 使用指南

- 来源 URL：
  - 仓库主页：https://github.com/deepseek-ai/deepseek-harness
  - 中文 README：https://github.com/deepseek-ai/deepseek-harness/blob/master/README.zh.md
  - Web UI 指南：https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md
- 抓取时间：2026-11-02（webfetch 自动抓取）
- 仓库数据（抓取时）：267.7k stars、32.5k forks、1.1k watching、24,922 commits
- 协议：MIT；Topics：ai-agents、cordis、dsh、dsh-plugin
- 关联推文素材：raw/tweets/DeepSeek Harness 发布推文.md

## 仓库 About

DeepSeek Harness: Everything is a Plugin.
官网：https://deepseek.com/harness | 文档：https://deepseek-harness.github.io/deepseek-harness/

## 中文 README 全文（README.zh.md）

DeepSeek Harness（`dsh`）是由 DeepSeek AI 开发的开源 agent harness（智能体框架）。

它构建于**一切皆插件**的架构之上，由 Cordis（https://github.com/cordiverse/cordis）驱动，其设计参见论文 _A Programming Paradigm for Spatiotemporal Composability_（https://arxiv.org/abs/2608.25512）。

### 开发者预览

DeepSeek Harness 处于 _开发者预览_ 阶段，正在快速迭代。**未来将出现破坏兼容性的变更。**
运行本项目前，请阅读安全说明（SAFETY.zh.md）。

### 通过 npm 运行

安装 `Node.js`，然后运行：

```sh
npx @deepseek-ai/dsh web
```

该命令默认会在 `http://127.0.0.1:3080` 启动 Web UI，本机启动时还会用默认浏览器打开页面。通过 SSH 启动时只打印宿主机 URL，因为本地转发地址由 SSH 客户端或编辑器持有。传入 `--no-open` 可仅运行服务器而不打开浏览器。

### 从源码运行

```sh
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

`pnpm run build` 会准备仓库产物。`pnpm dsh web` 会直接使用这些已构建产物，不会重新构建。

### 社区与支持

- GitHub Discussions 提交反馈或 bug 报告
- 为插件仓库添加 `dsh-plugin` 话题
- DeepSeek Harness 企微群（扫码填问卷）、微信公众号、Discord 社区

### 开发

请先阅读开发指南（docs/development.zh.md）与架构文档（docs/architecture.zh.md）。
`pnpm run dev:web` 会在一个终端里完成构建、启动，并在源码修改时重建 client bundle；`make help` 列出 Web 与 Desktop 对应的 Make target。
面向 agent：请遵循 AGENTS.md。

### 引用

@misc{deepseek-harness2026, title={DeepSeek Harness: Everything is a Plugin}, author={DeepSeek-AI}, year={2026}, publisher={GitHub}}

### 许可证

MIT。第三方依赖见 THIRD_PARTY_NOTICES.md。

## Web UI 使用指南全文（docs/user/guide/index.md）

Start the Web UI through the root README; the command prints its URL. The `dsh` process uses its invoking directory as the default filesystem location, but a fresh Web UI has no selected workspace until you add one.

### Configure a model

Open **Settings → Models**, enter a DeepSeek API key（https://platform.deepseek.com/）, and save it. The model route becomes usable immediately without restarting the server.
The model configuration guide（./providers.md）covers other providers and custom OpenAI-compatible endpoints.

### Choose a workspace

Click **Choose workspace**, add the project directory where you started `dsh`, and select it. The session composer remains unavailable until a workspace is selected.

### Run a task

Start a session and send:

> Summarize this repository and identify its main packages.

The agent can read and edit workspace files, run commands, delegate work, and maintain a plan. The Web UI asks before operations that require approval under the active permission policy.

### Continue

- Configure models（./providers.md）
- Use the Python SDK（./python-sdk.md）
- Publish the Web UI behind a reverse proxy（./public-deployments.md）
- Use other CLI modes（apps/cli/README.md）
- Develop a plugin（../develop/basic/index.md）

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
