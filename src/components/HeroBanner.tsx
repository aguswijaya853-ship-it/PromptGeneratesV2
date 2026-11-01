import React from 'react';
import { Layers, School, GraduationCap, Gift, Sparkles, Wand2 } from 'lucide-react';
import { AppTheme } from '../types';
import { APP_THEMES } from '../data/themes';

interface HeroBannerProps {
  currentTheme?: AppTheme;
  onQuickStart: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentTheme = 'forest-green',
  onQuickStart,
}) => {
  const theme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b ${theme.heroGradient} pt-6 pb-4 px-4 border-b border-slate-200/60 transition-colors duration-300`}
    >
      {/* Decorative Cloud SVGs in background */}
      <div className="absolute top-2 left-6 opacity-60 pointer-events-none">
        <svg width="120" height="40" viewBox="0 0 120 40" fill="white">
          <ellipse cx="30" cy="25" rx="20" ry="12" />
          <ellipse cx="60" cy="20" rx="30" ry="18" />
          <ellipse cx="90" cy="25" rx="20" ry="12" />
        </svg>
      </div>
      <div className="absolute top-8 right-12 opacity-50 pointer-events-none hidden sm:block">
        <svg width="160" height="50" viewBox="0 0 160 50" fill="white">
          <ellipse cx="40" cy="30" rx="28" ry="16" />
          <ellipse cx="80" cy="24" rx="40" ry="22" />
          <ellipse cx="120" cy="30" rx="28" ry="16" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Main Content & Visual Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
          {/* Left Text Block */}
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200 text-slate-800 text-xs sm:text-sm font-black mb-3 shadow-xs backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
              <span>
                Prompt Generator Media Ajar by{' '}
                <span
                  className="underline decoration-amber-400 underline-offset-2"
                  style={{ color: theme.primaryHex }}
                >
                  Muhammad Agus Wijaya, S.Pd.
                </span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#14325a] leading-[1.15]">
              Media Ajar &amp; Game <br className="hidden sm:inline" />
              <span style={{ color: theme.primaryHex }}>Edukasi </span>
              <span className="text-[#f59e0b]">Interaktif</span>
            </h1>

            <p className="mt-3 text-slate-700 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
              Pilih jenis media ajar, isi detail kelasmu, dan dapatkan prompt profesional siap pakai untuk{' '}
              <strong className="font-extrabold" style={{ color: theme.secondaryHex }}>
                Dola AI, ChatGPT, Gemini, Claude,
              </strong>{' '}
              atau{' '}
              <strong className="font-extrabold" style={{ color: theme.secondaryHex }}>
                Canva Code
              </strong>.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                onClick={onQuickStart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-extrabold text-sm shadow-md hover:shadow-lg transition active:scale-95"
                style={{ backgroundColor: theme.primaryHex }}
              >
                <Wand2 className="w-4 h-4" />
                <span>Susun Prompt Sekarang</span>
              </button>
            </div>
          </div>

          {/* Right Mascot Illustration Container */}
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] flex justify-center items-end">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border-2 border-white/80 bg-gradient-to-t from-slate-100 to-transparent flex items-center justify-center group">
              <img
                src="/assets/aistudio/file_00000000a9e08211a8248a6620665c39_018cb05f.png"
                alt="Siswa Indonesia dan Media Ajar Edukasi"
                className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-lg border border-slate-100 flex items-center justify-between shadow-xs">
                <span className="text-[11px] font-bold text-slate-800">Merdeka Belajar</span>
                <span className="text-[10px] font-semibold text-slate-500">PAUD s/d SMA &amp; SMK</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature / Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6">
          {/* 1. 12 Jenis Media */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-sky-100 shadow-sm flex flex-col items-center text-center hover:translate-y-[-2px] transition">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-sm mb-1.5">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-sky-600 leading-tight">12</span>
            <span className="text-xs font-bold text-slate-700">Jenis Media</span>
          </div>

          {/* 2. 5 Jenjang PAUD-SMK */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-emerald-100 shadow-sm flex flex-col items-center text-center hover:translate-y-[-2px] transition">
            <div
              className="w-10 h-10 rounded-full text-white flex items-center justify-center shadow-sm mb-1.5"
              style={{ backgroundColor: theme.primaryHex }}
            >
              <School className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span
              className="text-xl sm:text-2xl font-black leading-tight"
              style={{ color: theme.primaryHex }}
            >
              5
            </span>
            <span className="text-xs font-bold text-slate-700">Jenjang PAUD-SMK</span>
          </div>

          {/* 3. Kurikulum Merdeka */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-purple-100 shadow-sm flex flex-col items-center text-center hover:translate-y-[-2px] transition">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm mb-1.5">
              <GraduationCap className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="mt-1 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-extrabold text-purple-900 leading-tight">Kurikulum</span>
              <span className="text-xs sm:text-sm font-extrabold text-purple-900 leading-tight">Merdeka</span>
            </div>
          </div>

          {/* 4. 100% Gratis */}
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-amber-100 shadow-sm flex flex-col items-center text-center hover:translate-y-[-2px] transition">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm mb-1.5">
              <Gift className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-amber-500 leading-tight">100%</span>
            <span className="text-xs font-bold text-slate-700">Gratis</span>
          </div>
        </div>

      </div>
    </div>
  );
};
