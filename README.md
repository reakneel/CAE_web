# CAE 学习日志 | 工程仿真探索之路

一个基于 Next.js 15 + React 19 + TypeScript 构建的 CAE（计算机辅助工程）学习笔记博客网站。记录有限元分析、流体仿真、结构力学等工程仿真领域的学习历程与项目实践。

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2-38bdf8?logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

## 📖 项目简介

这是一个专注于 CAE 工程仿真的技术博客平台，主要记录以下领域的学习内容：

- **有限元分析 (FEA)** - ANSYS、Abaqus 等软件的使用心得
- **计算流体动力学 (CFD)** - Fluent、OpenFOAM 仿真实践
- **结构力学** - 稳定性分析、疲劳与断裂力学
- **Python 编程** - 自动化后处理与数据可视化

## ✨ 特性

- 🚀 **现代化技术栈** - Next.js 15 App Router + React 19 + TypeScript
- 🎨 **精美 UI 设计** - 基于 shadcn/ui 组件库，支持深色模式
- 📱 **响应式布局** - 完美适配桌面端和移动端
- ⚡ **高性能** - 服务端渲染 (SSR) + 静态生成，极致加载速度
- 🔍 **SEO 优化** - 完善的元数据配置，利于搜索引擎收录
- 📊 **数据分析** - 集成 Vercel Analytics 访问统计

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 15, React 19 |
| **语言** | TypeScript 5.7 |
| **样式** | Tailwind CSS 4.2 |
| **UI 组件** | shadcn/ui, Base UI |
| **图标** | Lucide React |
| **部署** | Vercel |
| **包管理** | pnpm |

## 📦 安装与运行

### 前置要求

- Node.js 18+ 
- pnpm 8+

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd <project-directory>

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

```
├── app/                    # Next.js App Router 目录
│   ├── about/             # 关于页面
│   ├── api/               # API 路由
│   ├── blog/              # 博客文章列表及详情
│   ├── finance/           # 财务相关页面
│   ├── projects/          # 项目展示页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   └── page.tsx           # 首页组件
├── components/            # React 组件
│   ├── ui/                # 基础 UI 组件
│   ├── footer.tsx         # 页脚组件
│   ├── navbar.tsx         # 导航栏组件
│   └── post-content.tsx   # 文章内容组件
├── data/                  # 数据文件
│   └── finance/           # 财务数据
├── lib/                   # 工具函数和配置
│   └── blog-data.ts       # 博客文章数据
├── public/                # 静态资源
├── components.json        # shadcn/ui 配置
├── next.config.mjs        # Next.js 配置
├── package.json           # 项目依赖
├── postcss.config.mjs     # PostCSS 配置
└── tsconfig.json          # TypeScript 配置
```

## 📝 添加博客文章

在 `lib/blog-data.ts` 中添加新的文章数据：

```typescript
{
  slug: "article-slug",
  title: "文章标题",
  excerpt: "文章摘要",
  date: "2025-01-01",
  category: "分类名称",
  tags: ["标签 1", "标签 2"],
  readTime: 5,
  content: "文章内容..."
}
```

## 🎨 自定义配置

### 主题颜色

在 `app/globals.css` 中修改 CSS 变量来自定义主题色。

### 站点信息

在 `app/layout.tsx` 中修改 `metadata` 对象来更新站点标题、描述等信息。

## 📄 许可证

MIT License

## 👤 作者

一名正在系统学习 CAE 工程仿真的学生。

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel](https://vercel.com)

---

**用仿真探索工程世界** 🚀
