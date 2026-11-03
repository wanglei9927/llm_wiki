---
tags: [Looseleaf, shadcn, 组件库, 手绘风格, React, Tailwind, 前端UI, 设计系统]
created: 2026-11-04
updated: 2026-11-04
source_path: raw/articles/2026-11-04-looseleaf-readme.md
---

# Looseleaf：把 shadcn/ui 画在纸上的手绘风组件库

> 一个 2026-11-01 才发布的手绘风 React 组件库：123 个组件、61 个区块、160 个图标和一套手绘字体，全部用代码「画」出来；保持 shadcn/ui 的组件结构、props 和 `data-slot`，可以不改 JSX 直接替换

## 基本信息

| 项目 | 内容 |
|---|---|
| 项目 | Looseleaf（作者 kevintngo / Kevin Ngo） |
| 仓库 / 官网 | https://github.com/kevintngo/looseleaf · https://kevintngo.github.io/looseleaf/ |
| 技术栈 | React 19 + Tailwind v4 + Radix + TypeScript |
| 许可 | MIT（代码、美术素材、Kevin Sans 字体都是 MIT；IBM Plex Mono 为 SIL OFL 1.1） |
| 热度 | 269 stars · 11 forks（2026-11-04，项目刚创建 3 天） |
| 规模 | 2,894 个文件；123 组件 / 61 blocks / 160 图标 / 48 涂鸦 / 88 贴纸 |
| 分发方式 | shadcn registry（`npx shadcn add @looseleaf/...`，源码落入你的仓库） |
| 原始素材 | raw/articles/2026-11-04-looseleaf-readme.md |

## 核心观点

1. **它不是「知识库工具」，是组件库 + 文档站**：作者把它定位为「shadcn/ui, drawn by hand」——提供一整套手绘质感的 UI 组件与页面区块，附带一个可浏览的文档站（`src/docs` 有 1,236 个文件）。

2. **「换皮不换 API」是它的核心卖点**：保留 shadcn/ui 的 parts、props 和 `data-slot` 命名，所以理论上把 registry 换掉、组件重新生成，业务 JSX 不用改。装饰是外衣，语义仍是标准 Radix。

3. **所有手绘线条都是代码生成的 SVG**：每个组件 = 真实 DOM + 其后的一个 `<svg data-ink>`；绘制是纯函数 + 种子（同一 seed 在服务端/浏览器画出同一条线），所以可复现、可服务端渲染、不依赖图片素材。

4. **交互态用 CSS 而不是 React**：hover / press / focus 只是切换「预先画好的图层」，减少运行时重绘；颜色、线宽、密度全部是 `--ll-*` token，映射到 shadcn 语义变量。

5. **工程化程度远超「个人玩具」**：registry 从源码派生（`src/` → `registry.json` → `shadcn build` → `public/r/*.json`），附带消费者安装测试（215 个 item × 9 种消费方 × 1,317 项检查）；`.upstream/shadcn` 保存上游副本以保持 API 对齐。

6. **无障碍是认真做的**：键盘操作、可见焦点、AA 文字对比、24px 点击目标、reduced motion、forced colors、RTL、三档密度。

## 它到底是什么

- **对使用者**：一个可安装的 React 组件库。`npx shadcn@latest add @looseleaf/button` 会把组件源码（`components/ui/*.tsx`、`lib/ink/*`）复制进你的项目——是你的代码，不是依赖包。
- **对作者/贡献者**：一个「手绘渲染引擎 + 组件库 + 文档站 + registry 构建流水线」的 monorepo。
- **不是**：不是 GitHub 知识库、不是笔记软件、不是 AI 工具。用户最初把它理解为「GitHub 知识库」，实际是「一套手绘风格 UI 的组件库项目」。

## 技术实现（要点）

| 机制 | 说明 |
|---|---|
| 绘制 | 纯 TypeScript 函数 + 种子 → SVG path；同 seed 同输出 |
| 挂载 | 真实 DOM 标签 + `<svg data-ink>` 背景，保证可访问性 |
| 交互 | hover/press/focus 切换预绘图层（CSS），不触发 React 重绘 |
| 主题 | `--ll-*` token → 映射 shadcn 语义变量；三档密度 |
| 字体 | Kevin Sans 手绘字体，三种角色（正文/标题/印章）；可手动 `@import` |
| 分发 | shadcn registry（`public/r/*.json` 215 个），源码落地 |
| 质量 | vitest、registry 消费者测试、class/token 检查、QA 脚本 |

## 怎么用（实操）

**1. 在你的项目里注册 registry**（`components.json`）：

```json
{
  "registries": { "@looseleaf": "https://kevintngo.github.io/looseleaf/r/{name}.json" }
}
```

**2. 安装需要的组件 / 区块 / 整套主题**：

```sh
npx shadcn@latest add @looseleaf/button
npx shadcn@latest add @looseleaf/login-01
npx shadcn@latest add @looseleaf/looseleaf   # 整套（主题 + ink + 全部组件）
```

**3. 包一层 `InkProvider`**：

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

**4. 想手动加载字体**（主题通常会自动带上）：

```css
@import url("https://kevintngo.github.io/looseleaf/fonts/kevin-sans.css");
```

**本地开发这个仓库**：

```sh
npm install
npm run dev              # 文档站
npm run build            # 静态站到 dist/
npm test                 # vitest
npm run registry:build   # 改了组件后重建 registry
```

## 评价

### 亮点

- **差异化极强**：在「shadcn 生态克隆」泛滥的当下，用「手绘纸感」做出辨识度，同时保留 shadcn 的 API，迁移成本低。
- **技术方案干净**：纯函数 + 种子生成 SVG，比贴图方案可维护、可 SSR、可主题化；交互交给 CSS，性能友好。
- **工程化可信**：registry 构建、消费者测试、上游对齐、无障碍清单都做了，不像周末 demo。
- **无障碍没有牺牲**：手绘外观 + 可见焦点/AA 对比/24px 目标，说明作者认真考虑过可用性。

### 局限与待验证

- **非常新**：2026-11-01 创建，269 星；生态、文档完整度、长期维护都待观察。
- **审美取向强**：手绘风适合个人产品、创意工具、教育类；企业后台/金融类大概率不合适。
- **定制成本**：虽然 API 兼容，但要改手绘线条风格需要理解 ink 引擎（recipes/art），不是改 CSS 变量就行。
- **体积与性能**：123 组件 + 大批 SVG 绘制代码，按需安装可缓解；整包引入需评估包体。
- **与上游 shadcn 的同步**：靠 `.upstream/shadcn` 手动对齐，上游更新快时可能滞后。

### 适合谁

- 想做有「手账 / 纸感 / 涂鸦」气质的个人项目、创意工具、教育产品的开发者
- 已在用 shadcn/ui、想低成本换一套视觉语言的团队
- 对「用代码生成手绘图形」这个技术方向感兴趣的前端工程师

## 原文精彩摘录

> Looseleaf is a React + Tailwind v4 + Radix component library and shadcn registry where every surface is paper and every line is drawn with a pen.

> It keeps shadcn/ui's parts, props and `data-slot` names, so you can swap it in without touching your JSX. The charm is decoration; the semantics are ordinary Radix.

> Everything that is drawn is one `<svg data-ink>` behind the real DOM label. The drawing is a pure, seeded TypeScript function … so the same seed draws the same line on the server and in the browser. States are CSS, not React.

## 关键概念

- [[Looseleaf]]：本素材主体（实体页，含安装、特性与评价）
- [[AI编程开发]]：知识库的编程开发主题（前端工程属于相邻领域）
- shadcn registry：把组件源码分发到使用者仓库的机制

## 相关页面

- [[Looseleaf]]
- [[AI编程开发]]
