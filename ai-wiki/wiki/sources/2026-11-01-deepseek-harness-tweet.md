---
tags: [DeepSeek, deepseek-harness, Super-agent, AI Agent, 多任务并行, 开源项目]
created: 2026-11-01
updated: 2026-11-01
source_path: raw/tweets/2026-11-01-deepseek-harness-tweet.md
---

# DeepSeek Harness：Super-agent 双层架构开源项目

> @Super_Nius 解读 DeepSeek 新项目 deepseek-harness（"Everything is a Plugin"）：用 Router + Worker 双层 Super-agent 解决"一个会话一个孤岛"的多任务并行问题

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 帖子 @Super_Nius（Super Niu，独立开发者） |
| 发布时间 | 2026-10-31 2:22 PM（页面显示时间） |
| 原文链接 | https://x.com/super_nius/status/2116536297842213119 |
| 互动数据 | 2.16 万浏览 · 29 回复 · 15 转推 · 136 引用 · 162 喜欢 |
| 项目 GitHub | https://github.com/deepseek-ai/deepseek-harness（DeepSeek Harness: Everything is a Plugin） |

## 核心观点

1. **问题定义——Agent 会话孤岛**：现在的 Agent 一个会话就是一个孤岛，同时推进几件事需要用户自己来回切换窗口、自己记上下文（原帖："现在的 Agent 一个会话就是一个孤岛，你同时推几件事，得自己来回切、自己记上下文"）

2. **Super-agent 双层架构**：Router 层只管跟用户聊、记全局上下文、派活；Worker 层为每个任务单独开一个隔离会话并行执行，干完向 Router 汇报，不直接找用户

3. **事件触发机制**：群消息、邮件、代码评论、CI 结果等外部事件自动喂给 Agent，从"用户拉"变成"事件推"

4. **Watchdog 看门狗**：Agent 挂了能自己恢复，保障持续运行（作者定位："给每个人配一个 24 小时在线的 AI 秘书长"）

5. **作者持观望态度，评论区有质疑**：项目刚发布，作者称"我想看的是真能跑起来的那天"；@r8tba 曾实现类似"会议模式"（主 agent 接活派子 agent、事件总线回传结果）后删除，认为"方向错了"，并称"这个方向也是 codex 走的"；@Kepler_Nicoles 指出 Claude Code 的 project 机制与之类似

## 实操内容

（本文为项目解读推文，无实操代码/模板/步骤）

- 源码仓库：https://github.com/deepseek-ai/deepseek-harness（项目口号：Everything is a Plugin）
- 架构要点（据推文转述）：Router/Worker 双层 + 任务隔离会话 + 事件触发 + Watchdog 自恢复

## 原文精彩摘录

> 它说现在的 Agent（能自己干活的 AI）一个会话就是一个孤岛，你同时推几件事，得自己来回切、自己记上下文。他们的解法叫 Super-agent，两层：Router 层：只管跟你聊、记全局、派活；Worker 层：每个任务单独开一个隔离会话并行干，干完向 Router 汇报，不直接找你。
> ——原帖 @Super_Nius，2026-10-31

> 之前做过，我的agent更高级，就是会议模式，主agent负责接活把活交给子agent，同时动态排版，时刻跟你聊天，子agent通过事件总线投递结果给主agent，但是后面我删除了，方向错了，而且这个方向也是codex走的
> ——评论区 @r8tba

## 关键概念

- DeepSeek Harness / Super-agent：DeepSeek 开源的多任务 Agent 架构（仅 1 篇素材提及，积累更多素材后创建实体页；[[DeepSeek]] 实体页已追加相关信息）
- 事件触发 Agent：由外部事件（群消息/邮件/代码评论/CI 结果）驱动而非用户轮询的 Agent 运行模式（仅 1 篇素材提及，积累更多素材后创建实体页）

## 相关页面

- [[DeepSeek]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
