import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Layers, Wind, Cpu, ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "自行车车架结构优化分析",
    category: "有限元分析",
    icon: <Layers className="size-5" />,
    status: "已完成",
    tags: ["ANSYS", "拓扑优化", "静力学", "模态分析"],
    desc: "对碳纤维公路自行车车架进行静强度、模态频率和拓扑优化分析。通过多工况静力学仿真（正常骑行、爬坡、紧急制动）找出应力集中区域，并利用拓扑优化在保证刚度的前提下减重约 18%。",
    highlights: [
      "建立完整车架几何模型并优化网格质量",
      "施加 6 种真实骑行工况载荷",
      "提取前 10 阶固有频率，验证避开激励频率",
      "拓扑优化后质量减少 18%，最大变形增加 < 5%",
    ],
    software: ["ANSYS Workbench", "SpaceClaim", "Python"],
  },
  {
    id: 2,
    title: "CPU 散热器 CFD 热流耦合仿真",
    category: "CFD 仿真",
    icon: <Wind className="size-5" />,
    status: "进行中",
    tags: ["Fluent", "传热", "k-omega SST", "强迫对流"],
    desc: "针对铝合金鳍片式 CPU 散热器进行定常热流耦合仿真，研究风扇转速、鳍片间距和鳍片厚度对散热性能的影响，为散热器设计提供参数化参考。",
    highlights: [
      "建立风道 + 散热器完整流域模型",
      "k-ω SST 湍流模型，求解 N-S + 能量方程",
      "研究 3 个设计变量各 3 个水平（共 27 工况）",
      "热阻最优方案比基准方案降低约 22%",
    ],
    software: ["ANSYS Fluent", "DesignModeler", "Python"],
  },
  {
    id: 3,
    title: "压力容器疲劳寿命评估",
    category: "结构力学",
    icon: <Cpu className="size-5" />,
    status: "规划中",
    tags: ["疲劳", "ASME 规范", "弹塑性", "Abaqus"],
    desc: "依据 ASME VIII 压力容器规范，对含开孔的压力容器接管区域进行弹塑性有限元分析，结合雨流计数法和损伤累积理论预测疲劳寿命，与规范许用寿命对比。",
    highlights: [
      "按照 ASME 规范建立疲劳分析流程",
      "弹塑性材料模型（随动硬化）",
      "雨流计数法提取循环载荷谱",
      "Miner 线性损伤累积预测寿命",
    ],
    software: ["Abaqus CAE", "Python", "nCode DesignLife"],
  },
]

const statusColor: Record<string, string> = {
  已完成: "border-primary/40 bg-primary/10 text-primary",
  进行中: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  规划中: "border-border/50 bg-secondary text-muted-foreground",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <section className="pb-10 pt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            项目实践
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            仿真项目记录
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            将课堂知识应用于真实工程问题，记录每个项目的方法、结果与经验教训。
          </p>
        </section>

        <Separator className="mb-12 opacity-30" />

        {/* Projects */}
        <div className="flex flex-col gap-10">
          {projects.map((project, idx) => (
            <article key={project.id}>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                {/* Left index */}
                <div className="flex shrink-0 flex-row items-start gap-4 lg:flex-col lg:items-center lg:gap-3 lg:pt-1">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    {project.icon}
                  </div>
                  <div className="flex lg:flex-col lg:items-center lg:gap-1">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-xs ${statusColor[project.status]}`}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>

                  <h2 className="mb-3 text-xl font-semibold leading-snug text-foreground">
                    {project.title}
                  </h2>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>

                  {/* Highlights */}
                  <div className="mb-5 rounded-lg border border-border/40 bg-card p-4">
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      主要成果
                    </p>
                    <ul className="flex flex-col gap-2">
                      {project.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                          <span className="text-xs leading-relaxed text-muted-foreground">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-2 py-0 text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="ml-auto flex flex-wrap gap-2">
                      {project.software.map((sw) => (
                        <span key={sw} className="font-mono text-xs text-muted-foreground">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {idx < projects.length - 1 && <Separator className="mt-10 opacity-30" />}
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="mb-4 mt-16">
          <div className="rounded-xl border border-border/40 bg-card px-8 py-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <ExternalLink className="size-4 text-primary" />
                  有意思的仿真项目？
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  如果你有想合作探索的 CAE 项目或问题，欢迎联系交流。
                </p>
              </div>
              <a
                href="mailto:hello@example.com"
                className="shrink-0 rounded border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                联系我
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
