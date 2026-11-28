import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Bookmark,
  Heart,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  Copy,
  MessageSquare,
  Send,
  List,
  Maximize2,
  Minimize2,
  Bot,
  Feather
} from 'lucide-react';
import { Article, ReaderSettings, Comment } from '../types';
import { extractTableOfContents } from '../utils/markdownParser';
import { getArticleComments, addArticleComment } from '../utils/storage';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  isLiked: boolean;
  onToggleBookmark: (slug: string) => void;
  onToggleLike: (slug: string) => void;
  readerSettings: ReaderSettings;
  onUpdateReaderSettings: (settings: Partial<ReaderSettings>) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  isBookmarked,
  isLiked,
  onToggleBookmark,
  onToggleLike,
  readerSettings,
  onUpdateReaderSettings,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // AI Summary State
  const [aiSummary, setAiSummary] = useState<string | null>(article.aiSummary || null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Extract TOC
  const toc = extractTableOfContents(article.content);

  // Scroll Progress Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load comments
  useEffect(() => {
    setComments(getArticleComments(article.slug));
  }, [article.slug]);

  // Heading Intersection Observer for TOC highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id]');
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [article.content]);

  // Handle Like with Confetti
  const handleLikeClick = () => {
    onToggleLike(article.slug);
    if (!isLiked) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4A5D4E', '#1A1A1A', '#627867', '#89A891'],
      });
    }
  };

  // Handle Copy Article Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle Copy Code Block
  const handleCopyCode = (codeText: string, id: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Text-To-Speech Audio Reader
  const toggleAudioReader = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported in your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const plainText = article.title + '. ' + article.content.replace(/[#*_\`~]/g, '');
      const utterance = new SpeechSynthesisUtterance(plainText.slice(0, 3000));
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Generate Gemini AI Summary
  const handleGenerateAiSummary = async () => {
    setIsGeneratingSummary(true);
    setSummaryError(null);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
        }),
      });

      const data = await res.json();
      if (res.ok && data.summary) {
        setAiSummary(data.summary);
      } else {
        setSummaryError(data.error || 'Could not generate summary.');
        if (data.fallback) {
          setAiSummary(data.fallback);
        }
      }
    } catch (err: any) {
      console.error('Failed to call AI summary API:', err);
      setSummaryError('Network error connecting to AI service.');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const added = addArticleComment(
      article.slug,
      newCommentText,
      commentAuthor.trim() || 'Anonymous Reader'
    );
    setComments([added, ...comments]);
    setNewCommentText('');
  };

  // Font Size CSS mapping
  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)] pb-24">
      {/* Scroll Progress Bar at Viewport Top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-paper z-50">
        <div
          className="h-full bg-[#4A5D4E] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Navigation & Controls Bar */}
      <div className="sticky top-20 z-30 w-full bg-[var(--paper)]/95 backdrop-blur-md border-b border-paper px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-paper bg-[var(--paper-card)] text-xs font-semibold uppercase tracking-widest text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Archive</span>
          </button>

          {/* Controls Toolbar */}
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest">
            {/* Audio Reader */}
            <button
              onClick={toggleAudioReader}
              className={`flex items-center space-x-1.5 px-3 py-1.5 border transition-all ${
                isPlayingAudio
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] animate-pulse'
                  : 'border-paper bg-[var(--paper-card)] text-[var(--ink)]/80 hover:text-[var(--ink)]'
              }`}
              title="Listen to Essay"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pause Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span className="hidden sm:inline">Listen</span>
                </>
              )}
            </button>

            {/* Font Size Selector */}
            <div className="flex items-center border border-paper bg-[var(--paper-card)] p-0.5">
              {(['sm', 'base', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateReaderSettings({ fontSize: size })}
                  className={`px-2.5 py-1 font-mono uppercase text-[10px] ${
                    readerSettings.fontSize === size
                      ? 'bg-[var(--ink)] text-[var(--paper)] font-bold'
                      : 'text-[var(--ink)]/60 hover:text-[var(--ink)]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Focus Mode */}
            <button
              onClick={() => onUpdateReaderSettings({ focusMode: !readerSettings.focusMode })}
              className={`p-2 border transition-colors ${
                readerSettings.focusMode
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                  : 'border-paper bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[var(--ink)]'
              }`}
              title="Focus Mode"
            >
              {readerSettings.focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Save & Like */}
            <button
              onClick={() => onToggleBookmark(article.slug)}
              className="p-2 border border-paper bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[#4A5D4E]"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#4A5D4E] text-[#4A5D4E]' : ''}`} />
            </button>

            <button
              onClick={handleLikeClick}
              className="p-2 border border-paper bg-[var(--paper-card)] text-rose-600 hover:text-rose-700"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className={`grid grid-cols-1 ${readerSettings.focusMode ? '' : 'lg:grid-cols-12'} gap-12`}>
          
          {/* Main Article Content */}
          <main className={readerSettings.focusMode ? 'max-w-3xl mx-auto' : 'lg:col-span-8'}>
            {/* Header Banner & Meta */}
            <header className="space-y-6 pb-10 border-b border-paper">
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">
                <span className="px-3 py-1 border border-[#4A5D4E]/30 bg-[#4A5D4E]/10">
                  {article.category}
                </span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTimeMinutes} MIN READ</span>
                </div>
              </div>

              <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.08]">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="font-serif-editorial italic text-xl text-[var(--ink)]/70 font-normal leading-relaxed">
                  {article.subtitle}
                </p>
              )}

              {/* Author & Share row */}
              <div className="flex items-center justify-between pt-4 border-t border-paper">
                <div className="flex items-center space-x-3">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-paper"
                  />
                  <div>
                    <div className="font-serif-editorial italic text-base font-semibold text-[var(--ink)]">{article.author.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--ink)]/50">{article.author.role || 'Essayist'}</div>
                  </div>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 border border-paper bg-[var(--paper-card)] text-xs font-semibold uppercase tracking-widest text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4A5D4E]" />
                      <span className="text-[#4A5D4E]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[var(--ink)]/60" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Cover Image */}
              {article.coverImage && (
                <div className="relative w-full h-80 sm:h-[420px] overflow-hidden border border-paper bg-zinc-950 mt-6">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* AI Executive Summary Box */}
            <div className="my-10 p-6 border border-paper bg-[var(--paper-card)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">
                  <Bot className="w-4 h-4 text-[#4A5D4E]" />
                  <span>Gemini AI Key Takeaways</span>
                </div>
                {!aiSummary && (
                  <button
                    onClick={handleGenerateAiSummary}
                    disabled={isGeneratingSummary}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#4A5D4E] text-white font-semibold text-[10px] uppercase tracking-widest hover:bg-[#627867] transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingSummary ? 'Analyzing...' : 'Generate AI Summary'}</span>
                  </button>
                )}
              </div>

              <div className="text-sm font-sans text-[var(--ink)]/80 leading-relaxed">
                {aiSummary ? (
                  <p className="font-serif-editorial text-base italic border-l-2 border-[#4A5D4E] pl-4 py-1">
                    "{aiSummary}"
                  </p>
                ) : isGeneratingSummary ? (
                  <p className="text-[var(--ink)]/50 italic animate-pulse">
                    Synthesizing executive summary via Gemini AI API...
                  </p>
                ) : (
                  <p className="text-[var(--ink)]/60 text-xs">
                    Click <strong>Generate AI Summary</strong> to produce an instant executive synthesis powered by Google Gemini.
                  </p>
                )}
                {summaryError && <p className="text-rose-600 text-xs mt-1">{summaryError}</p>}
              </div>
            </div>

            {/* Markdown Body */}
            <article className={`mt-8 space-y-6 font-sans ${fontSizeClasses[readerSettings.fontSize]} text-[var(--ink)] leading-relaxed`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').trim().replace(/\s+/g, '-');
                    return <h1 id={id} className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[var(--ink)] mt-12 mb-6 pb-2 border-b border-paper">{children}</h1>;
                  },
                  h2: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').trim().replace(/\s+/g, '-');
                    return <h2 id={id} className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[var(--ink)] mt-10 mb-4">{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const id = String(children).toLowerCase().replace(/[^\w\u4e00-\u9fa5\s-]/g, '').trim().replace(/\s+/g, '-');
                    return <h3 id={id} className="font-serif-editorial text-xl font-semibold italic text-[var(--ink)] mt-8 mb-3">{children}</h3>;
                  },
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');
                    const codeId = `code-${Math.random().toString(36).substring(2, 9)}`;

                    if (!inline) {
                      return (
                        <div className="my-8 border border-paper bg-[var(--paper-card)] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-paper text-[10px] uppercase font-mono tracking-widest text-[var(--ink)]/60">
                            <span>{match ? match[1] : 'CODE'}</span>
                            <button
                              onClick={() => handleCopyCode(codeString, codeId)}
                              className="flex items-center space-x-1 hover:text-[var(--ink)] transition-colors"
                            >
                              {copiedCodeId === codeId ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-[#4A5D4E]" />
                                  <span className="text-[#4A5D4E] font-semibold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy Code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-4 overflow-x-auto text-xs font-mono text-[var(--ink)] bg-[var(--paper)] leading-relaxed">
                            <code>{children}</code>
                          </pre>
                        </div>
                      );
                    }

                    return (
                      <code className="px-1.5 py-0.5 border border-paper bg-[var(--paper-card)] text-[#4A5D4E] font-mono text-xs" {...props}>
                        {children}
                      </code>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 pl-6 border-l-2 border-[#4A5D4E] font-serif-editorial text-xl italic text-[var(--ink)]/80 py-1">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-8 border border-paper">
                      <table className="w-full text-left text-xs text-[var(--ink)]">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="bg-[var(--paper-card)] p-3 font-semibold uppercase tracking-widest border-b border-paper">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="p-3 border-b border-paper/60 bg-[var(--paper)]">
                      {children}
                    </td>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>

            {/* Interactions & Discussion */}
            <div className="mt-16 pt-8 border-t border-paper space-y-8">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleLikeClick}
                  className={`inline-flex items-center space-x-2 px-5 py-2.5 border font-semibold text-xs uppercase tracking-widest transition-all ${
                    isLiked
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-paper bg-[var(--paper-card)] text-[var(--ink)] hover:border-[var(--ink)]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  <span>{isLiked ? 'Liked Essay' : 'Like Essay'}</span>
                  <span className="font-mono text-xs">
                    ({article.likes + (isLiked ? 1 : 0)})
                  </span>
                </button>

                <div className="flex items-center space-x-2">
                  {article.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase font-mono tracking-widest border border-paper px-2.5 py-1 bg-[var(--paper-card)]">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Discussion Section */}
              <div className="space-y-6 pt-6">
                <h3 className="font-serif-editorial text-2xl text-[var(--ink)] flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-[#4A5D4E]" />
                  <span>Discussion ({comments.length})</span>
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="space-y-3 p-5 border border-paper bg-[var(--paper-card)]">
                  <input
                    type="text"
                    placeholder="Your name or handle (optional)"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
                  />
                  <textarea
                    rows={3}
                    placeholder="Share your response to this essay..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[var(--ink)] text-[var(--paper)] font-semibold text-xs uppercase tracking-widest disabled:opacity-40 hover:opacity-90 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Response</span>
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 border border-paper bg-[var(--paper-card)] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <img
                            src={comment.avatar}
                            alt={comment.author}
                            className="w-5 h-5 rounded-full object-cover border border-paper"
                          />
                          <span className="font-serif-editorial italic font-semibold text-[var(--ink)]">{comment.author}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--ink)]/50">{comment.date}</span>
                      </div>
                      <p className="text-xs font-sans text-[var(--ink)]/80 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Sticky Table of Contents Sidebar */}
          {!readerSettings.focusMode && (
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              <div className="sticky top-32 p-6 border border-paper bg-[var(--paper-card)] space-y-4">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#4A5D4E]">
                  <List className="w-4 h-4 text-[#4A5D4E]" />
                  <span>Table of Contents</span>
                </div>

                {toc.length > 0 ? (
                  <nav className="space-y-1.5 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`block text-xs py-1 px-2 border-l-2 transition-all ${
                          item.level === 1 ? 'font-serif-editorial text-sm font-semibold' : 'font-sans text-xs pl-4'
                        } ${
                          activeHeadingId === item.id
                            ? 'border-[#4A5D4E] text-[#4A5D4E] font-semibold bg-[#4A5D4E]/5'
                            : 'border-transparent text-[var(--ink)]/60 hover:text-[var(--ink)]'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                ) : (
                  <p className="text-xs font-serif-editorial italic text-[var(--ink)]/50">No headings available.</p>
                )}

                {/* Author Info */}
                <div className="pt-4 border-t border-paper space-y-2">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--ink)]/50">Author</div>
                  <div className="flex items-center space-x-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-paper"
                    />
                    <div>
                      <div className="text-sm font-serif-editorial italic font-semibold text-[var(--ink)]">{article.author.name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--ink)]/50">{article.author.role || 'Contributor'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  );
};
