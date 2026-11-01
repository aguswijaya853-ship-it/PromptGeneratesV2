import React, { useState } from 'react';
import { SavedPrompt } from '../types';
import { Star, Copy, Check, Trash2, ExternalLink, Calendar, BookOpen } from 'lucide-react';

interface FavoritesViewProps {
  favorites: SavedPrompt[];
  onRemoveFavorite: (id: string) => void;
  onSelectPrompt: (prompt: SavedPrompt) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onRemoveFavorite,
  onSelectPrompt,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Star className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">Prompt Favorit Saya</h2>
            <p className="text-xs text-slate-500">
              Kumpulan prompt pilihan yang telah Anda simpan untuk digunakan kembali di kelas.
            </p>
          </div>
        </div>
        <div className="text-sm font-extrabold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
          {favorites.length} Tersimpan
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Star className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-700 text-base">Belum Ada Prompt Favorit</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Klik ikon bintang pada modal prompt mana saja untuk menyimpannya di daftar favorit ini agar mudah diakses kapan saja.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <BookOpen className="w-3 h-3" />
                    <span>{fav.categoryTitle}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(fav.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-800 text-sm mt-2 line-clamp-1">
                  {fav.topic}
                </h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {fav.subject} • {fav.educationLevel}
                </div>

                <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs text-slate-600 line-clamp-3 font-mono">
                  {fav.promptText}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={() => onRemoveFavorite(fav.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(fav.id, fav.promptText)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                  >
                    {copiedId === fav.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-300" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
