import { Article, TOCItem } from '../types';

/**
 * Extracts YAML frontmatter and content body from Markdown string
 */
export function parseFrontmatter(markdown: string): {
  data: Record<string, any>;
  content: string;
} {
  if (!markdown) return { data: {}, content: '' };

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: markdown.trim() };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1) {
      const key = trimmed.slice(0, colonIdx).trim();
      let val = trimmed.slice(colonIdx + 1).trim();

      // Handle quotes
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      // Handle array format [a, b, c]
      else if (val.startsWith('[') && val.endsWith(']')) {
        val = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
          .filter(Boolean) as any;
      }
      // Handle boolean
      else if (val === 'true') val = true as any;
      else if (val === 'false') val = false as any;
      // Handle numbers
      else if (!isNaN(Number(val)) && val !== '') val = Number(val) as any;

      data[key] = val;
    }
  });

  return { data, content };
}

/**
 * Estimates reading time in minutes based on CJK characters or Latin words
 */
export function estimateReadingTime(content: string): number {
  if (!content) return 1;
  // Count CJK characters
  const cjkCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  // Count Latin words
  const latinWords = content
    .replace(/[\u4e00-\u9fa5]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const totalMinutes = Math.ceil(cjkCount / 300 + latinWords / 200);
  return Math.max(1, totalMinutes);
}

/**
 * Generates slug from text string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Extracts headings from markdown for Table of Contents
 */
export function extractTableOfContents(content: string): TOCItem[] {
  if (!content) return [];
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = match[2].replace(/[\*\_`~]/g, '').trim();
    const id = slugify(rawText);

    toc.push({
      id: id || `heading-${toc.length}`,
      text: rawText,
      level,
    });
  }

  return toc;
}

/**
 * Serializes an article object back into a Markdown string with YAML frontmatter
 */
export function serializeArticleToMarkdown(article: Partial<Article>): string {
  const tagsStr = Array.isArray(article.tags)
    ? `[${article.tags.map((t) => `"${t}"`).join(', ')}]`
    : '[]';

  const frontmatterLines = [
    '---',
    `title: "${article.title || 'Untitled Article'}"`,
    article.subtitle ? `subtitle: "${article.subtitle}"` : null,
    `date: "${article.date || new Date().toISOString().split('T')[0]}"`,
    `category: "${article.category || 'Tech'}"`,
    `tags: ${tagsStr}`,
    `author: "${article.author?.name || 'Anonymous'}"`,
    article.coverImage ? `coverImage: "${article.coverImage}"` : null,
    `featured: ${Boolean(article.featured)}`,
    '---',
    '',
    article.content || '',
  ].filter((line) => line !== null);

  return frontmatterLines.join('\n');
}
