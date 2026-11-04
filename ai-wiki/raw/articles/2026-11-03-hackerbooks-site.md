# 黑客书架 Hacker Books 中文版（站点资料）

- 首页：https://hackerbooks.qiaomu.ai/
- 抓取日期：2026-11-03（首页+子页 JS 渲染无法直接抓取；书籍数据从站点数据接口 /data/books-top.json、/data/books.json、/data/meta.json 获取，全量书单 15362 本）

---

## 站点介绍（首页原文摘录）

> 黑客书架 Hacker Books 中文版：收录 Hacker News 评论中提及的书籍，按多少位不同的读者提及排序。数据整理自 hackerbooks.org（roansh 作品），书籍元数据与封面来自 Open Library，评论版权归原作者所有，点击可回到原帖。本站与 Y Combinator / Hacker News 无从属关系。

- 作者：向阳乔木（https://www.qiaomu.ai/，X：@vista8，公众号「向阳乔木推荐看」）
- 开源仓库：https://github.com/joeseesun/hackerbooks-cn
- 上游数据源：hackerbooks.org（roansh 作品）

## 站点结构（导航栏目）

- 今日书架 / 值得读精选 / 历史总榜 / 趋势 / 我的书架
- 最多推荐 / 林迪榜 / 争议与劝退 / 上升最快 / 书籍星图 / 高级筛选 / 为你推荐 / 关于本站

## 全库统计（meta.json，2026-11-02 生成）

- 收录书籍：15,362 本
- 提及总数：270,334 次（其中"推荐"类提及 147,823 次）
- 来源评论：217,954 条
- 参与评论者：56,456 位
- 时间跨度：2007–2026（HN 建站至今）

## 数据字段说明（从数据结构推断）

| 字段 | 含义 |
|---|---|
| t / tz | 英文书名 / 中文译名 |
| a / y | 作者 / 初版年份 |
| u | 提及的不同读者数（核心排序依据） |
| n | 提及总次数 |
| s | 综合评分（0-100） |
| c | 相关评论的 HN karma 分数 |
| tp | 话题标签（programming / fiction / math 等） |
| f / l | 首次 / 最近提及年份 |
| r / dr | 推荐比例 / 趋势变化 |
| w | AI 生成的一句话中文点评 |

## 备注

- 全量数据（books.json，15362 本，约 3.5MB）未入库；如需查某本书，可访问站点或用 URL：https://hackerbooks.qiaomu.ai/data/books.json
- Top 600 历史总榜原始 JSON 已存本仓库：2026-11-03-hackerbooks-top600.json
