---
tags: [DeepSeek Harness, dsh, 入门教程, 学习路径, AI Agent, 桌面端, Super-agent]
created: 2026-11-01
updated: 2026-11-01
sources: [2026-11-01-deepseek-harness-readme, 2026-11-01-deepseek-harness-guides, 2026-11-01-deepseek-harness-official-site, 2026-11-01-superagent-prototype-tweets, 2026-11-01-dsh-superagent-prototype, 2026-11-01-deepseek-harness-tweet, 2026-11-01-dsh-go-tweet]
---

# DSH 入门学习路径（小白版）

> 综合自 7 篇素材（官网 + GitHub 官方文档 + 4 条推文）| 生成日期：2026-11-01 | 目标读者：零基础想上手 dsh 的你

## 背景概述

DeepSeek Harness（命令 `dsh`）是 DeepSeek 开源的智能体框架（agent harness）：**模型是"发动机"，dsh 是"整车"**——把大模型、文件读写、命令执行、权限审批、插件系统和用户界面组装成一个能持续干活的智能体。它有两种形态：桌面应用（有安装包）和网页应用（一条命令启动），面向全球开放测试并同步开源（MIT）。

本页综合官网、GitHub README/文档与社区讨论，给出一条从零到上手的路线。想看细节时，沿着"相关页面"的链接进入对应摘要页。

## 学习路线图（5 步）

### 第 0 步：认识四个核心词（5 分钟）

| 词 | 意思 | 类比 |
|---|---|---|
| harness | 智能体运行框架，让模型持续干活 | 车身（模型是发动机） |
| 插件（plugin） | dsh 的能力扩展单元：工具+技能+界面 | 手机上的 App |
| 工作区（workspace） | agent 被允许读写文件的范围 | 给 agent 划的"作业本" |
| 会话（session） | 一次对话及其上下文 | 微信聊天窗口 |

### 第 1 步：安装（三选一）

| 方式 | 适合谁 | 前置要求 | 入口 |
|---|---|---|---|
| **桌面端（小白推荐）** | 不想碰命令行 | 无 | 官网下载：macOS（Apple 芯片）dmg / Windows x64 exe |
| npx 命令启动 | 愿意开终端 | 装 Node.js | `npx @deepseek-ai/dsh web` → 浏览器自动打开 127.0.0.1:3080 |
| 源码构建 | 想参与开发 | Node.js + pnpm | `git clone` → `pnpm install` → `pnpm run build` → `pnpm dsh web` |

桌面端下载地址见 [[2026-11-01-deepseek-harness-official-site]]；命令与源码细节见 [[2026-11-01-deepseek-harness-readme]]。

### 第 2 步：首次配置（3 个动作）

1. **配模型**：设置 → 模型 → 填 DeepSeek API key（platform.deepseek.com 申请）→ 保存即生效，不用重启
2. **选工作区**：点"选择工作区"添加并选中一个文件夹——**不选工作区则无法发消息**（agent 只能在工作区内读写）
3. **理解权限审批**：agent 读写文件、执行命令前会按权限策略弹窗征求你的批准——这是安全底线，别嫌烦

### 第 3 步：跑第一个任务

官方示例任务：`Summarize this repository and identify its main packages.`（总结这个仓库并指出主要包）。之后可以试官网展示的日常场景：生成数据汇总 PPT、给报表补同比环比列、准备会议议题清单。完成结果可直接预览（Word/Excel/HTML/PDF 等），对话里继续改。

### 第 4 步：让它变成"常驻助手"

- **插件**：插件市场安装官方插件；或在"创造模式"里**用对话生成插件**（官网演示：番茄时钟插件 5 分 24 秒做完装好）
- **自动化任务**：对话"每周五 17:00 整理本周记录生成周报"→ 底层 `schedule_create` 定时触发
- **智能体团队（实验性插件）**：Super-agent 多任务并行理念的产品化入口

### 第 5 步：前沿玩法（进阶后）

- **Super-agent 原型**（dsh-superagent-prototype）：让 agent 值守一个 GitHub 仓库——监听 issue/PR，独立会话干活，原对话回 PR；官方推荐让 coding agent 代为安装："Read SETUP.md in this repository and set up dsh-superagent with me."（见 [[2026-11-01-dsh-superagent-prototype]]）
- **编程化调用**：`dsh --profile headless "任务"` 跑一次性脚本任务；Python SDK（`pip install deepseek-harness-sdk`）把 agent 嵌进自己的程序（见 [[2026-11-01-deepseek-harness-guides]]）
- **插件开发**：文档 docs/develop/basic；第三方插件用 `dsh-plugin` 话题发布

## 核心观点（跨素材综合）

- **上手成本被官方压到极低**：桌面端免命令行；命令行用户一条 npx 启动；模型路由保存即生效（来源：[[2026-11-01-deepseek-harness-official-site]]、[[2026-11-01-deepseek-harness-readme]]）
- **Super-agent 已有实验数据支撑**：任务完成时间中位数 12.4 分钟、P95 15.7 分钟，传统单会话 P95 29.5 分钟——但仍是"探索阶段的原型"（来源：[[2026-11-01-superagent-prototype-tweets]]）
- **设计哲学是"注意力经济学"**："尽可能少占用人的注意力，尽可能多创造价值"——只在被要求或规则允许时行动，只在有人必须行动或能利用结果时说话（来源：[[2026-11-01-dsh-superagent-prototype]]）
- **热度与争议并存**：主仓 267.7k stars，但官方反复强调 developer preview 会有破坏性变更；社区提醒"常驻只是第一步，得看权限、回滚和异常提醒"（来源：[[2026-11-01-deepseek-harness-readme]]、[[2026-11-01-superagent-prototype-tweets]]）

## 不同视角对比

| 维度 | 官方（README/官网） | 乐观派（@IAmHuTu） | 冷静派（评论区 @HSkyer99871/@staroaeg） |
|------|------|------|------|
| 定位 | 研究原型，非正式产品 | "24 小时不下班的 AI 团队" | 常驻只是第一步 |
| 价值 | 五大能力开箱即用 | 睡觉时也在帮你干活 | 把人的时间切开：拍板才找人 |
| 风险 | preview 破坏性变更、SAFETY.md | —— | 任务拆分不细/出错不停 → "自主跑偏"；权限、回滚、异常提醒、通信开销待验证 |

## 学习资源清单

| 资源 | 地址 | 用途 |
|---|---|---|
| 官网（含桌面端下载） | https://deepseek.com/harness | 安装、功能总览 |
| 开发者文档 | https://deepseek-harness.github.io/deepseek-harness/guide/quickstart | 配置模型/CLI/SDK/插件开发 |
| 主仓库 | https://github.com/deepseek-ai/deepseek-harness | README、docs/ 全套文档 |
| Super-agent 原型 | https://github.com/deepseek-ai/dsh-superagent-prototype | 000-008 编号文档递进阅读 |
| 社区插件 | https://github.com/topics/dsh-plugin | 第三方插件发现 |
| Cordis 论文 | https://arxiv.org/abs/2608.25512 | "一切皆插件"的理论基础 |
| 社区 | Discord / 企业微信 / 微信公众号 | 提问与跟进（README 有入口） |
| DSH Go（社区安卓客户端） | github.com/ccch1mneyyy/dsh-Go | Android 8+ 本机跑 dsh 引擎 / SSH 接管电脑；**建议单独申请 API Key，勿用主力 Key** |

## 本知识库的 dsh 素材索引

1. [[DeepSeek Harness]] — 实体页：定义、架构、安装、配置、注意事项（建议从这里开始）
2. [[2026-11-01-deepseek-harness-tweet]] — 最初的架构解读推文
3. [[2026-11-01-deepseek-harness-readme]] — README 概览与启动三步
4. [[2026-11-01-deepseek-harness-guides]] — 模型配置/CLI/Python SDK 实操细节
5. [[2026-11-01-deepseek-harness-official-site]] — 官网：桌面端、创造模式、插件清单
6. [[2026-11-01-superagent-prototype-tweets]] — 原型发布推文与实验数据
7. [[2026-11-01-dsh-superagent-prototype]] — 原型仓库深读
8. [[2026-11-01-dsh-go-tweet]] — DSH Go：安卓手机运行 DSH 引擎的社区客户端

## 尚待解决的问题（可作为后续学习方向）

- 桌面端与 Web UI 的功能差异（官方未详细对比）
- "智能体团队"实验性插件的实际体验与限制（中文社区实测少）
- Super-agent 原型的任务拆分与出错暂停机制细节（000-008 文档值得精读）
- 非 DeepSeek 网关接入的兼容性坑（providers 文档排错表已列，实际命中率待验证）

## 相关页面

- [[DeepSeek Harness]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
- [[2026-11-01-deepseek-harness-official-site]]
- [[2026-11-01-dsh-superagent-prototype]]
- [[2026-11-01-superagent-prototype-tweets]]
