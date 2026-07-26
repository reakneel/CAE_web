import React, { useState, useEffect, useMemo } from 'react';
import { Article, ReaderSettings } from './types';
import {
  getAllArticles,
  getArticleBySlug,
  saveArticle,
  getBookmarkedSlugs,
  toggleBookmark,
  getLikedSlugs,
  toggleLikeArticle,
  getReaderSettings,
  saveReaderSettings,
} from './utils/storage';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ArticleCard } from './components/ArticleCard';
import { ArticleReader } from './components/ArticleReader';
import { MarkdownStudio } from './components/MarkdownStudio';
import { SearchBar } from './components/SearchBar';
import { Footer } from './components/Footer';
import { BookOpen, X } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeView, setActiveView] = useState<'home' | 'reader' | 'studio'>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [showingBookmarks, setShowingBookmarks] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'title'>('latest');

  // Interactive UI
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light' | 'sepia'>('light');
  const [readerSettings, setReaderSettings] = useState<ReaderSettings>(getReaderSettings());

  // Initial Load & URL Hash Sync
  useEffect(() => {
    const loadedArticles = getAllArticles();
    setArticles(loadedArticles);
    setBookmarks(getBookmarkedSlugs());
    setLikes(getLikedSlugs());

    // Sync Hash Route
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/post/')) {
        const slug = hash.replace('#/post/', '');
        const art = getArticleBySlug(slug);
        if (art) {
          setSelectedArticle(art);
          setActiveView('reader');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#/studio') {
        setActiveView('studio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/bookmarks') {
        setShowingBookmarks(true);
        setActiveView('home');
      } else {
        setActiveView('home');
        setSelectedArticle(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync theme attribute on document root
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark', 'sepia');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Distinct Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [articles]);

  // Distinct Tags list
  const topTags = useMemo(() => {
    const tagMap = new Map<string, number>();
    articles.forEach((a) => {
      a.tags.forEach((t) => tagMap.set(t, (tagMap.get(t) || 0) + 1));
    });
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([t]) => t);
  }, [articles]);

  // Filtered Articles calculation
  const filteredArticles = useMemo(() => {
    return articles
      .filter((art) => {
        if (showingBookmarks && !bookmarks.includes(art.slug)) {
          return false;
        }
        if (selectedCategory !== 'All' && art.category !== selectedCategory) {
          return false;
        }
        if (selectedTag && !art.tags.includes(selectedTag)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [articles, selectedCategory, selectedTag, showingBookmarks, bookmarks, sortBy]);

  // Navigation Helpers
  const handleNavigateHome = () => {
    window.location.hash = '';
    setActiveView('home');
    setSelectedArticle(null);
    setShowingBookmarks(false);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveView('reader');
    window.location.hash = `#/post/${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudio = () => {
    setActiveView('studio');
    window.location.hash = '#/studio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (e?: React.MouseEvent, slug?: string) => {
    if (e) e.stopPropagation();
    const targetSlug = slug || selectedArticle?.slug;
    if (!targetSlug) return;

    toggleBookmark(targetSlug);
    setBookmarks(getBookmarkedSlugs());
  };

  const handleToggleLike = (e?: React.MouseEvent, slug?: string) => {
    if (e) e.stopPropagation();
    const targetSlug = slug || selectedArticle?.slug;
    if (!targetSlug) return;

    toggleLikeArticle(targetSlug);
    setLikes(getLikedSlugs());
  };

  const handleSaveStudioArticle = (newArticle: Article) => {
    saveArticle(newArticle);
    setArticles(getAllArticles());
    handleSelectArticle(newArticle);
  };

  const handleUpdateReaderSettings = (settings: Partial<ReaderSettings>) => {
    const updated = saveReaderSettings(settings);
    setReaderSettings(updated);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-sans antialiased selection:bg-[#4A5D4E] selection:text-white flex flex-col justify-between">
      <div>
        {/* Main Header */}
        <Header
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenStudio={handleOpenStudio}
          onNavigateHome={handleNavigateHome}
          onNavigateBookmarks={() => {
            setShowingBookmarks(!showingBookmarks);
            setActiveView('home');
            window.location.hash = !showingBookmarks ? '#/bookmarks' : '';
          }}
          showingBookmarks={showingBookmarks}
          activeView={activeView}
        />

        {/* View Switcher */}
        {activeView === 'home' && (
          <main>
            {/* Hero Banner */}
            <HeroBanner
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setShowingBookmarks(false);
              }}
              totalArticles={articles.length}
              onOpenStudio={handleOpenStudio}
            />

            {/* Articles Feed Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
              
              {/* Filter controls row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper pb-4">
                <div className="flex items-center space-x-3">
                  <span className="font-serif-editorial text-2xl font-semibold text-[var(--ink)]">
                    {showingBookmarks
                      ? 'Saved Archives'
                      : selectedCategory === 'All'
                      ? 'All Essays'
                      : `${selectedCategory} Essays`}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-semibold px-2 py-0.5 border border-paper bg-[var(--paper-card)] text-[#4A5D4E]">
                    {filteredArticles.length} ESSAYS
                  </span>

                  {selectedTag && (
                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 border border-[#4A5D4E] bg-[#4A5D4E]/10 text-[#4A5D4E] text-[10px] uppercase tracking-widest font-mono">
                      <span>#{selectedTag}</span>
                      <button onClick={() => setSelectedTag('')} className="hover:text-[var(--ink)]">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Tag Pills & Sort Selector */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="hidden lg:flex items-center space-x-1.5 text-[10px] uppercase tracking-widest font-mono text-[var(--ink)]/60">
                    <span className="mr-1 text-[#4A5D4E]">Topics:</span>
                    {topTags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTag(selectedTag === t ? '' : t)}
                        className={`px-2.5 py-1 border transition-colors ${
                          selectedTag === t
                            ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                            : 'bg-[var(--paper-card)] border-paper text-[var(--ink)]/60 hover:text-[var(--ink)]'
                        }`}
                      >
                        #{t}
                      </button>
                    ))}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[var(--paper-card)] border border-paper text-[var(--ink)] text-xs uppercase tracking-widest px-3 py-1.5 focus:outline-none focus:border-[#4A5D4E] cursor-pointer font-sans"
                  >
                    <option value="latest">Sort: Latest</option>
                    <option value="popular">Sort: Popular</option>
                    <option value="title">Sort: Title</option>
                  </select>
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((art) => (
                    <ArticleCard
                      key={art.id}
                      article={art}
                      onSelect={handleSelectArticle}
                      isBookmarked={bookmarks.includes(art.slug)}
                      isLiked={likes.includes(art.slug)}
                      onToggleBookmark={(e) => handleToggleBookmark(e, art.slug)}
                      onToggleLike={(e) => handleToggleLike(e, art.slug)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-paper bg-[var(--paper-card)] space-y-3">
                  <BookOpen className="w-10 h-10 text-[var(--ink)]/30 mx-auto" />
                  <h3 className="font-serif-editorial text-xl font-semibold text-[var(--ink)]">No essays match your filter</h3>
                  <p className="text-xs font-sans text-[var(--ink)]/60 max-w-sm mx-auto">
                    Try clearing tag filters or write a new .md essay via MD Studio.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedTag('');
                      setShowingBookmarks(false);
                    }}
                    className="inline-block px-4 py-2 border border-paper bg-[var(--paper)] text-xs font-semibold uppercase tracking-widest text-[var(--ink)] hover:border-[#4A5D4E] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </main>
        )}

        {/* Reader View */}
        {activeView === 'reader' && selectedArticle && (
          <ArticleReader
            article={selectedArticle}
            onBack={handleNavigateHome}
            isBookmarked={bookmarks.includes(selectedArticle.slug)}
            isLiked={likes.includes(selectedArticle.slug)}
            onToggleBookmark={() => handleToggleBookmark(undefined, selectedArticle.slug)}
            onToggleLike={() => handleToggleLike(undefined, selectedArticle.slug)}
            readerSettings={readerSettings}
            onUpdateReaderSettings={handleUpdateReaderSettings}
          />
        )}

        {/* Markdown Studio View */}
        {activeView === 'studio' && (
          <MarkdownStudio
            onSaveArticle={handleSaveStudioArticle}
            onBack={handleNavigateHome}
          />
        )}
      </div>

      {/* Global Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={handleSelectArticle}
      />

      {/* Footer */}
      <Footer onSelectCategory={setSelectedCategory} categories={categories} />
    </div>
  );
}
