import React from 'react';
import { Clock, Bookmark, Heart, Sparkles, UserCheck, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  isLiked: boolean;
  onToggleBookmark: (e: React.MouseEvent, slug: string) => void;
  onToggleLike: (e: React.MouseEvent, slug: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  isLiked,
  onToggleBookmark,
  onToggleLike,
}) => {
  return (
    <div
      onClick={() => onSelect(article)}
      className="group relative flex flex-col justify-between border border-paper bg-[var(--paper-card)] hover:border-[var(--ink)]/40 p-6 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Cover Image if available */}
      {article.coverImage && (
        <div className="relative w-full h-48 -mx-6 -mt-6 mb-5 overflow-hidden border-b border-paper bg-zinc-950">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper-card)]/90 via-transparent to-transparent" />

          {/* Category & Badge */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[var(--paper-card)] text-[var(--ink)] border border-paper shadow-sm">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[#4A5D4E] text-white flex items-center space-x-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
            {article.isUserCreated && (
              <span className="px-2 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[var(--paper-card)] text-[#4A5D4E] border border-[#4A5D4E]/30 flex items-center space-x-1">
                <UserCheck className="w-3 h-3" />
                <span>User MD</span>
              </span>
            )}
          </div>

          {/* Bookmark Action */}
          <button
            onClick={(e) => onToggleBookmark(e, article.slug)}
            className="absolute top-4 right-4 p-2 bg-[var(--paper-card)]/90 text-[var(--ink)] hover:text-[#4A5D4E] border border-paper transition-colors"
            title="Save essay"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#4A5D4E] text-[#4A5D4E]' : ''}`} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-3.5 flex-1">
        {!article.coverImage && (
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">
              {article.category}
            </span>
            <button
              onClick={(e) => onToggleBookmark(e, article.slug)}
              className="p-1 text-[var(--ink)]/50 hover:text-[#4A5D4E] transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#4A5D4E] text-[#4A5D4E]' : ''}`} />
            </button>
          </div>
        )}

        {/* Article Title */}
        <h3 className="font-serif-editorial text-2xl font-semibold text-[var(--ink)] group-hover:italic group-hover:text-[#4A5D4E] transition-all leading-snug tracking-tight">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs font-sans text-[var(--ink)]/70 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 border border-paper text-[var(--ink)]/60 bg-[var(--paper)]"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 text-[var(--ink)]/40">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-paper flex items-center justify-between text-xs text-[var(--ink)]/60">
        <div className="flex items-center space-x-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-5 h-5 rounded-full object-cover border border-paper"
          />
          <span className="text-[11px] font-medium text-[var(--ink)] font-serif-editorial italic">{article.author.name}</span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] uppercase tracking-wider font-mono text-[var(--ink)]/60">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-[#4A5D4E]" />
            <span>{article.readTimeMinutes} min</span>
          </div>

          <button
            onClick={(e) => onToggleLike(e, article.slug)}
            className="flex items-center space-x-1 hover:text-rose-600 transition-colors"
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{article.likes + (isLiked ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
