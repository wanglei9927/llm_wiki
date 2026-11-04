---
tags: [DeepSeek, DeepSeek Harness, dsh, AI Agent, 插件化, agent harness, 开源项目]
created: 2026-11-02
updated: 2026-11-02
source_path: raw/articles/2026-11-02-deepseek-harness-readme.md
---

# DeepSeek Harness 官方 README 与 Web UI 指南

> DeepSeek 官方开源智能体框架 `dsh`：Everything is a Plugin 插件化架构，一条 npx 命令启动 Web UI，配 API key → 选工作区 → 发任务三步上手

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | GitHub 仓库 deepseek-ai/deepseek-harness（README 中英文 + docs/user/guide/index.md） |
| 抓取时间 | 2026-11-02 |
| 仓库地址 | https://github.com/deepseek-ai/deepseek-harness |
| 仓库数据 | 267.7k stars · 32.5k forks · 24,922 commits（抓取时） |
| 协议 | MIT |
| 官方文档 | https://deepseek-harness.github.io/deepseek-harness/ |

## 核心观点

1. **官方定位是"agent harness（智能体框架）"**：DeepSeek Harness（命令 `dsh`）是 DeepSeek AI 开发的开源智能体运行框架，构建于"一切皆插件"（Everything is a Plugin）架构之上，由 Cordis 框架（cordiverse/cordis）驱动，设计理论出自论文《A Programming Paradigm for Spatiotemporal Composability》（arXiv 2608.25512）

2. **生态热度极高但仍处开发者预览**：267.7k stars、32.5k forks、近 2.5 万 commits（抓取时）；官方明确警告处于 developer preview、正在快速迭代、"未来将出现破坏兼容性的变更"，运行前须阅读 SAFETY.md 安全说明

3. **上手门槛极低**：装 Node.js 后一条命令 `npx @deepseek-ai/dsh web` 即在 `http://127.0.0.1:3080` 启动 Web UI 并自动开浏览器；也支持源码构建（pnpm install → build → dsh web）与热重载开发（pnpm run dev:web）

4. **Web UI 三步上手**：① Settings → Models 填入 DeepSeek API key（保存即生效，无需重启）；② Choose workspace 选中项目目录（不选工作区则会话输入框不可用，`dsh` 以启动目录为默认文件系统位置）；③ 开会话发任务即可——agent 能读写工作区文件、执行命令、委派工作（delegate）、维护计划（plan），敏感操作按权限策略先征询

5. **多形态扩展**：官方文档给出配置其他模型/自定义 OpenAI 兼容端点（providers.md）、Python SDK（python-sdk.md）、反向代理公网部署（public-deployments.md）、其他 CLI 模式（apps/cli）、开发插件（develop/basic）五条进阶路线；插件用 `dsh-plugin` 话题在 GitHub 上被发现

## 实操内容

### 启动命令（原样保留）

```sh
# npm 方式（需先安装 Node.js）
npx @deepseek-ai/dsh web          # Web UI 默认 http://127.0.0.1:3080，本机自动开浏览器
npx @deepseek-ai/dsh web --no-open  # 只起服务器不开浏览器

# 源码方式
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web                      # 使用已构建产物，不重新构建
```

### Web UI 使用三步

1. **配置模型**：Settings → Models → 填 DeepSeek API key（https://platform.deepseek.com/ 申请）→ 保存，模型路由立即生效不用重启
2. **选择工作区**：点 Choose workspace，添加并选中启动 `dsh` 的项目目录
3. **运行任务**：官方示例任务——`Summarize this repository and identify its main packages.`（总结这个仓库并指出主要包）

### 开发模式

```sh
pnpm run dev:web   # 一个终端内完成构建、启动、源码修改后重建 client bundle
make help          # 列出 Web 与 Desktop 对应的 Make target
```

## 关键概念

- **[[DeepSeek Harness]]**：本次素材的主角，DeepSeek 官方 agent 框架（实体页已创建）
- **agent harness**：智能体"运行框架/马具"——把模型、工具、会话、权限、UI 组织成可运行智能体的基础设施层
- **Cordis**：驱动 dsh 的插件化程序框架（cordiverse/cordis），支撑"一切皆插件"设计
- **工作区（workspace）**：dsh 的文件操作边界，未选中前会话输入框不可用

## 与其他素材的关联

- [[2026-11-02-deepseek-harness-tweet]]：@Super_Nius 的推文解读（Super-agent 双层架构、事件触发、Watchdog）——本素材是官方 README，补上了"是什么、怎么跑"的一手信息
- [[2026-11-02-codearts-telegram-bridge]]：同为 agent 基础设施思路（CLI/无头 + 远程 UI + 事件驱动），可对照学习
- [[DeepSeek]]：同一厂商，模型（API key）+ 框架（harness）配套

## 原文精彩摘录

> DeepSeek Harness（`dsh`）是由 DeepSeek AI 开发的开源 agent harness（智能体框架）。它构建于**一切皆插件**的架构之上，由 Cordis 驱动，其设计参见论文 A Programming Paradigm for Spatiotemporal Composability。——README.zh.md

> DeepSeek Harness 处于开发者预览阶段，正在快速迭代。未来将出现破坏兼容性的变更。运行本项目前，请阅读安全说明。——README.zh.md（开发者预览节）

> The agent can read and edit workspace files, run commands, delegate work, and maintain a plan. The Web UI asks before operations that require approval under the active permission policy. ——docs/user/guide/index.md（Run a task 节）

## 相关页面

- [[DeepSeek Harness]]
- [[DeepSeek]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
