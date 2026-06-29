"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Wind, Layers, GitBranch, Cpu, Code2, BookOpen, Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

      <main className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <section className="pb-10 pt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            学习笔记
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            全部文章
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            共 {posts.length} 篇笔记，记录 CAE 工程仿真学习历程
          </p>
        </section>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-md border border-border/50 bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>

            {/* Post List */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">未找到匹配的文章</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border/30">
                {filtered.map((post) => (
                  <article key={post.slug} className="group py-7 first:pt-0 last:pb-0">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="mb-2.5 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-primary">
                          {categoryIcons[post.category]}
                          {post.category}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="font-mono text-xs text-muted-foreground">{post.readTime} min read</span>
                      </div>
                      <h2 className="text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="px-2 py-0 text-xs font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                          阅读全文 <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-56">
            {/* Categories */}
            <div className="mb-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                分类
              </p>
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={cn(
                      "flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors hover:text-foreground",
                      activeCategory === null ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      全部
                    </span>
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
                          "flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors hover:text-foreground",
                          activeCategory === cat ? "text-foreground" : "text-muted-foreground"
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

            <Separator className="mb-8 opacity-30" />

            {/* Tags */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                标签
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={cn(
                      "rounded border px-2 py-0.5 text-xs transition-colors",
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
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
