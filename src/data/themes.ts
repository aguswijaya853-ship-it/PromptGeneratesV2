import { AppTheme } from '../types';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  label: string;
  primaryHex: string;
  secondaryHex: string;
  primaryGradient: string;
  darkRibbonBg: string;
  headerGradient: string;
  heroGradient: string;
  buttonBg: string;
  buttonHover: string;
  borderAccent: string;
  textAccent: string;
  badgeBg: string;
  badgeText: string;
  activeNavText: string;
  activeNavIndicator: string;
  appBackground: string;
  previewClass: string;
}

export const APP_THEMES: Record<AppTheme, ThemeConfig> = {
  'forest-green': {
    id: 'forest-green',
    name: 'Forest Green',
    label: 'Hijau Hutan Tropis (Klasik)',
    primaryHex: '#16a34a',
    secondaryHex: '#15803d',
    primaryGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    darkRibbonBg: 'bg-[#0c2e1f]',
    headerGradient: 'from-emerald-600 via-emerald-700 to-green-700',
    heroGradient: 'from-[#bfe8ff] via-[#d6f0ff] to-[#f4faf6]',
    buttonBg: 'bg-emerald-600',
    buttonHover: 'hover:bg-emerald-700',
    borderAccent: 'border-emerald-300',
    textAccent: 'text-emerald-700',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    activeNavText: 'text-emerald-800',
    activeNavIndicator: 'bg-emerald-600',
    appBackground: '#f3f8f5',
    previewClass: 'from-emerald-600 to-green-700',
  },
  'sky-blue': {
    id: 'sky-blue',
    name: 'Sky Blue',
    label: 'Biru Langit Ceria (Modern)',
    primaryHex: '#0284c7',
    secondaryHex: '#0369a1',
    primaryGradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    darkRibbonBg: 'bg-[#082f49]',
    headerGradient: 'from-sky-600 via-sky-700 to-blue-700',
    heroGradient: 'from-[#cbe8ff] via-[#e0f2fe] to-[#f0f9ff]',
    buttonBg: 'bg-sky-600',
    buttonHover: 'hover:bg-sky-700',
    borderAccent: 'border-sky-300',
    textAccent: 'text-sky-700',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-800',
    activeNavText: 'text-sky-800',
    activeNavIndicator: 'bg-sky-600',
    appBackground: '#f0f7fc',
    previewClass: 'from-sky-500 to-blue-600',
  },
  'sunset-orange': {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    label: 'Oranye Senja Hangat (Kreatif)',
    primaryHex: '#ea580c',
    secondaryHex: '#c2410c',
    primaryGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    darkRibbonBg: 'bg-[#431407]',
    headerGradient: 'from-orange-600 via-amber-600 to-red-600',
    heroGradient: 'from-[#fed7aa] via-[#ffedd5] to-[#fff7ed]',
    buttonBg: 'bg-orange-600',
    buttonHover: 'hover:bg-orange-700',
    borderAccent: 'border-orange-300',
    textAccent: 'text-orange-700',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-800',
    activeNavText: 'text-orange-800',
    activeNavIndicator: 'bg-orange-600',
    appBackground: '#faf4ef',
    previewClass: 'from-orange-500 to-amber-600',
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Royal Purple',
    label: 'Ungu Elegan Edukatif',
    primaryHex: '#9333ea',
    secondaryHex: '#7e22ce',
    primaryGradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    darkRibbonBg: 'bg-[#3b0764]',
    headerGradient: 'from-purple-600 via-violet-700 to-indigo-700',
    heroGradient: 'from-[#e9d5ff] via-[#f3e8ff] to-[#faf5ff]',
    buttonBg: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-700',
    borderAccent: 'border-purple-300',
    textAccent: 'text-purple-700',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-800',
    activeNavText: 'text-purple-800',
    activeNavIndicator: 'bg-purple-600',
    appBackground: '#f8f5fc',
    previewClass: 'from-purple-600 to-indigo-600',
  },
};
