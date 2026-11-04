---
tags: [知识库, 梳理, Claude Code Skill, SUMMARY, 健康检查, 自动化]
created: 2026-11-02
updated: 2026-11-02
source_path: .claude/skills/wiki-summarize/SKILL.md
---

# wiki-summarize：知识库梳理技能

> 对一个已有的知识库做整体体检与梳理，输出结构化 SUMMARY.md；覆盖结构统计、主题归纳，以及断链 / 孤页 / 过短页 / 未消化素材 / 占位文本检查。

## 基本信息

| 项目 | 内容 |
|---|---|
| 类型 | Claude Code Skill |
| 所在位置 | `.claude/skills/wiki-summarize/` |
| 核心文件 | `SKILL.md`（流程定义）、`scripts/scan-wiki.sh`（只读扫描器） |
| 安装方式 | 用户级 junction / symlink 到 `~/.claude/skills/` |
| 输出 | `<知识库根>/SUMMARY.md` |
| 依赖 | bash 4+、GNU coreutils；Windows 用 Git Bash |
| 适用对象 | llm-wiki 风格知识库，或任意 Markdown 知识目录 |

## 核心观点

1. **定位是整体盘点，不是单篇总结。** 它一次处理一个知识库，产出可交付的总结报告；单篇文章的消化属于 ingest 工作流，不在本技能范围内。

2. **多知识库必须分开报告。** 一个目录下多个库（如 `ai-wiki`、`stock-wiki`）时，每个库单独产出一份 `SUMMARY.md`，禁止混写，否则报告口径和统计都会失真。

3. **扫描是客观事实的唯一来源。** `scan-wiki.sh` 只读、不改文件，输出目录统计、页面清单、断链、孤页、疑似未消化素材、过短与占位页六段；后续主观归纳必须建立在它之上。

4. **执行流程固定六步，不可跳步。** 同步远端 → 定位库根 → 结构扫描 → 通读核心页面 → 写报告 → 收尾报告。第 0 步和第 5 步都强调 git 同步，前者保证读到最新，后者保证推送不覆盖他人。

5. **报告结构固定六节。** 总览、主题地图（Mermaid，最多两层、节点 ≤ 20）、分主题要点、素材覆盖、健康检查、待补全建议（≤ 5 条）。

6. **内容铁律优先于好看。** 所有 `[[链接]]` 必须指向真实存在的文件；要点必须来自页面实际内容；禁止编造；缺失页面只能写进“待补全建议”。

7. **默认不提交。** 只在用户明确要求时 commit / push；推送被拒只能重新 `pull --rebase` 后再推，绝对禁止 `--force`。

8. **有降级模式。** 目录没有 `.wiki-schema.md` 时仍可使用：跳过“素材覆盖”一节，主题按子目录或文件名聚类，其余不变，并在总览注明。

## 实操内容保留

### 用户级安装

```bat
mklink /J "C:\Users\<user>\.claude\skills\wiki-summarize" "E:\llm_wiki\.claude\skills\wiki-summarize"
```

Linux / macOS：

```bash
ln -s /path/to/llm_wiki/.claude/skills/wiki-summarize ~/.claude/skills/wiki-summarize
```

### 结构扫描

```bash
bash "<skill目录>/scripts/scan-wiki.sh" "<知识库根>"
```

### 写库前同步

```bash
git -C "<仓库根>" fetch mywiki
git -C "<仓库根>" -c rebase.autoStash=true pull --rebase mywiki main
```

### 报告骨架

```markdown
# 知识库梳理报告（YYYY-MM-DD）

## 1. 总览
## 2. 主题地图
## 3. 分主题要点
## 4. 素材覆盖
## 5. 健康检查
## 6. 待补全建议
```

## 关键概念

- **SUMMARY.md**：每个知识库根目录下的梳理报告，脚本统计时自动排除，不被其他页面引用。
- **scan-wiki.sh**：只读扫描器，输出六段体检结果；断链按文件名匹配，孤页只看 `wiki/`，未消化按 raw 与页面的同名启发式判断。
- **`.wiki-schema.md`**：知识库配置与质量标准文件，存在即视为 llm-wiki 结构。
- **降级模式**：非 llm-wiki 目录下的兼容路径。

## 原文精彩摘录

> 对一个已经存在的知识库做一次全面“体检 + 梳理”，产出一份可直接阅读、可交付的总结报告。
> ——`SKILL.md`

> 两个同步点的意义不同：第 0 步保证“读到的是最新的”，第 5 步保证“推上去不会覆盖别人的”。
> ——`SKILL.md`

> 所有 `[[链接]]` 必须与实际文件名（去 `.md`）精确一致（含空格），禁止悬空链接。
> ——`SKILL.md`

## 相关页面

- [[wiki-summarize 知识库梳理技能]]
- [[AI编程开发]]
