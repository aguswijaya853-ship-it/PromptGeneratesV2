import React, { useState } from 'react';
import { TargetAI, EducationLevel, AppTheme } from '../types';
import { EDUCATION_LEVELS } from '../data/mediaTypes';
import { APP_THEMES } from '../data/themes';
import { Settings, Save, Trash2, Check, Cpu, BookOpen, Palette, Sparkles } from 'lucide-react';

interface SettingsViewProps {
  defaultAI: TargetAI;
  onUpdateDefaultAI: (ai: TargetAI) => void;
  defaultLevel: EducationLevel;
  onUpdateDefaultLevel: (level: EducationLevel) => void;
  currentTheme: AppTheme;
  onUpdateTheme: (theme: AppTheme) => void;
  onClearFavorites: () => void;
  favoritesCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  defaultAI,
  onUpdateDefaultAI,
  defaultLevel,
  onUpdateDefaultLevel,
  currentTheme,
  onUpdateTheme,
  onClearFavorites,
  favoritesCount,
}) => {
  const [savedNotice, setSavedNotice] = useState(false);

  const activeThemeConfig = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">Pengaturan Preferensi Guru</h2>
            <p className="text-xs text-slate-500">
              Sesuaikan tema warna tampilan aplikasi, model AI bawaan, dan preferensi jenjang kelas.
            </p>
          </div>
        </div>
      </div>

      {/* Card: Tema Warna Aplikasi (Color Palette Picker) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
            <Palette className="w-4 h-4 text-emerald-600" style={{ color: activeThemeConfig.primaryHex }} />
            <span>Tema Warna Aplikasi (Color Palette):</span>
          </label>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            Aktif: {activeThemeConfig.name}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Pilih tema warna aksen utama yang akan memperbarui seluruh elemen visual aplikasi seperti header, pita atas, tombol utama, lencana, dan navigasi secara dinamis.
        </p>

        {/* 4 Theme Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {Object.values(APP_THEMES).map((thm) => {
            const isSelected = currentTheme === thm.id;
            return (
              <button
                key={thm.id}
                type="button"
                onClick={() => onUpdateTheme(thm.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'border-slate-800 bg-slate-50/90 shadow-md ring-2 ring-slate-800/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Color Swatch Circle */}
                  <div
                    className="w-10 h-10 rounded-xl shadow-md flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${thm.primaryHex}, ${thm.secondaryHex})`,
                    }}
                  >
                    {isSelected && <Check className="w-5 h-5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                      <span>{thm.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {thm.label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: thm.primaryHex }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: thm.secondaryHex }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
        {/* Default AI */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-600" style={{ color: activeThemeConfig.primaryHex }} />
            <span>Platform AI Pilihan Utama:</span>
          </label>
          <select
            value={defaultAI}
            onChange={(e) => onUpdateDefaultAI(e.target.value as TargetAI)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            <option value="dola">Dola AI (dola.com - Web &amp; WhatsApp Assistant)</option>
            <option value="chatgpt">ChatGPT (OpenAI)</option>
            <option value="gemini">Google Gemini (Google AI)</option>
            <option value="claude">Claude (Anthropic)</option>
            <option value="canva">Canva Magic Studio / Canva Code</option>
            <option value="deepseek">DeepSeek AI</option>
            <option value="copilot">Microsoft Copilot</option>
            <option value="perplexity">Perplexity AI</option>
            <option value="quizizz">Quizizz AI</option>
            <option value="gamma">Gamma App AI</option>
            <option value="poe">Poe AI</option>
          </select>
          <p className="text-[11px] text-slate-500 mt-1">
            Platform ini akan otomatis terpilih ketika Anda menyusun prompt baru.
          </p>
        </div>

        {/* Default Education Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" style={{ color: activeThemeConfig.primaryHex }} />
            <span>Jenjang Pengajaran Utama Anda:</span>
          </label>
          <select
            value={defaultLevel}
            onChange={(e) => onUpdateDefaultLevel(e.target.value as EducationLevel)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            {EDUCATION_LEVELS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.label} ({lvl.desc})
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 mt-1">
            Tingkat kelas ini akan menjadi bawaan saat membuka generator.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs transition"
            style={{ backgroundColor: activeThemeConfig.primaryHex }}
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4 text-green-200" />
                <span>Pengaturan Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Preferensi</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Storage Management Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Kelola Penyimpanan Lokal (Local Storage)</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Semua prompt favorit dan pengaturan tema Anda tersimpan secara privat di peramban web perangkat ini. Saat ini tersimpan{' '}
          <strong>{favoritesCount}</strong> prompt di memori perangkat.
        </p>

        <div>
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin menghapus semua prompt favorit yang tersimpan?')) {
                onClearFavorites();
              }
            }}
            disabled={favoritesCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-40 text-xs font-bold transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua Favorit ({favoritesCount})</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-400 py-4">
        Media Ajar &amp; Game Edukasi Interaktif • Kurikulum Merdeka • by Muhammad Agus Wijaya, S.Pd.
      </div>
    </div>
  );
};
