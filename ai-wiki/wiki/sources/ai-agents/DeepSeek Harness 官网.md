---
tags: [DeepSeek Harness, 官网, 桌面端, 插件, 创造模式, 自动化任务]
created: 2026-11-02
updated: 2026-11-02
source_path: raw/articles/DeepSeek Harness 官网.md
---

# DeepSeek Harness 官网：产品形态与功能全景

> 官网给出小白最关键的信息：有桌面端安装包（macOS/Windows）无需命令行；五大能力开箱即用；"创造模式"对话生成插件；官方插件含"智能体团队（实验性）"——Super-agent 理念的产品化形态

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | DeepSeek Harness 官网 https://deepseek.com/harness |
| 抓取时间 | 2026-11-02 |
| 版本状态 | 预览版（全球开放测试，同步开源，MIT） |
| 出品方 | 杭州深度求索人工智能基础技术研究有限公司 |

## 核心观点

1. **桌面端是小白最简入口**：官网直接提供安装包——macOS（Apple 芯片）dmg 与 Windows（64 位）exe，下载安装即用，不要求 Node.js/命令行；命令行 `npx @deepseek-ai/dsh web` 与源码安装是开发者路线

2. **官方定位的五大能力**：①辅助日常工作（整理资料/分析表格/文档/汇报）；②写代码改仓库（理解项目/修 bug/开发功能/跑测试）；③查资料核对信息（搜索/交叉查证/标注来源）；④处理耗时任务（脚本/批量文件，后台执行看进度）；⑤安装插件扩展能力。支持的文件类型覆盖 Word/Excel/HTML/TS/Python/PDF/Markdown

3. **创造模式：对话生成插件**：官网演示"帮我写一个番茄时钟插件"，agent 加载 cordis-plugin-development 技能 → 写代码 → 调 plugin_manager install_bundle → 验证运行，全程 5 分 24 秒——普通用户不写代码也能扩展 dsh

4. **官方插件清单（含 Super-agent 落地）**：智能体团队（实验性）、自动授权审查（实验性）、自动化任务（实验性）、语音输入（实验性）、终端、Agent 循环、子智能体——其中"智能体团队"即 Router/Worker 多任务理念的插件化形态

5. **自动化任务 = 定时触发**：对话即可创建定时任务，官网示例"每周五 17:00 整理本周项目记录生成周报"，底层调用 `schedule_create`（weekly: time/time_zone/weekdays 参数）

6. **开发者工具**：执行轨迹（trace）视图按轮次展示系统提示词、工具调用（bash/read/grep）的参数、结果与毫秒级计时——排查 agent 行为的第一现场

## 实操内容

### 桌面端安装（小白推荐）

- macOS（Apple 芯片）：https://download.deepseek.com/desktop/dsh-latest-macos-arm64.dmg
- Windows（64 位）：https://download.deepseek.com/desktop/dsh-latest-windows-x64.exe

### 定时任务参数（官网示例原样保留）

```json
{
  "prompt": "整理本周项目记录，生成周报。",
  "title": "项目周报",
  "weekly": {"time":"17:00:00","time_zone":"Asia/Shanghai","weekdays":[5]}
}
```

### 开发者启动

```sh
npx @deepseek-ai/dsh web                                    # 命令启动 Web UI
git clone https://github.com/deepseek-ai/deepseek-harness   # 源码安装
```

## 关键概念

- 创造模式：通过对话创建 dsh 插件的官方功能（插件=工具+技能+界面的组合包）
- 智能体团队（实验性插件）：Super-agent 多任务并行架构在产品内的入口
- 自动授权审查（实验性插件）：与权限审批相关，控制 agent 自主行动的边界

## 与其他素材的关联

- [[DeepSeek Harness README]]：GitHub README 偏开发者视角；官网偏产品/小白视角，两者互补
- [[DSH Super-agent 原型]]：官网"智能体团队"插件与原型仓库是同一理念的两条落地路径（产品内 vs 独立仓库）
- [[DSH 入门学习路径]]：本页的桌面端信息是学习路径第 1 步的推荐路线

## 原文精彩摘录

> 我是 DeepSeek Harness，DeepSeek 开源的 harness 架构，基于 Cordis 的「一切皆插件」架构构建。我既可以是桌面应用，也可以通过代码启动为网页。——官网会话自我介绍

> 安装现有插件，或在「创造模式」中通过对话创建插件，扩展工具、技能和界面。——官网"一切皆插件"节

## 相关页面

- [[DeepSeek Harness]]
- [[DSH 入门学习路径]]
- [[DSH Super-agent 原型]]
- [[AI编程开发]]
