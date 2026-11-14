---
tags: [AI, 图像生成, GIF, 动效设计, Codex, Skill, 开源]
created: 2026-11-11
updated: 2026-11-11
source_path: raw/articles/2026-11-11-gif-factory-readme.md
---

# GIF 工厂：开源动效 Skill（Codex 生态）

> 推特上热传的「GPT image 大字标题设计」技能本体：一个把「素材/文案 → 风格选择 → 生成素材 → Python 脚本合成 → 检查交付」串成流水线的开源技能包，主推电影片头 40 种字形与动态签名 2.0

## 基本信息

| 项目 | 内容 |
|---|---|
| 仓库 | https://github.com/WoYun520/gif-factory |
| 作者 | 卧云（@Leviwoyun / GitHub: WoYun520） |
| Star / Fork | 1,223 / 141（2026-11-11 抓取） |
| License | MIT |
| 语言 | Python |
| 规模 | 769 个文件；4 个 SKILL.md（总入口 + 3 个子技能） |
| 创建 / 最近推送 | 2026-11-05 / 2026-11-11（仍在高频更新） |
| 安装方式 | 把仓库链接发给 Codex 说「帮我安装 GIF 工厂」；本质是交付「制作说明 + 脚本」 |
| 原始素材 | raw/articles/2026-11-11-gif-factory-readme.md |

## 核心观点

1. **不是单个技能，而是一个「动效工厂」**：1 个总入口（`pixel-gif-sticker-pack`）+ 3 个可独立安装的子技能（动态签名、电影片头、动态绘本）+ 7 类用途（表情包、光栅变画卡、动态海报、动态签名、电影片头、动态绘本、品牌短片）。

2. **推特主推的两个点**：①「电影片头」技能提供 **F01–F40 共 40 种字形**（细字手写、毛笔排刷、连笔涂鸦等），按编号挑风格再给片名；②「动态签名」2.0 支持乐器入字、字意粒子，按「两段快写 + 约 1 秒停顿 + 慢收锋」的节奏生成 MP4/GIF。

3. **把动效制作拆成可检查的流水线**：先分清「直接使用的素材」与「风格参考」→ 按用途选做法 → 生成素材（外部生图工具）→ Python 脚本导出 GIF/ZIP/MP4 → 按清单检查（实际解码帧、首尾接缝、循环、透明度、安全边距、ZIP 内容）。

4. **质量观很工程化**：强调「技术通过、视觉自查、用户认可分开记录」；不允许靠模糊、降帧或偷换成轻动效来遮掩问题；静态拼图不能冒充动画。

5. **边界清晰、依赖按需**：仓库**不自带生图模型**，也不含付费服务；基础表情包只需 Python 3 + Pillow，视频/签名才需要 FFmpeg/ffprobe、NumPy/SciPy；安装 Skill 不等于装好工具。

## 实操内容保留

### 技能一览

| 技能 | 能做什么 | 入口 |
|---|---|---|
| GIF 工厂总入口 | 按需求选择七类用途的做法 | `SKILL.md` |
| 动态签名 | 名字 + 意象合成手写签名，两段快写/停顿/慢收锋；支持乐器入字、粒子成字 | `skills/dynamic-art-signature/SKILL.md` |
| 电影片头 | 40 种字形（F01–F40）设计片名，字与场景一起设计，也可用现成字稿 | `skills/cinematic-title-lettering/SKILL.md` |
| 动态绘本 | 插画完成一个动作再翻页，横屏/竖屏 | `skills/compact-storybook/SKILL.md` |

### 目录结构（关键部分）

```
gif-factory/
├── SKILL.md                     # 总入口（name: pixel-gif-sticker-pack）
├── GUIDE.md                     # 使用指南 + 依赖矩阵
├── styles/                      # 7 类用途的 STYLE.md 与 catalog.json
├── skills/
│   ├── cinematic-title-lettering/   # 40 字形 + references/style-catalog.md + scripts/render_*
│   ├── dynamic-art-signature/       # 签名脚本（render_signature / audit_video / make_grid）
│   └── compact-storybook/
├── scripts/                     # export_pack.py / export_keyframes.py / export_lenticular.py / review_gif.py
├── tests/                       # GIF 导出与检查的测试
└── assets/                      # 案例图与预览
```

### 常用命令

```bash
# 表情包：读取素材清单导出 GIF/ZIP（默认高清；像素风加 --render-style pixel）
python3 scripts/export_pack.py --help

# 完整动作：插画/照片的关键帧导出
python3 scripts/export_keyframes.py --help

# 动态签名：检查 → 渲染 → 审计
python3 skills/dynamic-art-signature/scripts/render_signature.py inspect --image assets/examples/Aster.png
python3 skills/dynamic-art-signature/scripts/render_signature.py render --config assets/examples/Aster.json --out /absolute/output/aster
python3 skills/dynamic-art-signature/scripts/audit_video.py /absolute/output/aster.mp4

# 九宫格（九个实际成片）
python3 skills/dynamic-art-signature/scripts/make_grid.py
```

### 依赖矩阵（摘自 GUIDE.md）

| 做什么 | 需要什么 |
|---|---|
| 查看案例、读说明 | 不需要 FFmpeg |
| 静态片名/片头图 | 可用的图像生成或编辑工具 |
| 普通表情包 GIF/ZIP | Python 3 + Pillow（仅导出 GIF 不需要 FFmpeg） |
| 表情包 MP4 预览 | 加 `--preview` 时需要 FFmpeg |
| 动态签名/九宫格 | Python 3、Pillow、NumPy、SciPy、FFmpeg、ffprobe |
| 绘本视频检查 | ffprobe；抽帧用 FFmpeg |

### 默认交付规格

- 表情包：像素 320×320 / 高清 512×512；成组加 ZIP
- 光栅卡：480×720、6 秒循环、标题固定
- 动态签名：960×640、4 秒循环；MP4 60fps / GIF 25fps
- 动态绘本：固定画面、实际 6fps、每页约 3 秒

## 原文精彩摘录

> 安装 Skill 是加入制作说明和脚本；运行时需要的工具按功能分别准备。（README）

> 40 种字体与排版风格，配上好看的风景图直接发小红书！（推文原文）

> 签名让意象进入笔画，保留两段快写、约一秒停顿和慢收锋，普通款用平面墨迹。（SKILL.md）

> 技术通过、视觉自查和用户认可分开记录，不宣称所有平台兼容或所有案例稳定。（SKILL.md）

> 静态封面不能算完成动画，技术检查不能代替视觉判断。（动态签名 SKILL.md）

## 与 DSH 的适配

- **技能格式兼容**：`SKILL.md` 带 YAML frontmatter（`name` + `description`），符合 DSH skill-filesystem 的加载格式；可手动放到 `~/.dsh/skills/` 或项目 `.dsh/skills/`。
- **需要外部生图**：DSH 本身不提供图像生成，实际使用要接外部生图工具/服务；脚本部分（Pillow/FFmpeg）可本地跑。
- **适合谁**：做小红书封面、表情包、动效签名、片头图的创作者；纯文本用户价值有限。
- **风险点**：仓库高频更新（创建 6 天即 1.2k star），文档与脚本可能快速变化，使用前建议先看 `GUIDE.md` 的依赖表。

## 关键概念

- [[GIF 工厂]]：本页对应的实体页（技能构成、工作流、依赖）
- [[AI编程开发]]：编程开发主题
- [[DeepSeek Harness]]：DSH 插件/技能体系

## 相关页面

- [[GIF 工厂]]
- [[DeepSeek Harness]]
- [[AI编程开发]]

## 补充素材

- `raw/tweets/2026-11-11-gif-factory-tweet.md`
