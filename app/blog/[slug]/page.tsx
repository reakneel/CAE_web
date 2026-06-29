import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getPostBySlug, posts } from "@/lib/blog-data"
import { PostContent } from "@/components/post-content"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // Find prev/next posts
  const idx = posts.findIndex((p) => p.slug === slug)
  const prevPost = idx > 0 ? posts[idx - 1] : null
  const nextPost = idx < posts.length - 1 ? posts[idx + 1] : null

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-12 py-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Article */}
          <article className="min-w-0 flex-1">
            {/* Back */}
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              学习笔记
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {post.readTime} min read
                </span>
                <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
              </div>
              <h1 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                {post.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {post.excerpt}
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

            <Separator className="mb-10 opacity-30" />

            {/* Content */}
            <PostContent content={post.content} />

            <Separator className="my-12 opacity-30" />

            {/* Prev / Next navigation */}
            <nav className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-1 rounded-lg border border-border/40 bg-card px-5 py-4 transition-colors hover:border-primary/30"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
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
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col items-end gap-1 rounded-lg border border-border/40 bg-card px-5 py-4 text-right transition-colors hover:border-primary/30"
                >
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
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

          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:w-52 lg:shrink-0">
            <div className="sticky top-24">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                目录
              </p>
              <TableOfContents content={post.content} />

              <Separator className="my-6 opacity-30" />

              <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                相关文章
              </p>
              <ul className="flex flex-col gap-2">
                {posts
                  .filter((p) => p.slug !== slug && p.category === post.category)
                  .slice(0, 3)
                  .map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {related.title}
                      </Link>
                    </li>
                  ))}
                {posts.filter((p) => p.slug !== slug && p.category === post.category).length ===
                  0 && (
                  <li>
                    <Link
                      href="/blog"
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      浏览全部文章 →
                    </Link>
                  </li>
                )}
              </ul>
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
            className="text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
