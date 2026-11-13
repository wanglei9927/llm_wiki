#!/usr/bin/env bash
# 知识库只读扫描器：结构统计 + 断链/孤页/未消化素材/过短页检测
# 用法: bash scan-wiki.sh <wiki根目录>
# 依赖: bash 4+, GNU coreutils。不修改任何文件。
set -euo pipefail

ROOT="${1:?用法: scan-wiki.sh <wiki根目录>}"
[ -d "$ROOT" ] || { echo "错误: 目录不存在 $ROOT"; exit 1; }
ROOT="$(cd "$ROOT" && pwd)"

mapfile -t ALL_MDS < <(find "$ROOT" -name '*.md' ! -name 'SUMMARY.md' ! -name '.wiki-schema.md' | sort)

declare -A FILES          # 文件名(去.md) -> 相对路径
declare -A STEMS          # 去日期前缀后的文件名 -> 1（未消化素材匹配用）
declare -A IS_WIKI        # 是否 wiki/ 下的页面
declare -A BACKLINKS      # 被引用计数
for f in "${ALL_MDS[@]}"; do
  rel="${f#"$ROOT"/}"
  base="$(basename "$f" .md)"
  FILES["$base"]="$rel"
  STEMS["$(echo "$base" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')"]=1
  [[ "$rel" == wiki/* ]] && IS_WIKI["$base"]=1
done

# 非 Markdown 文件（图片等）也参与链接解析：Obsidian 的图片嵌入按文件名全库匹配
declare -A ASSETS
while IFS= read -r f; do
  rel="${f#"$ROOT"/}"
  ASSETS["$(basename "$f")"]="$rel"
done < <(find "$ROOT" -type f ! -name '*.md' -not -path '*/.git/*' | sort)

# ---------- 1. 目录统计 ----------
echo "== 目录统计 =="
is_llmwiki="否"
[ -f "$ROOT/.wiki-schema.md" ] && is_llmwiki="是"
echo "llm-wiki 结构: $is_llmwiki"
if [ -d "$ROOT/raw" ]; then
  find "$ROOT/raw" -type f | sed "s|^$ROOT/||" | awk -F/ '{cnt[$1"/"$2]++} END {for (k in cnt) print k": "cnt[k]}' | sort
else
  echo "raw/: 不存在"
fi
if [ -d "$ROOT/wiki" ]; then
  for d in "$ROOT"/wiki/*/; do
    [ -d "$d" ] || continue
    n=$(find "$d" -name '*.md' | wc -l)
    echo "wiki/$(basename "$d"): $n 页"
  done
fi
for f in index.md log.md; do
  [ -f "$ROOT/$f" ] && echo "$f: 存在" || echo "$f: 缺失"
done
if [ -f "$ROOT/wiki/overview.md" ]; then echo "wiki/overview.md: 存在"
elif [ -f "$ROOT/overview.md" ]; then echo "overview.md: 存在（根目录）"
else echo "overview.md: 缺失"; fi

# ---------- 2. 页面清单 ----------
echo
echo "== 页面清单 =="
for f in "${ALL_MDS[@]}"; do
  rel="${f#"$ROOT"/}"
  [ "$rel" = "SUMMARY.md" ] && continue
  size=$(wc -c < "$f")
  printf "%s  %sB\n" "$rel" "$size"
done

# ---------- 3. 断链 ----------
echo
echo "== 断链 =="
link_errs=0
for f in "${ALL_MDS[@]}"; do
  rel="${f#"$ROOT"/}"
  # 提取 [[...]]，兼容 [[名|别名]] 取名部分（llm-wiki 规范不含别名，这里防御性处理）
  while IFS= read -r link; do
    [ -n "$link" ] || continue
    if [ -z "${FILES[$link]+x}" ] && [ -z "${ASSETS[$link]+x}" ]; then
      echo "悬空链接 [[$link]]  <- $rel"
      link_errs=$((link_errs+1))
    else
      BACKLINKS["$link"]="$(( ${BACKLINKS["$link"]:-0} + 1 ))"
    fi
  done < <(grep -ohE '\[\[[^]]+\]\]' "$f" 2>/dev/null | sed -E 's/^\[\[//; s/\]\]$//; s/\|.*$//' | sort -u)
done
[ "$link_errs" -eq 0 ] && echo "未发现断链"

# ---------- 4. 孤页 ----------
echo
echo "== 孤页 =="
orphans=0
for base in "${!IS_WIKI[@]}"; do
  if [ "${BACKLINKS["$base"]:-0}" -eq 0 ]; then
    echo "无入链: ${FILES[$base]}"
    orphans=$((orphans+1))
  fi
done
[ "$orphans" -eq 0 ] && echo "未发现孤页（wiki 页均有入链）"

# ---------- 5. 疑似未消化素材 ----------
echo
echo "== 疑似未消化素材 =="
undigested=0
if [ -d "$ROOT/raw" ]; then
  # 已消化判定：raw 相对路径被任一 wiki 页面引用（source_path 或正文）
  CONSUMED="$(mktemp)"
  find "$ROOT/wiki" -name '*.md' -exec cat {} + > "$CONSUMED" 2>/dev/null || true
  while IFS= read -r f; do
    rel="${f#"$ROOT"/}"
    if ! grep -qF -- "$rel" "$CONSUMED" 2>/dev/null; then
      echo "$rel"
      undigested=$((undigested+1))
    fi
  done < <(find "$ROOT/raw" -type f -name '*.md')
  rm -f "$CONSUMED"
fi
[ "$undigested" -eq 0 ] && echo "raw/ 素材均被 wiki 页引用（启发式判断，请结合内容确认）"

# ---------- 6. 过短与占位页 ----------
echo
echo "== 过短与占位页 =="
short_errs=0
for f in "${ALL_MDS[@]}"; do
  rel="${f#"$ROOT"/}"
  [ "$rel" = "SUMMARY.md" ] && continue
  case "$rel" in wiki/entities/*)
    size=$(wc -c < "$f")
    if [ "$size" -lt 1500 ]; then
      echo "过短(${size}B<1500): $rel"
      short_errs=$((short_errs+1))
    fi ;;
  esac
  # 占位检查只针对 wiki 页；raw 素材和 notes 里出现 placeholder 等词属正常
  case "$rel" in wiki/*)
    if grep -qE 'TODO|待补充|placeholder|lorem' "$f" 2>/dev/null; then
      echo "含占位文本: $rel"
      short_errs=$((short_errs+1))
    fi ;;
  esac
done
[ "$short_errs" -eq 0 ] && echo "未发现过短页或占位文本"

echo
echo "== 汇总 =="
echo "页面总数: ${#FILES[@]}（不含 SUMMARY.md）"
echo "断链: $link_errs  孤页: $orphans  疑似未消化: $undigested  过短/占位: $short_errs"
