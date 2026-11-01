---
tags: [yazi, 终端, 文件管理器, Rust, 效率工具]
created: 2026-10-31
updated: 2026-10-31
sources: [2026-10-31-yazi快捷键速查]
---

# yazi

> Rust 编写的终端文件管理器，本机主力文件管理工具，以 vim 风格键位、异步 I/O 和图片/视频预览能力著称。

## 简介

yazi（意为"鸭子"）是一款基于 Rust 的终端文件管理器（TUI），本机于 2026-10-31 安装并配置完成，成为日常文件管理的主力工具。它的核心卖点是：全异步 I/O 架构（文件操作不阻塞界面）、内置图片/视频/PDF 预览、vim 风格键位、以及基于 Lua 的插件系统。官方配套提供 `ya` 命令行工具（用于包管理与插件开发）。项目位于 GitHub sxyazi/yazi，2026 年采用日历化版本号（当前 v26.9.1），发布节奏活跃。

在本机的定位上，yazi 替代了传统的 `ls/cd/mv` 命令行组合与图形文件管理器之间的空档——配合 `y` 包装函数，可以在终端里快速浏览、批量整理文件，退出后 shell 自动跟随到最后浏览的目录，工作流不中断。

## 安装方式

本机采用**官方 deb 包**安装（2026-10-31，v26.9.1）：

```bash
sudo apt install -y /tmp/yazi-x86_64-unknown-linux-gnu.deb
```

选择 deb 而非 snap 或 cargo 编译的理由：Surface Go 3（Pentium Gold 6500Y，2 核）性能有限，cargo 从源码编译耗时过长；官方 deb 附带 bash/zsh 补全，且声明了 9 个推荐依赖会被 apt 一并装齐：ffmpeg（视频缩略图）、7zip（归档预览）、poppler-utils（PDF 预览）、fd-find（文件搜索）、ripgrep（内容搜索）、fzf（模糊跳转）、zoxide（目录跳转）、imagemagick（图像处理）、xsel（剪贴板）。

官方安装文档还提供 APT 仓库方式（`yazi-rs.github.io/builds`，支持 stable/nightly 渠道），适合后续升级追踪。

## 本机配置要点

配置文件位于 `~/.config/yazi/yazi.toml`（v26 起段名为 `[mgr]`，替代旧版的 `[manager]`；配置为合并语义，只写覆盖项，其余继承内置默认）。

针对 Surface Go 3 的低性能调优（2026-10-31）：

- `[mgr]` 段：`linemode = "size"`，文件列表右侧直接显示文件大小，便于清理大文件。
- `[preview]` 段：`image_quality = 60`，降低图片预览质量以减少内存/CPU 占用。
- `[tasks]` 段：`file_workers = 2`、`plugin_workers = 3`、`fetch_workers = 3`、`preload_workers = 1`、`process_workers = 3`、`image_alloc = 268435456`（256MB，默认 512MB）——全面压低并发 worker 数量，避免 2 核低功耗设备上批量操作卡顿。

## shell 集成（y 包装函数）

`~/.bashrc` 末尾追加了官方推荐的 wrapper，启动方式是输入 `y` 而非直接 `yazi`：

```bash
function y() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
	yazi "$@" --cwd-file="$tmp"
	if cwd="$(command cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		builtin cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}
```

原理：yazi 运行时把最后浏览的目录写入临时文件（`--cwd-file`），wrapper 在退出后读取该文件并执行 `cd`。这解决了 TUI 程序无法改变父 shell 工作目录的经典问题，让"浏览文件 → 退出 → 停在目标目录"成为自然工作流。

## 图标显示与终端字体

yazi 的文件/文件夹图标使用 Nerd Font 私有区 Unicode 字符，**普通等宽字体没有这些字形，会渲染成方块乱码**。本机踩坑与解决过程（2026-10-31）：

- Ubuntu 26.04 的 apt 源中没有 Nerd Font 包，需从 ryanoasis/nerd-fonts 官方 GitHub Releases 下载；
- 终端为 Ptyxis（Ubuntu 26.04 默认），其配置是扁平 dconf schema：`org.gnome.Ptyxis use-system-font` 与 `font-name` 键（非嵌套 profile 结构）；
- 关键经验：终端要用标准 **"Nerd Font" 变体**（图标双宽、显示饱满），而不是 "Nerd Font Mono" 变体（图标压成单格、显小）；JetBrainsMono 同字号视觉偏大，**10 号**是平衡点；
- 最终方案：安装 JetBrainsMono Nerd Font（用户级，`~/.local/share/fonts/JetBrainsMonoNF/`），Ptyxis 设为 `"JetBrainsMono Nerd Font" 10`，用户确认观感满意。

## 快捷键体系

完整键位速查见 [[2026-10-31-yazi快捷键速查]]。核心记忆点：

- vim 风格导航：`j/k` 上下、`h/l` 返回/进入、`o/Enter` 打开；
- 组合键前缀机制：`c`（复制路径）、`g`（跳转目录，如 `g h` 回家）、`,`（排序）、`t`（标签页）；
- 搜索依赖外部工具：`s`（fd）、`S`（ripgrep）、`z`（fzf）、`Z`（zoxide），本机已全部装齐；
- 安全分层：`d` 进回收站（`g t` 可打开回收站找回），`D` 永久删除；
- 键位权威来源：界面内按 `~` 或 `F1` 打开实时帮助。

## 不同素材中的观点

- 来自 [[2026-10-31-yazi快捷键速查]]：键位设计是 vim 风格的两段式组合键机制（`c`/`g`/`,`/`t` 前缀），17 个功能分类全部依赖内置帮助可实时查询；删除操作区分回收站（`d`）与永久删除（`D`），并通过 `g t` 提供回收站入口形成闭环。

## 实用信息

- **安装**：官方 deb（`apt install ./yazi-*.deb`）或 APT 仓库（stable/nightly）；本机版本 v26.9.1，二进制位于 `/usr/bin/yazi` 与 `/usr/bin/ya`。
- **基本用法**：终端输入 `y` 启动（勿直接用 `yazi`，否则退出后目录不跟随）；`j/k/l/h` 导航，`空格` 选中，`y/x/p` 复制剪切粘贴，`q` 退出。
- **适用场景**：终端内快速浏览/批量整理文件、查看图片/视频/PDF 缩略预览、跨目录移动文件、配合 fzf 模糊跳转项目目录。适合习惯 vim 键位的终端重度用户；纯鼠标点击场景则图形文件管理器更合适。
- **注意事项**：图标乱码先排查终端字体是否为 Nerd Font；配置只写覆盖项（合并语义）；低配设备重点调低 `[tasks]` 段的各 worker 数。

## 相关页面

- [[2026-10-31-yazi快捷键速查]]
- [[ibus-libpinyin]]
- [[Linux系统配置]]
