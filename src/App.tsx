import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MediaCard } from './components/MediaCard';
import { PromptModal } from './components/PromptModal';
import { FavoritesView } from './components/FavoritesView';
import { TemplatesView } from './components/TemplatesView';
import { AboutView } from './components/AboutView';
import { SettingsView } from './components/SettingsView';
import { BottomNav, NavTab } from './components/BottomNav';
import { MEDIA_CATEGORIES } from './data/mediaTypes';
import { MediaCategory, SavedPrompt, PresetTemplate, TargetAI, EducationLevel, AppTheme } from './types';
import { APP_THEMES } from './data/themes';
import {
  Megaphone,
  Search,
  Trophy,
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle2,
} from 'lucide-react';

const STORAGE_FAVORITES_KEY = 'media_ajar_saved_prompts_v1';
const STORAGE_PREFS_KEY = 'media_ajar_user_prefs_v1';
const STORAGE_THEME_KEY = 'media_ajar_theme_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('beranda');
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('semua');

  // Favorites state
  const [favorites, setFavorites] = useState<SavedPrompt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User preferences
  const [defaultAI, setDefaultAI] = useState<TargetAI>(() => {
    try {
      const prefs = localStorage.getItem(STORAGE_PREFS_KEY);
      if (prefs) {
        return JSON.parse(prefs).defaultAI || 'dola';
      }
    } catch {}
    return 'dola';
  });

  const [defaultLevel, setDefaultLevel] = useState<EducationLevel>(() => {
    try {
      const prefs = localStorage.getItem(STORAGE_PREFS_KEY);
      if (prefs) {
        return JSON.parse(prefs).defaultLevel || 'SD_FASE_B';
      }
    } catch {}
    return 'SD_FASE_B';
  });

  // App color theme state
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY);
      if (saved && (saved in APP_THEMES)) {
        return saved as AppTheme;
      }
    } catch {}
    return 'forest-green';
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Save prefs
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_PREFS_KEY,
        JSON.stringify({ defaultAI, defaultLevel })
      );
    } catch (e) {
      console.error(e);
    }
  }, [defaultAI, defaultLevel]);

  // Save theme
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME_KEY, currentTheme);
    } catch (e) {
      console.error(e);
    }
  }, [currentTheme]);

  const activeTheme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = () => {
    setCurrentTab('beranda');
    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSaveFavorite = (newFav: SavedPrompt) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === newFav.id || (f.categoryId === newFav.categoryId && f.topic === newFav.topic));
      if (exists) {
        return prev;
      }
      return [newFav, ...prev];
    });
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
  };

  const handleUseTemplate = (template: PresetTemplate) => {
    const matchedCategory = MEDIA_CATEGORIES.find((c) => c.id === template.categoryId) || MEDIA_CATEGORIES[0];
    setSelectedCategory(matchedCategory);
  };

  // Filter media categories based on search and optional pills
  const filteredCategories = MEDIA_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.defaultTopic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div
      className="min-h-screen text-slate-800 pb-24 flex flex-col font-sans transition-colors duration-300"
      style={{ backgroundColor: activeTheme.appBackground }}
    >
      {/* Top Header */}
      <Header
        currentTheme={currentTheme}
        onSearchClick={handleSearchFocus}
        onOpenAbout={() => setCurrentTab('tentang')}
        onOpenTemplates={() => setCurrentTab('template')}
      />

      {/* Main Content Areas based on Tab */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <div className="space-y-6">
            {/* Hero Section with School Graphic, Students & 4 Stat Badges */}
            <HeroBanner
              currentTheme={currentTheme}
              onQuickStart={() => {
                // Open first category (Presentasi) or prompt chooser
                setSelectedCategory(MEDIA_CATEGORIES[0]);
              }}
            />

            {/* Section: Pilih Jenis Media Ajar */}
            <div className="max-w-5xl mx-auto px-4">
              {/* Header Box with Dynamic Themed Megaphone & Search Bar */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Left: Megaphone & Title */}
                <div className="flex items-center gap-3.5">
                  <div
                    className="relative w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-md shrink-0 transition-all duration-300"
                    style={{ background: activeTheme.primaryGradient }}
                  >
                    <Megaphone className="w-6 h-6 stroke-[2.2] -rotate-12" />
                    {/* Yellow sparkle accent */}
                    <span className="absolute -top-1.5 -right-1 text-amber-400 text-sm font-black animate-pulse">
                      ✦
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight flex items-center gap-2">
                      <span>Pilih Jenis Media Ajar</span>
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-0.5">
                      Klik salah satu kartu untuk mulai menyusun prompt-mu.
                    </p>
                  </div>
                </div>

                {/* Right: Search Input Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari media ajar..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-full border border-slate-200 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-hidden focus:ring-2 shadow-xs transition"
                    style={{ '--tw-ring-color': activeTheme.primaryHex } as React.CSSProperties}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>

              </div>

              {/* 12 Media Type Cards Grid (Matching the 3 columns in the design screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5 mt-5">
                {filteredCategories.map((category) => (
                  <MediaCard
                    key={category.id}
                    category={category}
                    onClick={() => setSelectedCategory(category)}
                  />
                ))}
              </div>

              {filteredCategories.length === 0 && (
                <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 mt-4 space-y-2">
                  <p className="font-bold text-slate-700 text-sm">
                    Tidak ditemukan media ajar dengan kata kunci "{searchQuery}"
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold hover:underline"
                    style={{ color: activeTheme.primaryHex }}
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}

              {/* Bottom Call To Action Banner Matching Screenshot */}
              <div className="mt-8 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
                    <Trophy className="w-6 h-6 stroke-[2.2] text-amber-500 fill-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                      <span>Belajar Lebih Menyenangkan!</span>
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-0.5">
                      Dengan media ajar yang interaktif, kreatif, dan sesuai Kurikulum Merdeka.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(MEDIA_CATEGORIES[0])}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95 shrink-0"
                  style={{ backgroundColor: activeTheme.primaryHex }}
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>
          </div>
        )}

        {currentTab === 'favorit' && (
          <FavoritesView
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onSelectPrompt={(saved) => {
              const matched = MEDIA_CATEGORIES.find((c) => c.id === saved.categoryId) || MEDIA_CATEGORIES[0];
              setSelectedCategory(matched);
            }}
          />
        )}

        {currentTab === 'template' && (
          <TemplatesView onUseTemplate={handleUseTemplate} />
        )}

        {currentTab === 'tentang' && <AboutView />}

        {currentTab === 'pengaturan' && (
          <SettingsView
            defaultAI={defaultAI}
            onUpdateDefaultAI={setDefaultAI}
            defaultLevel={defaultLevel}
            onUpdateDefaultLevel={setDefaultLevel}
            currentTheme={currentTheme}
            onUpdateTheme={setCurrentTheme}
            onClearFavorites={handleClearAllFavorites}
            favoritesCount={favorites.length}
          />
        )}
      </main>

      {/* Interactive Prompt Generator Modal */}
      {selectedCategory && (
        <PromptModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSaveFavorite={handleSaveFavorite}
          isFavorited={favorites.some((f) => f.categoryId === selectedCategory.id)}
          currentTheme={currentTheme}
        />
      )}

      {/* Bottom Navigation Dock */}
      <BottomNav
        currentTab={currentTab}
        onChangeTab={setCurrentTab}
        favoritesCount={favorites.length}
        currentTheme={currentTheme}
      />
    </div>
  );
}
