# Looseleaf — shadcn/ui, drawn by hand（原始素材与研究）

- 仓库：https://github.com/kevintngo/looseleaf
- 官网 / Demo：https://kevintngo.github.io/looseleaf/
- 抓取时间：2026-11-04
- 抓取方式：GitHub 经本机代理 127.0.0.1:7897（直连超时）
- 仓库元数据（GitHub API）：269 stars · 11 forks · TypeScript · MIT · 创建 2026-11-01 · 最近推送 2026-11-01 · 2,894 个文件
- 说明：作者是 Kevin Ngo（kevintngo）；项目非常新（2026-11-01 创建），属于「组件库 + 文档站」，不是知识库工具

---

## README 原文（全文）

# Looseleaf

**shadcn/ui, drawn by hand.**

[kevintngo.github.io/looseleaf](https://kevintngo.github.io/looseleaf/)

Looseleaf is a React + Tailwind v4 + Radix component library and [shadcn registry](https://ui.shadcn.com/docs/registry) where every surface is paper and every line is drawn with a pen: clean outlines and solid color, with stickers and stamps when you want them. It keeps shadcn/ui's parts, props and `data-slot` names, so you can swap it in without touching your JSX. The charm is decoration; the semantics are ordinary Radix.

| | |
|---|---|
| **123 components** | every shadcn/ui part, from button to sidebar to chart, plus paper objects, marks, stickers, a sketchpad and a chat kit |
| **61 blocks** | sidebars, logins, sign-ups, dashboards, settings, pricing, chat, notes and landing sections |
| **Art** | 160 icons, 48 doodles, 88 stickers, badges and stamps, and Stubby in 15 poses, all drawn in code |
| **Kevin Sans** | one hand-drawn typeface, tuned for three roles: interface text, titles and stamps |
| **Accessible** | keyboard, visible focus, AA text, 24 px targets, reduced motion, forced colors, RTL and three densities |

## Install

Add the registry to `components.json` once:

```json
{
  "registries": { "@looseleaf": "https://kevintngo.github.io/looseleaf/r/{name}.json" }
}
```

Then add what you need:

```sh
npx shadcn@latest add @looseleaf/button
npx shadcn@latest add @looseleaf/login-01
npx shadcn@latest add @looseleaf/looseleaf
```

The theme brings Kevin Sans with it. To load the font by hand instead:

```css
@import url("https://kevintngo.github.io/looseleaf/fonts/kevin-sans.css");
```

```tsx
import { InkProvider } from "@/lib/ink/react"
import { Button } from "@/components/ui/button"

export function App() {
  return (
    <InkProvider>
      <Button>Save changes</Button>
    </InkProvider>
  )
}
```

Components land in your repo as source (`components/ui/*.tsx`, `lib/ink/*`): your code, not a dependency.

## Develop

```sh
npm install
npm run dev              # the documentation site
npm run build            # static site in dist/
npm test                 # vitest
npm run registry:build   # registry.json and public/r/*.json
```

Run `npm run registry:build` after changing a component, so the registry serves the new source. Pushing to `main` deploys the site to GitHub Pages.

## How it works

Everything that is drawn is one `<svg data-ink>` behind the real DOM label. The drawing is a pure, seeded TypeScript function (`src/lib/ink/recipes/<component>-ink.ts`) that writes SVG colored by CSS variables, so the same seed draws the same line on the server and in the browser. States are CSS, not React: hover, press and focus reveal layers that were drawn ahead of time. Every color, pen width and density is a token (`--ll-*`), aliased onto shadcn's semantic variables.

## License

MIT, for the code, the art and Kevin Sans. IBM Plex Mono is SIL OFL 1.1.

---

## 研究补充（2026-11-04）

**仓库结构**（2,894 个文件）：

| 目录 | 规模 | 作用 |
|---|---|---|
| `src/components/ui` | 125 个文件 | 组件源码（button、accordion、chart、sidebar…） |
| `src/blocks` | 317 | 预置区块（登录、定价、设置、聊天、笔记等） |
| `src/docs` | 1,236 | 文档站（content / examples / meta / pages / shell） |
| `src/lib/ink` | 213 | 手绘引擎：recipes、art（icons/doodles/stickers/mascots）、charts、paper、fonts |
| `public/r` | 215 | 构建好的 shadcn registry JSON |
| `public/thumbs` | 125 | 组件缩略图 |
| `.upstream/shadcn` | 65 | 上游 shadcn/ui 副本，用于保持 API 对齐 |
| `assets/fonts-ttf` | 9 | Kevin Sans 等字体源文件 |

**技术要点**：

- 每个组件 = 真实 DOM 标签 + 其后的一个 `<svg data-ink>`；绘制是**纯函数 + 种子**（`src/lib/ink/recipes/<component>-ink.ts`），同一 seed 在服务端和浏览器画出同一条线。
- 交互状态（hover/press/focus）是**预先画好的图层 + CSS 切换**，不靠 React 状态重绘。
- 颜色/线宽/密度都是 token（`--ll-*`），映射到 shadcn 的语义变量。
- 组件以**源码**形式落到使用者仓库（`components/ui/*.tsx`、`lib/ink/*`），不是 npm 依赖。
- 无障碍：键盘、可见焦点、AA 文字对比、24px 点击目标、reduced motion、forced colors、RTL、三档密度。

**registry 流水线**（`notes/registry.md`）：`src/` → `registry.json` → `shadcn build` → `public/r/*.json`，全部由源码派生，不允许手改。附带消费者测试：`registry:test:real` 把 215 个 item 装进 9 种消费方、跑 1,317 项检查。

**版本基线**：验证于 shadcn CLI 4.21.0、Tailwind 4.3.3、Node 24。React 19 + Tailwind v4 + Radix。
