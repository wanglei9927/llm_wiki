---
tags: [HackerNews, 数据集, HuggingFace, Parquet, DuckDB, 开放数据, ClickHouse]
created: 2026-11-03
updated: 2026-11-03
source_path: raw/articles/Hacker News 全量数据集-readme.md
---

# open-index/hacker-news：HN 全量存档数据集（每 5 分钟更新）

> Hugging Face 上的 Hacker News 完整镜像：2006 年 10 月至今所有条目（story/comment/Ask HN/Show HN/招聘/投票），月度 Parquet + 5 分钟实时块，DuckDB 一行 SQL 直接查，ODC-By 开放许可

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | Hugging Face 数据集 https://huggingface.co/datasets/open-index/hacker-news |
| 抓取时间 | 2026-11-03（README 全文逐字存 raw/） |
| 数据规模 | 10M–100M 级条目（2006-10 至今）；2026 年单年 27.5 万条（卡片生成时点） |
| 热度 | 433 likes · 43.9 万下载（2026-11-03 API 查询） |
| 许可 | ODC-By v1.0（开放数据署名许可） |
| 数据源 | ClickHouse Playground（镜像官方 HN Firebase API）；实时数据直连 Firebase API |
| 管道 | Go + DuckDB，Zstandard level 22 压缩，按 id 排序 |
| 原始素材 | raw/articles/Hacker News 全量数据集-readme.md |

## 核心观点

1. **产品形态**：两层结构——`data/YYYY/YYYY-MM.parquet` 每月一个权威文件 + `today/YYYY/MM/DD/HH/MM.parquet` 5 分钟实时块；每天 UTC 零点整月重抓生成权威文件并原子删除当日碎片（重抓而非合并，保证完整去重）。附 stats.csv 记录每月条数/ID 范围/文件大小/抓取耗时，可验证完整性。

2. **数据字段（与 HN API item 格式一致）**：id、type（整数枚举：1=story、2=comment、3=poll、4=pollopt、5=job）、"by"（作者）、time、text（HTML 原文）、parent（评论树）、kids、url、score、title、descendants（讨论树总评论数）、words（分词）。deleted/dead 保留原样，无任何过滤。

3. **HN 全景统计（卡片自带）**：类型分布——评论 4306 万（87.2%）、story 626 万（12.7%）；84.1% 的 story 带外链；story 均值 23.4 条评论；得分呈陡峭幂律——中位数 0、均值 1.5、历史最高 6015 分，千分位破千分的仅 2169 个（0.03%）。最热讨论 9275 条评论。

4. **社区口味画像**：最常被分享域名 Top 5 = GitHub（21.4 万）、YouTube（13.9 万）、Medium（12.6 万）、NYT（7.9 万）、Wikipedia（5.6 万）；最活跃的投稿者是十几年的常青用户（rbanffy 3.8 万条居首）。官方自述社区偏差：严重偏向美国软件工程师/创业者，审核（flag/dead）反映社区价值观而非客观标准。

5. **使用注意（官方列出）**：type/deleted/dead 是整数不是字符串；`"by"` 是 DuckDB 保留字必须加双引号；text 是原始 HTML 需自行去标签；score 是 ClickHouse 同步时点的快照；不含用户资料页数据。

## 实操内容保留

**DuckDB 免下载直查（hf:// 路径）**：
```sql
-- 史上得分 Top 20
SELECT id, title, "by", score, url, time
FROM read_parquet('hf://datasets/open-index/hacker-news/data/*/*.parquet')
WHERE type = 1 AND title != ''
ORDER BY score DESC LIMIT 20;

-- 某主题历年热度（例：rust）
SELECT extract(year FROM time) AS year, count(*) AS mentions
FROM read_parquet('hf://datasets/open-index/hacker-news/data/*/*.parquet')
WHERE type = 1 AND lower(title) LIKE '%rust%'
GROUP BY year ORDER BY year;

-- 历年 Top 5 外链域名
SELECT extract(year FROM time) AS year,
       regexp_extract(url, 'https?://([^/]+)', 1) AS domain, count(*) AS stories
FROM read_parquet('hf://datasets/open-index/hacker-news/data/*/*.parquet')
WHERE type = 1 AND url != ''
GROUP BY year, domain
QUALIFY row_number() OVER (PARTITION BY year ORDER BY stories DESC) <= 5
ORDER BY year, stories DESC;
```

**Python 三种姿势**：
```python
from datasets import load_dataset
ds = load_dataset("open-index/hacker-news", split="train", streaming=True)  # 流式全量

from huggingface_hub import snapshot_download
snapshot_download("open-index/hacker-news", repo_type="dataset",
                  local_dir="./hn/", allow_patterns="data/2024/*")  # 只下 2024（~1.5GB）
# 提速：pip install huggingface_hub[hf_transfer] && HF_HUB_ENABLE_HF_TRANSFER=1
```

CLI 单月下载：`huggingface-cli download open-index/hacker-news data/2024/2024-01.parquet --repo-type dataset --local-dir ./hn/`

**stats.csv 直查**：`SELECT * FROM read_csv_auto('hf://datasets/open-index/hacker-news/stats.csv')`

## 原文精彩摘录

> Every Hacker News item since 2006, live-updated every 5 minutes（数据集副标题）

> The median score of 0 reflects the fact that many stories are submitted but never gain traction. …the top 0.03% (those with 1,000+ points) represent the content that defined conversations across the technology industry.

> We have not applied any additional filtering or quality scoring to the data. All items, including deleted and dead items, are preserved exactly as they appear in the source.

## 关键概念

- Hacker News：Y Combinator 旗下技术社区，本数据集为其完整镜像（详见 [[Hacker News]] 实体页）
- hf:// 路径直查：DuckDB 直接读 Hugging Face 上的 Parquet，无需先下载（仅 1 篇素材提及）
- 重抓式 day rollover：整月重取替代增量合并，天然去重防碎片（仅 1 篇素材提及）

## 相关页面

- [[Hacker News]]
- [[黑客书架]]（基于 HN 评论的下游应用）
- [[AI编程开发]]
