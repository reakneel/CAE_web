import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  UploadCloud,
  Save,
  Download,
  Eye,
  Code,
  ArrowLeft,
  Check,
  AlertCircle,
  X,
  Bot,
  Feather
} from 'lucide-react';
import { Article } from '../types';
import { parseFrontmatter, serializeArticleToMarkdown, estimateReadingTime, slugify } from '../utils/markdownParser';

interface MarkdownStudioProps {
  onSaveArticle: (article: Article) => void;
  onBack: () => void;
}

export const MarkdownStudio: React.FC<MarkdownStudioProps> = ({
  onSaveArticle,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'split'>('split');
  const [isDragging, setIsDragging] = useState(false);
  
  // Article State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [tagsInput, setTagsInput] = useState('Markdown, Editorial');
  const [authorName, setAuthorName] = useState('ReakNeel');
  const [coverImage, setCoverImage] = useState('');
  const [rawContent, setRawContent] = useState(`# The Art of Editorial Markdown

Write your essay or technical article here in **Markdown** format! Drag and drop any \`.md\` file into the dropzone above to auto-import YAML frontmatter and article body.

## Features Supported
- Full GFM Markdown Tables & Checklists
- Code Blocks with Syntax Highlighting
- YAML Frontmatter Extraction
- Gemini AI Auto-Tagging & Executive Summarization
`);

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Import Logic
  const handleFileRead = (file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown') && !file.name.endsWith('.txt')) {
      setStatusMessage({ type: 'error', text: 'Please upload a valid .md or .markdown file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target?.result as string;
      if (!fileText) return;

      const { data, content } = parseFrontmatter(fileText);

      setTitle(data.title || file.name.replace(/\.(md|markdown|txt)$/i, ''));
      if (data.subtitle) setSubtitle(data.subtitle);
      if (data.category) setCategory(data.category);
      if (data.tags) {
        setTagsInput(Array.isArray(data.tags) ? data.tags.join(', ') : String(data.tags));
      }
      if (data.author) setAuthorName(data.author);
      if (data.coverImage) setCoverImage(data.coverImage);

      setRawContent(content || fileText);
      setStatusMessage({ type: 'success', text: `Successfully imported "${file.name}"!` });
      setTimeout(() => setStatusMessage(null), 3000);
    };

    reader.readAsText(file);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileRead(e.dataTransfer.files[0]);
    }
  };

  // Gemini AI Auto Tag & Categorize
  const handleAiAutoTag = async () => {
    if (!rawContent.trim()) return;
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content: rawContent }),
      });

      const data = await res.json();
      if (data.category) setCategory(data.category);
      if (data.tags && Array.isArray(data.tags)) setTagsInput(data.tags.join(', '));

      setStatusMessage({ type: 'success', text: 'Gemini AI generated category & tags!' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      console.error('AI Auto-tag failed:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Save Article
  const handleSave = () => {
    if (!title.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a title for the essay.' });
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const slug = slugify(title);

    const newArticle: Article = {
      id: `user-art-${Date.now()}`,
      slug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      excerpt: rawContent.slice(0, 150).replace(/[#*_\`~]/g, '') + '...',
      content: rawContent,
      date: new Date().toISOString().split('T')[0],
      category: category.trim() || 'Tech',
      tags: tags.length > 0 ? tags : ['Markdown'],
      author: {
        name: authorName.trim() || 'ReakNeel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        role: 'Essayist'
      },
      coverImage: coverImage.trim() || undefined,
      readTimeMinutes: estimateReadingTime(rawContent),
      likes: 1,
      views: 12,
      isUserCreated: true,
    };

    onSaveArticle(newArticle);
  };

  // Download .md File
  const handleDownload = () => {
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const mdString = serializeArticleToMarkdown({
      title,
      subtitle,
      date: new Date().toISOString().split('T')[0],
      category,
      tags,
      author: { name: authorName, avatar: '' },
      coverImage,
      content: rawContent,
    });

    const blob = new Blob([mdString], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(title || 'article')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] pb-24">
      {/* Top Bar */}
      <div className="sticky top-20 z-30 bg-[var(--paper)]/95 backdrop-blur-md border-b border-paper px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 border border-paper bg-[var(--paper-card)] text-xs font-semibold uppercase tracking-widest text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Archive</span>
          </button>

          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest">
            {/* View Mode */}
            <div className="flex items-center border border-paper bg-[var(--paper-card)] p-0.5">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 ${activeTab === 'edit' ? 'bg-[var(--ink)] text-[var(--paper)] font-bold' : 'text-[var(--ink)]/60'}`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`hidden md:inline-block px-3 py-1 ${activeTab === 'split' ? 'bg-[var(--ink)] text-[var(--paper)] font-bold' : 'text-[var(--ink)]/60'}`}
              >
                Split
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 ${activeTab === 'preview' ? 'bg-[var(--ink)] text-[var(--paper)] font-bold' : 'text-[var(--ink)]/60'}`}
              >
                Preview
              </button>
            </div>

            {/* AI Auto Tag */}
            <button
              onClick={handleAiAutoTag}
              disabled={isAiLoading || !rawContent}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 border border-paper bg-[var(--paper-card)] text-[#4A5D4E] hover:border-[#4A5D4E] transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAiLoading ? 'Analyzing...' : 'AI Auto-Tag'}</span>
            </button>

            {/* Export */}
            <button
              onClick={handleDownload}
              className="p-2 border border-paper bg-[var(--paper-card)] text-[var(--ink)]/70 hover:text-[var(--ink)]"
              title="Export as .md"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-[#4A5D4E] text-white font-semibold hover:bg-[#627867] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Essay</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`p-3 border flex items-center justify-between text-xs uppercase tracking-widest ${
              statusMessage.type === 'success'
                ? 'bg-[#4A5D4E]/10 text-[#4A5D4E] border-[#4A5D4E]/30'
                : 'bg-rose-500/10 text-rose-600 border-rose-500/30'
            }`}
          >
            <div className="flex items-center space-x-2">
              {statusMessage.type === 'success' ? (
                <Check className="w-4 h-4 text-[#4A5D4E]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Drag & Drop Import Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-paper bg-[var(--paper-card)] p-8 text-center cursor-pointer transition-all ${
            isDragging ? 'border-[#4A5D4E] bg-[#4A5D4E]/5 scale-[1.01]' : 'hover:border-[var(--ink)]/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileRead(e.target.files[0])}
            accept=".md,.markdown,.txt"
            className="hidden"
          />
          <UploadCloud className="w-8 h-8 text-[#4A5D4E] mx-auto mb-2" />
          <p className="font-serif-editorial text-lg text-[var(--ink)] font-semibold">
            Drag & Drop your <span className="italic text-[#4A5D4E]">.md file</span> here, or click to upload
          </p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--ink)]/50 mt-1">
            Auto-parses YAML Frontmatter (title, date, tags, category, author) and body content.
          </p>
        </div>

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border border-paper bg-[var(--paper-card)]">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Essay Title *</label>
            <input
              type="text"
              placeholder="e.g. Modern Web Architecture with Markdown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Category</label>
            <input
              type="text"
              placeholder="e.g. Engineering, Tech"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. React, Markdown, Architecture"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Subtitle / Tagline</label>
            <input
              type="text"
              placeholder="Brief summary sentence..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Author Name</label>
            <input
              type="text"
              placeholder="Author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-semibold text-[#4A5D4E]">Cover Image URL (Optional)</label>
            <input
              type="text"
              placeholder="https://..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3.5 py-2 border border-paper bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E]"
            />
          </div>
        </div>

        {/* Editor & Live Preview Panes */}
        <div className={`grid grid-cols-1 ${activeTab === 'split' ? 'md:grid-cols-2' : ''} gap-6`}>
          {/* Editor Pane */}
          {(activeTab === 'edit' || activeTab === 'split') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-[var(--ink)]/60">
                <span className="flex items-center space-x-1.5">
                  <Code className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span>Markdown Editor</span>
                </span>
                <span>{rawContent.length} CHARS</span>
              </div>
              <textarea
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                rows={22}
                className="w-full p-4 border border-paper bg-[var(--paper-card)] text-xs font-mono text-[var(--ink)] focus:outline-none focus:border-[#4A5D4E] leading-relaxed resize-none"
                placeholder="# Type your markdown here..."
              />
            </div>
          )}

          {/* Preview Pane */}
          {(activeTab === 'preview' || activeTab === 'split') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-[var(--ink)]/60">
                <span className="flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span>Live Render Preview</span>
                </span>
                <span>EST. {estimateReadingTime(rawContent)} MIN READ</span>
              </div>

              <div className="p-6 border border-paper bg-[var(--paper-card)] max-h-[550px] overflow-y-auto font-sans text-xs leading-relaxed">
                <h1 className="font-serif-editorial text-3xl font-semibold text-[var(--ink)]">{title || 'Untitled Essay'}</h1>
                {subtitle && <p className="font-serif-editorial italic text-base text-[var(--ink)]/70 mt-1 mb-4">{subtitle}</p>}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {rawContent}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
