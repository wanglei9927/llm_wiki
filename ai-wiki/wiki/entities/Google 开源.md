---
tags: [Google, 开源, 组织, 基础设施, AI-Agent, 工程文化]
created: 2026-11-04
updated: 2026-11-04
sources: [2026-11-04-google-oss]
---

# Google 开源

> Google 在 GitHub 上的官方组织（github.com/google），2026-11 时有 2,892 个公开仓库；它不是「Google 全部开源」的入口，而更像「工程基础设施 + 底层工具库 + 工程文化」的集合

## 简介

Google 的开源版图很分散：TensorFlow、Kubernetes、Flutter、Angular、Go、Chromium、Protobuf、gRPC、Bazel 等都在各自独立的 GitHub 组织里。`google` 这个组织承载的是另一类东西——**底层库、系统工具、开发者体验、移动/图形组件、以及工程方法论**。

理解这一点很重要：想看「Google 开源了什么」，只翻 `google` 组织会漏掉大半；但想看「Google 的工程底子是怎么打的」，这个组织是最好的样本。

## 关键信息

| 项目 | 内容 |
|---|---|
| 组织地址 | https://github.com/google |
| 公开仓库数 | 2,892（2026-11-04） |
| Star 头部 | material-design-icons(54.2k)、guava(51.9k)、zx(45.8k)、styleguide(39.8k)、googletest(39.7k) |
| 2026 年重点 | AI Agent 工具链（adk-* 四语言、skills、agents-cli、ax、langextract） |
| 传统强项 | C++ 基础库（leveldb/flatbuffers/re2/snappy）、系统安全（gvisor/osv-scanner/syzkaller） |
| 工程文化 | styleguide、eng-practices、comprehensive-rust |
| 数据来源 | [[2026-11-04-google-oss]] |

## 组织边界（容易踩的坑）

以下项目**不在** `google` 组织，而在各自独立组织：

- TensorFlow、JAX、Keras → tensorflow / jax-ml / keras-team
- Kubernetes、gRPC、Protobuf、Bazel → kubernetes / grpc / protocolbuffers / bazelbuild
- Flutter、Dart、Angular → flutter / dart-lang / angular
- Go 语言 → golang
- Chromium、V8 → chromium / v8

## 分类概览

| 类别 | 代表项目 |
|---|---|
| AI / Agent | adk-python、adk-go、skills、agents-cli、ax、langextract、artemis、elephant-goldfish-model、magika、gemma.cpp |
| 系统 / 安全 | gvisor、cadvisor、osv-scanner、syzkaller、clusterfuzz、oss-fuzz、perfetto、pprof |
| 基础库 | guava、leveldb、flatbuffers、gson、re2、snappy、brotli、libphonenumber、or-tools |
| 测试 / 开发体验 | googletest、benchmark、error-prone、auto、zx、python-fire、wireit、comprehensive-rust |
| 图形 / 多媒体 | skia、filament、draco、guetzli、model-viewer、fonts |
| 移动 / UI | material-design-icons、material-design-lite、flexbox-layout、iosched、accompanist |

## 怎么高效浏览

**网页**：https://github.com/orgs/google/repositories?type=all&sort=stars ，再按 language / topic 过滤。

**API**（先走代理）：

```sh
# 按 star 取前 100
curl --proxy http://127.0.0.1:7897 \
  "https://api.github.com/search/repositories?q=org%3Agoogle&sort=stars&order=desc&per_page=100"

# 按最近更新看当前投入
curl --proxy http://127.0.0.1:7897 \
  "https://api.github.com/search/repositories?q=org%3Agoogle&sort=updated&order=desc&per_page=25"
```

## 评价

**价值**：

- 学习工业级代码的「标准答案」——guava、leveldb、flatbuffers 的接口设计、测试与文档都值得模仿。
- 观察大厂技术重心的窗口：2026 年 AI Agent 相关仓库的增长非常直观。
- 工程方法论文档（styleguide、eng-practices）比很多付费课程更实用。

**注意**：

- star 不等于活跃，部分仓库已弃用或归档，选型前要看最近提交与 release。
- 组织边界容易误导，找「Google 的 AI 框架」应该去 tensorflow/jax-ml 等组织。
- 本页数据是快照，AI 项目几个月后排名可能大变。

## 不同素材中的观点

- **[来源: [[2026-11-04-google-oss]]]** 对 star 前 100 的盘点显示：Google 2026 年在 `google` 组织里新增与活跃的项目高度集中在 Agent 工具链（ADK 四语言、skills、agents-cli、ax），而传统 C++ 基础库仍保持稳定维护——「新方向激进、老底子扎实」是这轮开源的显著特征。

## 相关页面

- [[2026-11-04-google-oss]]
- [[Elephant-Goldfish Model]]
- [[Understand Anything]]
- [[AI编程开发]]
