import React from 'react';
import { MediaCategory } from '../types';
import {
  Presentation,
  ClipboardList,
  Gamepad2,
  BookOpenCheck,
  FileEdit,
  Image as ImageIcon,
  Music,
  Video,
  Bot,
  Printer,
  BookOpen,
  Rocket,
  ArrowRight,
} from 'lucide-react';

interface MediaCardProps {
  category: MediaCategory;
  onClick: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ category, onClick }) => {
  // Render specific icon and color styling matching the original design
  const renderCategoryIcon = () => {
    switch (category.id) {
      case 'presentasi':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-400 text-white flex items-center justify-center shadow-md shadow-sky-200">
            <Presentation className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'kuis':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center shadow-md shadow-amber-200">
            <ClipboardList className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'game':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <Gamepad2 className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'modul':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-violet-400 text-white flex items-center justify-center shadow-md shadow-purple-200">
            <BookOpenCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'lkpd':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-400 to-green-500 text-white flex items-center justify-center shadow-md shadow-green-200">
            <FileEdit className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'infografis':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-sky-400 text-white flex items-center justify-center shadow-md shadow-blue-200">
            <ImageIcon className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'audio':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-200">
            <Music className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'video':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-teal-200">
            <Video className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'chatbot':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-200">
            <Bot className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'cetak':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-green-200">
            <Printer className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'literasi':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-sky-200">
            <BookOpen className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'projek':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200">
            <Rocket className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow">
            <BookOpen className="w-6 h-6" />
          </div>
        );
    }
  };

  const getArrowColor = () => {
    switch (category.themeColor) {
      case 'blue':
        return 'bg-sky-500 hover:bg-sky-600';
      case 'yellow':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'green':
        return 'bg-emerald-500 hover:bg-emerald-600';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'teal':
        return 'bg-teal-500 hover:bg-teal-600';
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'red':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-emerald-600 hover:bg-emerald-700';
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none"
    >
      <div className="flex items-start gap-3.5">
        <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
          {renderCategoryIcon()}
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="font-bold text-slate-800 text-sm sm:text-[15px] leading-snug group-hover:text-emerald-700 transition">
            {category.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {category.subtitle}
          </p>
        </div>
      </div>

      {/* Action Arrow Button on Bottom Right */}
      <div className="mt-3 flex justify-end">
        <div
          className={`w-7 h-7 rounded-full text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:translate-x-1 ${getArrowColor()}`}
        >
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
