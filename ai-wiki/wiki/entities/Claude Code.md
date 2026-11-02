---
type: entity
name: Claude Code
category: 工程工具
tags: [Claude Code, Anthropic, CLI, AI编程, 代码审查, 验证]
sources: [2026-11-02-claude-code-practical-dev-techniques]
created: 2026-11-02
updated: 2026-11-02
---

# Claude Code

> Anthropic 推出的终端 AI 编程代理，能读写代码、执行命令、运行测试，并按任务自主迭代。

## 简介

Claude Code 是 Anthropic 官方的 AI 编程工具，以 CLI 形态运行在终端中，也可以嵌入 IDE 或桌面客户端。它与普通代码补全不同，能够直接操作工作区：读取文件、修改代码、执行 shell 命令、运行测试，并在失败后继续尝试。

它的定位更接近"能动手的编程代理"，而不是"会聊天的代码助手"。因此，使用效果很大程度取决于两件事：任务边界是否清楚，以及完成标准是否可验证。

## 核心能力

- 读写工作区文件
- 执行 shell 命令与测试
- 自主多步完成任务
- 通过 MCP 连接外部工具与数据
- 支持 hooks、skills、subagents 等扩展机制
- 支持 `/code-review`、`/security-review` 等内置检查入口
- 支持非交互模式 `-p` 与 `--resume` 续接会话

## 团队实践数据

根据にく（@29meat_ai）对 Anthropic 团队公开分享的整理：

- Claude Code 自身约 90% 的代码由 Claude 编写
- 2026 年 6–9 月，合入变更量翻倍以上
- 同期事后需要回滚的变更比例下降 40% 以上
- 引入 Claude 评审后，带"有意义指摘"的变更比例从 16% 升到 54%

这些数字来自团队自报，不是可复现实验。更值得关注的是背后的机制：把可自动验证的工作交给 Claude，人只保留不可逆决策与最终责任。

## 工作方式

Anthropic 团队的实践可以概括为三点：

1. 不轻信"完成了"
   要求实际执行结果、截图、试过的操作与未验证项。
2. 评审交给独立上下文
   用 `/code-review` 或新会话，避免原会话的预设影响判断。
3. 给循环设上限
   评审往返与同一 bug 的修复次数都要有上限，超过就交回人判断。

## 安全注意

- 不要在下载文件夹中启动 Claude Code，避免被恶意 `AGENTS.md` / `CLAUDE.md` 注入
- 不要把 API key、密码直接写进代码或指令文件
- 发布前跑 `/security-review`
- 删除、外发、发布相关的权限请求要读清楚再同意
- 基础组件（PHP、Linux 等）的漏洞同样会影响 Claude Code 生成的产应用

## 常用入口

- `/code-review`：独立评审当前改动
- `/security-review`：安全检查
- `claude -p`：非交互执行
- `claude --resume <session>`：续接会话
- `CLAUDE.md`：项目级指令与边界

## 适用场景

- 从零搭建原型或小应用
- 在既有代码库中做有边界的修改
- 批量重构、测试补全、文档生成
- 把重复性工程任务交给代理执行
- 需要"执行—验证—修正"闭环的开发任务

## 不同素材中的观点

来自 [[2026-11-02-claude-code-practical-dev-techniques]]：

- Claude Code 的价值不在于"替你写完"，而在于把验证也变成可委托的流程
- 人仍然要决定"做什么"，并对发布结果负责
- 独立评审与循环上限，是避免"无限修复"的两个关键机制
- 不可逆操作必须由人亲自确认，Claude 的 OK 不能替代人的 OK

## 相关页面

- [[2026-11-02-claude-code-practical-dev-techniques]]
- [[Claude Code 实战开发术]]
- [[AI编程开发]]
- [[MCP 模型上下文协议]]
- [[AI Agent 智能体]]
