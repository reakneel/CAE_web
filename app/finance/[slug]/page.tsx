import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Tag, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { PostContent } from "@/components/post-content"
import { getFinancePostBySlug, getAllFinanceSlugs } from "@/lib/finance-data"

export function generateStaticParams() {
  return getAllFinanceSlugs().map((slug) => ({ slug }))
}

export default async function FinancePostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getFinancePostBySlug(slug)
  if (!post) notFound()

  // Find prev/next by slug (sorted by date desc in data layer)
  const allSlugs = getAllFinanceSlugs()
  const idx = allSlugs.indexOf(slug)
  const prevSlug = idx > 0 ? allSlugs[idx - 1] : null
  const nextSlug = idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null

  const prevPost = prevSlug ? getFinancePostBySlug(prevSlug) : null
  const nextPost = nextSlug ? getFinancePostBySlug(nextSlug) : null

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16">
          {/* Article */}
          <article className="min-w-0 lg:col-span-9">
            {/* Back */}
            <Link
              href="/finance"
              className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              返回复盘列表
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary">
                  <TrendingUp className="size-3" />
                  A股复盘
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {post.date}
                </span>
              </div>
              <h1 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Tag className="size-3 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0 text-xs font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="mb-10 h-px bg-border/40" />

            {/* Content */}
            <PostContent content={post.content} />

            <div className="my-12 h-px bg-border/40" />

            {/* Prev / Next */}
            <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/finance/${prevPost.slug}`}
                  className="group flex flex-col gap-2 rounded-xl border border-border/30 bg-card/50 px-5 py-4 transition-all hover:border-border/60 hover:bg-card"
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ArrowLeft className="size-3" /> 上一篇
                  </span>
                  <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/finance/${nextPost.slug}`}
                  className="group flex flex-col items-end gap-2 rounded-xl border border-border/30 bg-card/50 px-5 py-4 text-right transition-all hover:border-border/60 hover:bg-card"
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    下一篇 <ArrowRight className="size-3" />
                  </span>
                  <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <div className="rounded-xl border border-border/30 bg-card/50 p-5">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  目录
                </p>
                <TableOfContents content={post.content} />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2
      const text = line.replace(/^#{2,3}\s+/, "")
      const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      return { level, text, id }
    })

  if (headings.length === 0) return null

  return (
    <ul className="flex flex-col gap-1.5">
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: h.level === 3 ? "12px" : "0" }}>
          <a
            href={`#${h.id}`}
            className="text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
