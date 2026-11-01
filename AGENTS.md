# llm-wiki 个人知识库 — 项目指令

本项目是用户的个人 AI 知识库（基于 Karpathy llm-wiki 方法论）。所有"总结知识"类请求必须走知识库工作流，不得只做普通聊天回答。

## 知识库操作规范（必须遵循）

当用户要求 **总结文章 / 消化素材 / 查询知识库 / 整理知识 / 写综合报告** 时：

1. **先读规范**：`ai-wiki/.wiki-schema.md`（质量标准）与 `.claude/skills/llm-wiki-skill/SKILL.md`（工作流定义）
2. **再读样例**：写任何新页面前，先读 1-2 个同类现有页面，格式必须与现有页面完全一致（frontmatter 字段、节标题、sources 引用写法）
3. **目录约定**：
   - 素材存 `ai-wiki/raw/`（articles/网页、wechat/公众号、zhihu/知乎、notes/文本、pdfs/ 等），AI 只读不改
   - 结构化页面存 `ai-wiki/wiki/`（entities/ 实体页、topics/ 主题页、sources/ 摘要页、comparisons/、synthesis/）
   - 每次消化后同步更新 `ai-wiki/index.md`、`ai-wiki/wiki/overview.md`（统计）、`ai-wiki/log.md`
4. **素材分级**：实操型内容（代码/Prompt/步骤）全量原样保留进摘要页"实操内容保留"节；摘录必须逐字取自原文并标注出处，禁止编造
5. **链接铁律**：所有 `[[链接]]` 必须与实际文件名精确匹配（含空格）

## URL 素材抓取

- 优先使用内置 webfetch 抓取网页转 Markdown 存入 `ai-wiki/raw/` 对应目录
- 抓取失败（JS 渲染、需登录）时，明确告知用户改为手动粘贴正文，**严禁编造内容**

## 整理完成后的固定收尾（每次必须执行）

1. 质量检查：`bash .claude/skills/llm-wiki-skill/scripts/lint-wiki.sh ai-wiki links sources content`
2. 提交推送（本机无全局 git 身份，必须带 -c 参数）：
   ```bash
   git add -A
   git -c user.name=wanglei9927 -c user.email=leiwang9927@gmail.com commit -m "消化素材：<标题>"
   git push mywiki main
   ```
3. 向用户报告：新增/更新了哪些页面、lint 结果、推送结果

## 知识库梳理（wiki-summarize）

仓库内置 `.claude/skills/wiki-summarize/`，用于对**单个**知识库做整体盘点并生成 `SUMMARY.md`。

- 触发：用户说"总结知识库""梳理知识库""知识库盘点"
- 本仓库有多个库（`ai-wiki`、`stock-wiki`），**每次只梳理一个，各自产出 SUMMARY.md**，不要混写
- 扫描：`bash .claude/skills/wiki-summarize/scripts/scan-wiki.sh <库根>`（Windows 用 Git Bash，已验证 bash 5.2 可用）
- 梳理结果不自动提交；用户要求提交时按上文 git 身份约定执行

## 其他

- 非知识类任务（写代码、问答、研究等）照常执行，不受以上约束影响
- 本仓库远程：`mywiki` → git@github.com:wanglei9927/llm_wiki.git（main 分支）
