# wiki-summarize 使用与配置手册

> 本文是 `SKILL.md` 的配套说明,面向"要调用或复刻这个 skill 的 agent"。
> 权威定义仍以 `SKILL.md` 为准;两者冲突时按 `SKILL.md` 执行,并回来修本文。

## 1. 这个 skill 做什么

对**一个已存在的知识库**做整体盘点,产出一份 `SUMMARY.md`:

- 扫描目录结构与页面
- 检查断链、孤页、过短页、占位文本、未消化素材
- 归纳主题地图与分主题要点
- 给出待补全建议

**不做的事:**

- 不总结单篇文章(那是 ingest 的工作)
- 不修改知识库正文
- 不自动 commit / push
- 不把多个知识库混进一份报告

## 2. 文件清单

```
.claude/skills/wiki-summarize/
├── SKILL.md              # 权威定义:适用范围、六步流程、报告模板、铁律
├── README.md             # 本文:配置与复用说明
└── scripts/
    └── scan-wiki.sh      # 只读扫描器,输出六段体检结果
```

依赖:

- bash 4+
- GNU coreutils(`find` / `grep` / `sed` / `mapfile`)
- Windows 必须用 Git Bash 执行,**不要**用 cmd 或 PowerShell

## 3. 安装与配置

### 3.1 用户级安装(推荐)

把 skill 链接到用户目录,任何项目都能触发。

Windows(cmd,管理员或开发者模式):

```bat
mklink /J "C:\Users\<user>\.claude\skills\wiki-summarize" "E:\llm_wiki\.claude\skills\wiki-summarize"
```

Linux / macOS:

```bash
ln -s /path/to/llm_wiki/.claude/skills/wiki-summarize ~/.claude/skills/wiki-summarize
```

当前机器已配置:

```
C:\Users\user\.claude\skills\wiki-summarize
  -> E:\llm_wiki\.claude\skills\wiki-summarize
```

### 3.2 默认知识库路径

写在 `~/.llm-wiki-path`:

- 单个路径,或每行一个路径
- 当前值:`E:\llm_wiki`

定位顺序见第 5 节。该文件只是兜底,用户显式给路径时以用户为准。

### 3.3 多知识库约定

一个仓库下可以有多个库,每个库根目录放一个 `.wiki-schema.md`。

当前仓库:

- `ai-wiki/`
- `stock-wiki/`

规则:

- 每个库单独产出一份 `SUMMARY.md`
- 不要把多个库写进同一份报告
- 在仓库根目录执行时,脚本不会替你选库,必须问用户或按库名执行

### 3.4 远端与提交身份

远端优先级:

1. `mywiki`
2. 当前分支上游
3. `origin`

当前配置:

- `mywiki` → `git@github.com:wanglei9927/llm_wiki.git`
- 分支:`main`
- 仓库本地 `user.name` 是 `wanglei1`,但仓库约定提交身份是:

```bash
git -c user.name=wanglei9927 -c user.email=leiwang9927@gmail.com commit -m "..."
```

⚠️ 两条规则并存时,以仓库 `AGENTS.md` 的 `wanglei9927` 约定为准。

### 3.5 可选交叉校验

如果存在:

```
.claude/skills/llm-wiki-skill/scripts/lint-wiki.sh
```

可追加运行:

```bash
bash .claude/skills/llm-wiki-skill/scripts/lint-wiki.sh <库名> links sources content
```

两者结论冲突时:

- 以 `scan-wiki.sh` 为准
- 在报告里注明差异

## 4. 触发方式

用户说这些话时触发:

- "总结知识库"
- "梳理知识库"
- "知识库盘点"
- "知识库总结报告"
- "这个库现在有什么"
- 或明确要求对某个 wiki 目录做整体梳理

不触发:

- "总结这篇文章"
- "消化这条素材"
- 单页润色、单页 lint

## 5. 执行流程

### 第 0 步:同步远端(写库前必须)

```bash
git -C "<仓库根>" fetch <远端>
git -C "<仓库根>" -c rebase.autoStash=true pull --rebase <远端> <分支>
```

规则:

- 有未提交改动时,`autoStash` 会自动 stash 再恢复
- 冲突就停,列出冲突文件交用户,不自行合并
- 禁止 `push -f`
- 不在 git 仓库内时跳过,并在报告总览注明"非 git 快照"

### 第 1 步:定位知识库根

按顺序命中即止:

1. 用户给了路径或库名
2. 当前目录含 `.wiki-schema.md`
3. 当前目录下有多个子目录含 `.wiki-schema.md` → 列出并问用户
4. `~/.llm-wiki-path` 存在且目录有效
5. 都没有 → 问用户,不要猜

### 第 2 步:结构扫描(只读)

```bash
bash "<skill目录>/scripts/scan-wiki.sh" "<知识库根>"
```

这是报告"客观事实"部分的唯一来源。
所有主观归纳必须建立在它之上。

### 第 2.5 步:交叉校验(可选)

见 3.5。

### 第 3 步:通读核心页面

优先级:

1. `.wiki-schema.md`、`index.md`、`overview.md`、`log.md`
2. 全部 `wiki/topics/*.md`(逐页读正文)
3. 全部 `wiki/entities/*.md`(逐页读正文,不能只看标题)
4. `wiki/sources/`、`wiki/comparisons/`、`wiki/synthesis/` 浏览,重点页细读
5. `raw/` 只看文件名和开头几行,判断主题归属,不全文读

### 第 4 步:写报告

写入 `<库根>/SUMMARY.md`。

已存在旧报告时:

1. 先改名为 `SUMMARY-<旧文件修改日期>.md`
2. 再写新的 `SUMMARY.md`

报告固定六节:

1. 总览
2. 主题地图(Mermaid,最多两层,节点 ≤ 20)
3. 分主题要点
4. 素材覆盖
5. 健康检查
6. 待补全建议(≤ 5 条)

### 第 5 步:收尾

向用户报告:

- 报告绝对路径
- 主题数 / 页面数 / 问题数

默认**不提交**。
用户明确要求提交时:

```bash
git -C "<仓库根>" fetch <远端>
git -C "<仓库根>" -c rebase.autoStash=true pull --rebase <远端> <分支>
git -C "<仓库根>" add -A
git -C "<仓库根>" -c user.name=wanglei9927 -c user.email=leiwang9927@gmail.com commit -m "梳理知识库:<库名>"
git -C "<仓库根>" push <远端> <分支>
```

推送被拒(non-fast-forward):

1. 回到同步步骤
2. 重新 `pull --rebase`
3. 再推

禁止 `--force`。

## 6. scan-wiki.sh 输出规范

用法:

```bash
bash scan-wiki.sh <wiki根目录>
```

特性:

- 只读,不修改任何文件
- 自动排除 `SUMMARY.md` 和 `.wiki-schema.md`
- 输出六段 + 最后汇总

六段内容:

### 6.1 目录统计

- 是否为 llm-wiki 结构(有无 `.wiki-schema.md`)
- `raw/` 各二级目录文件数
- `wiki/*/` 各目录页数
- `index.md` / `log.md` / `overview.md` 是否存在

### 6.2 页面清单

所有 Markdown 文件的相对路径与字节数。

### 6.3 断链

扫描 `[[链接]]`:

- 支持 `[[名|别名]]`,取 `|` 前的部分
- 链接名必须与某个 `.md` 文件名(去后缀)完全一致
- 不一致即报悬空链接

### 6.4 孤页

只检查 `wiki/` 下的页面:

- 被其他页面 `[[链接]]` 引用次数为 0 → 孤页

### 6.5 疑似未消化素材

启发式:

- 取 `raw/` 文件名,去掉扩展名
- 去掉 `YYYY-MM-DD-` 日期前缀
- 在全部 Markdown 文件名(同样去日期前缀)中找不到 → 疑似未消化

注意:这是同名启发式,不是内容判断。

### 6.6 过短与占位页

- `wiki/entities/*` 小于 1500 **字节** → 过短
- 任意 Markdown 含 `TODO` / `待补充` / `占位` / `placeholder` / `lorem` → 占位文本

### 6.7 汇总

```
页面总数 / 断链数 / 孤页数 / 疑似未消化数 / 过短与占位数
```

### 已知局限

- 链接匹配只看文件名,不区分目录;不同目录同名文件会互相覆盖
- 孤页只统计 `wiki/` 页面
- 未消化判断只看文件名
- 过短阈值按字节,不是字符
- 占位文本是关键词匹配,可能误报(例如正文里讨论 "TODO" 本身)

## 7. 报告内容铁律

- 所有 `[[链接]]` 必须指向真实存在的文件
- 不能为了好看发明"应该有"的页面;缺失的写进"待补全建议"
- 要点必须来自页面实际内容,禁止编造
- 引用原文必须逐字并标注出处页
- 引用 wiki 页用 `[[链接]]`
- 引用 raw 素材用相对路径,如 `raw/tweets/xxx.md`
- 报告语言跟随知识库正文语言
- `SUMMARY.md` 不计入页面统计,也不被其他页面引用

## 8. 降级模式

知识库根目录**没有** `.wiki-schema.md` 时:

- 跳过"素材覆盖"一节
- 主题按子目录或文件名聚类
- 其余步骤和报告结构不变
- 在总览注明"非 llm-wiki 结构,已用降级模式"

## 9. 常见错误

| 错误 | 后果 | 正确做法 |
|---|---|---|
| 没同步就写 | 基于旧快照,推送冲突 | 先 fetch + pull --rebase |
| 推送被拒用 --force | 覆盖他人提交 | 重新 pull --rebase 再推 |
| 把多个库混写 | 报告不可用 | 每个库一份 SUMMARY |
| 只读 index 就写 | 要点与实体页脱节 | 逐页读 topics / entities |
| 发明链接 | 制造断链 | 只链已存在页面 |
| 把 SUMMARY 算进统计 | 数字虚高 | 统计时排除 |

## 10. 给其他 agent 的最小复用卡片

```
目标:为一个知识库生成 SUMMARY.md

输入:
- 库根路径,或库名(ai-wiki / stock-wiki)
- 可选:是否提交

步骤:
1. 读 <skill>/SKILL.md
2. 定位库根(用户路径 > 当前目录 > ~/.llm-wiki-path > 问用户)
3. git fetch + pull --rebase(非 git 则跳过)
4. bash <skill>/scripts/scan-wiki.sh <库根>
5. 读 .wiki-schema.md / index.md / overview.md / log.md
6. 逐页读 wiki/topics/* 和 wiki/entities/*
7. 按六节模板写 <库根>/SUMMARY.md(旧文件先改名备份)
8. 报告绝对路径 + 主题/页面/问题数

不要:
- 不混写多个库
- 不编造链接和内容
- 不自动提交或强推
```

## 11. 当前实例

| 库 | 根目录 | 页面概况 | SUMMARY |
|---|---|---|---|
| ai-wiki | `E:\llm_wiki\ai-wiki` | entities 25、topics 5、sources 26、synthesis 1 | 暂无 |
| stock-wiki | `E:\llm_wiki\stock-wiki` | entities 9、topics 3、sources 2、comparisons 1、synthesis 7 | 已有(2026-11-01) |

## 12. 维护

- 改流程、模板、铁律 → 先改 `SKILL.md`,再同步本文
- 改扫描逻辑 → 改 `scripts/scan-wiki.sh`,并在本文第 6 节更新输出说明
- 新增知识库 → 在其根目录放 `.wiki-schema.md`,无需改 skill
