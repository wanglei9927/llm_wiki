# @0xGky 推文：zlib——把 Z-Library 搬进终端的开源工具

- 作者：Gk（@0xGky）
- 发布时间：2026-11-02 16:06 UTC
- 原文链接：https://x.com/0xGky/status/2117287115801195001
- 抓取方式：fxtwitter API（2026-11-03）
- 互动数据（抓取时）：1.77 万浏览 · 305 喜欢 · 52 转推
- 配图：终端界面截图（未抓取）

---

## 推文原文（逐字）

> 电子书党用着很爽的开源工具：zlib，直接把 Z-Library 搬进了终端。
>
> 网页不用开，命令行里就能搜书、下载、查看下载记录、查询每日额度、推送到 Kindle，代理与自定义域名也都支持。
>
> 更痛快的是，它已经适配 Claude Code + Codex，可以直接跟 Agent 说：
>
> "帮我找《The Pragmatic Programmer》，下载后发到 Kindle。"
>
> 🔗：https://github.com/heartleo/zlib

## 关联资源（研究补充，2026-11-03）

- GitHub 仓库：heartleo/zlib，Go 语言，MIT 协议，1364 star（抓取时），创建于 2026-04-10
- 定位："A Z-Library CLI for you and your AI agents"
- 功能：搜索（按年份/语言/格式过滤）、下载、收藏/推荐/热门浏览、下载历史、每日额度查询、推送到 Kindle（SMTP）、TUI 终端界面、主题切换、镜像探测（zlib doctor）/代理/自定义域名
- Agent 集成：官方提供 Claude Code 插件（/plugin marketplace add heartleo/zlib → /plugin install zlib@zlib-plugin-cc）、Codex 插件、MCP server（zlib mcp，支持 --read-only 只读模式）；登录由用户自己执行，密码不进对话上下文
- 安装：brew install heartleo/tap/zlib / winget install --id heartleo.zlib / install.sh

## 合规备注

Z-Library 是大规模未授权电子书分发站点（多次被多国执法下架）。本页仅作工具信息记录，不提供绕过版权的额外工作流。
