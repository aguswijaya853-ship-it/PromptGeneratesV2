import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, BookOpen, Heart, HelpCircle, Share2, Check } from 'lucide-react';
import { AppTheme } from '../types';
import { APP_THEMES } from '../data/themes';

interface HeaderProps {
  currentTheme?: AppTheme;
  onSearchClick: () => void;
  onOpenAbout: () => void;
  onOpenTemplates: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme = 'forest-green',
  onSearchClick,
  onOpenAbout,
  onOpenTemplates,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const theme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Prominent Top Creator Ribbon Bar */}
      <div
        className={`${theme.darkRibbonBg} text-white text-xs sm:text-[13px] font-extrabold py-2 px-4 text-center border-b border-white/10 shadow-xs flex items-center justify-center gap-2 select-none`}
      >
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
        <span className="tracking-wide text-white drop-shadow-xs">
          Prompt Generator Media Ajar by{' '}
          <span className="text-amber-300 underline decoration-amber-400 underline-offset-2">
            Muhammad Agus Wijaya, S.Pd.
          </span>
        </span>
      </div>

      <div className={`bg-gradient-to-r ${theme.headerGradient} text-white`}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 bg-white rounded-xl shadow-md p-1.5 border border-white/30">
              <BookOpen className="w-7 h-7" style={{ color: theme.primaryHex }} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-amber-950 shadow">
                ★
              </span>
            </div>
            <div>
              <div className="text-[14px] md:text-base font-extrabold tracking-tight leading-tight text-white drop-shadow-sm flex items-center gap-1.5">
                <span>Media Ajar &amp; Game</span>
              </div>
              <div className="text-[12px] md:text-xs font-semibold text-white/90 flex items-center gap-1">
                <span className="text-amber-300 font-bold">Edukasi</span>
                <span>Interaktif</span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 bg-black/20 text-[10px] rounded-full text-white ml-1 border border-white/20">
                  Kurikulum Merdeka
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchClick}
              aria-label="Cari Media Ajar"
              className="w-10 h-10 rounded-full bg-white shadow hover:bg-slate-50 active:scale-95 transition flex items-center justify-center"
              style={{ color: theme.primaryHex }}
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Menu"
              className="w-10 h-10 rounded-full bg-black/25 text-white hover:bg-black/35 active:scale-95 transition flex items-center justify-center border border-white/20"
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown / Drawer Menu */}
      {drawerOpen && (
        <div className="border-t border-white/10 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 transition animate-in fade-in slide-in-from-top-2">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            <button
              onClick={() => {
                onOpenTemplates();
                setDrawerOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Template Instan</span>
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                setDrawerOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition"
            >
              <HelpCircle className="w-4 h-4 text-sky-300" />
              <span>Panduan Guru</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-left transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-300" /> : <Share2 className="w-4 h-4 text-emerald-300" />}
              <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Aplikasi'}</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 text-slate-300">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="truncate">Untuk Guru Indonesia</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
