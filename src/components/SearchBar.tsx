import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpRight, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = articles.filter((art) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-2xl bg-[var(--paper-card)] border border-paper shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-paper bg-[var(--paper)]">
          <Search className="w-5 h-5 text-[#4A5D4E] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search essays, topics, tags (e.g., React, Architecture)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[var(--ink)] placeholder-[var(--ink)]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 border border-paper text-[var(--ink)]/60 hover:text-[var(--ink)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-paper">
          {filtered.length > 0 ? (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="group flex items-center justify-between p-3.5 hover:bg-[var(--paper)] transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#4A5D4E]">
                    <span className="font-semibold">{art.category}</span>
                    <span>•</span>
                    <span className="font-mono">{art.date}</span>
                  </div>
                  <h4 className="font-serif-editorial text-lg font-semibold text-[var(--ink)] group-hover:italic group-hover:text-[#4A5D4E] transition-all">
                    {art.title}
                  </h4>
                  <p className="text-xs font-sans text-[var(--ink)]/70 line-clamp-1">{art.excerpt}</p>
                </div>

                <ArrowUpRight className="w-4 h-4 text-[var(--ink)]/40 group-hover:text-[#4A5D4E] transition-colors ml-3 shrink-0" />
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-xs font-serif-editorial italic text-[var(--ink)]/50 space-y-2">
              <BookOpen className="w-8 h-8 text-[var(--ink)]/30 mx-auto" />
              <p>No essays found matching "{query}".</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[var(--paper)] border-t border-paper flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[var(--ink)]/60">
          <span>{filtered.length} RESULTS FOUND</span>
          <div className="flex items-center space-x-2">
            <span>PRESS</span>
            <kbd className="px-1.5 py-0.5 border border-paper bg-[var(--paper-card)] text-[var(--ink)]">ESC</kbd>
            <span>TO CLOSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
