// Bootstrap content. `npm run content:build` regenerates this file from content/posts/*.md.
import type { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'post-modern-engineering',
    slug: 'modern-engineering-notes',
    title: 'Engineering Notes',
    subtitle: 'Computational engineering, automation, software architecture, and the experiments behind the work.',
    excerpt: 'A living notebook for engineering systems, simulation, automation, and the web infrastructure that connects them.',
    date: '2026-09-13',
    category: 'Engineering',
    tags: ['CAE', 'Software', 'Automation'],
    author: { name: 'ReakNeel', avatar: '', role: 'Independent Engineer' },
    coverImage: '',
    readTimeMinutes: 4,
    featured: true,
    likes: 0,
    views: 0,
    aiSummary: 'The first entry in a static-first professional knowledge base.',
    content: '# Engineering Notes\n\nThis site is a **professional engineering notebook** rather than a generic personal blog.\n\nI work at the boundary between computational engineering, simulation, automation, and software systems.\n\n## What belongs here\n\n- CAE and numerical simulation workflows\n- Engineering software and automation\n- System architecture and developer tooling\n- Reproducible experiments and technical notes\n- Selected project case studies\n\n> Build systems that are easy to understand, easy to reproduce, and hard to lose.\n',
  },
];
