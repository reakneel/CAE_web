"use client"

// Lightweight Markdown-like renderer for blog post content
// Supports: ## headings, ### subheadings, paragraphs, **bold**,
// `inline code`, code blocks (```), tables (|), and bullet lists (-)

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index))
    }
    const raw = match[0]
    if (raw.startsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground"
        >
          {raw.slice(1, -1)}
        </code>
      )
    } else if (raw.startsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {raw.slice(2, -2)}
        </strong>
      )
    }
    last = match.index + raw.length
  }

  if (last < text.length) {
    parts.push(text.slice(last))
  }
  return parts
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; lines: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; items: string[] }
  | { type: "empty" }

function parseContent(content: string): Block[] {
  const lines = content.split("\n")
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() })
      i++
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() })
      i++
    } else if (line.startsWith("```")) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      blocks.push({ type: "code", lang, lines: codeLines })
      i++ // skip closing ```
    } else if (line.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      // Parse table: row 0 = headers, row 1 = separator, rest = rows
      const parseRow = (row: string) =>
        row
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean)
      const headers = parseRow(tableLines[0])
      const rows = tableLines
        .slice(2)
        .filter((l) => !l.match(/^[\s|:-]+$/))
        .map(parseRow)
      blocks.push({ type: "table", headers, rows })
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2).trim())
        i++
      }
      blocks.push({ type: "list", items })
    } else if (line.trim() === "") {
      blocks.push({ type: "empty" })
      i++
    } else {
      blocks.push({ type: "paragraph", text: line.trim() })
      i++
    }
  }

  return blocks
}

export function PostContent({ content }: { content: string }) {
  const blocks = parseContent(content.trim())

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2": {
            const id = block.text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            return (
              <h2
                key={idx}
                id={id}
                className="mt-6 text-xl font-semibold tracking-tight text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            )
          }
          case "h3": {
            const id = block.text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            return (
              <h3
                key={idx}
                id={id}
                className="mt-4 text-base font-semibold text-foreground"
              >
                {block.text}
              </h3>
            )
          }
          case "paragraph":
            return (
              <p key={idx} className="text-sm leading-relaxed text-muted-foreground">
                {parseInline(block.text)}
              </p>
            )
          case "code":
            return (
              <div key={idx} className="overflow-hidden rounded-lg border border-border/50">
                {block.lang && (
                  <div className="border-b border-border/50 bg-secondary/50 px-4 py-2">
                    <span className="font-mono text-xs text-muted-foreground">{block.lang}</span>
                  </div>
                )}
                <pre className="overflow-x-auto bg-card p-4">
                  <code className="font-mono text-xs leading-relaxed text-foreground">
                    {block.lines.join("\n")}
                  </code>
                </pre>
              </div>
            )
          case "table":
            return (
              <div key={idx} className="overflow-x-auto rounded-lg border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-secondary/40">
                      {block.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-border/30 last:border-0 hover:bg-secondary/20"
                      >
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-2.5 text-xs text-muted-foreground">
                            {parseInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case "list":
            return (
              <ul key={idx} className="flex flex-col gap-1.5 pl-4">
                {block.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{parseInline(item)}</span>
                  </li>
                ))}
              </ul>
            )
          case "empty":
            return null
          default:
            return null
        }
      })}
    </div>
  )
}
