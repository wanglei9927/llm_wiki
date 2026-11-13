---
tags: [Google, 开源, 仓库清单, AI-Agent, 基础设施, 学习资料]
created: 2026-11-04
updated: 2026-11-04
source_path: raw/articles/2026-11-04-google-oss-full.md
---

# Google 开源项目详解：star 前 100（2026-11）

> 对 google 组织 2,892 个公开仓库的一次盘点：按 star 取前 100 并分类，每个仓库附一句用途说明；结论是 Google 今年的重心已明显转向「AI Agent 的工程基础设施」

## 基本信息

| 项目 | 内容 |
|---|---|
| 数据来源 | GitHub API（org:google，search API 按 stars 排序取前 100） |
| 抓取时间 | 2026-11-04 |
| 组织规模 | 2,892 个公开仓库 |
| 口径说明 | star 为抓取时快照；部分仓库已弃用（如 ExoPlayer）或迁移；仅覆盖 google 组织，不含子组织 |
| 原始素材 | raw/articles/Google 开源项目盘点-full.md |

## 核心观点

1. **2026 年的主线是 AI Agent 基础设施**：adk-python / adk-go / adk-java / adk-kotlin 四语言 Agent 框架 + adk-recipes 配方 + skills 技能库 + agents-cli + ax（编排运行时），再加上 langextract（39k★，LLM 结构化抽取）、artemis（自然语言驱动 Android）、elephant-goldfish-model（EGM 设计评审）——这是一整条从开发、评测到编排、部署的工具链。

2. **传统强项依旧是 C++ 基础库与系统工具**：guava(51.9k)、leveldb(39.5k)、flatbuffers(26.6k)、googletest(39.7k)、re2、snappy、tcmalloc、highway；系统侧有 gvisor(19.9k) 容器沙箱、osv-scanner(11.4k) 漏洞扫描、syzkaller 内核 fuzzer。

3. **图形与多媒体是护城河**：skia（2D 图形）、filament（PBR 渲染）、dawn（WebGPU）、angle（OpenGL ES）、draco（3D 压缩）——Android/Chrome 的底层都靠它们。

4. **工程文化本身也是开源资产**：styleguide(39.8k)、eng-practices(23.3k)、comprehensive-rust(33.5k) 这些「非代码」仓库的 star 数不输工具库，说明社区真正认可的是 Google 的工程方法。

5. **一个容易误解的边界**：TensorFlow、Kubernetes、Flutter、Angular、Go、Chromium、Protobuf、gRPC、Bazel 都在各自独立的 GitHub 组织，**不在 google 组织里**。这个组织更像「工程基础设施 + 底层工具库」的集合，而不是「Google 全部开源」。

## 全量清单（按类别）

### AI / Agent 与机器学习

- **langextract** (39,261★, Python) — A Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.
- **adk-python** (22,102★, Python) — An open-source, code-first Python toolkit for building, evaluating, and deploying sophisticated AI agents with flexibility and control.
- **adk-recipes** (10,576★, Python) — A collection of agent recipes, reference patterns, and vertical plugins built with Agent Development Kit (ADK)
- **adk-go** (8,930★, Go) — An open-source, code-first Go toolkit for building, evaluating, and deploying sophisticated AI agents with flexibility and control.
- **skills** (21,870★, Python) — Agent Skills for Google products and technologies
- **agents-cli** (6,296★, Python) — The CLI and skills that turn any coding assistant into an expert at creating, evaluating, and deploying AI agents on Google Cloud.
- **ax** (14,517★, Go) — Agent Executor (AX) is Google's open agentic orchestration runtime
- **artemis** (16,494★, Python) — ARTEMIS turns natural-language instructions into reliable Android automation. It automates end-to-end workflows, captures logs, and integrates seamlessly with AI coding assistants such as Antigravity, Codex, and Claude Code. It also achieves 99%+ success rate on AndroidWorld Benchmark.
- **elephant-goldfish-model** (11,475★, Python) — Open-source skills for designing and reviewing software with AI agents
- **magika** (18,765★, Rust) — Fast and accurate AI powered file content types detection
- **gemma.cpp** (7,077★, C++) — lightweight, standalone C++ inference engine for Google's Gemma models.
- **gemma_pytorch** (5,710★, Python) — The official PyTorch implementation of Google's Gemma models
- **sentencepiece** (12,164★, C++) — Unsupervised text tokenizer for Neural Network-based text generation.
- **deepdream** (13,218★, -) — (无描述)
- **automl** (6,475★, Jupyter Notebook) — Google Brain AutoML
- **flax** (7,366★, Jupyter Notebook) — Flax is a neural network library for JAX that is designed for flexibility.
- **trax** (8,298★, Python) — Trax — Deep Learning with Clear Code and Speed
- **dopamine** (10,931★, Jupyter Notebook) — Dopamine is a research framework for fast prototyping of reinforcement learning algorithms.
- **seq2seq** (5,620★, Python) — A general-purpose encoder-decoder framework for Tensorflow
- **tf-quant-finance** (5,561★, Python) — High-performance TensorFlow library for quantitative finance.

### 系统 / 安全 / 可观测性

- **gvisor** (19,865★, Go) — Application Kernel for Containers
- **cadvisor** (19,517★, Go) — Analyzes resource usage and performance characteristics of running containers.
- **osv-scanner** (11,389★, Go) — Vulnerability scanner written in Go which uses the data provided by https://osv.dev
- **tsunami-security-scanner** (8,617★, Java) — Tsunami is a general purpose network security scanner with an extensible plugin system for detecting high severity vulnerabilities with high confidence.
- **grr** (5,111★, Python) — GRR Rapid Response: remote live forensics for incident response
- **syzkaller** (6,388★, Go) — syzkaller is an unsupervised coverage-guided kernel fuzzer
- **clusterfuzz** (5,630★, Python) — Scalable fuzzing infrastructure.
- **oss-fuzz** (12,917★, Shell) — OSS-Fuzz - continuous fuzzing for open source software.
- **sanitizers** (12,517★, C) — AddressSanitizer, ThreadSanitizer, MemorySanitizer
- **perfetto** (6,764★, C++) — Production-grade client-side tracing, profiling, and analysis for complex software systems.
- **pprof** (9,320★, Go) — pprof is a tool for visualization and analysis of profiling data
- **bloaty** (5,568★, C++) — Bloaty: a size profiler for binaries
- **go-cloud** (9,919★, Go) — The Go Cloud Development Kit (Go CDK): A library and tools for open cloud development in Go.
- **seesaw** (5,676★, Go) — Seesaw v2 is a Linux Virtual Server (LVS) based load balancing platform.
- **gopacket** (6,797★, Go) — Provides packet processing capabilities for Go
- **gops** (7,024★, Go) — A tool to list and diagnose Go processes currently running on your system
- **google-authenticator** (5,357★, Java) — Open source version of Google Authenticator (except the Android app)

### 基础库 / 序列化 / 压缩

- **guava** (51,918★, Java) — Google core libraries for Java
- **gson** (24,236★, Java) — A Java serialization/deserialization library to convert Java Objects into JSON and back
- **flatbuffers** (26,609★, C++) — FlatBuffers: Memory Efficient Serialization Library
- **leveldb** (39,518★, C++) — LevelDB is a fast key-value storage library written at Google that provides an ordered mapping from string keys to string values.
- **brotli** (15,083★, TypeScript) — Brotli compression format
- **snappy** (6,631★, C++) — A fast compressor/decompressor
- **re2** (9,842★, C++) — RE2 is a fast, safe, thread-friendly alternative to backtracking regular expression engines like those used in PCRE, Perl, and Python. It is a C++ library.
- **libphonenumber** (18,341★, C++) — Google's common Java, C++ and JavaScript library for parsing, formatting, and validating international phone numbers.
- **diff-match-patch** (8,131★, Python) — Diff Match Patch is a high-performance library in multiple languages that manipulates plain text.
- **jsonnet** (7,589★, Jsonnet) — Jsonnet - The data templating language
- **or-tools** (14,328★, C++) — Google's Operations Research tools:
- **wire** (14,376★, Go) — Compile-time Dependency Injection for Go
- **go-github** (11,337★, Go) — Go library for accessing the GitHub v3 API
- **gumbo-parser** (5,187★, HTML) — An HTML5 parsing library in pure C99
- **tcmalloc** (5,394★, C++) — (无描述)
- **highway** (5,958★, C++) — Performance-portable, length-agnostic SIMD with runtime dispatch

### 测试 / 构建 / 开发体验

- **googletest** (39,702★, C++) — GoogleTest - Google Testing and Mocking Framework
- **benchmark** (10,499★, C++) — A microbenchmark support library
- **error-prone** (7,268★, Java) — Catch common Java mistakes as compile-time errors
- **google-java-format** (6,218★, Java) — Reformats Java source code to comply with Google Java Style.
- **auto** (10,561★, Java) — A collection of source code generators for Java.
- **j2objc** (6,039★, Java) — A Java to iOS Objective-C translation tool and runtime.
- **yapf** (13,987★, Python) — A formatter for Python files
- **gts** (5,293★, TypeScript) — ☂️ TypeScript style guide, formatter, and linter.
- **closure-compiler** (7,703★, JavaScript) — A JavaScript checker and optimizer.
- **traceur-compiler** (8,124★, JavaScript) — Traceur is a JavaScript.next-to-JavaScript-of-today compiler
- **latexify_py** (7,605★, Python) — A library to generate LaTeX expression from Python code.
- **python-fire** (28,230★, Python) — Python Fire is a library for automatically generating command line interfaces (CLIs) from absolutely any Python object.
- **zx** (45,832★, JavaScript) — A tool for writing better scripts
- **wireit** (6,433★, TypeScript) — Wireit upgrades your npm/pnpm/yarn scripts to make them smarter and more efficient.
- **clasp** (5,898★, TypeScript) — 🔗 Command Line Apps Script Projects
- **grumpy** (10,491★, Go) — Grumpy is a Python to Go source code transcompiler and runtime.
- **styleguide** (39,793★, Emacs Lisp) — Style guides for Google-originated open-source projects
- **eng-practices** (23,279★, -) — Google's Engineering Practices documentation
- **comprehensive-rust** (33,496★, Rust) — This is the Rust course used by the Android team at Google. It provides you the material to quickly teach Rust.

### 图形 / 多媒体 / 3D

- **skia** (11,015★, C++) — Skia is a complete 2D graphic library for drawing Text, Geometries, and Images. See documentation for contribution instructions.
- **filament** (20,688★, C++) — Filament is a real-time physically based rendering engine for Android, iOS, Windows, Linux, macOS, WebGPU, and WebGL2
- **draco** (7,541★, C++) — Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.
- **guetzli** (12,885★, C++) — Perceptual JPEG encoder
- **ExoPlayer** (21,935★, Java) — This project is deprecated and stale. The latest ExoPlayer code is available in https://github.com/androidx/media
- **model-viewer** (8,310★, TypeScript) — Easily display interactive 3D models on the web and in AR!
- **fonts** (20,715★, HTML) — Font files available from Google Fonts, and a public issue tracker for all things Google Fonts

### 移动 / UI

- **material-design-icons** (54,224★, -) — Material Design icons by Google (Material Symbols)
- **material-design-lite** (32,186★, HTML) — Material Design Components in HTML/CSS/JS
- **flexbox-layout** (18,282★, Kotlin) — Flexbox for Android
- **iosched** (21,631★, Kotlin) — The Google I/O Android App
- **accompanist** (7,848★, Kotlin) — A collection of extension libraries for Jetpack Compose
- **agera** (7,121★, Java) — Reactive Programming for Android
- **lovefield** (6,756★, JavaScript) — Lovefield is a relational database for web apps. Written in JavaScript, works cross-browser. Provides SQL-like APIs that are fast, safe, and easy to use.
- **physical-web** (5,958★, Java) — The Physical Web: walk up and use anything
- **grafika** (6,146★, Java) — Grafika test app
- **battery-historian** (5,403★, Go) — Battery Historian is a tool to analyze battery consumers using Android "bugreport" files.
- **android-classyshark** (7,549★, Java) — Android and Java bytecode viewer
- **EarlGrey** (5,700★, Objective-C) — :tea: iOS UI Automation Test Framework

### 其他值得一提

- **web-starter-kit** (18,256★, HTML) — Web Starter Kit - a workflow for multi-device websites
- **WebFundamentals** (13,862★, JavaScript) — Former git repo for WebFundamentals on developers.google.com
- **guice** (12,731★, Java) — Guice (pronounced 'juice') is a lightweight dependency injection framework for Java 11 and above, brought to you by Google.
- **glog** (7,377★, C++) — C++ implementation of the Google logging module
- **flutter-desktop-embedding** (7,031★, C++) — Experimental plugins for Flutter for Desktop
- **ios-webkit-debug-proxy** (6,207★, C) — A DevTools proxy (Chrome Remote Debugging Protocol) for iOS devices (Safari Remote Web Inspector).
- **uuid** (6,152★, Go) — Go package for UUIDs based on RFC 4122 and DCE 1.1: Authentication and Security Services.
- **bbr** (5,957★, -) — (无描述)
- **git-appraise** (5,326★, Go) — Distributed code review system for Git repos

## 评价

### 亮点

- **分类清晰、用途明确**：100 个仓库都能一眼看出「它解决什么问题」，适合按需检索而不是通读。
- **AI 线增长极快**：langextract 几个月冲到全组织前十，adk-* 在最近更新列表里高频出现，说明投入是持续的。
- **底层库稳定**：guava/leveldb/flatbuffers 这类项目十年以上维护，是学习「工业级 C++/Java 库设计」的好材料。

### 局限与注意

- **star 只是热度**：不代表质量或活跃度；部分高星项目已归档（如 web-starter-kit）或弃用（ExoPlayer）。
- **组织边界会误导**：想找 TensorFlow/K8s/Flutter 会扑空，需要去对应子组织。
- **快照会过期**：本页数字是 2026-11-04 的快照，几个月后可能变化明显（尤其 AI 项目）。

### 适合谁

- 想了解「Google 在开源什么」的技术人（本页就是地图）
- 需要选型/借鉴底层库的工程师（按类别查）
- 对 AI Agent 工具链感兴趣、想对比各家思路的人

## 实操内容保留

**用 GitHub API 复现这份清单**（先走代理）：

```sh
curl --proxy http://127.0.0.1:7897 \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/search/repositories?q=org%3Agoogle&sort=stars&order=desc&per_page=100"
```

**看最近活跃的项目**（比 star 更能反映当前投入）：

```sh
curl --proxy http://127.0.0.1:7897 \
  "https://api.github.com/search/repositories?q=org%3Agoogle&sort=updated&order=desc&per_page=25"
```

**在网页端按条件筛选**：

```text
https://github.com/orgs/google/repositories?type=all&sort=stars
（可再按 language、topic 过滤）
```

## 原文精彩摘录

> A Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.（langextract）

> Agent Executor (AX) is Google's open agentic orchestration runtime.（ax）

> ARTEMIS turns natural-language instructions into reliable Android automation. … It also achieves 99%+ success rate on AndroidWorld Benchmark.（artemis）

## 关键概念

- [[Google 开源]]：本页的实体页，记录组织边界、分类概览与浏览方式
- [[AI编程开发]]：知识库的编程开发主题
- [[Elephant-Goldfish Model]]：本清单中的 AI 设计评审项目（已单独建页）
- [[Understand Anything]]：同一批 AI 工具生态中的代码理解插件（已单独建页）

## 相关页面

- [[Google 开源]]
- [[AI编程开发]]
- [[Elephant-Goldfish Model]]
- [[Understand Anything]]
