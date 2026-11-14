import React from 'react';
import { Search, PlusCircle, Sun, Moon, Bookmark, Feather } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light' | 'sepia';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenStudio: () => void;
  onNavigateHome: () => void;
  onNavigateBookmarks: () => void;
  showingBookmarks: boolean;
  activeView: 'home' | 'reader' | 'studio';
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenStudio,
  onNavigateHome,
  onNavigateBookmarks,
  showingBookmarks,
  activeView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--paper)]/90 border-b border-paper transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={onNavigateHome}>
          <div className="w-10 h-10 border border-[var(--paper-border)] bg-[var(--paper-card)] flex items-center justify-center transition-transform duration-200 group-hover:border-[#4A5D4E]">
            <span className="font-serif-editorial text-2xl font-bold italic text-[var(--accent)]">C.</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif-editorial text-2xl font-semibold tracking-tight text-[var(--ink)] group-hover:italic transition-all">
                CAE Editorial
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 border border-[#4A5D4E]/30 text-[#4A5D4E] bg-[#4A5D4E]/10">
                MMXXVI
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--ink)]/50 -mt-0.5 hidden sm:block">
              Markdown Archive & Essays
            </p>
          </div>
        </div>

        {/* Center Actions / Editorial Search Trigger */}
        <div className="flex-1 max-w-md mx-6 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-4 py-2 border border-paper bg-[var(--paper-card)] text-[var(--ink)]/60 hover:text-[var(--ink)] hover:border-[#4A5D4E] transition-all text-xs group"
          >
            <div className="flex items-center space-x-2.5">
              <Search className="w-3.5 h-3.5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              <span className="font-sans text-[11px] tracking-wide">Search archives, essays, tags...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono opacity-50 border border-paper uppercase">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center space-x-3 text-[11px] uppercase tracking-widest font-semibold">
          {/* Mobile Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 border border-paper text-[var(--ink)]/70 hover:text-[var(--ink)] md:hidden"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks */}
          <button
            onClick={onNavigateBookmarks}
            className={`flex items-center space-x-1.5 px-3.5 py-2 border transition-all ${
              showingBookmarks
                ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                : 'border-paper text-[var(--ink)]/70 hover:text-[var(--ink)] hover:border-[var(--ink)]/30 bg-[var(--paper-card)]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showingBookmarks ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline">Archive</span>
          </button>

          {/* MD Studio */}
          <button
            onClick={onOpenStudio}
            className={`flex items-center space-x-1.5 px-4 py-2 border transition-all ${
              activeView === 'studio'
                ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:opacity-90'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>MD Studio</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 border border-paper bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors"
            title={`Switch Theme (${theme})`}
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-amber-300" />
            ) : (
              <Sun className="w-4 h-4 text-[#4A5D4E]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
