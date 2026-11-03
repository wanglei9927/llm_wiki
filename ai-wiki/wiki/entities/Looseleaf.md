---
tags: [Looseleaf, 组件库, shadcn, 手绘风格, React, Tailwind, 设计系统, 前端]
created: 2026-11-04
updated: 2026-11-04
sources: [2026-11-04-looseleaf]
---

# Looseleaf

> 一套「手绘纸感」的 React 组件库与 shadcn registry：123 个组件、61 个区块、160 个图标全部由代码绘制成 SVG；保留 shadcn/ui 的组件结构与 props，可低成本替换进现有项目。MIT，作者 Kevin Ngo（kevintngo），2026-11-01 发布

## 简介

Looseleaf 把 UI 组件做成「画在纸上」的样子：每个表面是纸张质感，每条线是钢笔描边，可以加贴纸和印章。它的定位不是另起炉灶，而是 **shadcn/ui 的视觉替代层**——组件名、props、`data-slot` 全部保持一致，所以把 registry 换掉、重新生成组件，业务代码基本不用改。

技术上它最特别的一点是：**所有手绘线条都不是图片，而是代码**。每个真实 DOM 标签后面挂一个 `<svg data-ink>`，绘制逻辑是纯函数加种子，因此同一份输入在服务端和浏览器画出同样的线，可复现、可 SSR、可主题化。

## 关键信息

| 项目 | 内容 |
|---|---|
| 作者 | Kevin Ngo（GitHub `kevintngo`） |
| 仓库 / 官网 | https://github.com/kevintngo/looseleaf · https://kevintngo.github.io/looseleaf/ |
| 许可 | MIT（代码 + 美术 + Kevin Sans 字体）；IBM Plex Mono 为 SIL OFL 1.1 |
| 技术栈 | React 19 · Tailwind v4 · Radix UI · TypeScript |
| 热度 | 269 stars · 11 forks（2026-11-04，发布 3 天） |
| 内容规模 | 123 组件 · 61 blocks · 160 图标 · 48 涂鸦 · 88 贴纸 · 15 个 Stubby 姿势 |
| 分发 | shadcn registry（`npx shadcn add @looseleaf/...`），组件以源码落地 |
| 无障碍 | 键盘、可见焦点、AA 对比、24px 目标、reduced motion、forced colors、RTL、三档密度 |

## 核心特性

- **123 个组件**：覆盖 shadcn/ui 全部部件（button → sidebar → chart），另加纸张对象、标记、贴纸、便签本、聊天组件。
- **61 个 blocks**：侧边栏、登录、注册、仪表盘、设置、定价、聊天、笔记、落地页区块。
- **一整套手绘素材**：160 图标 + 48 涂鸦 + 88 贴纸 + 徽章印章 + 15 种吉祥物姿势，全部代码生成。
- **Kevin Sans 字体**：一套手绘字体，适配三种角色（界面正文 / 标题 / 印章）。
- **三档密度与主题 token**：`--ll-*` 变量映射到 shadcn 语义变量，换主题不改组件。
- **源码级落地**：组件复制进你的 `components/ui/`、`lib/ink/`，是你的代码而不是黑盒依赖。

## 技术原理

| 机制 | 说明 |
|---|---|
| 绘制 | `src/lib/ink/recipes/<component>-ink.ts` 纯函数 + 种子 → SVG path |
| 挂载 | 真实 DOM 标签 + `<svg data-ink>` 作为装饰层，语义与可访问性由真实 DOM 保证 |
| 交互 | hover/press/focus 只是切换预绘图层（CSS），不触发 React 状态重绘 |
| 主题 | 颜色/线宽/密度统一为 `--ll-*` token |
| 分发 | registry 流水线：`src/` → `registry.json` → `shadcn build` → `public/r/*.json`，全部派生，禁止手改 |
| 质量保障 | vitest、registry 消费者测试（215 item × 9 消费方 × 1,317 检查）、class/token 检查、QA 脚本 |
| 上游对齐 | `.upstream/shadcn` 保存上游副本，跟踪 shadcn/ui 的 API 变化 |

## 实用信息

**安装（在已有 shadcn 项目里）**：

```json
// components.json
{
  "registries": { "@looseleaf": "https://kevintngo.github.io/looseleaf/r/{name}.json" }
}
```

```sh
npx shadcn@latest add @looseleaf/button      # 单个组件
npx shadcn@latest add @looseleaf/login-01    # 一个 block
npx shadcn@latest add @looseleaf/looseleaf   # 整套主题 + 组件
```

**接入**：

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

**手动加载字体**（主题通常自动带上）：

```css
@import url("https://kevintngo.github.io/looseleaf/fonts/kevin-sans.css");
```

**适用场景**：个人产品、创意/教育类应用、手账与笔记工具、想给 shadcn 项目换一套强烈视觉语言的场景。

**不适用**：企业后台、金融/政务等需要克制专业感的界面；对包体敏感且不想批量引入 SVG 绘制的项目需按需安装。

**注意**：项目非常新（2026-11-01 创建），文档、生态、长期维护仍需观察；改手绘线条本身需要理解 ink 引擎，不只是改 CSS 变量。

## 不同素材中的观点

- **[来源: [[2026-11-04-looseleaf]]]** README 与仓库研究显示：作者强调「装饰是外衣，语义是标准 Radix」，并用「同一 seed 画出同一条线」把可复现性、SSR 和可访问性做成硬约束；工程侧用消费者安装测试保证 registry 不是摆设。对使用者的实际含义是：**迁移成本低（API 兼容）、视觉辨识度高、但审美取向强**，适合创意类项目而非通用后台。

## 相关页面

- [[2026-11-04-looseleaf]]
- [[AI编程开发]]
