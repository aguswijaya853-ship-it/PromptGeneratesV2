import React, { useState, useEffect, useRef } from 'react';
import { EducationLevel } from '../types';
import {
  ALL_LKPD_TYPES,
  LKPD_PICTURE_ACTIVITIES,
  LKPD_EXERCISES,
  ILLUSTRATION_STYLES,
  LKPD_PAGE_OPTIONS,
  LKPD_QUESTION_OPTIONS,
} from '../data/curriculumData';
import { exportToWordDoc, exportToImage, exportToPdf } from '../utils/exportUtils';
import {
  Printer,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  ZoomIn,
  ZoomOut,
  Tag,
  Palette,
  Image as ImageIcon,
  CheckSquare,
  HelpCircle,
  Layers,
  ArrowRight,
  ListOrdered,
  FileText,
  Download,
  Loader2,
  Files,
  ChevronLeft,
  ChevronRight,
  Eye,
  Grid,
} from 'lucide-react';

interface LkpdWorkbookViewProps {
  topic: string;
  subject: string;
  educationLevel: EducationLevel;
  gradeClass: string;
  lkpdType?: string;
  pictureActivities?: string[];
  includeExercises?: string[];
  illustrationStyle?: string;
  pageCount?: string;
  questionCount?: string;
  onPageCountChange?: (val: string) => void;
  onQuestionCountChange?: (val: string) => void;
  onClose?: () => void;
}

export const LkpdWorkbookView: React.FC<LkpdWorkbookViewProps> = ({
  topic,
  subject,
  educationLevel,
  gradeClass,
  lkpdType = 'LKPD Eksperimen',
  pictureActivities = ['Mengamati gambar', 'Mengisi jawaban', 'Memberi label pada gambar'],
  includeExercises = ['Pilihan Ganda', 'Isian Singkat'],
  illustrationStyle = 'Kartun Edukatif',
  pageCount = '1 Halaman (Ringkas Siap Cetak)',
  questionCount = '5 Soal (Standar)',
  onPageCountChange,
  onQuestionCountChange,
  onClose,
}) => {
  const [activeType, setActiveType] = useState<string>(lkpdType);
  const [activeStyle, setActiveStyle] = useState<string>(illustrationStyle);
  const [activePageCount, setActivePageCount] = useState<string>(pageCount);
  const [activeQuestionCount, setActiveQuestionCount] = useState<string>(questionCount);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<'senang' | 'cukup' | 'bantuan'>('senang');
  const [exportingType, setExportingType] = useState<'word' | 'image' | 'pdf' | null>(null);

  const sheetRef = useRef<HTMLDivElement>(null);

  // Sync props
  useEffect(() => {
    if (pageCount) setActivePageCount(pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (questionCount) setActiveQuestionCount(questionCount);
  }, [questionCount]);

  const numPages = Math.min(4, Math.max(1, parseInt(activePageCount) || 1));
  const numQuestions = parseInt(activeQuestionCount) || 5;

  const handlePageCountSelect = (val: string) => {
    setActivePageCount(val);
    onPageCountChange?.(val);
    const num = Math.min(4, Math.max(1, parseInt(val) || 1));
    if (currentPage > num) {
      setCurrentPage(1);
    }
  };

  const handleQuestionCountSelect = (val: string) => {
    setActiveQuestionCount(val);
    onQuestionCountChange?.(val);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

Buat tampilan LKPD dalam format A4 portrait dengan desain full color yang clean, edukatif, student friendly, dan profesional seperti workbook sekolah modern. Gunakan tata letak yang rapi dengan perpaduan teks, gambar, dan ruang kosong yang seimbang agar tidak terlalu padat dan tetap mudah dibaca siswa.

Tambahkan ilustrasi edukatif yang relevan dengan materi, ikon modern, elemen visual sederhana, highlight box, header menarik, dan variasi desain pada setiap halaman agar tidak monoton. Jika terdapat soal cerita, tambahkan ilustrasi kontekstual. Jika terdapat langkah kegiatan, ubah menjadi tampilan step visual yang lebih interaktif. Jika terdapat tabel atau latihan, ubah menjadi desain yang lebih modern dan menarik namun tetap jelas dibaca.

Sesuaikan desain, ilustrasi, dan tata letak dengan jenis aktivitas pada LKPD, sehingga setiap aktivitas terlihat lebih interaktif, kontekstual, dan sesuai dengan karakter pembelajaran yang digunakan.

Gunakan gaya visual modern, fun learning, semi infografis, dan workbook edukasi premium. Hindari desain terlalu ramai, seperti poster, atau ornamen berlebihan. Pastikan hasil akhir tetap fokus sebagai media belajar yang fungsional sekaligus estetik.

Hasil akhir harus langsung berupa desain LKPD lengkap yang siap cetak, beresolusi tinggi, dan terlihat seperti workbook pendidikan profesional.

Buat Gambar
Anda berperan sebagai guru profesional, perancang LKPD, dan ilustrator pendidikan yang mampu membuat LKPD menarik, edukatif, dan sesuai dengan karakter peserta didik.
Tugas Anda adalah membuat LKPD bergambar lengkap berdasarkan materi dan jenis/bentuk LKPD yang ditentukan oleh pengguna.

SPESIFIKASI DESAIN
Ukuran kertas : A4 (21 cm × 29,7 cm)
Orientasi : Portrait
Jumlah Halaman : ${activePageCount}
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : ${gradeClass} (${educationLevel})
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
${topic} (Mata Pelajaran: ${subject} - ${gradeClass})

JENIS / BENTUK LKPD
Pilih atau isi sesuai kebutuhan, misalnya:
LKPD Observasi
LKPD Eksperimen
LKPD Eksplorasi
LKPD Berbasis Gambar
LKPD Cerita Bergambar
LKPD Mencocokkan
LKPD Menjodohkan
LKPD Pilihan Ganda
LKPD Benar/Salah
LKPD Isian
LKPD Studi Kasus
LKPD Investigasi
LKPD Pemecahan Masalah (HOTS)
LKPD Berbasis Proyek (PjBL)
LKPD Diskusi Kelompok
LKPD Analisis Data
LKPD Refleksi
LKPD Diagnostik
LKPD Pengayaan
LKPD Remedial
LKPD Proyek
LKPD Campuran
JENIS LKPD YANG DIINGINKAN :
${activeType}



IDENTITAS LKPD
Nama : ________________________
Kelas : ${gradeClass}
Tanggal : ________________________
Nilai : 


TUGAS ANDA
Berdasarkan materi dan jenis LKPD yang dipilih:
Menyusun kegiatan LKPD sesuai bentuk yang diminta
Membuat soal/tugas berbasis gambar atau aktivitas
Membuat ilustrasi yang relevan dengan materi
Menyesuaikan tingkat kesulitan dengan jenjang
Menggunakan bahasa sederhana, komunikatif, dan mudah dipahami siswa

TUJUAN PEMBELAJARAN (Opsional)
Peserta didik mampu memahami konsep esensial materi "${topic}" secara aktif dan kontekstual melalui eksplorasi visual dan penyelidikan terarah.
Tuliskan tujuan pembelajaran yang:
jelas,
sesuai materi,
sederhana,
dan mudah dipahami peserta didik.

PETUNJUK PENGERJAAN
Buat petunjuk pengerjaan yang:
sederhana,
jelas,
bertahap,
dan mudah dipahami siswa.
Gunakan maksimal 3–5 langkah.

KEGIATAN BERGAMBAR
Sesuaikan dengan jenis LKPD yang dipilih (${activeType}).
Aktivitas terpilih: ${pictureActivities.join(', ')}
Contoh aktivitas:
Mengamati gambar
Mencocokkan gambar
Mengisi jawaban
Memberi label pada gambar
Mengurutkan gambar
Menghubungkan konsep dengan ilustrasi
Mewarnai (khusus jenjang tertentu)
Diskusi sederhana
Bermain sambil belajar
Setiap aktivitas harus:
interaktif,
menarik,
sesuai usia siswa,
dan memiliki ruang jawaban.

LATIHAN (Opsional)
Jumlah Butir Soal : ${activeQuestionCount}
Bentuk latihan: ${includeExercises.join(', ')}
Buat soal tambahan yang:
relevan dengan materi,
bervariasi,
tidak terlalu sulit,
dan tetap berbasis ilustrasi atau aktivitas.
Boleh berupa:
pilihan ganda,
isian,
menjodohkan,
atau uraian singkat.

REFLEKSI SISWA
Buat 2–3 pertanyaan refleksi sederhana seperti:
Apa hal baru yang kamu pelajari hari ini?
Bagian mana yang paling kamu sukai?
Apa yang masih ingin kamu pelajari?

KETENTUAN ILUSTRASI
Gunakan ilustrasi:
${activeStyle.toLowerCase()},
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak sebanyak ${activePageCount},
memuat ${activeQuestionCount} yang relevan, terstruktur, dan interaktif,
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadWord = () => {
    try {
      setExportingType('word');
      const textContent = `
# LEMBAR KERJA PESERTA DIDIK (LKPD) - KURIKULUM MERDEKA
**Mata Pelajaran:** ${subject} | **Kelas/Fase:** ${gradeClass} (${educationLevel})
**Topik / Materi Pokok:** ${topic}
**Bentuk LKPD:** ${activeType} | **Gaya Ilustrasi:** ${activeStyle}
**Jumlah Halaman:** ${activePageCount} | **Jumlah Soal:** ${activeQuestionCount}

---

### 🎯 1. Capaian & Tujuan Pembelajaran
- Peserta didik mampu menelaah dan memahami konsep esensial materi **${topic}** melalui kegiatan penyelidikan aktif dan eksplorasi visual kontekstual.
- **Profil Pelajar Pancasila**: Bernalar Kritis, Kreatif, dan Bergotong Royong.

### 🔍 2. Stimulus Kasus & Ilustrasi Kontekstual (${activeStyle})
Di lingkungan sekitar, terdapat fenomena penting yang berkaitan langsung dengan materi **${topic}**. Amati gambar ilustrasi yang disajikan, catat poin-poin penting, dan diskusikan bersama teman kelompok untuk menemukan pembuktian ilmiahnya.

### 📝 3. Langkah Kegiatan & Aktivitas Siswa (${pictureActivities.join(', ')})
1. **Tahap 1 (Observasi Gambar)**: Perhatikan secara teliti ilustrasi yang disajikan, kenali bagian-bagian utamanya.
2. **Tahap 2 (Pemberian Label & Analisis)**: Tuliskan label yang sesuai pada setiap bagian diagram / gambar di lembar aktivitas.
3. **Tahap 3 (Diskusi Kolaboratif)**: Bersama kelompok 3-4 orang, diskusikan fungsi dan keterkaitan antar elemen pada materi ini.
4. **Tahap 4 (Perumusan Kesimpulan)**: Simpulkan pemahaman materi dengan bahasa sendiri secara lugas dan terstruktur.

### ✍️ 4. Paket Latihan Soal (${activeQuestionCount})
${generateQuestionListForDoc(numQuestions, topic)}

### 📋 5. Lembar Refleksi Mandiri Siswa
- **Ekspresi Perasaan**: [ ] Sangat Paham 😊   [ ] Cukup Paham 🤔   [ ] Butuh Bantuan 🙋‍♂️
- **Hal Baru Yang Dipelajari Hari Ini**: .........................................................................
      `.trim();

      exportToWordDoc(`LKPD-${topic}-${gradeClass}`, textContent, {
        title: `LKPD: ${topic}`,
        topic,
        subject,
        gradeClass,
        categoryTitle: activeType,
      });
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor dokumen Word.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadImage = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('image');
      await exportToImage(sheetRef.current, `LKPD-${topic}-${gradeClass}`, 'png');
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor foto LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('pdf');
      await exportToPdf(sheetRef.current, `LKPD-${topic}-${gradeClass}`);
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor PDF LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  // Helper for generating text list in word doc
  function generateQuestionListForDoc(count: number, topicTitle: string) {
    const list = [];
    for (let i = 1; i <= count; i++) {
      if (i % 2 === 1) {
        list.push(`**Soal ${i} (Pilihan Ganda HOTS)**: Manakah pernyataan yang paling tepat menjelaskan keterkaitan prinsip utama ${topicTitle} di kehidupan sehari-hari?\nA. Pernyataan Konsep A\nB. Pernyataan Konsep B\nC. Pernyataan Konsep C\nD. Pernyataan Konsep D`);
      } else {
        list.push(`**Soal ${i} (Isian / Analisis Kritis)**: Jelaskan faktor kunci yang memengaruhi tahapan proses pada materi ${topicTitle} dan berikan solusi jika terjadi kendala!`);
      }
    }
    return list.join('\n\n');
  }

  // Generate dynamic questions array based on numQuestions
  const questionsList = generateDynamicQuestions(numQuestions, topic);

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden during print) */}
      <div className="print:hidden bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-extrabold border border-emerald-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Format Cetak A4 Portrait Full-Color • {activePageCount} • {activeQuestionCount}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
            Pratinjau LKPD: {topic}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {subject} • {gradeClass} • {activeType} • Gaya {activeStyle}
          </p>
        </div>

        {/* Buttons & Export Options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs font-bold text-slate-600">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(125, zoomLevel + 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            title="Salin teks prompt LKPD ke clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Prompt LKPD</span>
              </>
            )}
          </button>

          {/* Export 1: Document Word (.doc) */}
          <button
            onClick={handleDownloadWord}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh dokumen Word yang siap diedit"
          >
            {exportingType === 'word' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-700" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-700" />
            )}
            <span>Unduh Word (.doc)</span>
          </button>

          {/* Export 2: Photo / Image (PNG) */}
          <button
            onClick={handleDownloadImage}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh foto/gambar berkualitas tinggi format PNG"
          >
            {exportingType === 'image' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-700" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
            )}
            <span>Unduh Foto (PNG)</span>
          </button>

          {/* Export 3: PDF Document (.pdf) */}
          <button
            onClick={handleDownloadPdf}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh file dokumen PDF format A4"
          >
            {exportingType === 'pdf' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-700" />
            ) : (
              <Download className="w-3.5 h-3.5 text-rose-700" />
            )}
            <span>Unduh PDF</span>
          </button>

          {/* Print dialog */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95"
            title="Cetak langsung menggunakan printer atau browser"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Cetak A4</span>
          </button>
        </div>
      </div>

      {/* Quick Selectors Toolbar (Hidden during print) */}
      <div className="print:hidden bg-slate-100 p-3.5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Jumlah Halaman */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
              <span className="flex items-center gap-1 text-emerald-700">
                <Files className="w-3.5 h-3.5" />
                <span>Jumlah Halaman:</span>
              </span>
              <span className="text-[10.5px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                {numPages} Hal
              </span>
            </div>
            <select
              value={activePageCount}
              onChange={(e) => handlePageCountSelect(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {LKPD_PAGE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Jumlah Soal */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
              <span className="flex items-center gap-1 text-sky-700">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Jumlah Butir Soal:</span>
              </span>
              <span className="text-[10.5px] bg-sky-50 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                {numQuestions} Butir
              </span>
            </div>
            <select
              value={activeQuestionCount}
              onChange={(e) => handleQuestionCountSelect(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500"
            >
              {LKPD_QUESTION_OPTIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Jenis LKPD */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
              <span className="flex items-center gap-1 text-purple-700">
                <Tag className="w-3.5 h-3.5" />
                <span>Bentuk LKPD:</span>
              </span>
            </div>
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
            >
              {ALL_LKPD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Gaya Seni Ilustrasi */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
              <span className="flex items-center gap-1 text-amber-700">
                <Palette className="w-3.5 h-3.5" />
                <span>Gaya Ilustrasi:</span>
              </span>
            </div>
            <select
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-amber-500"
            >
              {ILLUSTRATION_STYLES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If multi-page, display Page Switcher Tabs */}
        {numPages > 1 && (
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-extrabold text-slate-700 mr-1 flex items-center gap-1">
                <Files className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pilih Halaman:</span>
              </span>
              {Array.from({ length: numPages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = currentPage === pageNum;
                const pageLabels = [
                  'Hal 1: Stimulus & Identitas',
                  'Hal 2: Aktivitas & Tabel',
                  'Hal 3: Soal & Latihan HOTS',
                  'Hal 4: Proyek & Refleksi',
                ];
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      setViewMode('single');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      viewMode === 'single' && isCurrent
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{pageLabels[i] || `Halaman ${pageNum}`}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'all' ? 'single' : 'all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition flex items-center gap-1.5 ${
                  viewMode === 'all'
                    ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
                title="Tampilkan semua halaman berurutan untuk dicetak"
              >
                {viewMode === 'all' ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Mode Semua Halaman (Aktif)</span>
                  </>
                ) : (
                  <>
                    <Grid className="w-3.5 h-3.5 text-slate-500" />
                    <span>Tampilkan Semua Halaman</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* THE A4 PORTRAIT WORKBOOK SHEET CANVAS                    */}
      {/* ======================================================== */}
      <div className="flex flex-col items-center pb-8 print:p-0 print:overflow-visible space-y-6">
        <div
          ref={sheetRef}
          id="lkpd-workbook-sheet"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
          className="w-full max-w-[800px] flex flex-col space-y-8 print:space-y-0 transition-transform duration-200"
        >
          {/* Decide which pages to render based on viewMode and currentPage */}
          {renderPages()}
        </div>
      </div>
    </div>
  );

  // RENDER MULTI-PAGE OR SINGLE-PAGE CONTENT
  function renderPages() {
    if (numPages === 1) {
      return renderSinglePageWorkbook(1, 1);
    }

    if (viewMode === 'all') {
      return Array.from({ length: numPages }).map((_, i) => (
        <div key={i + 1} className={i > 0 ? 'page-break mt-6 print:mt-0' : ''}>
          {renderSpecificPage(i + 1, numPages)}
        </div>
      ));
    }

    // Single page selected
    return renderSpecificPage(currentPage, numPages);
  }

  // Render specific page based on page number & total pages
  function renderSpecificPage(pageNum: number, total: number) {
    if (total === 2) {
      if (pageNum === 1) return renderPage1Of2();
      return renderPage2Of2();
    }

    if (total === 3) {
      if (pageNum === 1) return renderPage1Of3();
      if (pageNum === 2) return renderPage2Of3();
      return renderPage3Of3();
    }

    if (total === 4) {
      if (pageNum === 1) return renderPage1Of4();
      if (pageNum === 2) return renderPage2Of4();
      if (pageNum === 3) return renderPage3Of4();
      return renderPage4Of4();
    }

    return renderSinglePageWorkbook(pageNum, total);
  }

  // --- PAGE BUILDER: 1-PAGE WORKBOOK (Compact & Complete) ---
  function renderSinglePageWorkbook(cur: number, total: number) {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4">
        {/* Decorative Corner Watermark */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-100/70 to-transparent rounded-tr-2xl pointer-events-none print:opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/70 to-transparent rounded-bl-2xl pointer-events-none print:opacity-40"></div>

        {/* 1. Header Banner */}
        {renderTopHeaderBanner(cur, total)}

        {/* 2. Identitas Siswa */}
        {renderStudentIdentityBox()}

        {/* 3. Capaian & Tujuan Pembelajaran */}
        {renderHighlightGoalBox()}

        {/* 4. Stimulus Kasus & Gambar */}
        {renderStimulusStoryBox()}

        {/* 5. Kegiatan Bergambar Interaktif */}
        {renderPictureActivityBox()}

        {/* 6. Tabel Observasi Ringkas */}
        {renderObservationTable()}

        {/* 7. Latihan Soal (${numQuestions} Soal) */}
        {renderQuestionsBox(questionsList)}

        {/* 8. Refleksi Emotikon */}
        {renderReflectionBox()}

        {/* Footer */}
        {renderWorkbookFooter(cur, total)}
      </div>
    );
  }

  // --- PAGE BUILDER: 2-PAGE WORKBOOK ---
  function renderPage1Of2() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-100/70 to-transparent rounded-tr-2xl pointer-events-none print:opacity-40"></div>
        
        <div className="space-y-4">
          {renderTopHeaderBanner(1, 2)}
          {renderStudentIdentityBox()}
          {renderHighlightGoalBox()}
          {renderStimulusStoryBox(true)}
          {renderPictureActivityBox(true)}
        </div>

        {renderWorkbookFooter(1, 2)}
      </div>
    );
  }

  function renderPage2Of2() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/70 to-transparent rounded-bl-2xl pointer-events-none print:opacity-40"></div>
        
        <div className="space-y-4">
          {renderSecondaryHeader(2, 2, 'Lembar Penyelidikan, Latihan Soal & Evaluasi')}
          {renderObservationTable(true)}
          {renderQuestionsBox(questionsList)}
          {renderReflectionBox()}
        </div>

        {renderWorkbookFooter(2, 2)}
      </div>
    );
  }

  // --- PAGE BUILDER: 3-PAGE WORKBOOK ---
  function renderPage1Of3() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-5 min-h-[1050px]">
        <div className="space-y-4">
          {renderTopHeaderBanner(1, 3)}
          {renderStudentIdentityBox()}
          {renderHighlightGoalBox()}
          {renderStimulusStoryBox(true)}
          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-2">
            <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
              ✦ Hipotesis / Dugaan Awal Siswa
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tuliskan apa yang kamu ketahui dan duga sebelum memulai rangkaian aktivitas di halaman berikutnya:
            </p>
            <div className="space-y-2 pt-1">
              <div className="border-b border-dotted border-slate-300 h-5"></div>
              <div className="border-b border-dotted border-slate-300 h-5"></div>
              <div className="border-b border-dotted border-slate-300 h-5"></div>
            </div>
          </div>
        </div>
        {renderWorkbookFooter(1, 3)}
      </div>
    );
  }

  function renderPage2Of3() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="space-y-4">
          {renderSecondaryHeader(2, 3, 'Kegiatan Bergambar Interaktif & Tabel Observasi')}
          {renderPictureActivityBox(true)}
          {renderObservationTable(true)}
        </div>
        {renderWorkbookFooter(2, 3)}
      </div>
    );
  }

  function renderPage3Of3() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="space-y-4">
          {renderSecondaryHeader(3, 3, `Paket Latihan Soal (${numQuestions} Soal) & Refleksi Diri`)}
          {renderQuestionsBox(questionsList)}
          {renderReflectionBox()}
        </div>
        {renderWorkbookFooter(3, 3)}
      </div>
    );
  }

  // --- PAGE BUILDER: 4-PAGE WORKBOOK ---
  function renderPage1Of4() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-5 min-h-[1050px]">
        <div className="space-y-4">
          {renderTopHeaderBanner(1, 4)}
          {renderStudentIdentityBox()}
          {renderHighlightGoalBox()}
          {renderStimulusStoryBox(true)}
        </div>
        {renderWorkbookFooter(1, 4)}
      </div>
    );
  }

  function renderPage2Of4() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="space-y-4">
          {renderSecondaryHeader(2, 4, 'Rangkaian Kegiatan Bergambar Interaktif & Tabel Observasi')}
          {renderPictureActivityBox(true)}
          {renderObservationTable(true)}
        </div>
        {renderWorkbookFooter(2, 4)}
      </div>
    );
  }

  function renderPage3Of4() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="space-y-4">
          {renderSecondaryHeader(3, 4, `Paket Latihan Soal Mandiri & HOTS (${numQuestions} Soal)`)}
          {renderQuestionsBox(questionsList)}
        </div>
        {renderWorkbookFooter(3, 4)}
      </div>
    );
  }

  function renderPage4Of4() {
    return (
      <div className="w-full bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-9 relative flex flex-col justify-between space-y-4 min-h-[1050px]">
        <div className="space-y-4">
          {renderSecondaryHeader(4, 4, 'Tantangan Proyek Kolaboratif & Lembar Refleksi Siswa')}
          {/* Proyek Section */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 rounded-2xl p-4 border border-purple-200 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black">
                ★
              </span>
              <h4 className="text-xs font-extrabold text-purple-950 uppercase tracking-wider">
                Misi Aksi Nyata Kolaboratif Tim (PjBL / P5)
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Bersama regu belajarmu, buatlah sebuah poster infografis kreatif atau permodelan sederhana bertema{' '}
              <strong>"{topic}"</strong> yang dapat dipresentasikan di depan kelas.
            </p>
            <div className="bg-white rounded-xl p-3 border border-purple-200 grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-700">Nama Projek:</span>
                <div className="border-b border-dotted border-slate-300 h-4"></div>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-700">Anggota Tim:</span>
                <div className="border-b border-dotted border-slate-300 h-4"></div>
              </div>
            </div>
          </div>

          {/* Rubrik Penilaian Guru */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Rubrik Penilaian Kinerja Guru (Asesmen Formatif)
            </h4>
            <div className="grid grid-cols-4 gap-2 text-[10.5px] text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-bold text-slate-700">
                Pemahaman Konsep (★)
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-bold text-slate-700">
                Keaktifan Praktik (★)
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-bold text-slate-700">
                Bernalar Kritis (★)
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-bold text-slate-700">
                Kerjasama Tim (★)
              </div>
            </div>
          </div>

          {renderReflectionBox()}
        </div>
        {renderWorkbookFooter(4, 4)}
      </div>
    );
  }

  // --- REUSABLE UI SUB-COMPONENTS ---

  function renderTopHeaderBanner(cur: number, total: number) {
    return (
      <div className="border-b-2 border-emerald-600 pb-3 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
              <span>Lembar Kerja Peserta Didik (LKPD)</span>
              <span>•</span>
              <span>Kurikulum Merdeka</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {topic}
            </h1>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              Mata Pelajaran: <span className="text-emerald-700 font-bold">{subject}</span> |{' '}
              <span className="text-slate-800 font-bold">{gradeClass}</span>
            </p>
          </div>

          <div className="text-right shrink-0 space-y-1">
            <div className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10.5px] font-extrabold px-3 py-0.8 rounded-xl shadow-xs">
              {activeType}
            </div>
            <div className="text-[10px] text-slate-500 font-bold block">
              Gaya: <span className="text-purple-700 font-black">{activeStyle}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSecondaryHeader(cur: number, total: number, subtitle: string) {
    return (
      <div className="border-b border-emerald-500 pb-2.5 relative z-10 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            LKPD: {topic} ({gradeClass})
          </span>
          <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">{subtitle}</h3>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Halaman {cur} dari {total}
          </span>
        </div>
      </div>
    );
  }

  function renderStudentIdentityBox() {
    return (
      <div className="bg-[#f8faf9] rounded-2xl p-3 border border-emerald-200/90 grid grid-cols-1 sm:grid-cols-12 gap-3 relative z-10 shadow-xs">
        <div className="sm:col-span-8 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 w-28 shrink-0">Nama Siswa/Regu :</span>
            <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[18px]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 w-16 shrink-0">Kelas :</span>
              <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[18px] text-xs font-semibold text-emerald-900">
                {gradeClass}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 w-20 shrink-0">No. Absen :</span>
              <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[18px]"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 w-28 shrink-0">Hari / Tanggal :</span>
            <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[18px]"></div>
          </div>
        </div>

        <div className="sm:col-span-4 bg-white rounded-xl p-2 border border-emerald-200 flex flex-col justify-between text-center shadow-xs">
          <span className="text-[9.5px] uppercase font-extrabold text-emerald-800 tracking-wider">
            Nilai / Paraf Guru
          </span>
          <div className="flex-1 flex items-center justify-center my-0.5">
            <div className="w-14 h-8 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs">
              Skor
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-400 text-xs">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      </div>
    );
  }

  function renderHighlightGoalBox() {
    return (
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 rounded-2xl p-3 border-l-4 border-emerald-600 shadow-xs relative z-10">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-wider text-emerald-950">
              Tujuan Pembelajaran &amp; Profil Pelajar Pancasila
            </h3>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
              Peserta didik mampu menelaah materi <strong>{topic}</strong> secara aktif, berpikir
              kritis melalui eksplorasi visual, dan bergotong royong dalam kerja tim.
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className="text-[9.5px] font-bold bg-white px-2 py-0.3 rounded border border-emerald-200 text-emerald-800">
                ✓ Bernalar Kritis
              </span>
              <span className="text-[9.5px] font-bold bg-white px-2 py-0.3 rounded border border-emerald-200 text-emerald-800">
                ✓ Kreatif
              </span>
              <span className="text-[9.5px] font-bold bg-white px-2 py-0.3 rounded border border-emerald-200 text-emerald-800">
                ✓ Bergotong Royong
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStimulusStoryBox(expanded: boolean = false) {
    return (
      <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200 relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-[9.5px] uppercase">
              Cerita Kontekstual &amp; Gambar
            </span>
            <h4 className="text-xs font-extrabold text-slate-900">
              Misi Penyelidikan: Kasus "{topic}"
            </h4>
          </div>
          <span className="text-[9.5px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
            Gaya {activeStyle}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-0.5">
          <div className="w-full sm:w-40 h-24 bg-white rounded-xl border border-amber-200 p-2 flex flex-col items-center justify-center text-center shadow-xs shrink-0">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
              <ImageIcon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">Ilustrasi Edukatif</span>
            <span className="text-[9px] text-slate-400">Visual {activeStyle}</span>
          </div>

          <div className="flex-1 text-xs text-slate-700 leading-relaxed italic space-y-1">
            <p>
              "Di sebuah lingkungan sekolah, para siswa sedang mengamati fenomena unik yang berkaitan langsung
              dengan <strong>{topic}</strong>. Mereka mencatat perubahan yang terjadi pada setiap tahapan dan ingin membuktikan
              faktor apa saja yang paling memengaruhi proses tersebut."
            </p>
            <div className="pt-0.5 flex items-center gap-2 text-[11px] font-bold text-emerald-800 not-italic">
              <span>✦ Pertanyaan Pemantik:</span>
              <div className="flex-1 border-b border-dotted border-emerald-400 min-h-[16px]">
                Menurut analisismu, apa pemicu utama fenomena pada gambar di samping?
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPictureActivityBox(expanded: boolean = false) {
    return (
      <div className="space-y-2.5 relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
              A
            </span>
            <span>Kegiatan Bergambar Interaktif</span>
          </h3>
          <div className="flex items-center gap-1">
            {pictureActivities.slice(0, 3).map((act) => (
              <span
                key={act}
                className="text-[9.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
              >
                {act}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Box 1 */}
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Aktivitas 1: Beri Label &amp; Amati</span>
              </span>
              <span className="text-[9.5px] text-slate-400">Tuliskan nama bagian</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col items-center justify-center min-h-[90px] text-center space-y-1.5">
              <div className="grid grid-cols-2 gap-1.5 w-full text-xs">
                <div className="p-1 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[9px] font-black flex items-center justify-center">
                    1
                  </span>
                  <div className="flex-1 border-b border-dotted border-slate-300 h-3.5"></div>
                </div>
                <div className="p-1 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">
                    2
                  </span>
                  <div className="flex-1 border-b border-dotted border-slate-300 h-3.5"></div>
                </div>
                <div className="p-1 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                    3
                  </span>
                  <div className="flex-1 border-b border-dotted border-slate-300 h-3.5"></div>
                </div>
                <div className="p-1 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[9px] font-black flex items-center justify-center">
                    4
                  </span>
                  <div className="flex-1 border-b border-dotted border-slate-300 h-3.5"></div>
                </div>
              </div>
              <span className="text-[9.5px] text-slate-500 italic">
                Amati diagram visual dan tuliskan istilah yang tepat pada kotak nomor!
              </span>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <ListOrdered className="w-3.5 h-3.5 text-purple-600" />
                <span>Aktivitas 2: Hubungkan Konsep</span>
              </span>
              <span className="text-[9.5px] text-slate-400">Tarik garis penghubung</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 flex flex-col justify-between min-h-[90px] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Konsep A
                </span>
                <span className="text-slate-400 text-xs">• • •</span>
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Fungsi / Peran 2
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Konsep B
                </span>
                <span className="text-slate-400 text-xs">• • •</span>
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Fungsi / Peran 1
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Konsep C
                </span>
                <span className="text-slate-400 text-xs">• • •</span>
                <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  Fungsi / Peran 3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderObservationTable(expanded: boolean = false) {
    return (
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
            B
          </span>
          <h3 className="text-xs font-extrabold text-slate-800">
            Tabel Observasi &amp; Pengamatan Kerja
          </h3>
        </div>

        <div className="rounded-xl overflow-hidden border border-slate-300 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white font-extrabold text-[11px]">
                <th className="py-1.5 px-3 w-8 text-center border-r border-emerald-500">No</th>
                <th className="py-1.5 px-3 border-r border-emerald-500">Objek / Tahap Aktivitas</th>
                <th className="py-1.5 px-3 border-r border-emerald-500 w-36">Hasil Pengamatan</th>
                <th className="py-1.5 px-3">Penjelasan &amp; Analisis Nalar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-700 bg-white text-[11px]">
              <tr className="hover:bg-slate-50">
                <td className="py-2 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                  1
                </td>
                <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-800">
                  Pengamatan awal fenomena {topic}
                </td>
                <td className="py-2 px-3 border-r border-slate-200">
                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                </td>
                <td className="py-2 px-3">
                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                </td>
              </tr>
              <tr className="bg-slate-50/50 hover:bg-slate-50">
                <td className="py-2 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                  2
                </td>
                <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-800">
                  Perlakuan / Uji coba eksperimen yang dilakukan
                </td>
                <td className="py-2 px-3 border-r border-slate-200">
                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                </td>
                <td className="py-2 px-3">
                  <div className="border-b border-dotted border-slate-300 h-4"></div>
                </td>
              </tr>
              {expanded && (
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                    3
                  </td>
                  <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-800">
                    Hasil akhir setelah proses penyelidikan selesai
                  </td>
                  <td className="py-2 px-3 border-r border-slate-200">
                    <div className="border-b border-dotted border-slate-300 h-4"></div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="border-b border-dotted border-slate-300 h-4"></div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderQuestionsBox(questions: any[]) {
    return (
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
              C
            </span>
            <h3 className="text-xs font-extrabold text-slate-800">
              Paket Latihan Soal Relevan ({questions.length} Butir Soal Terpilih)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {activeQuestionCount}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {questions.map((q) => (
            <div
              key={q.no}
              className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-slate-800 leading-snug">
                  {q.no}. {q.text}
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-white text-slate-600 rounded border border-slate-200 shrink-0">
                  {q.type}
                </span>
              </div>

              {/* Options if Multiple Choice */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-2 text-slate-600 text-[11px]">
                  {q.options.map((opt: string, i: number) => (
                    <div key={i} className="hover:text-slate-900">
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {/* Input Line if Short Answer */}
              {q.placeholder && (
                <div className="pl-2 pt-0.5">
                  <div className="border-b-2 border-dotted border-slate-300 h-4 max-w-sm"></div>
                </div>
              )}

              {/* Multi-line response lines if Essay / HOTS */}
              {q.lines && (
                <div className="pl-2 space-y-1 pt-0.5">
                  {Array.from({ length: q.lines }).map((_, li) => (
                    <div key={li} className="border-b border-dotted border-slate-300 h-3.5"></div>
                  ))}
                </div>
              )}

              {/* Matching pairs if relation */}
              {q.matchPairs && (
                <div className="pl-2 space-y-1 pt-1 text-[11px]">
                  {q.matchPairs.map((p: any, pi: number) => (
                    <div key={pi} className="flex items-center justify-between max-w-md">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
                        {p.left}
                      </span>
                      <span className="text-slate-400">• • •</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
                        {p.right}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderReflectionBox() {
    return (
      <div className="bg-[#f0fbf5] rounded-2xl p-3 border border-emerald-300 relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
              D
            </span>
            <h4 className="text-xs font-extrabold text-emerald-950">
              Refleksi Belajar Siswa (Student Self-Check)
            </h4>
          </div>
          <span className="text-[9.5px] font-semibold text-slate-500">
            Lingkari ekspresi perasaanmu hari ini!
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setSelectedMood('senang')}
            className={`p-1 rounded-xl border flex items-center justify-center gap-1.5 transition ${
              selectedMood === 'senang'
                ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span className="text-xs">Sangat Paham 😊</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMood('cukup')}
            className={`p-1 rounded-xl border flex items-center justify-center gap-1.5 transition ${
              selectedMood === 'cukup'
                ? 'bg-amber-500 text-white font-bold border-amber-500 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Meh className="w-3.5 h-3.5" />
            <span className="text-xs">Cukup Paham 🤔</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMood('bantuan')}
            className={`p-1 rounded-xl border flex items-center justify-center gap-1.5 transition ${
              selectedMood === 'bantuan'
                ? 'bg-rose-500 text-white font-bold border-rose-500 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Frown className="w-3.5 h-3.5" />
            <span className="text-xs">Butuh Bantuan 🙋‍♂️</span>
          </button>
        </div>

        <div className="pt-0.5">
          <span className="text-[10.5px] font-bold text-slate-700 block mb-0.5">
            Hal paling menyenangkan atau hal baru yang kupelajari hari ini:
          </span>
          <div className="border-b border-dotted border-emerald-300 h-4"></div>
        </div>
      </div>
    );
  }

  function renderWorkbookFooter(cur: number, total: number) {
    return (
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span>Workbook Pembelajaran Interaktif • Format Kurikulum Merdeka</span>
        <span className="font-bold text-slate-600">
          Halaman {cur} dari {total} (Format A4 Portrait)
        </span>
      </div>
    );
  }
};

// HELPER: Generate dynamic questions list based on requested count
function generateDynamicQuestions(count: number, topicTitle: string) {
  const masterQuestions = [
    {
      no: 1,
      type: 'Pilihan Ganda',
      badge: 'Pemahaman Konsep',
      text: `Manakah dari pernyataan berikut yang paling tepat menggambarkan prinsip utama dari ${topicTitle}?`,
      options: [
        `A. Menjelaskan proses inti dan karakteristik esensial dari ${topicTitle}`,
        `B. Menyajikan kondisi buatan yang tidak berkaitan langsung dengan alam`,
        `C. Menghubungkan fenomena ilmiah dengan kegiatan di sekitar kita`,
        `D. Memberikan perbandingan tidak langsung terkait hasil observasi`,
      ],
    },
    {
      no: 2,
      type: 'Isian Singkat',
      badge: 'Identifikasi Fakta',
      text: `Faktor kunci yang paling memicu terjadinya proses fenomena pada materi ${topicTitle} adalah:`,
      placeholder: 'Tuliskan jawaban singkat...',
    },
    {
      no: 3,
      type: 'Analisis Nalar',
      badge: 'Penalaran Kritis',
      text: `Jika terjadi perubahan mendadak pada kondisi pengamatan ${topicTitle}, dampak apa yang paling mungkin terjadi pada tahapan selanjutnya? Berikan alasan logis!`,
      lines: 2,
    },
    {
      no: 4,
      type: 'Pilihan Ganda HOTS',
      badge: 'Aplikasi Nyata',
      text: `Dalam kehidupan sehari-hari anak Indonesia, penerapan nyata dari konsep ${topicTitle} dapat dijumpai pada:`,
      options: [
        'A. Aktivitas pelestarian lingkungan dan kebiasaan baik di rumah/sekolah',
        'B. Fenomena acak yang tidak dapat dipelajari secara ilmiah',
        'C. Pembuatan karya inovasi ramah lingkungan berbasis kearifan lokal',
        'D. Pengamatan teori tanpa penerapan praktis di lapangan',
      ],
    },
    {
      no: 5,
      type: 'Menjodohkan',
      badge: 'Korelasional',
      text: `Tariklah garis penghubung antara komponen materi ${topicTitle} berikut dengan fungsinya!`,
      matchPairs: [
        { left: 'Komponen Utama (A)', right: 'Penggerak Alur Fenomena' },
        { left: 'Faktor Pendukung (B)', right: 'Penjaga Keseimbangan Proses' },
        { left: 'Hasil Observasi (C)', right: 'Manfaat Nyata bagi Siswa' },
      ],
    },
    {
      no: 6,
      type: 'Uraian Analitis',
      badge: 'HOTS Analisis',
      text: `Berdasarkan data pada tabel pengamatanmu, simpulkan hubungan keterkaitan antara perlakuan awal dengan hasil akhir pada materi ${topicTitle}!`,
      lines: 2,
    },
    {
      no: 7,
      type: 'Studi Kasus Lingkungan',
      badge: 'Studi Kasus',
      text: `Bagaimana caramu mengajak teman-teman di sekolah agar bersama-sama peduli terhadap dampak fenomena ${topicTitle}? Berikan 2 usulan konkret!`,
      lines: 2,
    },
    {
      no: 8,
      type: 'Pilihan Ganda HOTS',
      badge: 'Evaluasi Kritis',
      text: `Jika hasil pengamatan kelompokmu menunjukkan data anomali saat menyelidiki ${topicTitle}, tindakan ilmiah yang paling tepat adalah:`,
      options: [
        'A. Melakukan verifikasi ulang langkah kerja dan mendiskusikan penyebabnya',
        'B. Mengubah catatan data agar seragam dengan kelompok lain',
        'C. Menyalahkan alat percobaan dan tidak menyimpulkan',
        'D. Menghapus tabel hasil pengamatan yang tidak cocok',
      ],
    },
    {
      no: 9,
      type: 'Isian Singkat',
      badge: 'Eksplorasi Variabel',
      text: `Alat atau bahan paling esensial yang diperlukan untuk membuktikan prinsip ${topicTitle} adalah:`,
      placeholder: 'Tuliskan alat dan bahan...',
    },
    {
      no: 10,
      type: 'Pemecahan Masalah Solutif',
      badge: 'HOTS Abad 21',
      text: `Rancanglah sebuah solusi ramah lingkungan untuk mengatasi tantangan yang timbul akibat ketidakseimbangan pada siklus/proses ${topicTitle}!`,
      lines: 2,
    },
    {
      no: 11,
      type: 'Pilihan Ganda',
      badge: 'Bank Soal 1',
      text: `Tahapan yang paling memerlukan ketelitian dalam penyelidikan ${topicTitle} adalah:`,
      options: [
        'A. Pengamatan sistematis dan pencatatan data secara objektif',
        'B. Memilih warna kertas lembar kerja',
        'C. Menentukan pembagian tempat duduk siswa',
        'D. Menghafal teori tanpa memahami konsep',
      ],
    },
    {
      no: 12,
      type: 'Isian Singkat',
      badge: 'Bank Soal 2',
      text: `Dua kata kunci utama yang mendasari proses ${topicTitle} adalah:`,
      placeholder: 'Tuliskan kata kunci...',
    },
    {
      no: 13,
      type: 'Analisis Gambar',
      badge: 'Bank Soal 3',
      text: `Perhatikan kembali gambar stimulus. Mengapa bagian tersebut menjadi titik kunci keberhasilan proses ${topicTitle}? Jelaskan!`,
      lines: 2,
    },
    {
      no: 14,
      type: 'Pilihan Ganda HOTS',
      badge: 'Bank Soal 4',
      text: `Kearifan lokal masyarakat Indonesia dalam menjaga keteraturan fenomena alam ${topicTitle} tercermin dalam tradisi:`,
      options: [
        'A. Gotong royong merawat sumber daya alam secara lestari',
        'B. Eksploitasi alam besar-besaran untuk keuntungan sesaat',
        'C. Mengabaikan kelestarian habitat flora dan fauna',
        'D. Menimbun sampah di saluran air lingkungan',
      ],
    },
    {
      no: 15,
      type: 'Refleksi Solutif',
      badge: 'Bank Soal 5',
      text: `Apa komitmen pribadimu setelah mempelajari dan melakukan eksplorasi mengenai materi ${topicTitle}?`,
      lines: 2,
    },
  ];

  return masterQuestions.slice(0, count);
}
