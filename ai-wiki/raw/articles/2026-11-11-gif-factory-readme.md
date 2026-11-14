# GIF 工厂（gif-factory）仓库文档摘录

- 仓库：https://github.com/WoYun520/gif-factory
- 抓取时间：2026-11-11，默认分支 main
- 说明：README、GUIDE、根 SKILL、两个子 SKILL 原文摘录

---

## README.md

# GIF 工厂

把这句话发给 Codex 安装：

> 帮我安装 GIF 工厂：[https://github.com/WoYun520/gif-factory](https://github.com/WoYun520/gif-factory)

安装 Skill 是加入制作说明和脚本；运行时需要的工具按功能分别准备，见[需要装什么](GUIDE.md#需要装什么)。

装好后，给一张图、一段文字，或直接说想做什么。角色图、场景图、片名、字稿和配乐都可以自己提供，缺的部分再一起补。

[表情包](#stickers) · [光栅变画卡](#cards-transforms) · [动态海报](#posters-type) · [动态签名](#dynamic-signatures) · [电影片头](#cinematic-title-lettering) · [动态绘本](#storybooks) · [品牌短片](#brand-films)

[分类说明](styles/README.md) · [完整作品库](GALLERY.md) · [使用指南](GUIDE.md) · [下载项目](https://github.com/WoYun520/gif-factory/archive/refs/heads/main.zip)

## 仓库里有哪些 Skill

一般安装 GIF 工厂总入口即可，直接说需求。如果只用某个功能，也可以让 Codex 单独安装对应的 Skill 文件夹。

| Skill | 能做什么 | 说明 |
| --- | --- | --- |
| GIF 工厂总入口 | 根据需求选择表情包、卡片、海报、签名、片头、绘本或品牌短片的做法 | [查看](SKILL.md) |
| 动态签名 | 设计名字和意象，再做快写、停顿、慢收锋的动画 | [查看](skills/dynamic-art-signature/SKILL.md) |
| 电影片头 | 40 种字形可选，可以设计字、配场景，也可以用你提供的素材 | [查看](skills/cinematic-title-lettering/SKILL.md) |
| 动态绘本 | 让插画做完一个动作，再翻到下一页，能做横屏或竖屏 | [查看](skills/compact-storybook/SKILL.md) |

<a id="stickers"></a>
<a id="表情包展厅"></a>

## 表情包

可以做像素、插画、真人、宠物和粘土角色。既能轻轻点头、摇摆，也能让角色完整做完挥手、行礼等动作。

<table>
<tr>
<td align="center"><a href="styles/pixel-light/STYLE.md"><img src="docs/previews/pixel-light.gif" alt="像素表情包" width="180"></a><br>像素</td>
<td align="center"><a href="styles/illustrated-actions/STYLE.md"><img src="docs/previews/illustrated-actions.gif" alt="插画角色动作" width="180"></a><br>插画</td>
<td align="center"><a href="styles/photo-pets/STYLE.md"><img src="docs/previews/photo-pets.gif" alt="宠物表情包" width="180"></a><br>宠物</td>
</tr>
</table>

<a id="pixel-games"></a>
<a id="illustration-anime"></a>
<a id="people-pets"></a>
<a id="materials-mascots"></a>

[像素轻动效](styles/pixel-light/STYLE.md) · [像素完整动作](styles/pixel-actions/STYLE.md) · [插画](styles/illustrated-actions/STYLE.md) · [真人](styles/photo-people/STYLE.md) · [宠物](styles/photo-pets/STYLE.md) · [粘土吉祥物](styles/clay-mascot/STYLE.md) · [全部案例](GALLERY.md#表情包展厅)

> 用这张角色图做 12 张中文表情包，每张表情和姿势不同，加轻微点头或摇摆，文字用我给的这组台词。

<a id="cards-transforms"></a>
<a id="电子光栅卡展厅"></a>

## 光栅变画卡

让一张卡片在两种样子之间切换，比如人物与面罩、日常与变身、产品的两种配色。

<a href="styles/lenticular/STYLE.md"><img src="docs/previews/lenticular.gif" alt="光栅变画卡" width="240"></a>

[看做法](styles/lenticular/STYLE.md) · [全部案例](GALLERY.md#电子光栅卡展厅)

> 用这两张图做一张变画卡，来回切换两种状态，标题保持不动。

<a id="posters-type"></a>
<a id="动态海报展厅"></a>

## 动态海报

可以保留原画，让人物和文字一起变化；也可以把人物、背景和大字重新设计成一张完整海报。

<table>
<tr>
<td align="center"><a href="styles/type-linked/STYLE.md"><img src="docs/previews/type-linked.gif" alt="保留原画，人物和字体一起动" width="240"></a><br>保留原画，字体联动</td>
<td align="center"><a href="styles/comic-fusion/STYLE.md"><img src="docs/previews/comic-fusion.gif" alt="人物背景和文字一起设计的漫画海报" width="240"></a><br>人物、背景和字一起设计</td>
</tr>
</table>

[字体联动](styles/type-linked/STYLE.md) · [漫画印刷风格](styles/comic-fusion/STYLE.md) · [全部案例](GALLERY.md#动态海报展厅)

> 用这个角色做一张动态宣传海报，人物从安静切到登场，大字一起展开，日期和地点固定。

<a id="dynamic-signatures"></a>

## 动态签名

把名字、意象和乐器融进同一组笔画，再做快写、停顿和慢收锋。下面这组把竹笛、竖琴、古琴等乐器写进字里，配合粒子成字。

<a href="skills/dynamic-art-signature/assets/media/instrument-semantic/Instrument_Semantic_Nine_Grid.mp4"><img src="docs/previews/dynamic-signatures-instruments.gif" alt="乐器入字与粒子成字动态签名九宫格" width="560"></a>

[看原版视频](skills/dynamic-art-signature/assets/media/instrument-semantic/Instrument_Semantic_Nine_Grid.mp4) · [看做法](styles/dynamic-signatures/STYLE.md) · [中英文案例](examples/dynamic-signatures/README.md) · [乐器入字与粒子成字](skills/dynamic-art-signature/references/instrument-semantic.md) · [Skill](skills/dynamic-art-signature/SKILL.md)

> 做一款「卧云间＋竹笛＋月白到浅青渐变」的动态签名，让乐器融进笔画，沿用仓库的快写和慢收锋节奏。

<a id="cinematic-title-lettering"></a>

## 电影片头

40 种字的风格，每种都有完整片头图。选喜欢的编号，换成你的片名；字和场景一起设计。场景图、片名文案和现成字稿都可以自己提供。

<a href="skills/cinematic-title-lettering/references/style-catalog.md"><img src="skills/cinematic-title-lettering/assets/style-catalog/selected/F13.png" alt="电影片头字形与场景案例" width="640"></a>

[40 种字形与原图](skills/cinematic-title-lettering/references/style-catalog.md) · [五种排法](skills/cinematic-title-lettering/references/layout-recipes.md) · [三联图](skills/cinematic-title-lettering/references/promo-triptychs.md) · [Skill](skills/cinematic-title-lettering/SKILL.md)

> 用我提供的风景图和片名，按 F13 粉笔拙块做一张横向片头，字写得有点特别。

<a id="storybooks"></a>

## 动态绘本

让插画做完一个小动作，停一下，再翻页。可以做独立动画，也可以做成横屏翻书或适合手机看的竖屏书页。

<a href="examples/storybooks/tea-party/realbook-writing.mp4"><img src="examples/storybooks/tea-party/realbook-writing-preview.gif" alt="动态绘本横屏翻书与正文书写" width="640"></a>

[看做法](styles/compact-storybook/STYLE.md) · [横屏和竖屏完整案例](examples/storybooks/tea-party/README.md) · [Skill](skills/compact-storybook/SKILL.md)

> 把这个故事做成动态绘本，一页完成一个动作，配上正文和音乐，先做一页小样。

<a id="brand-films"></a>
<a id="品牌宣传片展厅"></a>

## 品牌短片

让吉祥物和产品一起演一个小故事，比如拿起面包、装进包装、露出店名。可以用自己的角色、产品图和品牌素材。

<a href="examples/brand-films/manman-bakery/film.mp4"><img src="examples/brand-films/manman-bakery/preview.gif" alt="慢慢面包店品牌短片" width="640"></a>

[看案例和工程](examples/brand-films/manman-bakery/README.md) · [制作方法](references/brand-film.md)

> 用这套吉祥物和产品图做一条 15 秒品牌短片，让角色亲手把产品装进包装，给我成片和可修改的工程。

## 使用说明

想换台词、配色、画风、尺寸或动作，直接说。已经选好的稿子和要求会继续沿用。完整系列和试作的说明放在[作品库](GALLERY.md)，具体怎么提需求看[使用指南](GUIDE.md)。

## 开源许可

制作脚本与 Skill 文档采用 [MIT](LICENSE)。动态海报的角色与参考设计语言不随代码转授商业权利，见[案例说明](examples/dynamic-posters/p5-integrated/README.md)。电子光栅卡中的角色 IP、网络照片与他人插画不随代码一并授予 MIT 权利，出处及使用边界见[案例来源说明](examples/lenticular-cards/README.md)。

第三方配乐和字体按各自许可使用；面包店案例的来源与署名见 [CREDITS](examples/brand-films/manman-bakery/CREDITS.md)。


---

## SKILL.md（总入口）

---
name: pixel-gif-sticker-pack
description: 根据图片或文字制作角色表情包、光栅变画卡、动态海报、动态签名、电影片头、动态绘本和品牌短片。按用途选择做法，保留用户已定的画风、素材和要求，导出并检查实际作品。
---

# GIF 工厂

接续用户最新的素材、数量、文字、尺寸和已选方案。角色图、场景图、片名、定稿字稿和配乐都可以由用户提供；先分清直接使用的素材与风格参考，只补缺少的部分。沿用已认可的选择，不因换用途重做整个项目。对外叫 GIF 工厂，调用名保留 `$pixel-gif-sticker-pack`。

## 先按用途找做法

在[分类说明](styles/README.md)看效果，按需阅读对应说明。七类用途平等，不把画风当成用途；[作品库](GALLERY.md)保留案例状态，待确认的版本不能当成已认可模板。

| 要做什么 | 看哪里 |
| --- | --- |
| 表情包 | 下文，以及[外观](references/appearance.md)、[轻动效](references/light-motion.md) |
| 光栅变画卡 | [双状态变画](references/lenticular.md) |
| 动态海报 | [海报制作](references/dynamic-posters.md) |
| 动态签名 | [签名入口](references/dynamic-signatures.md)、[独立 Skill](skills/dynamic-art-signature/SKILL.md) |
| 电影片头 | [独立 Skill](skills/cinematic-title-lettering/SKILL.md)、[40 种字形原图](skills/cinematic-title-lettering/references/style-catalog.md) |
| 动态绘本 | [绘本入口](references/storybook.md)、[独立 Skill](skills/compact-storybook/SKILL.md) |
| 品牌短片 | [短片制作](references/brand-film.md) |

卡片先检查两图的角度、眼线、下巴和肩线，默认 480×720、6 秒、标题固定。海报先区分保留原画加动态字，还是连人物、背景和字一起重新设计；现有漫画海报是两幅完整状态切换，不能说成逐字独立动画。游戏界面的 GIF 演示也不等于可玩的游戏。

签名让意象进入笔画，保留两段快写、约一秒停顿和慢收锋，普通款用平面墨迹。电影片头把字形、排法、场景一起设计，默认横向；提供的原图和定稿字稿按要求沿用。绘本默认固定画面、实际 6fps、每页约三秒、一个动作加结果停留，前后页道具要接得上。品牌短片交付视频和所需工程，不套表情包的方形循环规格。具体参数以各自说明和用户要求为准。

## 表情包先分清画风和动作

像素画用清楚的像素块和阶梯边缘，默认 320×320，缩放保持像素边缘。插画、真人和宠物默认高清 512×512；照片保留本人或宠物的特征、光线和衣着，不自行美颜或改成二次元。GLB 模型先渲染能看清脸和特征的正面或四分之三侧面。高清尺寸不保证动作和五官一致。

- **轻动效**：每张有不同的表情或姿势，再加小幅点头、弹跳、摇摆，字幕固定。用 `scripts/export_pack.py`，读[轻动效](references/light-motion.md)。不能只给同一张脸换很多句字幕。
- **完整动作**：用连续姿态让脸、头、肩、躯干、相关手脚和衣发一起配合。像素用 `scripts/export_pixel_actions.py` 和[像素动作](references/pixel-actions.md)；插画或照片用 `scripts/export_keyframes.py` 和[高清动作](references/keyframes.md)。不能用整张图变形或只转手臂代替完整动作。

新角色或动作先内部做一个代表样片检查；用户已授权整套就继续，不额外设置逐张确认。延续案例时实际查看对应版本和[样片状态](references/appearance.md#sample-status)，不把废弃实验当模板，也不默认各种组合都有同样可靠的现成导出方法。

## 做素材和组合

每张先有一句聊天用语、一个看得见的姿态或道具、一个动作重点。用可用的图像生成工具做新素材；常用 4×4 透明角色图集，格间留足空白，指定顺序、身份特征和一致取景，文字在组合时另加。

打开实际图集逐格核对，按可见姿态配字幕，修正错格、缺格、穿帮和裁断的手发。数量按有效作品计算，不按生成次数计算。默认不把私人参考截图和原图放进分享压缩包。

看[清晰度说明](references/clarity.md)判断源图细节，放大旧像素图不能补回细节。连续动作和返修按[画面稳定检查](references/stability.md)看实际解码帧、原尺寸脸部、正常播放及首尾接缝；有问题修该帧和邻帧，不能靠模糊、降帧或偷换成轻动效遮掩。

## 导出和交付

普通表情包用 Python 3、Pillow；运行脚本 `--help`，按[素材清单格式](references/manifest.md)准备图集、格位、动作和本地可用字体。`export_pack.py` 默认高清；明确像素画时用 `--render-style pixel`，命令行优先于素材清单。

`export_pack.py` 和 `export_keyframes.py` 写 GIF、ZIP 时不需要 FFmpeg；加 `--preview` 制作 MP4 预览时才需要。其他用途的依赖见各自说明和[使用指南](GUIDE.md#需要装什么)。先检查当前环境，只补所选功能需要的工具；本仓库不自带生图模型或付费服务。

每张交付独立循环 GIF，成组加 ZIP。默认约两秒；完整动作按实际动作安排，明确的平台限制优先。需要视频预览时，从最终 GIF 的实际帧合成；高清默认无标题网格，`--preview-layout chapters` 可加分类标题。静态拼图须标为静态预览。

核对实际数量、字幕不重复、可见动作、帧延时、循环、透明度、安全边距、ZIP 内容和视频解码，再看各类正常播放。技术通过、视觉自查和用户认可分开记录，不宣称所有平台兼容或所有案例稳定。

---

## GUIDE.md

# GIF 工厂 · 使用指南

把这句话发给 Codex 安装：

> 帮我安装 GIF 工厂：[https://github.com/WoYun520/gif-factory](https://github.com/WoYun520/gif-factory)

[返回首页](README.md) · [分类说明](styles/README.md) · [完整作品库](GALLERY.md)

## 先说想做什么

| 类别 | 可以做什么 | 看例子 |
| --- | --- | --- |
| 表情包 | 像素、插画、真人、宠物、粘土角色的小动作或完整动作 | [查看](GALLERY.md#表情包展厅) |
| 光栅变画卡 | 两种样子在同一张卡片里切换 | [查看](GALLERY.md#电子光栅卡展厅) |
| 动态海报 | 人物和大字一起变化，或整张海报一起设计 | [查看](GALLERY.md#动态海报展厅) |
| 动态签名 | 名字、意象、渐变色和书写动画 | [查看](GALLERY.md#动态艺术签名) |
| 电影片头 | 原创片名字形和带场景的片头图 | [查看](skills/cinematic-title-lettering/references/style-catalog.md) |
| 动态绘本 | 插画动起来，再一页页讲故事 | [查看](GALLERY.md#动态绘本展厅) |
| 品牌短片 | 角色带着产品和包装演一段小故事 | [查看](GALLERY.md#品牌宣传片展厅) |

## 你可以提供什么

角色图、场景图、片名、台词、已经设计好的字稿、品牌素材和配乐，都可以自己提供，也可以只给其中几项。

说清楚哪些要直接使用、哪些只是参考。已有定稿按你的要求保留，缺的部分再补；需要改写、换画风或换场景，直接说明。

数量、尺寸、时长、背景、台词有要求，也一起说。拿不准时可以先做一张或一页小样，选定后接着做。

## 可以直接这样说

### 表情包

> 用这张角色图做 12 张中文表情包，插画风，每张有不同表情和姿势，轻轻点头或摇摆，台词用我提供的。

想要完整动作，可以说“先蓄力，再举拳欢呼，头、身体、手一起动”。想要像素风、真人或宠物，也直接说。

### 光栅变画卡

> 用这两张图做一张变画卡，6 秒循环，标题固定。先检查人物角度、眼睛和下巴能不能对上。

### 动态海报

> 保留这张插画，让人物从日常切到开唱，大字一起展开，日期和地点不动。

也可以说“人物、背景和字一起重新设计，做成漫画印刷的感觉”。

### 动态签名

> 做一款「卧云间＋竹叶＋月白到浅青渐变」的动态签名。上方快划，停约一秒，下方快写，最后慢收锋。

要换字体、意象或颜色，直接说明；只改字体时可以保留原来的排布和书写节奏。

### 电影片头

> 用我提供的照片和片名，按 F13 的写法做一张横向片头，字和场景一起设计。

也可以直接提供字稿，只做排版融合。[40 种字形](skills/cinematic-title-lettering/references/style-catalog.md)里可以按编号选。

### 动态绘本

> 把这个故事做成动态绘本，一页完成一个动作，动作做完停一下再翻页。要正文书写和配乐，先做一页看看。

可以指定横屏翻书、竖屏书页，或只要独立页面动画。

### 品牌短片

> 用这套吉祥物和产品图做一条 15 秒品牌短片。角色亲手把产品装进包装，最后露出店名。给我成片和可修改的工程。

## 做完会拿到什么

| 类别 | 常用交付 |
| --- | --- |
| 表情包、光栅卡、动态海报 | 独立循环 GIF；成组时加总览和压缩包 |
| 动态签名 | MP4、循环 GIF；需要时加九宫格 |
| 电影片头 | 独立图片；成组时加总览和压缩包；动画另按要求制作 |
| 动态绘本 | 整本或独立页 MP4，横屏和竖屏按需要做 |
| 品牌短片 | 视频、可修改的工程和必要素材说明 |

## 想改效果时

直接说具体哪里不对，比如“手动了但身体没动”“字太规整”“照片不要重画”“收尾再慢一点”。改动作时可以保留画风，改字体时也可以保留排版和节奏。

制作时会检查实际文件和播放效果。某张试作还没选定，会在案例说明里标清楚。

## 想单独使用某个 Skill

[GIF 工厂总入口](SKILL.md) · [动态签名](skills/dynamic-art-signature/SKILL.md) · [电影片头](skills/cinematic-title-lettering/SKILL.md) · [动态绘本](skills/compact-storybook/SKILL.md)

需要能生成图片、运行制作脚本的环境。自己运行时，从对应 Skill 和制作说明查依赖、素材和命令。

## 需要装什么

安装 Skill 是把制作说明和脚本交给 Codex，不代表所有制作工具都已经装好。制作前先检查当前环境，只补本次用得到的工具。

| 做什么 | 需要什么 |
| --- | --- |
| 查看案例、读说明 | 不需要 FFmpeg |
| 静态片名、字稿和片头图 | 需要可用的图像生成或编辑工具；静态图本身不需要 FFmpeg |
| 普通表情包 GIF、ZIP | `export_pack.py`、`export_keyframes.py` 用 Python 3 和 Pillow；仅导出 GIF、ZIP 不需要 FFmpeg |
| 上述表情包的 MP4 预览 | 加 `--preview` 时需要 FFmpeg，把最终 GIF 合成可播放的视频 |
| 动态签名和签名九宫格 | Python 3、Pillow、NumPy、SciPy，以及 FFmpeg、ffprobe；具体命令见签名 Skill |
| 动态绘本视频检查 | 检查脚本用 Python 3、ffprobe；抽取检查帧时用 FFmpeg。制作和渲染工具另按绘本说明准备 |
| 变画卡、动态海报、品牌短片 | 按所选做法准备图像与视频工具，详见对应制作说明，不统一套用表情包依赖 |

FFmpeg 是本地处理视频和声音的工具，这里用于合成 MP4、转换 GIF、拼动态总览和抽帧；ffprobe 用来读取尺寸、帧率和时长。使用这些本地工具不需要付费 API。仓库不自带生图模型，调用外部生图或其他服务时，额度和费用按所用服务计算。

---

## skills/cinematic-title-lettering/SKILL.md

---
name: cinematic-title-lettering
description: 设计电影片名和横向片头图，有 40 种字形风格可选。适合手写片名、换片名、字与场景一起设计、成组片头，以及三幅竖列宣传图。
---

# 电影片头字设计

根据片名和故事的感觉设计字。用户已经定下的文案、图片和字稿要保留；允许改的部分再重新搭配。

场景图、片名文案和现成字稿都可以由用户提供，也可以只提供其中一部分。先分清哪些是要直接使用的素材、哪些只是风格参考：提供文案就按原文设计字；提供定稿字稿就直接做排版和融合；提供成品要用的场景图就沿用原图。只补缺少的部分，用户要求改写、重画或换景时再改。

## 按任务看说明

- 选风格、指定 F 编号、做多款不同的字：看[40 种字形](references/style-catalog.md)，实际打开对应原图，不能只读分类名字。延续某款时，生图要附上这张原图，并说明参考的是字的写法还是排法；用户明确要求只用文字时按要求做。
- 要带场景的完整片头：看[片头怎么做](references/film-title-frames.md)。默认横向宽画面，用户有尺寸要求就按要求。
- 要按参考图换字或试排版：看[五种排法](references/layout-recipes.md)。
- 要三幅竖着排的宣传图：看[三联图做法](references/promo-triptychs.md)。
- 要动态片头：先定画面，再完成要求的动画和视频。

## 做图时记住

需要新设计字稿时，先写清楚：哪个字最大、怎么断行、哪一笔有特点、整组字放在场景哪里。已有定稿字稿则围绕它安排场景和位置，按用户要求调整。

1. 把片名当一整组字设计，再写每个字。字可以歪、挤、断开或拖长，保留手写时的停顿，同时让每个字认得出来。用户要原创字形时，系统字体加拉伸和做旧不能代替字稿设计。
2. 多款之间要有写法上的区别。改笔画、粗细、转角和字里的空隙，不能只换颜色和断行。
3. 字和场景一起设计。先看画面哪里能放字，保住人物、道路、光线等重要位置。
4. 元素从字里长出来。比如把收笔接成水线、让竖笔带出枝节，少用旁边独立的小图标。
5. 英文放进字间合适的空位，大小和颜色跟着主片名走；没有要求可以不加。
6. 把新图和选中的案例并排看：笔画的粗细、转折和整组字的样子有没有延续，字与场景是否一起设计。再逐字检查，缩小看整体。做一组时先检查两款差别明显的，再继续其余款；这是制作中的自查，不额外要求用户逐张确认。交付独立原图，成组时加总览和压缩包，并保存提示词。

延续旧稿时先核对编号和原图。F11–F20 是已选的十款原版，继续使用原稿；其他案例的状态见[分类记录](assets/style-catalog/catalog.json)。记录里也保留了相近写法的区别，按需要查看。

---

## skills/dynamic-art-signature/SKILL.md

---
name: dynamic-art-signature
description: 将中英文名字与意象融成手写艺术签名，制作两段快写、停顿和慢收锋的 MP4、GIF，也可做动态九宫格。适合新签名、书体变化、乐器入字和书写节奏修改，不用于文件签署。
---

# 动态艺术签名

保留准确名字、意象、配色和最新认可稿。字稿、动画、交付版式分开处理，只改速度时不换字。延续旧款先实际打开[案例](references/examples.md)，新稿使用可用的图像生成工具。

## 先把字写出特点

按[设计说明](references/design.md)，让物体进入笔画、轮廓或字内留白，不能只是旁边放图标。保持名字可读，用平面手写墨迹、提按粗细和尖收笔；不默认加金属、立体、发光或粉笔质感。

上方意象和下方名字、长尾是两个独立书写组，靠近处留小空隙。相连时先修稿或明确分层遮罩，不能把连在一起的成品用横向擦除切成两半。某例把眼睛藏进字母的做法不是所有名字都要照搬。

中文默认草书，用户指定行书、瘦金体等书体就按要求；看[中文字与两三字布局](references/chinese.md)。换书体时保留签名构图、意象、配色和两段书写节奏，三字不等于必须写三段，也不自动改成逐笔教学演示。

用户要乐器入字或字意粒子时，看[乐器案例与分层方法](references/instrument-semantic.md)：琴弦、管身、音孔等共用目标字的笔画，粒子按字意运动，落到目标笔画后凝成字。普通款不自动加粒子。

## 再做书写节奏

默认不透明深灰底、960×640、4 秒循环，MP4 60fps、GIF 25fps。明确要求可改。

| 阶段 | 默认节奏 |
| --- | --- |
| 干净空白 | 0.30 秒 |
| 上方一笔 | 0.14 秒，果断加速 |
| 停顿 | 上方写完后 1.02 秒 |
| 下方开始 | 第 1.46 秒 |
| 主体快写 | 约 0.16–0.18 秒 |
| 末锋慢收 | 再用约 0.65–0.72 秒，逐渐减速 |
| 完成与循环 | 保留完整稿，最后 0.30 秒只淡出墨迹 |

未写到的地方必须干净，不能垫一张暗淡的完整字稿。普通款默认无抖动、回弹、光效和声音。尾部转向就用沿真实曲线的路径，不能用从左到右的擦除冒充往回写；简单单向末锋可用减速显露，但要实际看起来像书写。

## 工具与检查

看[渲染配置](references/rendering.md)。脚本需要 Python 3、Pillow、NumPy、SciPy、FFmpeg 和 ffprobe；FFmpeg 负责本地视频编码、GIF 转换，ffprobe 读取视频参数。

```bash
python3 scripts/render_signature.py inspect --image assets/examples/Aster.png
python3 scripts/render_signature.py render --config assets/examples/Aster.json --out /absolute/output/aster
python3 scripts/audit_video.py /absolute/output/aster.mp4
```

每张图重新检查连通区域编号和阈值，不盲用旧稿编号。主体与长尾的遮罩要互斥，整条尾巴留给末锋阶段，避免出现两遍或接缝。先看上方完成后的停顿、主笔到末锋的交接、慢收锋和循环重置，再扩展。

未来笔画提前出现就去掉底层完整稿；上下串笔先修连接处；机械描字就加快主体，把减速留给末锋。检查实际中间帧和正常播放，静态封面不能算完成动画，技术检查不能代替视觉判断。

## 交付

交付 MP4 和循环 GIF，封面只作补充。九宫格要有九个不同的名字、意象或配色方案，用九个实际成片运行 `scripts/make_grid.py`，不能交静态拼图。需要时加合集 ZIP、配置和可复现素材，私人参考截图不放进公开包。

作为 GIF 工厂的一部分时保留总入口和其他用途，不用签名模块覆盖整个仓库。
