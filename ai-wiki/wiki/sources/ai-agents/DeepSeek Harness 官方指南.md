---
tags: [DeepSeek Harness, dsh, Python SDK, CLI, 模型配置, Cordis, AI Agent]
created: 2026-11-02
updated: 2026-11-02
source_path: raw/articles/DeepSeek Harness 官方指南.md
---

# DeepSeek Harness 实操指南：模型配置、CLI 模式与 Python SDK

> dsh 的三类核心实操：Web UI 里配多提供商模型（含中转站网关排错）、`dsh` 命令的五种入口模式（web/headless/sdk/acp/plugin）、用 Python SDK 几行代码驱动 agent 干活

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | 官方文档三篇：providers.zh.md（模型配置）、apps/cli/README.md（CLI）、python-sdk.md（SDK 教程） |
| 抓取时间 | 2026-11-02 |
| 所属项目 | [[DeepSeek Harness]]（github.com/deepseek-ai/deepseek-harness） |
| 关联素材 | [[DeepSeek Harness README]]（README 概览）、[[DeepSeek Harness 发布推文]]（推文解读） |

## 核心观点

1. **`dsh` 是"单入口多 profile"启动器**：web、headless、sdk、sdk-minimal、acp 五种入口模式，首次使用自动从出厂模板初始化；SDK 和 ACP 都是 profile 而非独立二进制；`headless "job"` 一次任务跑完即退出，适合脚本化和 CI

2. **模型配置"官方 + 第三方 + 自定义网关"三层**：内置提供商 id 有 `anthropic`、`openai`、`moonshotai`（Kimi）、`zai`（GLM）、DeepSeek；中转站/公司网关走"自定义模型 API"，协议三选一（openai-completions / openai-responses / anthropic-messages）；"获取可用模型"一键探测端点模型列表

3. **密钥安全设计**：密钥只写（页面只见脱敏描述符），明文存 `$DSH_HOME/.credentials.yaml`，settings 只保留凭据引用；支持环境变量后备（绿色/黄色提示标记检测状态）

4. **所有进阶配置集中在 `cordis.patch.yml`**：图片输入（`input: [text, image]`）、推理等级（`reasoningEfforts`）、请求兼容性（`compat.supportsDeveloperRole` / `maxTokensField` / `thinkingFormat: deepseek`）——网关"密钥正确却全拒绝"的两大元凶就是 developer 角色和 max_completion_tokens 字段

5. **Python SDK 上手极简且无需 Node.js**：`pip install deepseek-harness-sdk`（自带原生运行时 wheel），`DeepSeekHarness(...)` 上下文管理器 + `harness.run()` 即可驱动 agent；会话为未压缩 JSONL 持久化在 `<dsh_home>/sessions`，上下文自动压缩

6. **安全边界必须注意**：sdk-minimal profile 固定 `danger-full-access`（shell 可改任何可见路径），官方要求用一次性工作区或容器；隔离原则——独立工作用全新 home + 全新 session id

## 实操内容

### 1. CLI 入口模式（原样保留）

| 命令 | 用途 |
|---|---|
| `dsh web` | 启动 Web UI（127.0.0.1:3080） |
| `dsh --profile headless "run the tests"` | 跑一次性任务，打印最终答案后退出 |
| `dsh --profile acp` | 通过 ACP stdio 服务自动化客户端 |
| `dsh --profile sdk` | 通过 JSON-RPC stdio 服务 SDK 客户端 |
| `dsh plugin --profile <name> <pnpm args>` | 管理 profile 插件 |
| `dsh --dump-config` / `--dump-default-config` | 不启动直接查看组合配置 |

```sh
dsh --profile web --port 8080   # 启动器只解析自己的 flag，其余传给应用
dsh --help                      # 启动器帮助；dsh --profile web --help 是 web 应用帮助
```

### 2. Web UI 配置模型（三档）

- **DeepSeek**：设置 → 模型 → DeepSeek 卡片填 API key 保存（即时生效不用重启；模型列表约每 10 分钟自动刷新）
- **第三方提供商**：添加模型提供商 → 选 `anthropic` / `openai` / `moonshotai`（Kimi）/ `zai`（GLM）→ 填密钥
- **自定义网关**：切"自定义模型 API"→ 填小写 Provider ID + 基础 URL + 协议 + 密钥 → "获取可用模型"探测，失败则手动加模型 ID

### 3. Python SDK 全流程（原样保留）

```sh
# 安装（自带原生运行时，无需系统 Node.js）
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
python -m venv .venv && . .venv/bin/activate
python -m pip install deepseek-harness-sdk

# 环境变量
export DEEPSEEK_API_KEY=sk-your-key-here
# export DEEPSEEK_BASE_URL=http://127.0.0.1:8000/v1   # 代理端点

# 官方示例：跑一个任务
python python/sdk/examples/minimal.py \
  --workspace /absolute/path/to/disposable-workspace \
  --dsh-home /absolute/path/to/example-dsh-home \
  --session-id example-001 \
  "Inspect the repository and fix the failing tests."
```

```python
# 程序内使用
from pathlib import Path
from deepseek_harness import DeepSeekHarness

with DeepSeekHarness(
    provider="deepseek-official",
    model="deepseek-v4-flash",
    max_tokens=49_152,
    cwd=str(workspace),
    dsh_home=str(dsh_home),
    profile="sdk-minimal",
) as harness:
    result = harness.run("Inspect the repository and fix the failing tests.",
                         session_id="example-001")
print(result.final_response)
```

### 4. 插件安装与工具扩展

```sh
export DSH_HOME=/absolute/path/to/example-dsh-home
dsh --profile sdk-minimal --dump-default-config >/dev/null        # 初始化 profile
dsh plugin --profile sdk-minimal add file:/path/to/my-plugin-bundle  # 装插件（需 pnpm）
```

```yaml
# editor.patch.yml —— 给 sdk-minimal 加 str_replace_editor 工具
- insert:
    - id: tool-str-replace-editor
      name: '@deepseek-ai/dsh-tool-str-replace-editor'
```

构造时传 `patches=("/path/to/editor.patch.yml",)`（临时）或写入 `$DSH_HOME/profiles/sdk-minimal/cordis.patch.yml`（持久）。

### 5. 网关排错速查

| 症状 | 解法 |
|---|---|
| `MISSING_CREDENTIAL` | 模型页存密钥或配环境变量 |
| `UNKNOWN_MODEL` | 选已配置模型或给自定义提供商补模型 |
| 探测模型 401 | 检查密钥 |
| 网关拒绝所有请求 | patch 里设 `compat.supportsDeveloperRole: false` + `compat.maxTokensField: max_tokens` |
| DeepSeek 模型关不掉思考 | 设 `compat.thinkingFormat: deepseek` |
| 图片被拒 | 模型加 `input: [text, image]` |

## 关键概念

- **profile**：dsh 的核心组织单元——一组有序插件 bundle 层 + 用户 patch 层，五种入口模式各对应一个 profile
- **cordis.patch.yml**：用户配置层（模型、推理、兼容性开关），组合顺序：bundle patch → profile patch → 全局 patch → --patch
- **$DSH_HOME**：dsh 的家目录（凭据、profiles、会话日志都在这），SDK 默认不碰 `~/.dsh`
- **sdk-minimal**：最小 SDK profile——只有 bash/pwsh、read_image、working_directory 三个工具，自动上下文压缩，JSONL 会话持久化，固定 danger-full-access

## 与其他素材的关联

- [[DeepSeek Harness README]]：README 概览（是什么、怎么启动）——本素材是其后的"配置细节 + CLI + SDK"实操深化
- [[CodeArts Telegram 桥]]：`dsh --profile headless` 的一次性任务模式与 CodeArts `codearts run` 无头调用思路相同，可对照
- [[AI Agent 智能体]]：多提供商接入与权限审批是 agent 工程化的典型基础设施设计

## 原文精彩摘录

> 密钥是只写的。保存后，页面只会收到脱敏描述符，永远不会收到明文密钥。密钥存储在 $DSH_HOME/.credentials.yaml 中，settings 只保留它的凭据引用。——providers.zh.md

> The SDK starts the bundled `dsh --profile sdk-minimal` process lazily and reuses it until context-manager exit. The example and SDK never silently read `~/.dsh`. ——python-sdk.md

> It pins `danger-full-access`, so the platform-selected persistent shell can modify any path visible to the runtime; use a disposable checkout or container. ——python-sdk.md（安全警告）

## 相关页面

- [[DeepSeek Harness]]
- [[DeepSeek]]
- [[AI Agent 智能体]]
- [[AI编程开发]]
