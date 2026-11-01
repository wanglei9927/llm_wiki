---
tags: [DeepSeek, DeepSeek Harness, dsh, AI Agent, 插件化, agent harness, Cordis, 开源项目]
created: 2026-11-01
updated: 2026-11-01
sources: [2026-11-01-deepseek-harness-readme, 2026-11-01-deepseek-harness-tweet, 2026-11-01-deepseek-harness-guides, 2026-11-01-deepseek-harness-official-site, 2026-11-01-superagent-prototype-tweets, 2026-11-01-dsh-superagent-prototype]
---

# DeepSeek Harness

> DeepSeek AI 开源的智能体框架（agent harness，命令 `dsh`），口号"Everything is a Plugin"，以 Cordis 插件化架构驱动，配合 Super-agent 双层设计解决多任务并行，一条 `npx` 命令即可在本地跑起 Web UI

## 简介

DeepSeek Harness（简称 `dsh`）是 DeepSeek AI 官方开发的开源 agent harness——直译"智能体马具"，即把大模型、工具调用、会话管理、权限策略、用户界面组装成可运行智能体的**运行时框架**。它不是模型，而是让模型持续干活的"车身"：读文件、跑命令、委派子任务、维护计划、被事件驱动。

仓库地址：https://github.com/deepseek-ai/deepseek-harness（MIT 协议）
官方文档：https://deepseek-harness.github.io/deepseek-harness/
设计论文：*A Programming Paradigm for Spatiotemporal Composability*（arXiv 2608.25512）

## 关键信息

| 项目 | 数据 |
|---|---|
| GitHub 热度 | 267.7k stars / 32.5k forks / 1.1k watching（2026-11-01 抓取） |
| 提交数 | 24,922 commits |
| 项目阶段 | developer preview（开发者预览），官方警告将有破坏性变更 |
| 技术底座 | Cordis 框架（cordiverse/cordis），pnpm + TypeScript monorepo，另含 Python SDK |
| 仓库结构 | apps（Web/CLI/Desktop）、packages、python（SDK）、native、docs、benchmarks、website |

## 核心特性

### 1. 一切皆插件（Everything is a Plugin）
框架本身只提供底座，模型接入、工具、UI、通知等能力全部以插件形式组合。第三方插件仓库打上 `dsh-plugin` 话题即可被社区发现。

### 2. Super-agent 双层架构
Router 层负责与用户对话、维护全局上下文、分发任务；Worker 层为每个任务开独立隔离会话并行执行，完成后向 Router 汇报而不直接打扰用户——解决"一个会话一个孤岛"的多任务切换问题（来自 @Super_Nius 对其设计文章的解读）。

### 3. 事件触发 + Watchdog 自恢复
群消息、邮件、代码评论、CI 结果等外部事件可自动投喂给 agent（"用户拉"变"事件推"）；Watchdog 看门狗在进程挂掉后自动恢复，支撑 7×24 持续运行。

### 4. 多形态接入（五种入口模式）
同一 `dsh` 命令五种 profile：`web`（Web UI）、`headless "job"`（跑完即退的一次性任务）、`sdk` / `sdk-minimal`（JSON-RPC 服务 SDK 客户端）、`acp`（自动化客户端 stdio）；另有 `dsh plugin` 管理插件。Python SDK（`pip install deepseek-harness-sdk`）自带原生运行时，无需系统 Node.js。

### 5. 权限策略审批
Agent 的读写文件、执行命令等敏感操作，按当前权限策略在 Web UI 中先征询用户批准，默认不静默越权。

## 不同素材中的观点

### 来自 2026-11-01-deepseek-harness-readme（官方 README 视角）
- 定位是"开源 agent harness"，构建于"一切皆插件"架构，由 Cordis 驱动
- 处于 developer preview，快速迭代、将有破坏兼容性变更，运行前须读 SAFETY.md
- 强调低上手成本：一条 `npx` 命令启动 Web UI，三步（配 API key → 选工作区 → 发任务）开始干活
- Agent 能力边界明确：读写工作区文件、跑命令、委派工作、维护计划，敏感操作需审批

### 来自 2026-11-01-deepseek-harness-tweet（社区解读视角，@Super_Nius）
- 核心卖点被概括为 Super-agent 双层架构（Router/Worker 隔离并行）+ 事件触发 + Watchdog
- 被定位为"给每个人配一个 24 小时在线的 AI 秘书长"，但作者持观望态度（"我想看的是真能跑起来的那天"）
- 评论区存在质疑：@r8tba 曾实现类似"会议模式"后删除，认为方向错误并称 Codex 也在走此方向；@Kepler_Nicoles 指出 Claude Code 的 project 机制与之类似

### 来自 2026-11-01-deepseek-harness-official-site（官网产品视角）
- 桌面端安装包（macOS Apple 芯片 / Windows x64）——免命令行的最简入口
- 五大能力：日常工作、写代码改仓库、查资料核对、后台耗时任务、插件扩展
- 创造模式：对话生成插件（官网番茄时钟示例 5 分 24 秒完成开发、安装、验证）
- 官方插件含"智能体团队（实验性）"——Super-agent 理念的产品化形态；另有自动授权审查、自动化任务（schedule_create 定时）、语音输入等实验性插件

### 来自 2026-11-01-superagent-prototype-tweets（社区视角）
- 初步实验数据：Super-agent 任务完成中位数 12.4 分钟、P95 15.7 分钟；传统单会话方案 P95 29.5 分钟——长尾任务提速近一半
- 乐观解读"24 小时不下班的 AI 团队"；冷静派提醒：常驻只是第一步，权限、回滚、异常提醒、任务拆分与出错暂停机制才是关键，否则"自主推进"变"自主跑偏"

### 来自 2026-11-01-dsh-superagent-prototype（原型仓库视角）
- Super-agent 落地实现：面向单个 GitHub 仓库的 proactive coding agent（打包为 dsh bundle），监听 GitHub（可选飞书），独立会话+独立目录干活、原对话回 PR、Web 面板显示待人工事项
- 工作哲学："take as little human attention as possible, and give as much value as possible"——只在被要求或规则允许时行动，只在有人必须行动或能利用结果时说话
- 官方定位仅为研究原型、非生产就绪（与论文实现不完全一致）；推荐让 coding agent 读 SETUP.md 代为安装

## 实用信息

### 安装与启动

```sh
# 方式一：npm 直接运行（推荐体验，需 Node.js）
npx @deepseek-ai/dsh web

# 方式二：源码运行
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness && pnpm install && pnpm run build && pnpm dsh web
```

### 基本用法（Web UI 三步）

1. **配模型**：Settings → Models 填 DeepSeek API key（platform.deepseek.com 申请），保存即生效；其他模型/自定义 OpenAI 兼容端点见 providers.md
2. **选工作区**：Choose workspace 添加并选中项目目录——不选工作区则无法发消息；`dsh` 以其启动目录为默认文件系统位置
3. **发任务**：官方示例 "Summarize this repository and identify its main packages."；进阶可接 Python SDK、反向代理公网部署、开发插件（docs/develop/basic）

### 模型配置（多提供商）

- **DeepSeek**：设置 → 模型 → 填 API key（即时生效不用重启）；模型列表自动跟随官方发布
- **第三方**：内置提供商 id——`anthropic`、`openai`、`moonshotai`（Kimi）、`zai`（GLM）
- **中转站/网关**："自定义模型 API"：Provider ID（小写、永久）+ 基础 URL + 协议三选一（openai-completions / openai-responses / anthropic-messages）+ 密钥，"获取可用模型"可自动探测端点列表
- **密钥安全**：只写设计，明文只存 `$DSH_HOME/.credentials.yaml`，页面只见脱敏描述符；支持环境变量后备
- **网关排错**：拒绝所有请求 → `compat.supportsDeveloperRole: false` + `compat.maxTokensField: max_tokens`；关不掉思考 → `compat.thinkingFormat: deepseek`（完整排错表见 [[2026-11-01-deepseek-harness-guides]]）

### Python SDK（程序化调用）

```python
from deepseek_harness import DeepSeekHarness

with DeepSeekHarness(
    provider="deepseek-official",
    model="deepseek-v4-flash",
    max_tokens=49_152,
    cwd=str(workspace),        # 工作区（建议一次性目录）
    dsh_home=str(dsh_home),    # 隔离的 harness home
    profile="sdk-minimal",
) as harness:
    result = harness.run("Inspect the repository and fix the failing tests.",
                         session_id="example-001")
print(result.final_response)
```

安装：`pip install deepseek-harness-sdk`（自带原生运行时 wheel，无需系统 Node.js）。一次性脚本任务也可直接 CLI：`dsh --profile headless "run the tests"`（跑完打印最终答案即退出）。

### 注意事项

- **破坏性变更风险**：preview 阶段 API/配置随时可能变，别急着用于生产
- **运行安全**：官方要求先读 SAFETY.md；agent 有真实文件读写与命令执行能力，建议在专用工作区内使用
- **danger-full-access**：sdk-minimal profile 的 shell 可修改运行时可见的任何路径，官方明确要求使用一次性 checkout 或容器
- **隔离原则**：独立工作用全新 home + 全新 session id；只有延续同一持久会话时才复用 harness、home 和 id
- **远程/SSH 环境**：Web UI 启动只打印 URL 不自动开浏览器，端口转发由 SSH 客户端负责；不想自动开浏览器加 `--no-open`

### 适用场景

- ✅ 想要一个可长期挂机、被事件驱动的个人 AI 助理（配合其事件触发与 Watchdog 设计）
- ✅ 多任务并行的开发助手场景（Router/Worker 隔离会话）
- ✅ 插件化 agent 平台二次开发（MIT + dsh-plugin 生态 + Python SDK）
- ⚠️ 生产环境谨慎：preview 阶段破坏性变更多

## 相关页面

- [[DeepSeek]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
- [[2026-11-01-deepseek-harness-tweet]]
- [[2026-11-01-deepseek-harness-readme]]
- [[2026-11-01-deepseek-harness-guides]]
- [[2026-11-01-deepseek-harness-official-site]]
- [[2026-11-01-superagent-prototype-tweets]]
- [[2026-11-01-dsh-superagent-prototype]]
- [[DSH 入门学习路径]]
