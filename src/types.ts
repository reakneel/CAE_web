export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  coverImage?: string;
  readTimeMinutes: number;
  featured?: boolean;
  likes: number;
  views: number;
  isUserCreated?: boolean;
  aiSummary?: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'sans' | 'serif' | 'mono';
  themeMode: 'light' | 'dark' | 'sepia';
  focusMode: boolean;
}

export type ArticleFilter = {
  searchQuery: string;
  selectedCategory: string;
  selectedTag: string;
  sortBy: 'latest' | 'popular' | 'title';
};

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}
