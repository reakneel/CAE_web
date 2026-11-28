import React from 'react';
import { Feather, BookOpen, Sparkles, Filter } from 'lucide-react';

interface HeroBannerProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalArticles: number;
  onOpenStudio: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalArticles,
  onOpenStudio,
}) => {
  return (
    <div className="relative border-b border-paper bg-[var(--paper)] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Hero Header */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">
              <span className="w-2 h-2 rounded-full bg-[#4A5D4E]" />
              <span>CAE Editorial Publication — Issue No. 04</span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.08]">
              The Quiet Evolution of <span className="italic font-semibold text-[var(--accent)]">Markdown Structures</span> & Modern Essays
            </h1>

            <p className="text-sm sm:text-base font-sans text-[var(--ink)]/70 max-w-2xl leading-relaxed">
              Curated articles and technical explorations. Upload your local Markdown files, view YAML frontmatter metadata, auto-generate AI summaries, and read in pristine typography.
            </p>
          </div>

          {/* Right Action & Stats Box */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-4 border-l lg:border-l-0 border-paper pl-4 lg:pl-0">
            <div className="p-4 border border-paper bg-[var(--paper-card)] w-full max-w-xs space-y-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[var(--ink)]/60 font-semibold">
                <span>Repository Stats</span>
                <span className="text-[#4A5D4E] font-mono">{totalArticles} ESSAYS</span>
              </div>
              <div className="h-px bg-paper" />
              <p className="text-xs text-[var(--ink)]/70 font-serif-editorial italic">
                “Architecture is the learned game, correct and magnificent, of forms assembled in the light.”
              </p>
              <button
                onClick={onOpenStudio}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-[#4A5D4E] text-white font-sans text-xs font-semibold uppercase tracking-widest hover:bg-[#627867] transition-all"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Write / Import Article</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-10 pt-6 border-t border-paper flex items-center space-x-3 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--ink)]/50 shrink-0 pr-3 border-r border-paper">
            <Filter className="w-3 h-3 text-[#4A5D4E]" />
            <span>Topics</span>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className={`px-4 py-1.5 text-[11px] uppercase tracking-widest font-semibold transition-all border ${
              selectedCategory === 'All'
                ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                : 'bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[var(--ink)] border-paper'
            }`}
          >
            All Essays ({totalArticles})
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-1.5 text-[11px] uppercase tracking-widest font-semibold transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                  : 'bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[var(--ink)] border-paper hover:border-[var(--ink)]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
