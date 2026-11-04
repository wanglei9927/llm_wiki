# Protocol Explorer — Learn how the internet works（原始素材）

- 站点：https://protocol-explorer-alpha.vercel.app/
- 抓取时间：2026-11-04
- 抓取方式：直连超时（大陆网络），经本机代理 127.0.0.1:7897 抓取（HTTP 200，HTML 5,891 字节；主 JS bundle 218,009 字节）
- 作者：Dilum Sanjaya（站点 meta author；X：https://x.com/DilumSanjaya）
- 状态：alpha（域名带 alpha），部署在 Vercel
- 许可 / 源码：页面与 JS bundle 中未发现 GitHub 仓库链接，疑似闭源

---

## 站点元信息（HTML meta 原文）

```html
<title>Protocol Explorer · Learn how the internet works</title>
<meta name="description" content="Watch the internet work, packet by packet. Interactive lessons on HTTP, HTTPS, TCP, UDP, IP, DNS, DHCP, ICMP, SMTP, POP3, IMAP, FTP, SSH and TLS, with every packet decoded byte by byte. In English, Spanish, Portuguese, French, German, Turkish, Indonesian, Japanese, Chinese (Simplified and Traditional), Korean, Hindi, Arabic and Hebrew." />
<meta name="author" content="Dilum Sanjaya" />
<meta property="og:title" content="Protocol Explorer · Learn how the internet works" />
<meta property="og:description" content="Watch the internet work, packet by packet: interactive lessons from DNS and TCP to TLS, with every packet decoded byte by byte." />
<meta property="og:image:alt" content="Protocol Explorer: a network diagram with a TLS Server Hello packet travell..." />
```

`site.webmanifest`：

```json
{
  "name": "Protocol Explorer",
  "short_name": "Protocols",
  "description": "Watch the internet work, packet by packet: interactive lessons from DNS and TCP to TLS.",
  "display": "standalone"
}
```

## 覆盖的协议（meta 声明）

HTTP、HTTPS、TCP、UDP、IP、DNS、DHCP、ICMP、SMTP、POP3、IMAP、FTP、SSH、TLS

## 多语言（meta 声明，共 14 种）

English、Spanish、Portuguese、French、German、Turkish、Indonesian、Japanese、Chinese (Simplified)、Chinese (Traditional)、Korean、Hindi、Arabic、Hebrew

## 技术观察（从抓取产物推断）

- **纯前端 SPA**：HTML 只有外壳，主逻辑在单个 `/assets/index-*.js`（约 218 KB）。
- **严格 CSP**：`default-src 'self'`、`connect-src 'self'`、`object-src 'none'`、`form-action 'none'`，页面不向外部发请求；也说明它不需要后端。
- **PWA**：有 `site.webmanifest`、图标、主题色（亮/暗两套）。
- **SEO**：有 canonical、og 卡片、sitemap、robots 允许抓取。
- **内容组织**：JS 中可见大量教学文本与数据（TLS 握手、SSH 版本协商、ARP、ICMP、TCP 等），以及 `data-lesson`、`data-packet` 这类 DOM 标记，说明课程是「逐包动画 + 逐字节解码」的形式。

## 抓取到的示例内容（JS 内教学文本，英文原文）

> "0 ms (no handshake)"

> "After the TCP handshake the browser lists what it can do: TLS versions, cipher suites, and key shares for the groups it expects, including the post-quantum hybrid X25519MLKEM768. It also names the site (SNI) and the protocols it speaks (ALPN)."

> "Alice runs “ssh alice@server.example.com”. After the TCP handshake on port 22, each side sends one line of plain text naming the SSH protocol version (2.0) and its software. Everything else in SSH is binary."
