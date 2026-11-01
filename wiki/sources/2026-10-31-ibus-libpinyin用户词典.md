---
tags: [输入法, ibus, libpinyin, 用户词典, 拼音]
created: 2026-10-31
updated: 2026-10-31
source_path: raw/notes/2026-10-31-ibus-libpinyin用户词典.txt
source_type: local_text
---

# 2026-10-31-ibus-libpinyin用户词典

> 本机 ibus-libpinyin 输入法的用户词典文件，共 296 条自定义词条，覆盖数据库、服务器运维、开发等领域高频术语，每行格式为 `短语<制表符>拼音<制表符>频率`。

## 基本信息

- **来源**：本机词典文件 `~/文档/user_dictionary.txt`（原始副本：raw/notes/2026-10-31-ibus-libpinyin用户词典.txt）
- **规模**：296 行词条
- **引擎**：ibus-libpinyin 1.16.5（Ubuntu 26.04.1 自带版本）
- **日期**：2026-10-31

## 核心观点

1. **词条按工作领域定制**：词典聚焦用户的实际工作语境——数据库操作（数据库、索引、事务、联表、主键、外键、字段、查询、插入、更新、删除）、运维操作（备份、恢复、迁移）、以及日常高频词，共 296 条。
2. **统一频率值 100**：所有词条频率均为 100。用户导入词的默认新词频率约 10，设为 100 可确保自定义术语的候选排序优先于系统词库的普通词。
3. **拼音格式为不带声调的连续小写**：如「数据库」→ `shujuku`、「负载均衡」→ `fuzaijunheng`，音节间不分隔、不带声调标记，与 libpinyin 的 `pinyin_iterator_get_next_phrase` API 及引擎二进制中的格式串 `%s\t%s\t%d` 一致。
4. **导入入口是图形界面而非命令行**：`ibus-setup-libpinyin` 设置 GUI →「User Data」页 →「Import Dictionary」按钮。按钮逻辑（`/usr/share/ibus-libpinyin/setup/main2.py` 的 `__import_dictionary_cb`，约 570 行）只是把文件路径写入 gsettings 键 `import-dictionary`，由引擎 `ibus-engine-libpinyin` 监听该键并实际解析导入。
5. **导入后需重启 IBus 生效**：执行 `ibus restart` 后新词条进入输入候选。

## 实操内容保留

### 词典文件格式（原始内容摘样）

```
数据库	shujuku	100
索引	suoyin	100
事务	shiwu	100
联表	lianbiao	100
关联	guanlian	100
查询	chaxun	100
插入	charu	100
主键	zhujian	100
外键	waijian	100
字段	ziduan	100
```

（字段间为制表符 `\t`，非空格）

### 生成/导入流程

```bash
# 1. 按格式生成词条文件（每行：短语 \t 拼音 \t 频率）
#    拼音规范：不带声调、连续小写、音节不分隔
# 2. 导入：运行 ibus-setup-libpinyin → User Data → Import Dictionary → 选择文件
# 3. 重启引擎生效
ibus restart
```

## 原文精彩摘录

> 数据库	shujuku	100
> 索引	suoyin	100
> 事务	shiwu	100
> 联表	lianbiao	100

> （格式规范推导依据）引擎二进制里有格式串 `%s\t%s\t%d` 与 `%s %s %d`；libpinyin API `pinyin_iterator_get_next_phrase(iter, &phrase, &pinyin, &count)` 返回不带声调的拼音。

## 与其他素材的关联

- 词典的录入对象是本机输入法环境，与 [[ibus-libpinyin]] 实体页直接对应；与 [[yazi]] 同属日常输入效率链路（键盘输入 → 文件管理 → 终端操作）。
- 词典揭示的高频领域（数据库、API、服务器运维）与 [[Linux系统配置]] 主题页记录的系统调优方向一致。

## 相关页面

- [[ibus-libpinyin]]
- [[Linux系统配置]]
