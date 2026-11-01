# 原始素材：DeepSeek Harness 官网（deepseek.com/harness）

- 来源 URL：https://deepseek.com/harness
- 抓取时间：2026-11-01（webfetch 自动抓取）
- 关联素材：raw/articles/2026-11-01-deepseek-harness-readme.md

## 官网关键信息（逐字保留）

### 桌面端下载（小白最简入口）

- macOS（Apple 芯片）：https://download.deepseek.com/desktop/dsh-latest-macos-arm64.dmg
- Windows（64 位）：https://download.deepseek.com/desktop/dsh-latest-windows-x64.exe

### 官方标语

"DeepSeek Harness 现在，开箱即用。无论处理日常工作、编写代码，还是构建自己的 Harness，都可以从这里开始。DeepSeek Harness 面向全球开放测试并同步开源，以可自由组合的插件，拓展 Agent 能力。"（预览版；开源 · MIT · 杭州深度求索）

### Harness 自我介绍（官网会话示例）

我是 DeepSeek Harness，DeepSeek 开源的 harness 架构，基于 Cordis 的「一切皆插件」架构构建。我既可以是桌面应用，也可以通过代码启动为网页。我可以帮你：
1. **辅助日常工作** —— 整理资料、分析表格、撰写文档、制作汇报。
2. **写代码、改仓库** —— 理解项目、修复问题、开发功能、运行测试。
3. **查资料、核对信息** —— 搜索资料、交叉查证，给出有来源的结论。
4. **处理耗时任务** —— 运行脚本、批量处理文件，后台执行、随时查看进度。
5. **安装插件、扩展能力** —— 使用现有插件，或编写自己的插件。

### 一切皆插件（创造模式）

安装现有插件，或在「创造模式」中通过对话创建插件，扩展工具、技能和界面。官网示例：对话"帮我写一个「番茄时钟」插件"→ agent 加载 cordis-plugin-development 技能 → 写代码（package.json + client.js）→ 调用 plugin_manager install_bundle → 验证运行状态，用时 5 分 24 秒完成。

### 官方插件列表（官网展示）

- 智能体团队（实验性）
- 自动授权审查（实验性）
- 自动化任务（实验性）
- 语音输入（实验性）
- 终端
- Agent 循环
- 子智能体

### 自动化任务（定时执行）

官网示例：对话"每周五 17:00（北京时间），整理本周项目记录，生成周报"→ agent 调用 `schedule_create`：

```json
{
  "prompt": "整理本周项目记录，生成周报。",
  "title": "项目周报",
  "weekly": {"time":"17:00:00","time_zone":"Asia/Shanghai","weekdays":[5]}
}
```

### 开发者工具

执行轨迹（trace）视图：按轮次展示系统提示词、用户输入、工具调用（bash/read/grep 等）的参数、结果、schema 与毫秒级计时。

### 开发者体验

- 命令启动：安装 Node.js 后 `npx @deepseek-ai/dsh web`
- 源码安装：`git clone https://github.com/deepseek-ai/deepseek-harness`

### 链接入口

- GitHub：https://github.com/deepseek-ai/deepseek-harness
- 开发者文档：https://deepseek-harness.github.io/deepseek-harness/guide/quickstart
- 社区插件：https://github.com/topics/dsh-plugin
- Cordis 论文：https://arxiv.org/abs/2608.25512
- 微信公众号（扫码）

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
