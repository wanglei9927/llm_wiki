---
tags: [PixelFX, 游戏特效, 程序化生成, 像素风, 开源, Claude Code]
created: 2026-11-12
updated: 2026-11-12
sources: [PixelFX 游戏特效库]
---

# PixelFX

> 开源像素游戏特效库：21 类、244 个特效，每个都是一个无依赖的小 JS 文件；浏览器里可预览/改色/导出精灵图，并附带 Claude Code Skill 用于「找、用、导出、做新特效」

## 简介

PixelFX 把「像素特效」从美术资产变成了**代码**。传统做法是逐帧画序列图或买特效包，改颜色/尺寸/速度都要重做；PixelFX 的每个特效是一个参数化模块（位置、翻转、角度、种子、调色板、光照），运行时代码直接渲染，导出时再转成精灵图。

它的方法来自 Hugo Duprez 的《How to make (good) pixel art effects with Claude》：代码是黏土、相信眼睛、喂参考。仓库是这套方法在「库规模」上的实现，并带一个 Claude Code Skill 让 AI 按同样流程继续做新特效。

## 关键信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/patch-gg/pixelfx |
| 在线画廊 | https://patch-gg.github.io/pixelfx/ |
| Star | 6,926（2026-11-12） |
| 协议 | MIT |
| 技术 | JavaScript / Canvas，无依赖 |
| 特效数 | 244 个，21 类 |
| 近期更新 | 2026-11-09 |
| 数据来源 | [[PixelFX 游戏特效库]] |

## 分类结构

| 分类 | 数量 | 代表 |
|---|---|---|
| moves（连招） | 12 | 射箭、冲刺斩、踏地、火球、圣光打击 |
| fire / explosions / water / ice / lightning | 各 10–12 | 篝火、爆炸、瀑布、冰霜新星、等离子球 |
| sci-fi / melee / impacts / projectiles | 各 11–13 | EMP、利爪、暴击、追踪导弹 |
| spawn & death / arcane / holy / shadow | 各 10–12 | 金币掉落、奥术光束、治疗环、黑洞 |
| status / nature / weather / ui | 各 12–13 | 燃烧、毒云、极光、成就弹窗 |
| pickups / transitions / critters | 各 10–12 | 宝箱、转场擦除、蝙蝠群 |

## 使用方式

1. **浏览器直接试**：画廊里播放、改色、镜像、导出精灵图。
2. **代码接入**：`createFx` + `update` + `draw`，Canvas/Phaser/PixiJS/Kaplay/three.js 均可。
3. **Claude Code Skill**：`/plugin marketplace add patch-gg/pixelfx` 安装后，用自然语言要求找特效、批量导出、改打击感、做新特效。
4. **导出**：按分类导出精灵图，交给 Unity/Godot 等引擎。

## 评价

**优点**：

- 参数化：改色/缩放/变速不需要重做资源，独立游戏省美术外包；
- 体量与分类成体系（244 个、21 类），不是零散 demo；
- 带「表演」的战斗动效（蓄力→命中→收招）比单纯粒子更完整；
- MIT 协议 + Claude Code Skill，对 AI 工作流友好。

**注意点**：

- 纯 2D 像素风，3D 项目不适用（可参考 00gamedevs 的 3D 库）；
- 代码接入需要一点 Canvas/游戏循环基础；
- 特效风格统一为像素，非像素项目需要二次调整。

## 不同素材中的观点

- **[来源: [[PixelFX 游戏特效库]]]** 推文把它当「232 种特效」传播，仓库实际已增长到 244 种并新增了 Claude Code Skill；真正的长期价值不是数量，而是「参数化 + 可导出 + AI 可继续生成」这套工作流。

## 相关页面

- [[PixelFX 游戏特效库]]
- [[工具集]]
- [[AI编程开发]]
