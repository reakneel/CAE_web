import { Article } from '../types';

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 'art-001',
    slug: 'modern-web-architecture-2026',
    title: 'Modern Web Architecture & Markdown-First Content Systems',
    subtitle: 'Rethinking frontend content routing, hydration performance, and static vs dynamic markdown rendering.',
    excerpt: 'Explore why traditional dynamic markdown parsing on client fetch causes performance bottlenecks, and how unified content architecture creates zero-delay editorial blogs.',
    date: '2026-07-20',
    category: 'Architecture',
    tags: ['WebDev', 'Markdown', 'Performance', 'Architecture'],
    author: {
      name: 'ReakNeel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'Lead Architect'
    },
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    readTimeMinutes: 5,
    featured: true,
    likes: 128,
    views: 1420,
    aiSummary: 'This article analyzes the bottlenecks of traditional dynamic markdown fetching and details a hybrid content architecture combining instant local caching, automated YAML frontmatter extraction, and real-time interactive studio capabilities.',
    content: `
# Modern Web Architecture & Markdown-First Content Systems

Managing blog posts with Markdown (\`.md\` files) is the gold standard for developer-centric content publishing. However, traditional approaches that fetch and parse raw Markdown on every client route change often suffer from flickering, unstyled layouts, missing Table of Contents, and complex routing requirements.

In this guide, we explore how to build a **Zero-Delay Modern Blog** using structured Frontmatter indexing and interactive client-side caching.

---

## 1. The Core Bottleneck of Client-Side Raw Parsing

When a blog application dynamically fetches \`.md\` files over HTTP and parses them client-side:

1. **Network Latency Waterfall**: The browser must first load the app bundle, then request the specific \`.md\` file, wait for payload response, and finally execute the Markdown parser.
2. **Missing Metadata**: Standard Markdown files lack native metadata unless YAML frontmatter (\`---\`) is systematically parsed and indexed.
3. **Typography & Styling Gaps**: Raw HTML converted from markdown often misses syntax highlighting, code line numbers, copy buttons, and responsive heading anchors.

\`\`\`typescript
// Traditional Naive Fetch Pattern (Prone to layout shift)
useEffect(() => {
  fetch('/data/post.md')
    .then(res => res.text())
    .then(md => setHtml(marked.parse(md)));
}, [slug]);
\`\`\`

---

## 2. The Hybrid Content Solution

To achieve **instant load times** and **flawless SEO/routing**, we adopt a hybrid architecture:

> [!NOTE]
> By extracting YAML frontmatter during indexing, articles gain first-class attributes like \`title\`, \`category\`, \`tags\`, \`readTimeMinutes\`, and \`coverImage\`.

### Architectural Highlights

- **Static Frontmatter Index**: Fast lookup by slug without network round-trips.
- **Client-Side Live Studio**: Upload or drop any \`.md\` file, automatically parsing metadata and rendering instant previews.
- **Interactive Table of Contents**: Real-time heading observation using IntersectionObserver.

\`\`\`yaml
---
title: "Modern Web Architecture"
date: "2026-07-20"
category: "Architecture"
tags: ["WebDev", "Performance", "Markdown"]
author: "ReakNeel"
---
\`\`\`

---

## 3. Performance Metrics Comparison

| Architecture Model | Initial Render Time | Routing Feel | Drag & Drop Studio |
| :--- | :--- | :--- | :--- |
| **Legacy Dynamic Fetch** | ~850ms | Janky / Flash | ❌ No |
| **Hybrid CAE Modern Blog** | **< 15ms** | **Butter Smooth** | **✅ Yes** |

---

## 4. Code Block Syntax Highlighting Test

Below is an example of Rust code with full syntax highlighting support:

\`\`\`rust
fn main() {
    let articles = vec!["Markdown", "Web Architecture", "Modern UI"];
    for article in &articles {
        println!("Publishing post: {}", article);
    }
}
\`\`\`

## Key Takeaways

1. Structure your articles with clear YAML frontmatter.
2. Use client-side storage for instant drafts and dynamic uploads.
3. Provide rich reader customization (dark mode, typography settings, and AI summaries).
`
  },
  {
    id: 'art-002',
    slug: 'ui-ux-aesthetics-for-modern-blogs',
    title: 'Designing Ultra-Refined Digital Editorial Experiences',
    subtitle: 'How typography contrast, fluid light/dark themes, and micro-interactions elevate content reading.',
    excerpt: 'An in-depth design study on typography scales, padding rhythm, anti-slop visual patterns, and building reading environments readers love.',
    date: '2026-07-18',
    category: 'Design',
    tags: ['UI/UX', 'Tailwind', 'Typography', 'DesignSystem'],
    author: {
      name: 'Sarah Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      role: 'UI/UX Designer'
    },
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    readTimeMinutes: 4,
    featured: false,
    likes: 94,
    views: 890,
    aiSummary: 'This design essay breaks down principles for building ultra-readable editorial blogs: mathematical line heights, warm neutral palettes, sticky collapsible outline navigation, and distraction-free reader modes.',
    content: `
# Designing Ultra-Refined Digital Editorial Experiences

Great blog design is invisible—it places the content front and center while guiding the eye effortlessly across headings, paragraphs, and media callouts.

In this article, we cover key principles for applying modern aesthetic standards to developer and engineering blogs.

---

## 1. Mathematical Typographic Scales

Reading comfort depends heavily on **line height** and **line length**. 

- **Line Height**: Maintain \`1.6\` to \`1.75\` for body text.
- **Line Length**: Limit content container width to \`65ch\`–\`75ch\` to prevent reader eye fatigue.
- **Contrast Ratios**: Aim for WCAG AA standard (at least 4.5:1 ratio).

> [!TIP]
> Avoid pure black \`#000000\` on pure white \`#ffffff\`. Use warm zinc or slate tones like \`#09090b\` and \`#f8fafc\` for softer visual appeal.

---

## 2. Interactive Reader Enhancements

Modern readers expect personalized reading modes:

- **Font Size Zooming**: Adjust body text scale smoothly.
- **Distraction-Free Focus Mode**: Hide sidebar navigation during long reading sessions.
- **Interactive Code Blocks**: One-click code copying and language indicators.

\`\`\`css
/* Smooth Reader Focus Transition */
.reader-container {
  max-width: 68ch;
  margin: 0 auto;
  line-height: 1.75;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
\`\`\`

## Conclusion

When functional architecture aligns with intentional design, reading technical content becomes an inspiring experience.
`
  },
  {
    id: 'art-003',
    slug: 'react-19-and-tailwind-v4-guide',
    title: 'Building High Performance Apps with React 19 & Tailwind v4',
    subtitle: 'Leveraging modern hooks, CSS-first Tailwind configuration, and server-side Gemini integration.',
    excerpt: 'A hands-on engineering guide to utilizing modern frontend tools, full-stack API routes, and instant responsive layouts.',
    date: '2026-07-15',
    category: 'Engineering',
    tags: ['React', 'TypeScript', 'Tailwind', 'Performance'],
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      role: 'Staff Engineer'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    readTimeMinutes: 6,
    featured: false,
    likes: 210,
    views: 2150,
    aiSummary: 'A practical technical breakdown showcasing how React 19 concurrent features and Tailwind CSS v4 streamline component design and styling without runtime overhead.',
    content: `
# Building High Performance Apps with React 19 & Tailwind v4

React 19 and Tailwind CSS v4 introduce significant improvements in developer ergonomics, CSS build speeds, and component composition.

---

## 1. What makes Tailwind CSS v4 special?

Tailwind v4 moves configuration directly into CSS using \`@import "tailwindcss";\`. This removes complex configuration files while boosting build times with Vite.

\`\`\`css
/* src/index.css */
@import "tailwindcss";

@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
\`\`\`

---

## 2. Server-Side Gemini API Proxy Pattern

To keep API keys secure while empowering blog posts with AI auto-summaries, we proxy Gemini requests through Express:

\`\`\`typescript
// server.ts
app.post('/api/ai/summarize', async (req, res) => {
  const { content } = req.body;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Summarize: \${content}\`,
  });
  res.json({ summary: response.text });
});
\`\`\`

---

## 3. Best Practices Checklist

- [x] Use TypeScript interfaces for all data contracts.
- [x] Use server-side proxy routes for secret keys.
- [x] Use smooth motion transitions for view changes.
- [x] Support full offline or local caching for user drafts.
`
  }
];
