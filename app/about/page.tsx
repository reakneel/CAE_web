import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Mail, Github, Layers, Wind, Cpu, Code2 } from "lucide-react"

const timeline = [
  {
    date: "2025 年 6 月",
    title: "开始接触 OpenFOAM",
    desc: "学习开源 CFD 求解器，完成顶盖驱动流、管道流等经典验证案例。",
  },
  {
    date: "2025 年 5 月",
    title: "完成首个 Abaqus 接触分析",
    desc: "赫兹接触仿真，结果与理论解误差小于 1%。",
  },
  {
    date: "2025 年 4 月",
    title: "系统学习 ANSYS Fluent",
    desc: "湍流模型选择、边界条件设置、后处理可视化全流程。",
  },
  {
    date: "2025 年 3 月",
    title: "深入学习有限元理论",
    desc: "研读《有限元方法：基本原理》，理解刚度矩阵、形函数等核心概念。",
  },
  {
    date: "2025 年 1 月",
    title: "开始 CAE 学习之旅",
    desc: "从 ANSYS Workbench 静力学分析入门，完成悬臂梁、平板拉伸等基础案例。",
  },
]

const tools = [
  { name: "ANSYS Workbench", desc: "结构静力学、模态分析、屈曲分析", icon: <Layers className="size-4" /> },
  { name: "Abaqus CAE", desc: "接触分析、非线性材料、用户子程序", icon: <Cpu className="size-4" /> },
  { name: "ANSYS Fluent", desc: "湍流仿真、传热分析、多相流", icon: <Wind className="size-4" /> },
  { name: "OpenFOAM", desc: "开源 CFD，自定义求解器开发", icon: <Code2 className="size-4" /> },
  { name: "SolidWorks", desc: "三维建模、装配体设计", icon: <Layers className="size-4" /> },
  { name: "Python", desc: "数据后处理、仿真自动化脚本", icon: <Code2 className="size-4" /> },
]

const resources = [
  { name: "《有限元方法》— O.C. Zienkiewicz", type: "教材" },
  { name: "《流体力学》— Frank M. White", type: "教材" },
  { name: "SimScale 官方文档", type: "在线文档" },
  { name: "ANSYS Learning Hub", type: "官方学习平台" },
  { name: "Engineering Explained (YouTube)", type: "视频教程" },
  { name: "Cornell CFD Online Forum", type: "社区" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <section className="pb-10 pt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">About</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            关于我
          </h1>
        </section>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <div className="mb-10">
              <p className="text-sm leading-relaxed text-muted-foreground">
                我是一名工科学生，对计算机辅助工程（CAE）充满热情。从大学里第一次接触有限元分析开始，
                我就被仿真技术的魅力所吸引——能够在数字世界里"看见"力学行为，这让我觉得工程学变得更加直观和有趣。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                这个博客记录的是一个真实的学习过程，不是教程，而是笔记。每一篇文章背后都有我踩过的坑、
                反复查阅的文档、以及终于调通仿真时的成就感。希望这些记录能对你有所启发。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                目前专注于结构有限元（ANSYS / Abaqus）和 CFD 流体仿真（Fluent / OpenFOAM）两个方向，
                同时学习 Python 脚本来提升后处理效率。长期目标是能够独立完成多物理场耦合仿真项目。
              </p>
            </div>

            <Separator className="mb-10 opacity-30" />

            {/* Timeline */}
            <div className="mb-10">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                学习历程
              </h2>
              <div className="relative flex flex-col gap-0">
                {timeline.map((item, i) => (
                  <div key={i} className="relative flex gap-5 pb-7 last:pb-0">
                    {/* Line */}
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[7px] top-4 h-full w-px bg-border/40" />
                    )}
                    {/* Dot */}
                    <div className="relative mt-1 size-3.5 shrink-0 rounded-full border border-primary/50 bg-primary/20" />
                    <div>
                      <time className="font-mono text-xs text-primary">{item.date}</time>
                      <h3 className="mt-0.5 text-sm font-medium text-foreground">{item.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-10 opacity-30" />

            {/* Tools */}
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                使用工具
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-start gap-3 rounded-lg border border-border/40 bg-card px-4 py-3"
                  >
                    <span className="mt-0.5 text-primary">{tool.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tool.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{tool.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            {/* Contact */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                联系方式
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-3.5 text-primary" />
                    hello@example.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="size-3.5 text-primary" />
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>

            <Separator className="opacity-30" />

            {/* Resources */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                推荐资源
              </p>
              <ul className="flex flex-col gap-3">
                {resources.map((r) => (
                  <li key={r.name}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-foreground">{r.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{r.type}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="opacity-30" />

            {/* Currently learning */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                正在学习
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "热-结构耦合分析",
                  "参数化仿真 (APDL)",
                  "疲劳后处理 (nCode)",
                  "Mesh 自适应加密",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-30" />

            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                博客统计
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "文章总数", value: "6" },
                  { label: "涉及软件", value: "4" },
                  { label: "仿真案例", value: "9" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="font-mono text-xs text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <section className="mt-16 mb-4">
          <div className="rounded-xl border border-border/40 bg-card px-8 py-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <BookOpen className="size-4 text-primary" />
                  一起学习 CAE
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  如果你也在学习工程仿真，欢迎交流、讨论或分享你的经验。
                </p>
              </div>
              <a
                href="mailto:hello@example.com"
                className="shrink-0 rounded border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
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
