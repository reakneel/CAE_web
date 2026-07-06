import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BookOpen, Mail, Layers, Wind, Cpu, Code2, ArrowUpRight } from "lucide-react"

const timeline = [
  {
    date: "2025.06",
    title: "OpenFOAM",
    desc: "学习开源 CFD 求解器，完成顶盖驱动流、管道流等经典验证案例。",
  },
  {
    date: "2025.05",
    title: "Abaqus 接触分析",
    desc: "赫兹接触仿真，结果与理论解误差小于 1%。",
  },
  {
    date: "2025.04",
    title: "ANSYS Fluent",
    desc: "湍流模型选择、边界条件设置、后处理可视化全流程。",
  },
  {
    date: "2025.03",
    title: "有限元理论",
    desc: "研读《有限元方法：基本原理》，理解刚度矩阵、形函数等核心概念。",
  },
  {
    date: "2025.01",
    title: "CAE 起步",
    desc: "从 ANSYS Workbench 静力学分析入门，完成悬臂梁、平板拉伸等基础案例。",
  },
]

const tools = [
  { name: "ANSYS Workbench", desc: "结构静力学、模态分析、屈曲分析", icon: <Layers className="size-5" />, tag: "FEA" },
  { name: "Abaqus CAE", desc: "接触分析、非线性材料、用户子程序", icon: <Cpu className="size-5" />, tag: "FEA" },
  { name: "ANSYS Fluent", desc: "湍流仿真、传热分析、多相流", icon: <Wind className="size-5" />, tag: "CFD" },
  { name: "OpenFOAM", desc: "开源 CFD，自定义求解器开发", icon: <Code2 className="size-5" />, tag: "CFD" },
  { name: "SolidWorks", desc: "三维建模、装配体设计", icon: <Layers className="size-5" />, tag: "CAD" },
  { name: "Python", desc: "数据后处理、仿真自动化脚本", icon: <Code2 className="size-5" />, tag: "Script" },
]

const resources = [
  { name: "有限元方法", author: "O.C. Zienkiewicz", type: "教材" },
  { name: "流体力学", author: "Frank M. White", type: "教材" },
  { name: "SimScale Docs", author: "SimScale", type: "文档" },
  { name: "ANSYS Learning Hub", author: "ANSYS", type: "平台" },
  { name: "Engineering Explained", author: "YouTube", type: "视频" },
  { name: "CFD Online Forum", author: "Cornell", type: "社区" },
]

const stats = [
  { value: "6", label: "篇文章" },
  { value: "4", label: "个软件" },
  { value: "9", label: "个案例" },
  { value: "2025", label: "起步" },
]

const learning = [
  "热-结构耦合分析",
  "参数化仿真 (APDL)",
  "疲劳后处理 (nCode)",
  "Mesh 自适应加密",
]

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Hero ── */}
        <section className="grid gap-10 pb-20 pt-24 lg:grid-cols-12 lg:gap-16">
          {/* Left: headline */}
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">About</p>
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              在数字世界里<br />
              <span className="text-muted-foreground">看见工程的力量</span>
            </h1>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-3">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              工科学生，CAE 爱好者。从第一次接触有限元分析开始，就被仿真技术的魅力所吸引——能够在数字世界里"看见"力学行为，让工程学变得更加直观和有趣。
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              这个博客记录的是真实的学习过程：踩过的坑、反复查阅的文档、调通仿真时的成就感。目前专注于结构有限元（ANSYS / Abaqus）和 CFD（Fluent / OpenFOAM），长期目标独立完成多物理场耦合仿真。
            </p>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="mb-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-card px-6 py-5">
              <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </section>

        {/* ── Main grid ── */}
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left column */}
          <div className="flex flex-col gap-20 lg:col-span-8">
            {/* Timeline */}
            <section>
              <h2 className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                学习历程
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-border/60 to-transparent" />

                <div className="flex flex-col gap-8">
                  {timeline.map((item, i) => (
                    <div key={i} className="group relative flex gap-6 pl-1">
                      {/* Dot */}
                      <div className="relative z-10 mt-1.5 flex size-[31px] shrink-0 items-center justify-center">
                        <div className="size-2.5 rounded-full border-2 border-primary/60 bg-background transition-colors group-hover:bg-primary/20" />
                      </div>
                      {/* Content card */}
                      <div className="flex-1 rounded-lg border border-border/30 bg-card/50 p-4 transition-colors group-hover:border-border/60 group-hover:bg-card">
                        <div className="mb-1.5 flex items-center gap-3">
                          <time className="font-mono text-[11px] font-medium text-primary">{item.date}</time>
                          <span className="h-px flex-1 bg-border/40" />
                        </div>
                        <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tools */}
            <section>
              <h2 className="mb-8 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                工具栈
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="group relative flex flex-col gap-3 rounded-xl border border-border/30 bg-card/50 p-5 transition-all hover:border-border/60 hover:bg-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                        {tool.icon}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        {tool.tag}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tool.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="flex flex-col gap-10 lg:col-span-4">
            {/* Contact card */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                联系方式
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <Mail className="size-4 text-primary" />
                    hello@example.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <GitHubIcon className="size-4 text-primary" />
                    GitHub
                    <ArrowUpRight className="ml-auto size-3 opacity-40" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Currently learning */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                正在学习
              </p>
              <div className="flex flex-col gap-2.5">
                {learning.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="rounded-xl border border-border/30 bg-card/50 p-6">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                推荐资源
              </p>
              <ul className="flex flex-col gap-1">
                {resources.map((r) => (
                  <li key={r.name} className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary/50">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium text-foreground">{r.name}</span>
                      <span className="text-[11px] text-muted-foreground">{r.author}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                      {r.type}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* ── CTA ── */}
        <section className="mt-24 mb-6">
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card px-8 py-12 sm:px-12">
            {/* Subtle gradient glow */}
            <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2.5 text-base font-medium text-foreground">
                  <BookOpen className="size-4 text-primary" />
                  一起学习 CAE
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  如果你也在学习工程仿真，欢迎交流、讨论或分享你的经验。
                </p>
              </div>
              <a
                href="mailto:hello@example.com"
                className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              >
                发邮件联系我
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
