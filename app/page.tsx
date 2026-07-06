import Link from "next/link"
import { ArrowRight, BookOpen, Cpu, Wind, Layers, Code2, GitBranch } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { posts } from "@/lib/blog-data"

const skills = [
  { name: "ANSYS Workbench", level: 70 },
  { name: "Abaqus CAE", level: 65 },
  { name: "OpenFOAM", level: 50 },
  { name: "ANSYS Fluent", level: 60 },
  { name: "SolidWorks", level: 75 },
  { name: "Python / Matplotlib", level: 80 },
]

const categoryIcons: Record<string, React.ReactNode> = {
  "有限元分析": <Layers className="size-3.5" />,
  "CFD 仿真": <Wind className="size-3.5" />,
  "结构力学": <GitBranch className="size-3.5" />,
  "材料力学": <Cpu className="size-3.5" />,
  "项目实践": <Code2 className="size-3.5" />,
  "软件学习": <BookOpen className="size-3.5" />,
}

const recentPosts = posts.slice(0, 4)

const stats = [
  { value: "6", label: "篇学习笔记" },
  { value: "4", label: "个软件工具" },
  { value: "3", label: "个仿真项目" },
  { value: "2025", label: "开始学习" },
]

const focusAreas = [
  { icon: <Layers className="size-4" />, label: "有限元分析 (FEA)" },
  { icon: <Wind className="size-4" />, label: "计算流体动力学 (CFD)" },
  { icon: <GitBranch className="size-4" />, label: "结构稳定性分析" },
  { icon: <Cpu className="size-4" />, label: "疲劳与断裂力学" },
  { icon: <Code2 className="size-4" />, label: "Python 脚本自动化" },
  { icon: <BookOpen className="size-4" />, label: "工程力学理论" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Hero ── */}
        <section className="grid gap-12 pb-20 pt-24 lg:grid-cols-12 lg:gap-16">
          {/* Left: Intro */}
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              CAE 学习记录
            </p>
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              用仿真探索<br />
              <span className="text-muted-foreground">工程世界</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              这里记录我学习计算机辅助工程（CAE）的点滴——有限元分析、
              CFD 流体仿真、结构力学理论与软件实践，一步一步走向工程仿真工程师。
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                浏览学习笔记
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border/40 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground"
              >
                关于我
              </Link>
            </div>
          </div>

          {/* Right: Skills */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                技能进度
              </p>
              <div className="flex flex-col gap-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5 bg-card px-6 py-6">
              <p className="font-mono text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* ── Recent Posts ── */}
        <section className="mb-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Blog
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">最新笔记</h2>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 rounded-lg border border-border/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground sm:inline-flex"
            >
              全部文章
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="flex h-full flex-col gap-3 rounded-xl border border-border/30 bg-card/50 p-6 transition-all hover:border-border/60 hover:bg-card">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                        {categoryIcons[post.category]}
                        {post.category}
                      </span>
                      <span className="text-muted-foreground/50">·</span>
                      <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">{post.readTime} min</span>
                    </div>
                    <h3 className="text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-0 text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Mobile only link */}
          <div className="mt-6 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-primary"
            >
              查看全部文章 <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>

        {/* ── About Section ── */}
        <section className="mb-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                About
              </p>
              <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground">关于这个博客</h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  我是一名正在系统学习 CAE 工程仿真的学生。这个博客是我记录学习历程的地方——
                  每一篇文章都是一次真实的学习记录，包括遇到的问题、解决思路和学习心得。
                  希望这些笔记能对同样走在 CAE 学习路上的朋友有所帮助。
                </p>
                <p>
                  主要学习方向：结构有限元分析（ANSYS / Abaqus）、计算流体动力学（Fluent / OpenFOAM）、
                  多物理场耦合仿真。同时也在学习 Python 编程，用于自动化后处理和数据可视化。
                </p>
              </div>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border/60 hover:text-foreground"
              >
                了解更多 <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                学习方向
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {focusAreas.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 px-4 py-3.5 transition-colors hover:border-border/60 hover:bg-card"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
