---
tags: [网络协议, 交互式教学, Protocol Explorer, TCP, TLS, DNS, 可视化, 学习资源]
created: 2026-11-04
updated: 2026-11-04
source_path: raw/articles/Protocol Explorer 网络协议教学.md
---

# Protocol Explorer：逐包看懂互联网协议的交互式教学站

> 一个「看着数据包跑」的网络协议学习站：覆盖 HTTP/HTTPS/TCP/UDP/IP/DNS/DHCP/ICMP/SMTP/POP3/IMAP/FTP/SSH/TLS 共 14 个协议，每个数据包都能逐字节解码，界面带网络拓扑动画，支持 14 种语言（含简繁中文）

## 基本信息

| 项目 | 内容 |
|---|---|
| 名称 | Protocol Explorer |
| 地址 | https://protocol-explorer-alpha.vercel.app/ |
| 作者 | Dilum Sanjaya（X：@DilumSanjaya） |
| 状态 | alpha（域名带 alpha），部署在 Vercel |
| 形态 | 纯前端单页应用（Vite SPA，无后端） |
| 覆盖协议 | HTTP、HTTPS、TCP、UDP、IP、DNS、DHCP、ICMP、SMTP、POP3、IMAP、FTP、SSH、TLS |
| 语言 | 14 种：英/西/葡/法/德/土/印尼/日/简中/繁中/韩/印地/阿拉伯/希伯来 |
| 源码 | 页面未提供仓库链接，疑似闭源 |
| 访问 | 大陆直连超时，需网络代理 |
| 原始素材 | raw/articles/Protocol Explorer 网络协议教学.md |

## 核心观点

1. **它把「协议」变成可以看的动画，而不是背概念**：一句话定位是 "Watch the internet work, packet by packet"——用网络拓扑图展示数据包从客户端到服务器的旅程，把抽象的握手过程变成可视的时间线。

2. **每个包都能逐字节解码**：不是只给结论，而是把报文拆到字节级（字段、长度、值），对应真实抓包时的 Wireshark 视图，能帮人建立「协议字段 ↔ 字节」的直觉。

3. **覆盖从链路到应用层的完整链条**：DNS 解析 → TCP 握手 → TLS 握手 → HTTP 请求/响应；再加 DHCP、ICMP、ARP、邮件协议（SMTP/POP3/IMAP）、FTP、SSH，基本把「上网时背后发生了什么」串成一条线。

4. **教学细节做得深**：从抓到的教学文本看，它会讲 TLS 的 SNI/ALPN、密码套件、后量子混合密钥交换（X25519MLKEM768）、SSH 版本协商后的二进制协议等——不是入门科普的浅层复述。

5. **工程上是一个「纯静态 + 严格 CSP」的应用**：HTML 只有外壳，全部逻辑在一个约 218KB 的 JS bundle 里；CSP 禁止外部连接，说明它完全离线运行、不采集数据；同时是 PWA，可安装。

## 它是什么（中文说明）

- **对学习者**：一个可以边点边看的网络协议教程。适合三类人——准备网络考试的学生、想搞懂「HTTPS 到底怎么加密」的开发者、要排查网络问题的运维/后端。
- **对开发者**：一个「协议可视化」的优秀参考实现（动画 + 字节视图 + 多语言）。
- **不是**：不是抓包工具（不能抓你自己的流量），不是协议规范文档。

## 实操内容保留

> 原文为交互式网页，无代码；以下为访问与使用方式。

**访问**：

```text
https://protocol-explorer-alpha.vercel.app/
```

大陆网络直连会超时，需要代理（本机走 Clash 7897 可访问）。

**建议学习顺序**（按「一次上网的真实链路」）：

1. **DNS**：域名怎么变成 IP
2. **TCP**：三次握手、可靠传输、拥塞控制
3. **TLS**：证书、密钥交换、SNI/ALPN
4. **HTTP/HTTPS**：请求响应、缓存、HTTP/2/3
5. **IP / ICMP / ARP / DHCP**：底层寻址与网络配置
6. **UDP / SSH / 邮件协议 / FTP**：按兴趣补

**使用技巧**：

- 每个协议先看动画建立整体流程，再回看逐字节解码，最后用自己的话复述一遍；
- 开英文界面顺便练专业词汇（SNI、ALPN、cipher suite、handshake）；
- 看完一个协议，去 Wireshark 抓一次真实流量对照。

## 评价

### 亮点

- **可视化质量高**：把「包在网络上旅行」做成动画，比静态图直观得多。
- **深度足够**：逐字节解码 + 提到后量子密钥交换这类新东西，说明作者跟得上协议演进。
- **多语言 + 可安装（PWA）**：14 种语言对非英语学习者友好，含简繁中文。
- **隐私友好**：严格 CSP、纯前端、无外部请求，学习数据不上传。

### 局限与待验证

- **alpha 阶段**：域名带 alpha，课程完整度、稳定性、后续维护都不确定。
- **不是工具**：不能抓包、不能做实验，只能「看演示」；真正掌握仍需配合 Wireshark/tcpdump 实践。
- **闭源**：没有仓库链接，无法看实现或贡献；想复用其动画思路只能参考。
- **需要代理**：大陆直接访问不通，学习门槛多一步。

### 适合谁

- 网络/后端/运维初学者，想建立「协议分层」的直觉
- 准备面试或考试、需要快速复习 TCP/TLS/HTTP 的人
- 想给团队做网络培训、找可视化素材的人

## 原文精彩摘录

> Watch the internet work, packet by packet. Interactive lessons on HTTP, HTTPS, TCP, UDP, IP, DNS, DHCP, ICMP, SMTP, POP3, IMAP, FTP, SSH and TLS, with every packet decoded byte by byte.

> After the TCP handshake the browser lists what it can do: TLS versions, cipher suites, and key shares for the groups it expects, including the post-quantum hybrid X25519MLKEM768. It also names the site (SNI) and the protocols it speaks (ALPN).

> Alice runs "ssh alice@server.example.com". After the TCP handshake on port 22, each side sends one line of plain text naming the SSH protocol version (2.0) and its software. Everything else in SSH is binary.

## 关键概念

- [[Protocol Explorer]]：本文主体（实体页，含覆盖范围与访问方式）
- TCP / TLS / DNS：三个最核心的协议（本页学习路径的前三步）
- 逐字节解码：把报文按字段拆到字节级，是理解协议的关键方法

## 相关页面

- [[Protocol Explorer]]
- [[AI编程开发]]
