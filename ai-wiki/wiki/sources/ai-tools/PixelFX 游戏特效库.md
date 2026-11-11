---
tags: [PixelFX, 游戏特效, 程序化生成, 开源项目, 游戏开发, 像素风, Claude Code]
created: 2026-11-02
updated: 2026-11-12
source_path: raw/tweets/PixelFX 游戏特效库.md
---

# PixelFX：244 种代码化游戏特效（含 Claude Code Skill）

> 代码画出来的像素游戏特效库：21 类、244 个特效，每个都是一个小 JS 文件；网页可预览/改色/导出精灵图，还带一个 Claude Code Skill 教你（或 AI）继续做新的

## 基本信息

| 项目 | 内容 |
|---|---|
| 来源 | X 帖子 @Tao_Builds（2026-10-31）→ 仓库补充核对（2026-11-12） |
| 原文链接 | https://x.com/tao_builds/status/2116414245097423359 |
| GitHub | https://github.com/patch-gg/pixelfx |
| Star / Fork | 6,926 / 901（2026-11-12） |
| License | MIT |
| 语言 | JavaScript（Canvas，无依赖） |
| 特效数 | 244 个，21 个分类；最近推送 2026-11-09 |
| 在线画廊 | https://patch-gg.github.io/pixelfx/ |
| 完整目录 | docs/CATALOG.md |
| 补充素材 | raw/articles/2026-11-12-pixelfx-readme.md（README 全文） |

## 核心观点

1. **244 个特效，每个都是代码**：不是视频/序列帧素材，而是 `src/fx/<分类>/<名称>.js` 的小模块；Canvas、Phaser、PixiJS、Kaplay、three.js 都能直接用，无依赖。

2. **21 个分类成体系**：moves（12 连招）、fire/explosions/water/ice/lightning/sci-fi/melee/impacts/projectiles/spawn & death/arcane/holy/shadow/status/nature/weather/ui/pickups/transitions/critters。

3. **带「表演」的战斗特效**：涉及角色的特效会做蓄力→释放→命中冻结→收招，12 个完整招式可串成从起手到收招的攻击；目标还有受击反馈。

4. **参数化 + 可导出**：改色、镜像、调速度/角度/种子/调色板/光照，一键导出精灵图给任何引擎；浏览器就是完整工作流。

5. **Claude Code Skill 是差异化**：`pixelfx` 技能教 Claude Code「找、用、导出、做新特效」，安装方式 `/plugin marketplace add patch-gg/pixelfx` 或把 `skills/pixelfx` 复制到 `~/.claude/skills/`；可以要求「给法师大招加冰霜新星」「做 5 版金币拾取闪光挑最好的 2 版」。

## 实操内容保留

### 在游戏里用（原生 Canvas 示例）

```js
import { createFrame, clearFrame, createFx, composite } from "pixelfx";
import * as frostNova from "pixelfx/fx/ice/frost-nova";

const frame = createFrame(320, 180);
const img = new ImageData(320, 180);
const fx = createFx(frostNova, { x: 160, y: 140 }); // flip / angle / seed / palette / light

function tick(dt) {
  fx.update(dt);
  clearFrame(frame);
  fx.draw(frame, "back"); // 角色后方
}
```

### 安装 Claude Code Skill

```bash
/plugin marketplace add patch-gg/pixelfx
/plugin install pixelfx@pixelfx
# 或：把 skills/pixelfx 复制到 ~/.claude/skills/
```

### 可以直接这样说

- 「给法师的大招加一个冰霜新星」
- 「做 5 版金币拾取闪光，挑最好的 2 版给我」
- 「把 fire 和 explosions 分类导出成 Godot 用的精灵图」
- 「这个受击特效太飘了，做得更有打击感」
- 「给这个法术加蓄力，让敌人有受击反应」

### 资源入口

- 在线画廊：https://patch-gg.github.io/pixelfx/
- 完整目录：docs/CATALOG.md（按分类列出全部 244 个）
- 分类浏览：moves / fire / explosions / water / ice / lightning / sci-fi / melee / impacts / projectiles / spawn & death / arcane / holy / shadow / status / nature / weather / ui / pickups / transitions / critters

## 原文精彩摘录

> 关键是，这些不是视频素材，而是代码画出来的！项目叫 PixelFX。直接打开网页就能看全部特效，还能改颜色、导出精灵图。（原帖 @Tao_Builds）

> 代码画出来的特效最香的一点是参数化：改颜色、调速度、换尺寸都不用重做资源，还能无损缩放。（评论区 @ReignSwords）

> 244 pixel art effects and animations, every one a small piece of code. … Plus a Claude Code skill that makes new ones the way a picky pixel artist would: draft, render, look, refine.（README）

> code is clay, trust your eyes, feed your references.（README，引 Hugo Duprez 方法）

## 关键概念

- [[PixelFX]]：本页对应的实体页（分类结构、使用方式、评价）
- [[工具集]]：知识库工具总览

## 相关页面

- [[PixelFX]]
- [[工具集]]
- [[AI编程开发]]
- [[AI 游戏开发 3 小时 28 万]]
