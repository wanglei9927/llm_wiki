#!/usr/bin/env node
/**
 * 扫描本机已安装的 skill / agent / plugin，生成 Markdown 清单。
 *
 * 用法：
 *   node scripts/refresh-installed-skills.mjs          # 生成一次
 *   node scripts/refresh-installed-skills.mjs --watch  # 监听变化，自动更新（常驻）
 *   node scripts/refresh-installed-skills.mjs --check  # 只检查是否过期（退出码 0/1）
 *
 * 特性：跟随软链接（~/.dsh/skills、~/.claude/skills 里大量是链接）、按真实路径去重、
 * 内容没变化时不重写文件（保持 git 干净）。
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const HOME = os.homedir()
const DOC = process.env.SKILLS_DOC || 'E:/llm_wiki/ai-wiki/notes/本机技能与代理清单.md'

const p = (...xs) => path.join(HOME, ...xs)
const exists = f => { try { fs.accessSync(f); return true } catch { return false } }
const safeReal = f => { try { return fs.realpathSync(f) } catch { return f } }

function readFrontmatter(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fm = {}
  if (m) {
    let key = null
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)
      if (kv) { key = kv[1]; const v = kv[2].trim(); fm[key] = (v === '|' || v === '>') ? '' : v }
      else if (key && /^\s+/.test(line)) { fm[key] += ' ' + line.trim() }
    }
  }
  const unquote = s => (s || '').replace(/^["']|["']$/g, '').trim()
  return {
    name: unquote(fm.name),
    description: unquote(fm.description),
    model: unquote(fm.model),
    tools: unquote(fm.tools),
  }
}

function firstParagraph(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/^---[\s\S]*?---/, '')
  const line = text.split(/\r?\n/).find(l => l.trim() && !l.startsWith('#'))
  return (line || '').trim().slice(0, 200)
}

function displayPath(file) {
  const rel = path.relative(HOME, file)
  if (rel.startsWith('..')) return safeReal(file).replace(/\\/g, '/')
  return rel.split(path.sep).join('/')
}

/** 收集技能目录（跟随软链；按真实路径去重，合并来源标签） */
function collectSkills(dir, label, acc) {
  if (!exists(dir)) return acc
  let entries
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return acc }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    let st
    try { st = fs.statSync(full) } catch { continue }
    if (!st.isDirectory()) continue
    const f1 = path.join(full, 'SKILL.md')
    const f2 = path.join(full, 'skill.md')
    const file = exists(f1) ? f1 : exists(f2) ? f2 : null
    if (!file) continue
    const real = safeReal(full)
    if (acc.has(real)) { acc.get(real).labels.add(label); continue }
    const meta = readFrontmatter(file)
    acc.set(real, {
      name: meta.name || e.name,
      description: meta.description || firstParagraph(file),
      labels: new Set([label]),
      file: displayPath(file),
    })
  }
  return acc
}

/** 收集 agent 定义（~/.claude/agents 与插件 agents 目录） */
function collectAgents(dir, label, acc) {
  if (!exists(dir)) return acc
  let entries
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return acc }
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith('.md')) continue
    const file = path.join(dir, e.name)
    const real = safeReal(file)
    if (acc.has(real)) { acc.get(real).labels.add(label); continue }
    const meta = readFrontmatter(file)
    acc.set(real, {
      name: meta.name || e.name.replace(/\.md$/, ''),
      description: meta.description || firstParagraph(file),
      model: meta.model,
      tools: meta.tools,
      labels: new Set([label]),
      file: displayPath(file),
    })
  }
  return acc
}

function scanPlugin(installPath, pluginId) {
  const out = { skills: new Map(), agents: new Map(), commands: [] }
  collectSkills(path.join(installPath, 'skills'), '插件 ' + pluginId, out.skills)
  collectAgents(path.join(installPath, 'agents'), '插件 ' + pluginId, out.agents)
  const cmds = path.join(installPath, 'commands')
  if (exists(cmds)) {
    out.commands = fs.readdirSync(cmds).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
  }
  return out
}

function loadPlugins() {
  const file = p('.claude/plugins/installed_plugins.json')
  if (!exists(file)) return []
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'))
  const list = []
  for (const [id, entries] of Object.entries(raw.plugins || {})) {
    const e = entries && entries[0]
    if (!e) continue
    const info = scanPlugin(e.installPath, id)
    list.push({ id, version: e.version || '', installPath: e.installPath, ...info })
  }
  return list
}

function clip(s, n = 150) {
  s = (s || '').replace(/\s+/g, ' ').trim()
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}
const mdEscape = s => (s || '').replace(/\|/g, '\\|')

function build() {
  const skills = new Map()
  collectSkills(p('.dsh/skills'), 'DSH 用户级', skills)
  collectSkills(p('.dsh/profiles/desktop/node_modules/superpowers-dsh/skills'), 'DSH 包内置', skills)
  collectSkills(p('.agents/skills'), '跨工具共享', skills)
  collectSkills(p('.claude/skills'), 'Claude Code', skills)
  collectSkills(p('.cc-switch/skills'), '其他', skills)
  // 项目级（当前工作区 + 常用项目，标签带路径便于区分）
  const cwd = process.cwd()
  collectSkills(path.join(cwd, '.dsh/skills'), '项目级（当前工作区）', skills)
  collectSkills(path.join(cwd, '.agents/skills'), '项目级（当前工作区）', skills)
  for (const proj of ['D:/aiproject/dsh']) {
    collectSkills(path.join(proj, '.dsh/skills'), '项目级 ' + proj, skills)
    collectSkills(path.join(proj, '.agents/skills'), '项目级 ' + proj, skills)
  }

  const agents = new Map()
  collectAgents(p('.claude/agents'), 'Claude Code', agents)

  const plugins = loadPlugins()
  for (const pg of plugins) {
    for (const [k, v] of pg.skills) { if (!skills.has(k)) skills.set(k, v) }
    for (const [k, v] of pg.agents) { if (!agents.has(k)) agents.set(k, v) }
  }

  // 按名称合并：同一技能在多个安装位置（如 DSH 包内置 + superpowers 插件）只列一行，来源合并
  const byName = new Map()
  for (const s of skills.values()) {
    const key = (s.name || '').trim().toLowerCase()
    const prev = byName.get(key)
    if (!prev) {
      byName.set(key, { name: s.name, description: s.description, labels: new Set(s.labels), file: s.file })
      continue
    }
    for (const l of s.labels) prev.labels.add(l)
    if ((s.description || '').length > (prev.description || '').length) {
      prev.description = s.description
      prev.file = s.file
      prev.name = s.name
    }
  }
  const skillRows = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name))
  const agentRows = [...agents.values()].sort((a, b) => a.name.localeCompare(b.name))
  const pluginCommands = plugins.flatMap(pg => pg.commands.map(c => ({ plugin: pg.id, name: c })))

  const labelStats = new Map()
  for (const s of skillRows) for (const l of s.labels) labelStats.set(l, (labelStats.get(l) || 0) + 1)

  const generatedAt = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
  const lines = []
  lines.push('# 本机已安装 Skill / Agent 清单')
  lines.push('')
  lines.push('> ⚠️ **本文件由脚本自动生成，请勿手动编辑。**')
  lines.push('>')
  lines.push('> 生成时间：' + generatedAt + '　｜　生成脚本：`E:/llm_wiki/scripts/refresh-installed-skills.mjs`')
  lines.push('>')
  lines.push('> **刷新**：`node E:/llm_wiki/scripts/refresh-installed-skills.mjs`（任何智能体在安装/卸载 skill、插件或 agent 后都应执行）')
  lines.push('>')
  lines.push('> **实时**：`node E:/llm_wiki/scripts/refresh-installed-skills.mjs --watch` 常驻监听，约 2 秒内自动更新。')
  lines.push('')
  lines.push('## 概览')
  lines.push('')
  lines.push('| 类别 | 数量 |')
  lines.push('|---|---|')
  lines.push('| 去重后技能（skill） | ' + skillRows.length + ' |')
  lines.push('| 子代理（agent） | ' + agentRows.length + ' |')
  lines.push('| 插件（plugin） | ' + plugins.length + ' |')
  lines.push('')
  lines.push('> 技能按「真实路径」去重：`~/.claude/skills` 里许多是指向 `~/.agents/skills` 的软链，只列一次。')
  lines.push('')
  lines.push('## 一、技能总表（' + skillRows.length + '）')
  lines.push('')
  lines.push('| 名称 | 说明 | 来源 |')
  lines.push('|---|---|---|')
  for (const s of skillRows) {
    lines.push('| ' + mdEscape(s.name) + ' | ' + mdEscape(clip(s.description)) + ' | ' + [...s.labels].join(' / ') + ' |')
  }
  lines.push('')
  lines.push('## 二、子代理（' + agentRows.length + '）')
  lines.push('')
  if (agentRows.length) {
    lines.push('| 名称 | 说明 | 模型 | 来源 |')
    lines.push('|---|---|---|---|')
    for (const a of agentRows) {
      lines.push('| ' + mdEscape(a.name) + ' | ' + mdEscape(clip(a.description)) + ' | ' + mdEscape(a.model || '-') + ' | ' + [...a.labels].join(' / ') + ' |')
    }
  } else lines.push('（无）')
  lines.push('')
  lines.push('## 三、插件（' + plugins.length + '）')
  lines.push('')
  if (plugins.length) {
    lines.push('| 插件 | 版本 | 技能 | 子代理 | 命令 | 安装位置 |')
    lines.push('|---|---|---|---|---|---|')
    for (const pg of plugins) {
      lines.push('| ' + mdEscape(pg.id) + ' | ' + mdEscape(pg.version || '-') + ' | ' + pg.skills.size + ' | ' + pg.agents.size + ' | ' + pg.commands.length + ' | `' + pg.installPath + '` |')
    }
  } else lines.push('（无）')
  lines.push('')
  if (pluginCommands.length) {
    lines.push('## 四、插件命令（' + pluginCommands.length + '）')
    lines.push('')
    lines.push('| 命令 | 插件 |')
    lines.push('|---|---|')
    for (const c of pluginCommands) lines.push('| `/' + mdEscape(c.name) + '` | ' + mdEscape(c.plugin) + ' |')
    lines.push('')
  }
  lines.push('## 五、按来源分布')
  lines.push('')
  lines.push('| 来源 | 技能数 | 目录 |')
  lines.push('|---|---|---|')
  const srcDirs = {
    'DSH 用户级': '`~/.dsh/skills`',
    'DSH 包内置': '`~/.dsh/profiles/desktop/node_modules/superpowers-dsh/skills`',
    '跨工具共享': '`~/.agents/skills`',
    'Claude Code': '`~/.claude/skills`',
    '项目级（当前工作区）': '`<cwd>/.dsh/skills`、`<cwd>/.agents/skills`',
    '项目级 D:/aiproject/dsh': '`D:/aiproject/dsh/.dsh/skills`',
  }
  for (const [l, n] of [...labelStats.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push('| ' + l + ' | ' + n + ' | ' + (srcDirs[l] || '-') + ' |')
  }
  lines.push('')
  lines.push('## 六、如何保持更新')
  lines.push('')
  lines.push('1. 安装/卸载任意 skill、插件或 agent 后运行：')
  lines.push('')
  lines.push('   ```sh')
  lines.push('   node E:/llm_wiki/scripts/refresh-installed-skills.mjs')
  lines.push('   ```')
  lines.push('')
  lines.push('2. 实时模式（推荐开机自启，见启动文件夹 `refresh-installed-skills.vbs`）：')
  lines.push('')
  lines.push('   ```sh')
  lines.push('   node E:/llm_wiki/scripts/refresh-installed-skills.mjs --watch')
  lines.push('   ```')
  lines.push('')
  lines.push('3. `--check` 用于巡检：文档过期时退出码为 1。')
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('_覆盖范围：DSH（用户级 / 包内置 / 项目级）、跨工具共享 `~/.agents/skills`、Claude Code（用户级技能 / 子代理 / 插件）。修改脚本本身的扫描范围即可扩展。_')
  return lines.join('\n') + '\n'
}

// 比较时忽略「生成时间」一行，避免每次因时间戳变化而重写（保持 git 干净、--check 可用）
const normalize = s => s.replace(/^> 生成时间：.*$/m, '')

function writeIfChanged(content) {
  if (exists(DOC)) {
    const old = fs.readFileSync(DOC, 'utf8')
    if (normalize(old) === normalize(content)) return false
  }
  fs.mkdirSync(path.dirname(DOC), { recursive: true })
  fs.writeFileSync(DOC, content, 'utf8')
  return true
}

const args = process.argv.slice(2)
if (args.includes('--check')) {
  const content = build()
  const old = exists(DOC) ? fs.readFileSync(DOC, 'utf8') : ''
  if (normalize(old) !== normalize(content)) { console.log('outdated'); process.exit(1) }
  console.log('up-to-date')
  process.exit(0)
}

if (args.includes('--watch')) {
  const dirs = [
    p('.dsh/skills'), p('.agents/skills'), p('.claude/skills'), p('.claude/agents'), p('.claude/plugins'),
    p('.dsh/profiles/desktop/node_modules/superpowers-dsh/skills'),
    p('.cc-switch/skills'),
  ].filter(exists)
  console.log('[skills] watching ' + dirs.length + ' dirs → ' + DOC)
  if (writeIfChanged(build())) console.log('[skills] generated')
  let timer = null
  const regen = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try {
        if (writeIfChanged(build())) console.log('[skills] updated ' + new Date().toLocaleTimeString('zh-CN'))
      } catch (e) { console.error('[skills] error', e.message) }
    }, 1500)
  }
  for (const d of dirs) {
    try {
      const w = fs.watch(d, { recursive: true }, regen)
      w.on('error', e => console.error('[skills] watcher error', d, e.message))
    } catch (e) { console.error('[skills] watch failed', d, e.message) }
  }
  process.on('uncaughtException', e => console.error('[skills] uncaught', e && e.message))
  process.on('SIGINT', () => process.exit(0))
} else {
  const changed = writeIfChanged(build())
  console.log(changed ? 'written: ' + DOC : 'unchanged: ' + DOC)
}
