import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUpRight, BookOpen, Github, Menu, Moon, Sun, X } from 'lucide-react';
import { ARTICLES } from './data/generated';
import type { Article } from './types';

const PROFILE = {
  name: 'ReakNeel',
  eyebrow: 'CAE · COMPUTATION · SOFTWARE',
  intro: 'Engineering systems from simulation to software.',
  description: 'A personal technical archive covering computational engineering, automation, system architecture, and reproducible experiments.',
  github: 'https://github.com/reakneel',
};

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('cae-theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('cae-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ARTICLES;
    return ARTICLES.filter((article) => `${article.title} ${article.subtitle} ${article.tags.join(' ')}`.toLowerCase().includes(needle));
  }, [query]);

  const featured = ARTICLES.find((article) => article.featured) || ARTICLES[0];

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={() => setSelected(null)}>
          <span className="brand-mark">RN</span>
          <span>ReakNeel / CAE</span>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub <ArrowUpRight size={14} /></a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Toggle theme" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="work">
          <div className="hero-grid">
            <div>
              <p className="eyebrow">{PROFILE.eyebrow}</p>
              <h1>{PROFILE.intro}</h1>
              <p className="hero-copy">{PROFILE.description}</p>
              <div className="hero-links">
                <a className="button primary" href="#notes">Read the notes <ArrowUpRight size={15} /></a>
                <a className="button" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={15} /> Open GitHub</a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true">
              <span>01</span><i />
              <span>ENGINEERING</span>
              <span>ARCHIVE</span>
              <small>STATIC · REPRODUCIBLE · RESILIENT</small>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="section-label"><span>Selected work</span><span>01 / {String(Math.max(ARTICLES.length, 1)).padStart(2, '0')}</span></div>
          {featured && <article className="featured-card" onClick={() => setSelected(featured)}>
            <div className="featured-meta">{featured.category} · {featured.date}</div>
            <h2>{featured.title}</h2>
            <p>{featured.subtitle}</p>
            <div className="read-link">Open case note <ArrowUpRight size={16} /></div>
          </article>}
        </section>

        <section className="notes" id="notes">
          <div className="notes-heading">
            <div>
              <p className="eyebrow">Technical archive</p>
              <h2>Notes & essays</h2>
            </div>
            <input aria-label="Search notes" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive…" />
          </div>
          <div className="notes-list">
            {filtered.map((article, index) => (
              <article className="note-row" key={article.id} onClick={() => setSelected(article)}>
                <span className="note-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="note-main"><span>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p></div>
                <div className="note-date">{article.date}<ArrowUpRight size={17} /></div>
              </article>
            ))}
            {!filtered.length && <div className="empty">No notes match “{query}”.</div>}
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-label"><span>About</span><span>02</span></div>
          <div className="about-grid">
            <h2>{PROFILE.name}<br /><em>independent engineer.</em></h2>
            <div><p>I use computation, simulation, automation, and software architecture as one continuous engineering toolchain.</p><p>This site is deliberately content-first. Projects can evolve independently while the archive remains portable, versioned, and deployable as plain static assets.</p></div>
          </div>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} {PROFILE.name}</span><span>Built as a static, versioned engineering archive.</span></footer>

      {selected && <div className="reader-backdrop" onClick={() => setSelected(null)}>
        <article className="reader" onClick={(event) => event.stopPropagation()}>
          <button className="reader-close" aria-label="Close" onClick={() => setSelected(null)}><X size={20} /></button>
          <div className="reader-meta">{selected.category} · {selected.date} · {selected.readTimeMinutes} min</div>
          <h2>{selected.title}</h2>
          <p className="reader-lede">{selected.subtitle}</p>
          <div className="markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.content}</ReactMarkdown></div>
        </article>
      </div>}
    </div>
  );
}

export default App;
