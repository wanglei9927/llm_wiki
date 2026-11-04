# Google 开源项目详解（star 前 100）— 原始素材

- 来源：GitHub API（org:google），抓取时间 2026-11-04
- 组织规模：2,892 个公开仓库
- 取数方式：search API，按 stars 倒序取前 100；另取 recently updated 25 个看活跃度
- 说明：star 为抓取时快照；部分仓库已弃用（如 ExoPlayer）

---


## AI / Agent 与机器学习

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

## 系统 / 安全 / 可观测性

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

## 基础库 / 序列化 / 压缩

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

## 测试 / 构建 / 开发体验

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

## 图形 / 多媒体 / 3D

- **skia** (11,015★, C++) — Skia is a complete 2D graphic library for drawing Text, Geometries, and Images. See documentation for contribution instructions.
- **filament** (20,688★, C++) — Filament is a real-time physically based rendering engine for Android, iOS, Windows, Linux, macOS, WebGPU, and WebGL2
- **draco** (7,541★, C++) — Draco is a library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.
- **guetzli** (12,885★, C++) — Perceptual JPEG encoder
- **ExoPlayer** (21,935★, Java) — This project is deprecated and stale. The latest ExoPlayer code is available in https://github.com/androidx/media
- **model-viewer** (8,310★, TypeScript) — Easily display interactive 3D models on the web and in AR!
- **fonts** (20,715★, HTML) — Font files available from Google Fonts, and a public issue tracker for all things Google Fonts

## 移动 / UI

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

## 其他值得一提

- **web-starter-kit** (18,256★, HTML) — Web Starter Kit - a workflow for multi-device websites
- **WebFundamentals** (13,862★, JavaScript) — Former git repo for WebFundamentals on developers.google.com
- **guice** (12,731★, Java) — Guice (pronounced 'juice') is a lightweight dependency injection framework for Java 11 and above, brought to you by Google.
- **glog** (7,377★, C++) — C++ implementation of the Google logging module
- **flutter-desktop-embedding** (7,031★, C++) — Experimental plugins for Flutter for Desktop
- **ios-webkit-debug-proxy** (6,207★, C) — A DevTools proxy (Chrome Remote Debugging Protocol) for iOS devices (Safari Remote Web Inspector).
- **uuid** (6,152★, Go) — Go package for UUIDs based on RFC 4122 and DCE 1.1: Authentication and Security Services.
- **bbr** (5,957★, -) — (无描述)
- **git-appraise** (5,326★, Go) — Distributed code review system for Git repos
