import Link from "next/link"
import { ArrowRight, BookOpen, Cpu, Wind, Layers, Code2, GitBranch, FileText, Microscope, GraduationCap } from "lucide-react"
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

const recentPosts = posts.slice(0, 3)

const researchInterests = [
  { icon: <Layers className="size-5" />, title: "有限元分析", description: "结构静力学、动力学及非线性分析" },
  { icon: <Wind className="size-5" />, title: "计算流体动力学", description: "湍流模型、多相流及传热问题" },
  { icon: <Microscope className="size-5" />, title: "多物理场耦合", description: "流固耦合、热 - 结构耦合仿真" },
  { icon: <Code2 className="size-5" />, title: "数值方法", description: "有限元法、有限体积法理论基础" },
]

const publications = [
  {
    title: "基于 ANSYS 的简支梁静力学分析",
    journal: "学习笔记",
    year: "2025",
    link: "/blog/ansys-simply-supported-beam",
  },
  {
    title: "OpenFOAM 入门：不可压缩流动模拟",
    journal: "学习笔记",
    year: "2025",
    link: "/blog/openfoam-incompressible-flow",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* ── Hero Section ── */}
        <section className="py-16 lg:py-24">
          <div className="flex flex-col items-start gap-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <GraduationCap className="size-3.5" />
              <span>CAE 仿真研究笔记</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              计算机辅助工程<span className="text-muted-foreground">学习与研究</span>
            </h1>
            
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              本平台致力于记录计算机辅助工程（CAE）领域的学习历程与研究成果，
              涵盖有限元分析（FEA）、计算流体动力学（CFD）及多物理场耦合仿真等方向。
              通过系统化的学习笔记与实践案例，探索工程仿真技术的理论与实践应用。
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <FileText className="size-4" />
                学术笔记
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                研究者简介
              </Link>
            </div>
          </div>
        </section>

        {/* ── Research Interests ── */}
        <section className="border-t border-border py-16">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Research Areas
            </p>
            <h2 className="text-2xl font-semibold text-foreground">研究方向</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchInterests.map((area) => (
              <div
                key={area.title}
                className="group rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-4 text-primary">{area.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{area.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Selected Publications / Notes ── */}
        <section className="border-t border-border py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Selected Notes
              </p>
              <h2 className="text-2xl font-semibold text-foreground">精选笔记</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              查看全部
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-sm md:flex-row md:items-center md:gap-6">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowRight className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-1 md:block" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── Skills & Tools ── */}
        <section className="border-t border-border py-16">
          <div className="mb-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Technical Skills
            </p>
            <h2 className="text-2xl font-semibold text-foreground">技术能力</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border/50 bg-card/50 p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">核心工具</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "ANSYS Workbench",
                  "Abaqus",
                  "OpenFOAM",
                  "ANSYS Fluent",
                  "SolidWorks",
                  "Python",
                  "MATLAB",
                  "ParaView",
                  "LaTeX",
                  "Git",
                ].map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="border-t border-border py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                About the Author
              </p>
              <h2 className="mb-6 text-2xl font-semibold text-foreground">关于作者</h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  本人现为工程力学专业研究生，专注于计算机辅助工程（CAE）领域的系统学习与研究。
                  研究方向包括结构有限元分析、计算流体动力学及多物理场耦合问题的数值模拟。
                </p>
                <p>
                  本平台旨在记录学习过程中的理论推导、软件操作实践及工程案例研究，
                  为同领域的学习者与研究者提供参考。欢迎学术交流与合作。
                </p>
              </div>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                查看详细简历 <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-border/50 bg-card/50 p-6">
                <h3 className="mb-4 text-sm font-semibold text-foreground">联系方式</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">研究领域</span>
                    <span className="font-medium text-foreground">CAE / FEA / CFD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">机构</span>
                    <span className="font-medium text-foreground">某高校工程学院</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">学术邮箱</span>
                    <span className="font-medium text-foreground">research@example.edu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
