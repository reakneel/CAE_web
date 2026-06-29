import Link from "next/link"
import { ArrowRight, BookOpen, Cpu, Wind, Layers, Code2, GitBranch } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero Section */}
        <section className="pb-16 pt-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            {/* Left: Intro */}
            <div className="flex-1">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                CAE 学习记录
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                用仿真探索<br />
                工程世界
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                这里记录我学习计算机辅助工程（CAE）的点滴——有限元分析、
                CFD 流体仿真、结构力学理论与软件实践，一步一步走向工程仿真工程师。
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  浏览学习笔记
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  关于我
                </Link>
              </div>
            </div>

            {/* Right: Skills */}
            <div className="w-full lg:w-72">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                技能进度
              </p>
              <div className="flex flex-col gap-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{skill.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-px w-full overflow-hidden bg-secondary">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="opacity-30" />

        {/* Stats */}
        <section className="py-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "6", label: "篇学习笔记" },
              { value: "4", label: "个软件工具" },
              { value: "3", label: "个仿真项目" },
              { value: "2025", label: "开始学习" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border/50 bg-card px-5 py-4">
                <p className="font-mono text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="opacity-30" />

        {/* Recent Posts */}
        <section className="py-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              最新笔记
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              全部文章 <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-border/30">
            {recentPosts.map((post) => (
              <article key={post.slug} className="group py-6 first:pt-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-primary">
                          {categoryIcons[post.category]}
                          {post.category}
                        </span>
                        <span className="text-muted-foreground/50">·</span>
                        <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="text-base font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
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
                    <div className="hidden shrink-0 items-center pt-1 sm:flex">
                      <span className="font-mono text-xs text-muted-foreground">{post.readTime} min</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <Separator className="opacity-30" />

        {/* About Preview */}
        <section className="py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                About
              </p>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">关于这个博客</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                我是一名正在系统学习 CAE 工程仿真的学生。这个博客是我记录学习历程的地方——
                每一篇文章都是一次真实的学习记录，包括遇到的问题、解决思路和学习心得。
                希望这些笔记能对同样走在 CAE 学习路上的朋友有所帮助。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                主要学习方向：结构有限元分析（ANSYS / Abaqus）、计算流体动力学（Fluent / OpenFOAM）、
                多物理场耦合仿真。同时也在学习 Python 编程，用于自动化后处理和数据可视化。
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                了解更多 <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                学习方向
              </p>
              {[
                { icon: <Layers className="size-3.5" />, label: "有限元分析 (FEA)" },
                { icon: <Wind className="size-3.5" />, label: "计算流体动力学 (CFD)" },
                { icon: <GitBranch className="size-3.5" />, label: "结构稳定性分析" },
                { icon: <Cpu className="size-3.5" />, label: "疲劳与断裂力学" },
                { icon: <Code2 className="size-3.5" />, label: "Python 脚本自动化" },
                { icon: <BookOpen className="size-3.5" />, label: "工程力学理论" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-md border border-border/40 bg-card px-3 py-2.5"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-xs text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
