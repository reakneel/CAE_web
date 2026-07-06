"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, TrendingUp, Search, ChevronLeft, ChevronRight, Tag, Calendar } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

type Post = {
  slug: string
  date: string
  title: string
  tags: string[]
  summary: string
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

type MetaMonth = { label: string; value: string; count: number }
type MetaTag = { name: string; count: number }

const LIMIT = 30

export default function FinancePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: LIMIT,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  })
  const [months, setMonths] = useState<MetaMonth[]>([])
  const [tags, setTags] = useState<MetaTag[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [page, setPage] = useState(1)
  const [activeMonth, setActiveMonth] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) })
    if (activeMonth) params.set("month", activeMonth)
    if (activeTag) params.set("tag", activeTag)
    if (query) params.set("q", query)

    const res = await fetch(`/api/finance?${params}`)
    const data = await res.json()
    setPosts(data.items)
    setPagination(data.pagination)
    setLoading(false)
  }, [page, activeMonth, activeTag, query])

  // Load meta on mount
  useEffect(() => {
    fetch("/api/finance/meta")
      .then((r) => r.json())
      .then((d) => {
        setMonths(d.months)
        setTags(d.tags)
      })
  }, [])

  // Fetch posts when filters change
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Reset page when filter changes
  useEffect(() => {
    if (page !== 1) setPage(1)
  }, [activeMonth, activeTag, query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(searchInput)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <section className="pb-12 pt-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                <TrendingUp className="mr-1.5 inline size-3.5" />
                A股复盘
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                每日复盘
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                共 {pagination.total} 篇复盘，记录每日A股行情分析与操作策略
              </p>
            </div>

            <div className="flex items-end lg:col-span-5">
              <form onSubmit={handleSearch} className="relative w-full lg:max-w-sm lg:ml-auto">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索复盘文章..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full rounded-lg border border-border/40 bg-card/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </form>
            </div>
          </div>
        </section>

        <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              {/* Months */}
              {months.length > 0 && (
                <div className="mb-8 rounded-xl border border-border/30 bg-card/50 p-5">
                  <p className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Calendar className="size-3" />
                    月份
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li>
                      <button
                        onClick={() => setActiveMonth(null)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary/50",
                          activeMonth === null ? "bg-secondary/50 text-foreground" : "text-muted-foreground"
                        )}
                      >
                        <span>全部</span>
                        <span className="font-mono text-xs">
                          {months.reduce((s, m) => s + m.count, 0)}
                        </span>
                      </button>
                    </li>
                    {months.map((m) => (
                      <li key={m.value}>
                        <button
                          onClick={() => setActiveMonth(activeMonth === m.value ? null : m.value)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary/50",
                            activeMonth === m.value ? "bg-secondary/50 text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <span>{m.label}</span>
                          <span className="font-mono text-xs">{m.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="rounded-xl border border-border/30 bg-card/50 p-5">
                  <p className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Tag className="size-3" />
                    标签
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => setActiveTag(activeTag === t.name ? null : t.name)}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-xs transition-colors",
                          activeTag === t.name
                            ? "border-primary/50 bg-primary/10 text-primary"
                            : "border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        )}
                      >
                        {t.name}
                        <span className="ml-1 font-mono text-[10px] opacity-60">{t.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-9">
            {loading ? (
              <div className="py-20 text-center">
                <p className="text-sm text-muted-foreground">加载中...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm text-muted-foreground">暂无复盘文章</p>
                <p className="mt-2 text-xs text-muted-foreground/60">
                  将 .md 文件放入 <code className="rounded bg-secondary px-1.5 py-0.5 font-mono">content/finance/</code> 目录即可
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {posts.map((post) => (
                    <article key={post.slug} className="group">
                      <Link href={`/finance/${post.slug}`} className="block h-full">
                        <div className="flex h-full flex-col gap-3 rounded-xl border border-border/30 bg-card/50 p-5 transition-all hover:border-border/60 hover:bg-card">
                          <div className="flex items-center gap-2">
                            <time className="font-mono text-xs font-medium text-primary">
                              {post.date}
                            </time>
                            {post.tags.length > 0 && (
                              <>
                                <span className="text-muted-foreground/40">·</span>
                                <span className="text-xs text-muted-foreground">
                                  {post.tags.slice(0, 2).join(", ")}
                                </span>
                              </>
                            )}
                          </div>
                          <h2 className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                            {post.title}
                          </h2>
                          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.summary}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-border/40 px-2 py-0 text-[11px] text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                              阅读 <ArrowRight className="size-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <nav className="mt-10 flex items-center justify-between">
                    <p className="font-mono text-xs text-muted-foreground">
                      第 {pagination.page} / {pagination.totalPages} 页，共 {pagination.total} 篇
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={!pagination.hasPrev}
                        className="flex items-center gap-1 rounded-lg border border-border/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground disabled:opacity-30 disabled:hover:border-border/40 disabled:hover:text-muted-foreground"
                      >
                        <ChevronLeft className="size-3" />
                        上一页
                      </button>
                      <button
                        onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                        disabled={!pagination.hasNext}
                        className="flex items-center gap-1 rounded-lg border border-border/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground disabled:opacity-30 disabled:hover:border-border/40 disabled:hover:text-muted-foreground"
                      >
                        下一页
                        <ChevronRight className="size-3" />
                      </button>
                    </div>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
