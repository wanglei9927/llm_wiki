---
tags: [DeepSeek Harness, DSH Go, Android, 移动端, 第三方客户端, SSH远程, 桌宠, 社区生态]
created: 2026-11-01
updated: 2026-11-01
source_path: raw/tweets/2026-11-01-dsh-go-tweet.md
---

# DSH Go：把 DeepSeek Harness 装进安卓口袋（社区第三方客户端）

> @NFT_Chen 推荐社区爆款 DSH Go：完整 DSH 引擎装进安卓手机，内置 Ubuntu 免 Root 免 Termux 本机直接跑，SSH/Remote 一键接管电脑端"不断档"；开源一天 3000+ Star，非官方但完成度极高

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 帖子 @NFT_Chen（SuSu_酥酥，BiBiCrew Co-founder / AI Builder） |
| 发布时间 | 2026-11-01 8:28 AM（页面显示时间） |
| 原文链接 | https://x.com/nft_chen/status/2116809473696379345 |
| 互动数据 | 1,899 浏览 · 8 回复 · 6 转推 · 20 引用 · 19 喜欢 |
| 项目 Repo | https://github.com/ccch1mneyyy/dsh-Go |
| 下载地址 | https://go.dshtui.com/download |
| 所属框架 | [[DeepSeek Harness]]（社区第三方客户端，非官方） |

## 核心观点

1. **手机本机跑完整 DSH 引擎**：DSH Go 内置 Ubuntu 环境，免 Root、免 Termux，安卓手机（Android 8+，arm64）本机直接运行；开源一天 3000+ Star（推文转述），"非官方但完成度极高"

2. **断档接力是核心卖点**："手机自己跑 Agent，再也不断档，电脑远程接着干"——SSH / Remote 无缝接管电脑/服务器上的会话，手机与电脑之间任务连续不中断

3. **能力覆盖面广**：插件原生支持、语音输入、图片、屏幕操控全支持；原生界面 + 网页模式一键切换；端到端加密分享

4. **趣味化路线**：桌宠 Deepy 和鲸娘陪干活——社区把 agent 工具往"日常陪伴"方向做的典型样本

5. **评论区安全提醒（含金量高，@leehoo48415921，19 赞）**：非官方包需要开"未知来源"安装并填 API Key——稳妥做法是**单开一个新 Key 专用于它，出问题直接删，别填主力 Key**

6. **局限**：仅 Android 8+（arm64 APK），无 iOS 版（评论区 @Z0ffmy 追问）；第三方项目与官方无隶属关系

## 实操内容

### 安装与使用五步（原帖原样保留）

1️⃣ GitHub Releases 下载 arm64 APK（Android 8+）
2️⃣ 允许未知来源安装
3️⃣ 启动后选「本机」装环境或直接连远程主机
4️⃣ 配置模型 API Key
5️⃣ 开始对话，可随时切主机、审批、插话

- 本机模式：手机内置 Ubuntu 环境直接跑引擎；远程模式：SSH/Remote 连接电脑或服务器
- 安全加固（评论区建议）：为 DSH Go 单独申请一个 DeepSeek API Key，不用主力 Key

## 关键概念

- DSH Go：社区第三方安卓客户端（github.com/ccch1mneyyy/dsh-Go），把 dsh 引擎移植/封装到 Android
- 本机模式 vs 远程模式：手机跑引擎 vs 手机只做界面、引擎在电脑（SSH/Remote）
- 单 Key 隔离原则：给不可信/第三方客户端单独发 API Key，便于随时吊销

## 与其他素材的关联

- [[DeepSeek Harness]]：引擎本体（本素材是其移动端社区生态）
- [[2026-11-01-codearts-telegram-bridge]]：同为"手机 ↔ 电脑 agent"接力思路——Telegram Bridge 是 Telegram bot + 无头 CLI 的自建轻量方案，DSH Go 是社区完整 App（本机也能跑）
- [[2026-11-01-deepseek-harness-official-site]]：官方入口是桌面端/Web；DSH Go 补上了官方尚未覆盖的移动端
- [[DSH 入门学习路径]]：手机端是桌面端之外的另一上手入口（Android 用户）

## 原文精彩摘录

> 🔥人气王！DeepSeek Harness 直接装进口袋，手机自己跑 Agent，再也不断档，电脑远程接着干！——原帖 @NFT_Chen

> 手机跑完整 Agent 是真香，但这是非官方包，要开未知来源还得填 API Key。稳妥点单开一个新 Key 给它，出问题直接删，别填主力那把。——评论区 @leehoo48415921

## 相关页面

- [[DeepSeek Harness]]
- [[DSH 入门学习路径]]
- [[2026-11-01-codearts-telegram-bridge]]
- [[AI编程开发]]
