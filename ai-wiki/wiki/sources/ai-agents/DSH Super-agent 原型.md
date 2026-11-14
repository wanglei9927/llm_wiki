---
tags: [DeepSeek Harness, dsh-superagent, Super-agent, GitHub, coding agent, 开源项目]
created: 2026-11-02
updated: 2026-11-02
source_path: raw/articles/2026-11-02-dsh-superagent-prototype-readme.md
---

# dsh-superagent-prototype：Super-agent 落地原型（仓库 README）

> 打包成 DeepSeek Harness bundle 的 GitHub 仓库值守 agent：监听 GitHub（可选飞书）→ 开工作项 → 独立会话独立目录干活 → 原对话回 PR；官方推荐"让你的 coding agent 读 SETUP.md 帮你装"

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | GitHub 仓库 deepseek-ai/dsh-superagent-prototype（main 分支 README） |
| 抓取时间 | 2026-11-02 |
| 仓库地址 | https://github.com/deepseek-ai/dsh-superagent-prototype |
| 仓库数据 | 4.6k stars · 424 forks · 仅 1 commit · MIT |
| 所属框架 | [[DeepSeek Harness]]（打包为 dsh bundle） |

## 核心观点

1. **定位声明非常克制（官方加粗警告）**："Research prototype for reference only, not an official DeepSeek product"——大量工程由 coding agent 完成，代码风格可能不一致、可能有 bug，非生产就绪；与论文《Exploring Super-agent Design: Towards a More Autonomous Agent System》所述实现不完全一致，部分设计是未来方向未实现

2. **它是什么**：面向**单个 GitHub 仓库**的 proactive coding agent。监听 GitHub 事件（可选接入飞书）；当被授权的用户请求工作时，它开一个工作项（work item），在自己的 agent 会话和独立目录里干活，然后回到原对话汇报结果（例如提交一个 PR）；Web 面板展示"哪些事情需要人来处理"

3. **工作哲学（注意力经济学）**："take as little human attention as possible, and give as much value as possible"——能替整个团队干活的 agent 也能浪费整个团队的注意力，所以它**只在被要求或团队写的规则允许时行动**，**只在有人必须行动或能利用结果时说话**（docs/000-philosophy.md）

4. **安装方式本身就是 agent 用法示范**：官方不写长教程，而是让 agent 帮你装——对你的 coding agent 说："Read SETUP.md in this repository and set up dsh-superagent with me."它一次问一个简短问题、先展示完整计划、然后自动完成安装配置

5. **文档按编号递进阅读**：000 哲学 → 001 领域模型 → 002 授权 → 003 执行 → 004 提示词 → 005 面板 → 006 部署（手动安装/配置/升级/排错）→ 007 架构 → 008 食谱（添加新 Source）

## 实操内容

### 安装（官方推荐方式，原样保留）

对你的 coding agent 说：

> Read SETUP.md in this repository and set up dsh-superagent with me.

agent 会一次问一个简短问题、展示完整计划、然后安装并配置一切。手动部署见 docs/006-deployment.md。

### 自行开发

```sh
pnpm check   # 跑 typecheck、测试与构建
```

## 关键概念

- work item（工作项）：agent 接到请求后开启的任务单元，在独立会话+独立目录中执行
- Source：事件来源（GitHub、飞书等），008 Cookbook 教如何新增
- Web 面板：需要人工介入事项的展示层
- 授权（Authorization）：谁能派活、agent 何时自动行动的边界（002 专章）

## 与其他素材的关联

- [[DeepSeek Harness 发布推文]]：@Super_Nius 最早解读的 Router/Worker 架构即此原型的设计思想
- [[Super-agent 原型推文合集]]：发布推文与实验数据（中位数 12.4 分钟）、社区冷思考
- [[CodeArts Telegram 桥]]：同为"agent 被事件驱动 + 独立会话干活 + 汇报结果"的思路，此原型是官方完整实现
- 官网"智能体团队（实验性）"插件是 Super-agent 理念在 dsh 产品内的对应形态（见 [[DeepSeek Harness 官网]]）

## 原文精彩摘录

> dsh-superagent is a proactive coding agent for one GitHub repository, packaged as a bundle for DeepSeek Harness. It listens to GitHub and, optionally, Feishu. When someone allowed asks the agent for work, it opens a work item, works on it in its own agent session and directory, and answers in the original conversation, for example with a pull request. ——README

> Take as little human attention as possible, and give as much value as possible. An agent that can act for a whole team can also waste a whole team's attention, so it acts only when asked or when a rule the team wrote allows it, and speaks only when someone must act or can use a result. ——README（工作哲学）

> Setup has many steps, so an agent does it with you. It asks one short question at a time, shows the full plan once, and then installs and configures everything. ——README（Setup 节）

## 相关页面

- [[DeepSeek Harness]]
- [[Super-agent 原型推文合集]]
- [[DeepSeek Harness 官网]]
- [[AI Agent 智能体]]
- [[DSH 入门学习路径]]
