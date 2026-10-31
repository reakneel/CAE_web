import { Article, Comment, ReaderSettings } from '../types';
import { DEFAULT_ARTICLES } from '../data/articles';

const STORAGE_KEYS = {
  ARTICLES: 'cae_blog_user_articles_v1',
  BOOKMARKS: 'cae_blog_bookmarks_v1',
  LIKES: 'cae_blog_likes_v1',
  SETTINGS: 'cae_blog_reader_settings_v1',
  COMMENTS: 'cae_blog_comments_v1',
};

// Retrieve all articles (Default + User Created/Uploaded)
export function getAllArticles(): Article[] {
  try {
    const customArticlesJson = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    const userArticles: Article[] = customArticlesJson
      ? JSON.parse(customArticlesJson)
      : [];

    // Combine user articles with default ones (user articles first)
    const combined = [...userArticles, ...DEFAULT_ARTICLES];

    // Remove duplicates by ID or slug
    const uniqueMap = new Map<string, Article>();
    combined.forEach((art) => {
      if (!uniqueMap.has(art.slug) && !uniqueMap.has(art.id)) {
        uniqueMap.set(art.slug, art);
      }
    });

    return Array.from(uniqueMap.values());
  } catch (err) {
    console.error('Failed to load articles from storage:', err);
    return DEFAULT_ARTICLES;
  }
}

// Get single article by slug
export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug || a.id === slug) || null;
}

// Save or Update an Article
export function saveArticle(article: Article): void {
  try {
    const customArticlesJson = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    let userArticles: Article[] = customArticlesJson
      ? JSON.parse(customArticlesJson)
      : [];

    const existingIdx = userArticles.findIndex((a) => a.id === article.id);
    if (existingIdx !== -1) {
      userArticles[existingIdx] = { ...article, updatedAt: new Date().toISOString() };
    } else {
      userArticles.unshift({
        ...article,
        isUserCreated: true,
        updatedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(userArticles));
  } catch (err) {
    console.error('Failed to save article:', err);
  }
}

// Delete a user article
export function deleteArticle(articleId: string): void {
  try {
    const customArticlesJson = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!customArticlesJson) return;

    let userArticles: Article[] = JSON.parse(customArticlesJson);
    userArticles = userArticles.filter((a) => a.id !== articleId);

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(userArticles));
  } catch (err) {
    console.error('Failed to delete article:', err);
  }
}

// Bookmarks
export function getBookmarkedSlugs(): string[] {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(slug: string): boolean {
  const bookmarks = getBookmarkedSlugs();
  const index = bookmarks.indexOf(slug);
  let isBookmarked = false;

  if (index !== -1) {
    bookmarks.splice(index, 1);
    isBookmarked = false;
  } else {
    bookmarks.push(slug);
    isBookmarked = true;
  }

  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  return isBookmarked;
}

// Likes
export function getLikedSlugs(): string[] {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.LIKES);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export function toggleLikeArticle(slug: string): { isLiked: boolean } {
  const likes = getLikedSlugs();
  const index = likes.indexOf(slug);
  let isLiked = false;

  if (index !== -1) {
    likes.splice(index, 1);
    isLiked = false;
  } else {
    likes.push(slug);
    isLiked = true;
  }

  localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
  return { isLiked };
}

// Reader Settings
export const DEFAULT_READER_SETTINGS: ReaderSettings = {
  fontSize: 'base',
  fontFamily: 'sans',
  themeMode: 'dark',
  focusMode: false,
};

export function getReaderSettings(): ReaderSettings {
  try {
    const json = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return json ? { ...DEFAULT_READER_SETTINGS, ...JSON.parse(json) } : DEFAULT_READER_SETTINGS;
  } catch {
    return DEFAULT_READER_SETTINGS;
  }
}

export function saveReaderSettings(settings: Partial<ReaderSettings>): ReaderSettings {
  const current = getReaderSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
}

// Comments per article
export function getArticleComments(articleSlug: string): Comment[] {
  try {
    const json = localStorage.getItem(`${STORAGE_KEYS.COMMENTS}_${articleSlug}`);
    return json ? JSON.parse(json) : [
      {
        id: 'c-1',
        author: 'DevReader',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
        content: 'Great breakdown! The markdown studio feature and auto TOC make reading technical documentation so much easier.',
        date: '2026-07-21',
        likes: 5
      }
    ];
  } catch {
    return [];
  }
}

export function addArticleComment(articleSlug: string, content: string, author = 'Anonymous'): Comment {
  const comments = getArticleComments(articleSlug);
  const newComment: Comment = {
    id: `c-${Date.now()}`,
    author,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    content,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
  };

  comments.unshift(newComment);
  localStorage.setItem(`${STORAGE_KEYS.COMMENTS}_${articleSlug}`, JSON.stringify(comments));
  return newComment;
}
