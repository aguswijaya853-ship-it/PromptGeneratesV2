import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Heart,
  Target,
  CheckCircle2,
  Cpu,
  BookOpen,
  Share2,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Hero Info */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-bold text-emerald-100">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Panduan &amp; Filosofi Edukasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Media Ajar &amp; Game Edukasi Interaktif
          </h2>
          <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
            Aplikasi inovatif yang dirancang khusus untuk mempermudah guru dan tenaga pendidik Indonesia menyusun prompt AI pedagogis standar tinggi untuk Kurikulum Merdeka.
          </p>
        </div>
      </div>

      {/* 4 Pilar Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">
            Standar Kurikulum Merdeka
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Setiap prompt mengintegrasikan Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), Pemahaman Bermakna, dan Pertanyaan Pemantik yang resmi.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">
            6 Dimensi Profil Pelajar Pancasila
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mendukung pembentukan karakter holistik: Beriman &amp; Berakhlak Mulia, Berkebhinekaan Global, Mandiri, Bergotong Royong, Bernalar Kritis, dan Kreatif.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">
            Pembelajaran Berdiferensiasi
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prompt dilengkapi instruksi adaptasi untuk memenuhi kebutuhan belajar siswa dengan 3 kelompok kesiapan: bimbingan bertahap, reguler, dan pengayaan mandiri.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-base">
            Multi-Platform AI Terbuka
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bisa dipakai bebas di ChatGPT, Google Gemini, Claude, Canva Magic Studio, Microsoft Copilot, maupun DeepSeek tanpa batasan langganan berbayar.
          </p>
        </div>
      </div>

      {/* Tips Prompt Engineering Untuk Guru */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-slate-800 text-lg">
            3 Tips Praktis Memaksimalkan Prompt AI di Kelas
          </h3>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">
                Jangan Ragu Meminta Iterasi Balik ke AI
              </strong>
              Jika contoh soal atau slide terasa terlalu mudah atau terlalu sulit, katakan: <em>"Tolong buatkan versi yang lebih visual untuk anak yang belum lancar membaca"</em>.
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">
                Gunakan Canva Code &amp; Desain Otomatis
              </strong>
              Gunakan prompt kategori Presentasi atau Infografis dan tempelkan ke Canva Docs atau Canva Magic Studio untuk langsung menghasilkan tata letak slide otomatis!
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">
                Guru Tetap Pengarah Utama Pembelajaran
              </strong>
              AI adalah asisten pintar untuk menghemat waktu administrasi dan memicu ide kreatif, namun kehangatan empati dan interaksi nyata di kelas tetap ada di tangan Bapak/Ibu Guru.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
