import fs from "node:fs"
import path from "node:path"

const FINANCE_DIR = path.join(process.cwd(), "content/finance")

export type FinancePost = {
  slug: string
  date: string
  title: string
  tags: string[]
  summary: string
  content: string
}

export type PaginationResult = {
  items: Omit<FinancePost, "content">[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type FinanceQuery = {
  page?: number
  limit?: number
  month?: string // "2026-06"
  tag?: string
  q?: string
}

// ── Frontmatter parsing ──

/**
 * Parses YAML frontmatter, handling nested blocks (like AIGC:) by skipping
 * indented lines. Only top-level keys are extracted.
 */
function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    // Skip indented lines (nested YAML)
    if (/^\s+/.test(line)) continue
    const sep = line.indexOf(":")
    if (sep === -1) continue
    const key = line.slice(0, sep).trim()
    let val = line.slice(sep + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1)
    }
    if (val) meta[key] = val
  }
  return { meta, content: match[2].trim() }
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return []
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

// ── Content processing ──

/**
 * Extracts title from the first h1 heading.
 * E.g. "# A股收盘总结（2026年6月29日 星期一）" → "A股收盘总结（2026年6月29日 星期一）"
 */
function extractTitle(content: string): string {
  const m = content.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : ""
}

/**
 * Extracts date from content. Tries:
 * 1. Chinese date pattern in h1: "2026年6月29日"
 * 2. ISO date in filename (handled by caller)
 */
function extractDate(content: string): string {
  // Match "2026年6月29日" or "2026年06月29日"
  const m = content.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
  if (m) {
    const [, y, mo, d] = m
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`
  }
  return ""
}

/**
 * Removes sections whose h2 heading contains "午间预判".
 * Splits content by h2 boundaries, filters out matching sections,
 * then re-joins.
 */
function stripMiddayPrediction(content: string): string {
  // Split into sections at h2 boundaries
  const sections: string[] = []
  let current = ""

  for (const line of content.split("\n")) {
    if (/^## /.test(line)) {
      if (current) sections.push(current)
      current = line + "\n"
    } else {
      current += line + "\n"
    }
  }
  if (current) sections.push(current)

  // Filter out sections with "午间预判" in the heading
  const kept = sections.filter((s) => !/^## .+午间预判/.test(s))
  return kept.join("").trim()
}

// ── Loading ──

function slugFromDate(dateStr: string): string {
  return dateStr // "2026-06-29"
}

function loadAllPosts(): FinancePost[] {
  if (!fs.existsSync(FINANCE_DIR)) return []

  const files = fs
    .readdirSync(FINANCE_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".html"))
    .sort((a, b) => b.localeCompare(a)) // newest first by filename

  return files
    .map((file): FinancePost | null => {
      const raw = fs.readFileSync(path.join(FINANCE_DIR, file), "utf-8")
      const { meta, content: rawContent } = parseFrontmatter(raw)

      // Extract date: frontmatter > content heading > filename
      let date = meta.date || extractDate(rawContent)
      if (!date) {
        // Try extracting from filename: "A股收盘总结_20260629.md" → "2026-06-29"
        const fm = file.match(/(\d{4})(\d{2})(\d{2})/)
        if (fm) date = `${fm[1]}-${fm[2]}-${fm[3]}`
      }
      if (!date) return null // skip files without a date

      const slug = meta.slug || slugFromDate(date)
      const title = meta.title || extractTitle(rawContent) || slug
      const tags = meta.tags ? parseTags(meta.tags) : []

      // Remove the h1 line since the page renders its own title
      let content = rawContent.replace(/^#\s+.+\n?/, "").trim()

      // Build summary from the first non-empty paragraph
      const summary =
        meta.summary ||
        content
          .split("\n\n")
          .find((p) => p.trim() && !p.startsWith("|") && !p.startsWith("---"))
          ?.replace(/\*\*/g, "")
          .trim() || ""

      return { slug, date, title, tags, summary, content }
    })
    .filter((p): p is FinancePost => p !== null)
}

let _cache: FinancePost[] | null = null

function getPosts(): FinancePost[] {
  // In dev, always re-read so new files appear immediately
  if (process.env.NODE_ENV === "development") return loadAllPosts()
  if (!_cache) _cache = loadAllPosts()
  return _cache
}

// ── Query / Pagination ──

export function queryFinance(q: FinanceQuery = {}): PaginationResult {
  const all = getPosts()
  const page = Math.max(1, q.page ?? 1)
  const limit = Math.max(1, Math.min(100, q.limit ?? 30))

  let filtered = all

  if (q.month) {
    filtered = filtered.filter((p) => p.date.startsWith(q.month!))
  }
  if (q.tag) {
    filtered = filtered.filter((p) => p.tags.includes(q.tag!))
  }
  if (q.q) {
    const needle = q.q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.summary.toLowerCase().includes(needle) ||
        p.content.toLowerCase().includes(needle)
    )
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const start = (page - 1) * limit
  const items = filtered.slice(start, start + limit).map(({ content: _, ...rest }) => rest)

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  }
}

export function getFinancePostBySlug(slug: string): FinancePost | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function getAllFinanceSlugs(): string[] {
  return getPosts().map((p) => p.slug)
}

export function getFinanceMonths(): { label: string; value: string; count: number }[] {
  const posts = getPosts()
  const map = new Map<string, number>()
  for (const p of posts) {
    const m = p.date.slice(0, 7) // "2026-06"
    map.set(m, (map.get(m) || 0) + 1)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
}

export function getAllFinanceTags(): { name: string; count: number }[] {
  const posts = getPosts()
  const map = new Map<string, number>()
  for (const p of posts) {
    for (const t of p.tags) {
      map.set(t, (map.get(t) || 0) + 1)
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
}
