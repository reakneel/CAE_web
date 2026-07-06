"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Wind, Layers, GitBranch, Cpu, Code2, BookOpen, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { posts, categories, getAllTags } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ReactNode> = {
  "有限元分析": <Layers className="size-3.5" />,
  "CFD 仿真": <Wind className="size-3.5" />,
  "结构力学": <GitBranch className="size-3.5" />,
  "材料力学": <Cpu className="size-3.5" />,
  "项目实践": <Code2 className="size-3.5" />,
  "软件学习": <BookOpen className="size-3.5" />,
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const allTags = getAllTags()

  const filtered = posts.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory
    const matchTag = !activeTag || p.tags.includes(activeTag)
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchTag && matchQuery
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <section className="pb-12 pt-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                学习笔记
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                全部文章
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                共 {posts.length} 篇笔记，记录 CAE 工程仿真学习历程
              </p>
            </div>

            {/* Search in header on larger screens */}
            <div className="flex items-end lg:col-span-5">
              <div className="relative w-full lg:max-w-sm lg:ml-auto">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-border/40 bg-card/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-16">
          {/* Sidebar - Categories & Tags */}
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              {/* Categories */}
              <div className="mb-8 rounded-xl border border-border/30 bg-card/50 p-5">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  分类
                </p>
                <ul className="flex flex-col gap-1">
                  <li>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary/50",
                        activeCategory === null ? "bg-secondary/50 text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span>全部</span>
                      <span className="font-mono text-xs">{posts.length}</span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const count = posts.filter((p) => p.category === cat).length
                    if (count === 0) return null
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary/50",
                            activeCategory === cat ? "bg-secondary/50 text-foreground" : "text-muted-foreground"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-primary">{categoryIcons[cat]}</span>
                            {cat}
                          </span>
                          <span className="font-mono text-xs">{count}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Tags */}
              <div className="rounded-xl border border-border/30 bg-card/50 p-5">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  标签
                </p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                      className={cn(
                        "rounded-md border px-2.5 py-1 text-xs transition-colors",
                        activeTag === tag
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-9">
            {/* Post List */}
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-sm text-muted-foreground">未找到匹配的文章</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((post) => (
                  <article key={post.slug} className="group">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="flex h-full flex-col gap-3 rounded-xl border border-border/30 bg-card/50 p-5 transition-all hover:border-border/60 hover:bg-card">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                            {categoryIcons[post.category]}
                            {post.category}
                          </span>
                          <span className="text-muted-foreground/40">·</span>
                          <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
                        </div>
                        <h2 className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h2>
                        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="px-2 py-0 text-xs font-normal"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                            {post.readTime}min <ArrowRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
