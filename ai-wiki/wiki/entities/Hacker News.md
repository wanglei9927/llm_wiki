---
tags: [HackerNews, YCombinator, 技术社区, 数据集, 开放数据]
created: 2026-11-03
updated: 2026-11-03
sources: [Hacker News 全量数据集]
---

# Hacker News

> Y Combinator 运营的技术社区（news.ycombinator.com），互联网上最具影响力的技术讨论阵地之一；知识库关注其数据生态与以它为数据源的下游应用

## 详细内容

### 平台概况

- 由 Y Combinator 自 2007 年运营（2006 年 10 月开始有数据存档）
- 内容类型：story（含 Ask HN / Show HN / 普通外链）、comment、poll、job
- 内容体量：626 万+ story、4306 万+ 评论；84.1% 的 story 带外链
- 得分分布：中位数 0、均值 1.5、历史最高 6015；千分以上 story 仅 2169 个（0.03%）
- 社区画像（官方自述偏差）：重度偏向美国软件工程师/创业者，GitHub 是最常被分享的域名（21.4 万次）

### 数据获取渠道

| 渠道 | 说明 |
|---|---|
| 官方 Firebase API | https://hacker-news.firebaseio.com/v2 ，逐条按 ID 取，实时 |
| ClickHouse Playground | https://sql.clickhouse.com ，免费公共 SQL 端点，完整镜像 HN 数据 |
| HF 全量数据集 | open-index/hacker-news（[[Hacker News 全量数据集]]）：月度 Parquet + 5 分钟实时，DuckDB hf:// 直查 |

## 不同素材中的观点

- **[来源: [[Hacker News 全量数据集]]]** HN 存档价值：LLM 预训练/微调语料、二十年技术趋势分析、社区动力学研究、检索基准；数据含 deleted/dead 条目原样保留，无质量过滤，使用时注意社区偏差与审核痕迹。

## 相关页面

- [[Hacker News 全量数据集]]
- [[黑客书架]]（基于 HN 评论的书榜应用）
- [[AI编程开发]]
