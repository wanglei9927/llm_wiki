# 原始素材：fq-book 仓库 README 与全书目录

- 来源 URL：
  - 仓库主页：https://github.com/hoochanlon/fq-book（master 分支，8.2k stars / 1.7k forks / 195 commits，抓取时）
  - README：https://raw.githubusercontent.com/hoochanlon/fq-book/master/README.md
  - 全书目录：https://raw.githubusercontent.com/hoochanlon/fq-book/master/docs/_sidebar.md
- 抓取时间：2026-11-02（webfetch + GitHub API）
- 协议：CC BY-NC 4.0（允许演绎共享、禁止商用）
- 技术形态：docsify 在线书（GitHub Pages 部署），仓库仅 144KB

## README 关键内容（摘录）

**定位**：《这本书能让你连接互联网》（fq-book）着重于上网的方式与获取信息的技巧，并对相关流行且典型的软件做简要的上手配置，以及原理的相关说明。

**仓库描述**：详细阐述代理、隧道、VPN 运作过程，并对 GFW 策略如：地址端口封锁、服务器缓存投毒、数字验证攻击、SSL 连接阻断做相关的原理说明。

**Topics**：proxy、vpn、tunnel、shadowsocks、ssr、ssh、tcp、rst、gfw、https、digital-certificate、ip-blocking、ipfs、deep-web

**NET::ERR_CERT_AUTHORITY_INVALID 解招**（README 原文要点）：浏览器提示证书不可信 + 403 的原因是 ISP 的 DNS 发送了错误的根证书；换成第三方 DNS 后刷新缓存即可：
- 百度 DNS：180.76.76.76
- 阿里 DNS：223.5.5.5、223.6.6.6
- 腾讯 DNS：119.29.29.29、182.254.116.116
- Windows 刷新：`ipconfig /flushdns`

**部署方式**：在线（fork 后 GitHub Pages）/ 本地（`npm i docsify-cli -g` → `docsify serve` → localhost:3000）/ Offline Explorer 离线 / 转 gitbook 出 PDF。

**代理设置（README 原样命令）**：

```sh
# git 客户端代理
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
git config --global --unset https.proxy
git config --global --unset http.proxy

# 浅克隆（只取最新代码）
git clone --depth=1 https://github.com/你的用户名/你的repo.git

# Mac 终端代理
export ALL_PROXY=socks5://127.0.0.1:1080
unset ALL_PROXY

# ssh 走代理（~/.ssh/config）
## HTTP 代理
ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=8848
## socks5 代理
ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
```

> README 提示：代理软件开全局模式，终端也不会自动走代理，需另设；可用 `curl cip.cc` 判断是否走了代理通道。

**作者免责声明（README 原文）**：本书允许演绎及共享但禁止商用，科学上网仅为研究需要——本书面向海外华人用户且仅供科研与学习，切勿用于其他用途；中国居民请自觉关闭本书并 24 小时内删掉与此相关的所有内容，否则出现一切后果本书作者概不负责。

## 全书目录（docs/_sidebar.md 完整结构）

* 关于本书：前言
* 阅读须知：4GFW、注意事项、隐私防护
* 快速开始：快速入手
* 方法论：获取梯子上网的方式、获取国外手机号码、开通虚拟信用卡、美区 ID 购买小火箭、国外云服务器自搭示例、代理 IP 结合指纹浏览器、无法使用 Gemini（ipdodo / 自用方案）、离岸爱国数字侨居与双重封锁、跨国阶层跃升
* DNS、Hosts：DNSCrypt、DNS、hosts
* 浏览应用：chrome、opera、tor（firefox）、puffin、zeronet
* VPN 软件：Betternet、典型 VPN 概览、wireguard
* 代理工具：SS/SSR、v2ray、proxifier、privoxy、SSH-Tunnel
* 使用网站：搜索站点、网页时光机、个人博客及视频平台、网页代理、heroku 搭建 ss/v2ray/ss 分享站点
* ipfs 专题：ipfs、ipfs 简单使用、去中心化网络的信仰、为什么去中心化重要
* 特别篇：不止于 APN、最後のTag
* 科学普及（16 篇）：软件互联协议、DNS 劫持与污染、数字证书攻防概述、代理上网准入检测实验、VPN 隧道协议、科学上网原理、GFW 原理和封锁技术、meek 网桥的技术原理、VMware 的 3 种网络模式、NAT 类型科普、正向/反向/透明代理、深网和暗网扫盲、为什么纯净 IP 重要、集群/分布式/负载均衡、为什么翻了墙也无法访问某网站（TCP RST）
* 仅作了解：accesser、goagent、gatherproxy、CoNET、brook、reqrypt、barbaTunnel（历史工具）
* 细节补充（15 篇）：ss#1130、封锁 IP 的认知、校园网解读、SS 二级代理、ss/ssr/v2ray 链接解析、GFW 的 TCP 封锁猜想、HTTP 劫持与 DNS 污染解决等
* 此书后记 / 参考文献

---

> 注：本文件为 AI 抓取的原始素材，只读不改。
