import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  categories: string[];
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, categories }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[var(--paper-card)] border-t border-paper pt-12 pb-10 px-4 sm:px-6 lg:px-8 text-[var(--ink)] text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-paper bg-[var(--paper)] flex items-center justify-center font-serif-editorial text-xl font-bold italic text-[#4A5D4E]">
                C.
              </div>
              <span className="font-serif-editorial text-2xl font-semibold tracking-tight text-[var(--ink)]">
                CAE Editorial
              </span>
            </div>
            <p className="font-sans text-xs text-[var(--ink)]/70 max-w-sm leading-relaxed">
              High-performance editorial platform featuring YAML frontmatter parsing, drag-and-drop Markdown importer, interactive Table of Contents, and Gemini AI auto-summaries.
            </p>
            <div className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-widest text-[var(--ink)]/50">
              <span className="px-2 py-0.5 border border-paper bg-[var(--paper)]">React 19</span>
              <span className="px-2 py-0.5 border border-paper bg-[var(--paper)]">Tailwind v4</span>
              <span className="px-2 py-0.5 border border-paper bg-[var(--paper)]">Gemini 2.5</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#4A5D4E]">Essays & Topics</h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => onSelectCategory('All')} className="hover:text-[#4A5D4E] transition-colors">
                  All Essays
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button onClick={() => onSelectCategory(cat)} className="hover:text-[#4A5D4E] transition-colors">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 border border-paper bg-[var(--paper)] hover:border-[#4A5D4E] text-[var(--ink)] text-xs uppercase tracking-widest transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#4A5D4E]" />
            </button>

            <div className="text-right text-[10px] uppercase tracking-widest text-[var(--ink)]/50 font-mono">
              Editorial Aesthetic — MMXXVI
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-paper flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-widest text-[var(--ink)]/50 gap-2">
          <div>
            © {new Date().getFullYear()} CAE Editorial. Markdown Publishing System.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-600 inline fill-rose-600" />
            <span>and Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
