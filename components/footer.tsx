import Link from "next/link"
import { Cpu } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm font-semibold tracking-widest text-foreground"
            >
              <span className="flex size-6 items-center justify-center rounded border border-primary/40 bg-primary/10 text-primary">
                <Cpu className="size-3.5" />
              </span>
              CAE.BLOG
            </Link>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-xs">
              记录 CAE 工程仿真学习之路，涵盖有限元分析、CFD 流体仿真与结构力学。
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">分类</p>
              <ul className="flex flex-col gap-2">
                {["有限元分析", "CFD 仿真", "结构力学", "项目实践"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/blog"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">链接</p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "关于我", href: "/about" },
                  { label: "RSS", href: "#" },
                  { label: "GitHub ↗", href: "https://github.com" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 opacity-30" />

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CAE 学习日志 · 用代码与仿真探索工程世界
        </p>
      </div>
    </footer>
  )
}
