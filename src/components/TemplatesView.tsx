import React, { useState } from 'react';
import { POPULAR_TEMPLATES } from '../data/templatesData';
import { PresetTemplate } from '../types';
import { Sparkles, Search, Copy, Check, ExternalLink, Tag } from 'lucide-react';

interface TemplatesViewProps {
  onUseTemplate: (template: PresetTemplate) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onUseTemplate }) => {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tags = ['Semua', 'Ice Breaking', 'HOTS', 'Canva', 'LKPD', 'Lagu Edukatif', 'P5'];

  const filtered = POPULAR_TEMPLATES.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === 'Semua' || item.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Koleksi Teruji untuk Guru</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">Template Prompt Siap Pakai</h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mt-1">
            Prompt siap pakai yang telah diuji oleh guru-guru penggerak di seluruh Indonesia untuk kegiatan belajar Kurikulum Merdeka.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari template (misal: Ice Breaking, HOTS, Canva, P5)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          <span className="text-slate-400 text-[11px] shrink-0 mr-1">Topik Cepat:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full border transition shrink-0 ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                  {item.subject}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {item.level}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-800 text-base leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Prompt Snippet Box */}
              <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] font-mono text-slate-700 max-h-28 overflow-y-auto whitespace-pre-line">
                {item.prompt}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleCopy(item.id, item.prompt)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Prompt</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onUseTemplate(item)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
              >
                <span>Sesuaikan di Generator &gt;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
