import Link from "next/link"
import { Cpu } from "lucide-react"

const categories = [
  { name: "有限元分析", href: "/blog" },
  { name: "CFD 仿真", href: "/blog" },
  { name: "结构力学", href: "/blog" },
  { name: "项目实践", href: "/projects" },
  { name: "A股复盘", href: "/finance" },
]

const links = [
  { label: "关于我", href: "/about" },
  { label: "学习笔记", href: "/blog" },
  { label: "A股复盘", href: "/finance" },
  { label: "GitHub", href: "https://github.com", external: true },
]

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/40">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2.5 group w-fit"
            >
              <span className="flex size-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Cpu className="size-3.5" />
              </span>
              <span className="font-mono text-sm font-semibold tracking-[0.15em] text-foreground">
                CAE.BLOG
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              记录 CAE 工程仿真学习之路，涵盖有限元分析、CFD 流体仿真与结构力学。
            </p>
          </div>

          {/* Categories */}
          <div className="sm:col-span-3">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              分类
            </p>
            <ul className="flex flex-col gap-2.5">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="sm:col-span-2">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              链接
            </p>
            <ul className="flex flex-col gap-2.5">
              {links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                    {item.external && <span className="text-xs opacity-50">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe placeholder */}
          <div className="sm:col-span-2">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              订阅
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              RSS 订阅即将上线
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/30 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CAE 学习日志
          </p>
          <p className="font-mono text-[11px] text-muted-foreground/60">
            用代码与仿真探索工程世界
          </p>
        </div>
      </div>
    </footer>
  )
}
