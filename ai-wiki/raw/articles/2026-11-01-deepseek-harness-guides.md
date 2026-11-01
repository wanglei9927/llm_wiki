# 原始素材：DeepSeek Harness 实操文档（模型配置 / CLI 模式 / Python SDK）

- 来源 URL：
  - 模型配置指南：https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.zh.md
  - CLI 说明：https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/cli/README.md
  - Python SDK 教程：https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/python-sdk.md
- 抓取时间：2026-11-01（webfetch 自动抓取）
- 关联素材：raw/articles/2026-11-01-deepseek-harness-readme.md、raw/tweets/2026-11-01-deepseek-harness-tweet.md

## 一、模型配置指南（providers.zh.md，摘录）

模型变更在下一次请求时生效，不需要重启服务器。

### 配置 DeepSeek

设置 → 模型：DeepSeek 卡片输入 API 密钥并保存。密钥是只写的，保存后页面只会收到脱敏描述符，永远不会收到明文密钥。密钥存储在 `$DSH_HOME/.credentials.yaml` 中，settings 只保留凭据引用。DeepSeek 的模型跟随 API 发布的列表，约每十分钟后台刷新一次，无法加载时退回内置模型。

### 添加第三方提供商

添加模型提供商 → 第三方模型提供商：选取 dsh 自带的提供商（提供商 id 如 `anthropic`、`openai`、Kimi 对应的 `moonshotai`、GLM 对应的 `zai`），输入其 API 密钥并保存。密钥留空时可使用已保存凭据或环境变量（绿色提示=已检测到环境变量，黄色=未检测到）。

### 添加自定义模型 API

对中转站、公司网关、自建服务器：卡片切换到"自定义模型 API"，提供小写 Provider ID、基础 URL、API 协议、凭据和至少一个模型。API 协议三选一：OpenAI Chat Completions（`openai-completions`）、OpenAI Responses（`openai-responses`）、Anthropic Messages（`anthropic-messages`）。一个提供商只使用一种协议。Provider ID 是永久的。

### 探测模型

模型目录 → "获取可用模型"：询问端点提供哪些模型（调用 OpenAI 兼容的 GET /models）；探测失败或列表为空时手动添加模型 ID 即可。

### 排错速查

- `MISSING_CREDENTIAL`：通过模型页存储提供商密钥，或提供被引用的环境变量
- `UNKNOWN_MODEL`：选择已配置的模型，或向自定义提供商添加缺失的模型
- 获取可用模型返回 401：检查密钥
- 密钥与地址都正确，网关却拒绝每一个请求：请求形状与 OpenAI 不同，在 cordis.patch.yml 路由上设 `compat.supportsDeveloperRole: false` 与 `compat.maxTokensField: max_tokens`
- `off` 无法让 DeepSeek 模型停止思考：设 `compat.thinkingFormat: deepseek`
- 图片被拒：给模型加 `input: [text, image]`

（进阶配置细节：图片输入、推理等级 reasoningEfforts、请求兼容性 compat 开关，均在 `$DSH_HOME/profiles/<profile>/cordis.patch.yml` 中设置，完整内容见原文）

## 二、CLI 说明（apps/cli/README.md，全文要点）

`dsh` 命令是唯一受支持的 Node 应用启动器：profile 是有序的插件 bundle patch 层叠栈。SDK 和 ACP 都是 profile，不是独立的公共二进制。

### 入口模式表

| 命令 | 用途 |
|---|---|
| `dsh <name>` / `dsh --profile <name>` | 启动 `$DSH_HOME/profiles/<name>` 下的指定 profile |
| `dsh --profile <name> --from-default-profile <template>` | 用出厂模板重置自定义 profile 后启动 |
| `dsh --profile acp` | 通过 ACP stdio 为自动化客户端提供服务 |
| `dsh --profile headless "job"` | 跑一次性新会话，打印最终答案后退出 |
| `dsh --profile sdk` | 通过 JSON-RPC stdio 为 SDK 客户端服务 |
| `dsh --profile sdk-minimal` | 用独立精简 agent 树为 SDK 客户端服务 |
| `dsh web` | 启动 Web profile |
| `dsh plugin --profile <name> <pnpm args>` | 管理 profile 的插件（转发给 pnpm） |

调用目录即默认工作区根。`web`、`headless`、`sdk`、`sdk-minimal`、`acp` 五个 profile 首次使用时从出厂模板自动初始化。

### 应用参数示例

```sh
dsh --profile web --port 8080       # --port 属于 web 应用
dsh --profile headless "run the tests"
dsh --help                          # 启动器自身的帮助
```

### Profile 与配置分层

profile 目录含 `package.json`（插件依赖 + `dsh.profile` 清单）和 `cordis.patch.yml`（用户自己的 patch 层）。组合顺序：各 bundle 的 patch → profile 的 cordis.patch.yml → 全局的 $DSH_HOME/cordis.patch.yml → --patch 覆盖。`--dump-default-config` 与 `--dump-config` 可在不启动的情况下查看组合结果。

## 三、Python SDK 教程（python-sdk.md，全文要点）

### 前提

Python 3.10+、Git、Linux x64/arm64 或 macOS 14+ arm64 或 Windows x64、DeepSeek 兼容 API 端点与凭据、隔离的 workspace 和隔离的 Harness home。

### 安装 SDK

```sh
# Linux/macOS
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
python -m venv .venv
. .venv/bin/activate
python -m pip install deepseek-harness-sdk
```

安装包含匹配的原生运行时 wheel 和 `dsh` 命令。正常 SDK 执行不需要系统 Node.js。

### 运行官方示例

```sh
export DEEPSEEK_API_KEY=sk-your-key-here
# export DEEPSEEK_BASE_URL=http://127.0.0.1:8000/v1   # 需要代理端点时

python python/sdk/examples/minimal.py \
  --workspace /absolute/path/to/disposable-workspace \
  --dsh-home /absolute/path/to/example-dsh-home \
  --session-id example-001 \
  "Inspect the repository and fix the failing tests."
```

### 在自己的程序中使用

```python
from pathlib import Path
from deepseek_harness import DeepSeekHarness

workspace = Path("/absolute/path/to/disposable-workspace").resolve()
dsh_home = Path("/absolute/path/to/example-dsh-home").resolve()
with DeepSeekHarness(
    provider="deepseek-official",
    model="deepseek-v4-flash",
    max_tokens=49_152,
    cwd=str(workspace),
    dsh_home=str(dsh_home),
    profile="sdk-minimal",
) as harness:
    result = harness.run(
        "Inspect the repository and fix the failing tests.",
        session_id="example-001",
    )

print(result.final_response)
```

SDK 惰性启动 `dsh --profile sdk-minimal` 进程并复用，直到上下文管理器退出。示例和 SDK 绝不会静默读取 `~/.dsh`。

### 安装插件

```sh
export DSH_HOME=/absolute/path/to/example-dsh-home
dsh --profile sdk-minimal --dump-default-config >/dev/null   # 初始化出厂 profile
dsh plugin --profile sdk-minimal add file:/absolute/path/to/my-plugin-bundle
```

### opt-in str_replace_editor

```yaml
- insert:
    - id: tool-str-replace-editor
      name: '@deepseek-ai/dsh-tool-str-replace-editor'
```

保存为 editor.patch.yml，构造 DeepSeekHarness 时传 `patches=("/absolute/path/to/editor.patch.yml",)`，或放进 `$DSH_HOME/profiles/sdk-minimal/cordis.patch.yml` 持久生效。

### minimal profile 属性

| 属性 | 值 |
|---|---|
| 系统提示词 | `DSH_SYSTEM_PROMPT`，缺省 "You are a helpful software engineer assistant." |
| 模型 | `--model` → `DSH_MODEL` → `deepseek-v4-flash` |
| 工具 | bash（Linux/macOS）/pwsh（Windows）、read_image、working_directory |
| Shell 超时 | 300 秒 |
| 上下文压缩 | 自动：通过额外一次模型请求总结旧历史 |
| 会话持久化 | 未压缩 JSONL，位于 `<dsh_home>/sessions` |

**安全**：该 profile 固定 `danger-full-access`，持久 shell 可修改运行时可见的任何路径；请使用一次性 checkout 或容器。

### 隔离原则

需要隔离 profiles、插件、凭据、设置和会话时用全新 home；独立工作用全新 session id；只有延续同一持久会话时才复用 harness、home 和 id。`web` 是独立 CLI 应用，不能服务 Python SDK 客户端。

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
