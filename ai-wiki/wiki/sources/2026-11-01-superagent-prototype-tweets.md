---
tags: [DeepSeek Harness, Super-agent, dsh-superagent-prototype, AI Agent, 多任务并行, 实验数据]
created: 2026-11-01
updated: 2026-11-01
source_path: raw/tweets/2026-11-01-superagent-prototype-tweets.md
---

# dsh-superagent-prototype 发布：两条推文综合（@IAmHuTu、@meow2149）

> DeepSeek 开源 Super-agent 原型仓库 dsh-superagent-prototype（"Towards a More Autonomous Agent System"）：乐观解读"24 小时不下班的 AI 团队"，系统解读附初步实验数据（任务完成中位数 12.4 分钟 vs 传统方案 P95 29.5 分钟），评论区泼冷水

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 推文两条：@IAmHuTu（2026-11-01 2:52 AM）与 @meow2149（2026-10-31 7:53 PM） |
| 指向仓库 | https://github.com/deepseek-ai/dsh-superagent-prototype |
| 互动数据 | 胡图：3,545 浏览 / 20 转推 / 30 喜欢；meow：2,218 浏览 / 2 转推 / 8 喜欢 |
| 原始素材 | raw/tweets/2026-11-01-superagent-prototype-tweets.md（两条合并保存） |

## 核心观点

1. **新仓库发布**：DeepSeek 开源 dsh-superagent-prototype（MIT，抓取时 4.6k stars），即 Super-agent 架构的落地原型——与此前 [[2026-11-01-deepseek-harness-tweet]] 的架构解读互相印证，正式有了可运行实现

2. **实验数据（@meow2149，具身智能工程师）**：初步实验中 Super-agent 任务完成时间**中位数 12.4 分钟、P95 15.7 分钟**，而传统单会话方案 **P95 达 29.5 分钟**——长尾任务提速近一半

3. **场景想象（@IAmHuTu）**："你睡觉的时候，它还在帮你整理资料、跟进进度；你同时开好几个项目，它能并行推进；只有需要你拍板的时候，它才会找你"——从陪聊工具转向真正接手繁琐工作

4. **架构要点（@meow2149）**：Router 接收消息/管理上下文/分配任务 + Worker 并行执行互不干扰；事件驱动（主动关注群聊、代码审查、CI 结果）；云端状态管理 + Watchdog 支持后台执行、异常监控与恢复

5. **社区冷思考（评论区，含金量高）**：
   - @staroaeg（163 赞）："常驻只是第一步，真能省心还得看权限、回滚和异常提醒做得怎么样"
   - @HSkyer99871（96 赞）："真正难的是中间那段：任务拆得够不够细、出错了能不能停下来等你确认。没有这两条，所谓的自主推进很容易变成自主跑偏，醒来收拾的活比省下的还多"
   - @echoecho1996（81 赞）：任务分下去的通信开销要评估

## 实操内容

（本文为推文综合，无实操代码/模板/步骤）

- 原型仓库安装方式特殊：官方推荐让 coding agent 代为安装，见 [[2026-11-01-dsh-superagent-prototype]] 摘要

## 原文精彩摘录

> 以后一个普通人，也可能拥有一支24小时不下班的AI团队!!! ……现在的AI更像陪聊工具，而这个方向是在尝试让AI真正接手繁琐工作。——@IAmHuTu

> 这种 superagent 最诱人的地方不是能并行跑几个项目，而是把人的时间切开了：机器在后台推进，只有拍板才找人。但真正难的是中间那段……没有这两条，所谓的自主推进很容易变成自主跑偏。——@HSkyer99871

## 关键概念

- dsh-superagent-prototype：Super-agent 原型仓库（详见 [[2026-11-01-dsh-superagent-prototype]] 摘要与 [[DeepSeek Harness]] 实体页）
- 注意力经济学："尽可能少占用人的注意力，尽可能多创造价值"——原型 README 明确写入的工作哲学

## 相关页面

- [[DeepSeek Harness]]
- [[2026-11-01-dsh-superagent-prototype]]
- [[AI Agent 智能体]]
- [[DSH 入门学习路径]]
