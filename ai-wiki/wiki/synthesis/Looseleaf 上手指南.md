---
tags: [Looseleaf, 上手指南, 组件库, 动效, 视频, Remotion, shadcn]
created: 2026-11-04
updated: 2026-11-04
sources: [2026-11-04-looseleaf]
---

# Looseleaf 上手指南：怎么用最方便，能不能做视频

> 面向已经决定「想试试 Looseleaf」的人：三条使用路线、常见坑、它自带的动效能力，以及「想做视频」的三条可行路径。两条讨论（便捷用法 / 动效与视频）的整理版。

## 一、怎么用最方便（三条路线）

### 路线 A：只看不装（0 成本，先判断风格）

打开官方文档站 **https://kevintngo.github.io/looseleaf/**，组件、blocks、贴纸、字体都有在线预览。先逛 5 分钟确认「手绘纸感」是不是你要的气质，再决定动手。

### 路线 B：已有项目里局部试（最推荐，10 分钟）

前提：项目是 **React 19 + Tailwind v4 + shadcn**（存在 `components.json`）。

**1. 注册 registry**（`components.json`）：

```json
{
  "registries": { "@looseleaf": "https://kevintngo.github.io/looseleaf/r/{name}.json" }
}
```

**2. 先装 2–3 个组件看效果，别一上来装整套**：

```sh
npx shadcn@latest add @looseleaf/button
npx shadcn@latest add @looseleaf/card
```

**3. 包一层 provider**：

```tsx
import { InkProvider } from "@/lib/ink/react"

<InkProvider>
  <Button>保存</Button>
</InkProvider>
```

**4. 微调风格改 token（`--ll-*`）**：线宽、颜色、密度都是变量，不用动组件源码。

> 关键心态：组件是**源码落进你的仓库**，试坏了 `git checkout` 就回去了。

### 路线 C：新项目整套上（个人产品 / 创意项目）

```sh
npx shadcn@latest add @looseleaf/looseleaf   # 主题 + ink 引擎 + 全部组件
```

整包会带 123 组件 + ink 绘制引擎，文件不少。只想用登录页/定价页/仪表盘这类区块，单独装 blocks 更划算：

```sh
npx shadcn@latest add @looseleaf/login-01
npx shadcn@latest add @looseleaf/pricing-01
```

### 五个坑（提前知道省事）

1. **Vue 项目用不了**：这是 React/Radix 生态。
2. **需要 Tailwind v4 + React 19**：老项目（v3 / React 18）要升级，别硬装。
3. **`shadcn add` 会写文件**：装之前先 commit，装完 diff 一眼看清改了什么。
4. **别全站切换**：手绘风适合创意页、营销页、个人项目；后台/表单密集的页面会显得吵。
5. **升级方式**：重新 `add` 同名组件会覆盖，定制过的部分要提前记录或提交。

## 二、动态效果能力（它原生就有）

Looseleaf 有一套 motion 体系（`src/docs/content/foundations/motion.tsx`）：

| 能力 | 说明 |
|---|---|
| **10 个时长 token** | `press`（按下回弹）、`hover`、`fade`、`pop`（盖章）、`sheet`（纸张翻转）、`drop`（纸片落下）、`toss`（toast 抛入）、`soak`（湿墨洇开）、`boil`（线条抖动）、`draw`（描边生长） |
| **`Boil` 组件** | 经典手绘动画的「线条沸腾」：默认 6fps、2–3 帧循环，可调 `fps / frames / strength / active / reseed`，尊重 reduced-motion |
| **`draw-on`** | 线条一笔一笔画出来的生长动画 |
| **`Sketchpad`** | 支持 replay，可回放绘制过程 |
| **印章 / 贴纸 / 高亮** | 带有盖章、弹出类动效 |

适合**短循环**（线条抖动、盖章、描边生长）；它是 UI 动画，不是视频时间线。

## 三、能不能做视频？三条路

**结论：能做动态效果，但不能直接导出视频**——没有时间线、没有 MP4/GIF 导出。

| 方式 | 做法 | 适合 |
|---|---|---|
| **录屏**（最省事） | 打开官方文档站或本地 `npm run dev`，直接录 | 15–60 秒组件演示、GIF |
| **无头浏览器逐帧** | Playwright/Puppeteer 按固定时间步截图 → ffmpeg 合成 | 需要精确控制、批量生成 |
| **Remotion**（推荐做正式视频） | Remotion 是「用 React 写视频」的框架；Looseleaf 组件本身是 React，可放进 `<Composition>` 按帧驱动并导出 MP4 | 讲解视频、产品 demo、带字幕短片 |

**Remotion 路线的两个注意点**：

1. 组件动效大量用浏览器定时器/CSS 过渡（比如 Boil 的 6fps 循环），在 Remotion 里最好**手动驱动帧状态**（把 frame 当 prop 传），而不是等 CSS 自己跑。
2. 部分组件带 `"use client"` / `useLayoutEffect`，在 SSR 渲染的视频场景里需要先验证。

## 四、一页结论

- **想做「动态 UI」**：可以，boil / draw-on / stamp 就是为这个设计的。
- **想做「视频文件」**：它不产出视频，用录屏或 Remotion 把 React 渲染成帧再编码。
- **建议顺序**：先看 demo 站 → 分支上装 button+card 试一页 → 确认风格后再整套 / 做视频。

## 相关页面

- [[Looseleaf]]
- [[2026-11-04-looseleaf]]
