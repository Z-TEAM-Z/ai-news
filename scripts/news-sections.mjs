/** 资讯日报固定章节顺序 */
export const NEWS_SECTIONS = [
  '岗位趋势',
  '行业动态',
  '热门项目',
  '产品更新',
  '模型发布',
  '论文研究',
]

/** 旧栏目名 → 新栏目名（存量迁移） */
export const LEGACY_SECTION_ALIASES = {
  就业趋势: '岗位趋势',
  'AI 热门开源项目': '热门项目',
  '论文与研究': '论文研究',
}

export function normalizeSectionName(name) {
  return LEGACY_SECTION_ALIASES[name] || name
}

export function renderSections(reportDate, sections, renderItem) {
  const byName = new Map(NEWS_SECTIONS.map((n) => [n, []]))

  for (const sec of sections) {
    const key = normalizeSectionName(sec.name)
    if (!byName.has(key)) continue
    const list = byName.get(key)
    for (const item of sec.items || []) {
      list.push(item)
    }
  }

  const parts = [
    `# AI 资讯日报：${reportDate}`,
    '',
    `> 截至 ${reportDate}。`,
    '',
  ]

  for (const name of NEWS_SECTIONS) {
    const items = byName.get(name) || []
    parts.push(`## ${name}`, '')
    if (!items.length) {
      parts.push('（本日无新条目）', '')
      continue
    }
    for (const item of items) {
      if (typeof renderItem === 'function') {
        parts.push(renderItem(item))
      } else if (item?.raw) {
        parts.push(item.raw, '')
      } else {
        parts.push(String(item), '')
      }
    }
  }

  return `${parts.join('\n').trimEnd()}\n`
}
