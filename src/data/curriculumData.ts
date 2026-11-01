import { EducationLevel, TargetAI, LkpdActivityType } from '../types';

export interface AIModelOption {
  id: TargetAI;
  name: string;
  provider: string;
  badge: string;
  desc: string;
  url: string;
  iconBg: string;
  popularForTeachers: boolean;
}

export const AI_MODELS_LIST: AIModelOption[] = [
  {
    id: 'dola',
    name: 'Dola AI',
    provider: 'Dola Assistant (Web & WA)',
    badge: 'Populer Guru',
    desc: 'Asisten AI cerdas serbaguna yang sangat populer di kalangan guru Indonesia.',
    url: 'https://dola.com/',
    iconBg: 'bg-emerald-500',
    popularForTeachers: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI (GPT-4o)',
    badge: 'Favorit',
    desc: 'Pembuat soal HOTS, modul ajar, dan narasi cerita literasi detail.',
    url: 'https://chatgpt.com/',
    iconBg: 'bg-teal-600',
    popularForTeachers: true,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    provider: 'Google AI',
    badge: 'Terintegrasi',
    desc: 'Cepat, terhubung dengan data internet terbaru, ideal untuk riset materi IPAS.',
    url: 'https://gemini.google.com/app',
    iconBg: 'bg-blue-600',
    popularForTeachers: true,
  },
  {
    id: 'claude',
    name: 'Claude AI',
    provider: 'Anthropic (Claude 3.7)',
    badge: 'Pedagogis',
    desc: 'Sangat halus dalam berbahasa Indonesia baku dan menyusun alur instruksional.',
    url: 'https://claude.ai/new',
    iconBg: 'bg-amber-600',
    popularForTeachers: true,
  },
  {
    id: 'canva',
    name: 'Canva Magic & Code',
    provider: 'Canva Studio',
    badge: 'Visual Desain',
    desc: 'Siap tempel ke Canva Docs / Slides untuk layout visual otomatis.',
    url: 'https://www.canva.com/',
    iconBg: 'bg-sky-500',
    popularForTeachers: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek AI',
    badge: 'Logika & Sains',
    desc: 'Sangat kuat dalam pemecahan rumus matematika dan penalaran sains.',
    url: 'https://chat.deepseek.com/',
    iconBg: 'bg-indigo-600',
    popularForTeachers: true,
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft & Office',
    badge: 'Integrasi Office',
    desc: 'Sempurna untuk langsung membuat dokumen Word dan PowerPoint.',
    url: 'https://copilot.microsoft.com/',
    iconBg: 'bg-cyan-600',
    popularForTeachers: false,
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    provider: 'Perplexity',
    badge: 'Sumber Referensi',
    desc: 'AI pencari referensi buku ajar dan jurnal ilmiah dengan sitasi.',
    url: 'https://www.perplexity.ai/',
    iconBg: 'bg-slate-700',
    popularForTeachers: false,
  },
  {
    id: 'quizizz',
    name: 'Quizizz AI',
    provider: 'Quizizz',
    badge: 'Gamifikasi Soal',
    desc: 'Format teks yang siap diimpor menjadi game kuis interaktif di kelas.',
    url: 'https://quizizz.com/',
    iconBg: 'bg-purple-600',
    popularForTeachers: true,
  },
  {
    id: 'gamma',
    name: 'Gamma App',
    provider: 'Gamma AI',
    badge: 'Slide & Dokumen',
    desc: 'Mengubah prompt materi menjadi presentasi dan webpage ajar estetis.',
    url: 'https://gamma.app/',
    iconBg: 'bg-violet-600',
    popularForTeachers: false,
  },
  {
    id: 'poe',
    name: 'Poe AI',
    provider: 'Quora Poe',
    badge: 'Multi-Bot',
    desc: 'Akses berbagai bot spesialis edukasi dalam satu platform.',
    url: 'https://poe.com/',
    iconBg: 'bg-rose-500',
    popularForTeachers: false,
  },
];

export interface PhaseClassMapping {
  level: EducationLevel;
  phaseName: string;
  defaultClass: string;
  classes: string[];
}

export const PHASE_CLASS_MAPPINGS: Record<EducationLevel, PhaseClassMapping> = {
  PAUD: {
    level: 'PAUD',
    phaseName: 'Fondasi (PAUD / TK)',
    defaultClass: 'Kelompok B (Usia 5-6 Tahun)',
    classes: [
      'Kelompok Bermain (Usia 3-4 Tahun)',
      'Kelompok A (Usia 4-5 Tahun)',
      'Kelompok B (Usia 5-6 Tahun)',
    ],
  },
  SD_FASE_A: {
    level: 'SD_FASE_A',
    phaseName: 'Fase A (SD Kelas 1-2)',
    defaultClass: 'Kelas 1 SD',
    classes: ['Kelas 1 SD', 'Kelas 2 SD'],
  },
  SD_FASE_B: {
    level: 'SD_FASE_B',
    phaseName: 'Fase B (SD Kelas 3-4)',
    defaultClass: 'Kelas 4 SD',
    classes: ['Kelas 3 SD', 'Kelas 4 SD'],
  },
  SD_FASE_C: {
    level: 'SD_FASE_C',
    phaseName: 'Fase C (SD Kelas 5-6)',
    defaultClass: 'Kelas 5 SD',
    classes: ['Kelas 5 SD', 'Kelas 6 SD'],
  },
  SMP_FASE_D: {
    level: 'SMP_FASE_D',
    phaseName: 'Fase D (SMP Kelas 7-9)',
    defaultClass: 'Kelas 7 SMP',
    classes: ['Kelas 7 SMP', 'Kelas 8 SMP', 'Kelas 9 SMP'],
  },
  SMA_FASE_E: {
    level: 'SMA_FASE_E',
    phaseName: 'Fase E (SMA Kelas 10)',
    defaultClass: 'Kelas 10 SMA',
    classes: ['Kelas 10 SMA'],
  },
  SMA_FASE_F: {
    level: 'SMA_FASE_F',
    phaseName: 'Fase F (SMA Kelas 11-12)',
    defaultClass: 'Kelas 11 SMA',
    classes: ['Kelas 11 SMA', 'Kelas 12 SMA'],
  },
  SMK: {
    level: 'SMK',
    phaseName: 'Kejuruan / Vokasi SMK',
    defaultClass: 'Kelas 10 SMK',
    classes: ['Kelas 10 SMK', 'Kelas 11 SMK', 'Kelas 12 SMK'],
  },
};

// Database Kurikulum Merdeka: Materi Pokok & Capaian Pembelajaran per Jenjang dan Mapel
export const CURRICULUM_DATABASE: Record<
  string, // EducationLevel
  Record<
    string, // Subject
    string[] // Array of topics
  >
> = {
  PAUD: {
    'Nilai Agama dan Budi Pekerti': [
      'Mengenal Ciptaan Tuhan & Bersyukur',
      'Perilaku Hidup Bersih & Sehat (Cuci Tangan)',
      'Kasih Sayang Terhadap Teman & Hewan',
      'Doa Harian & Adab Berbicara Sopan',
    ],
    'Jati Diri (Sosial Emosional & Fisik)': [
      'Mengenal Emosi Diri (Senang, Sedih, Marah)',
      'Gerak Motorik Kasar: Meniti, Melompat, Menari',
      'Kemandirian Merapikan Mainan Sendiri',
      'Gotong Royong & Berbagi Mainan',
    ],
    'Dasar-Dasar Literasi & STEAM': [
      'Mengenal Huruf Vokal Melalui Lagu & Cerita',
      'Eksplorasi Warna Dasar & Pencampuran Warna',
      'Mengenal Angka 1-10 dengan Benda Konkret',
      'Eksperimen Sederhana: Benda Tenggelam & Terapung',
      'Bentuk Geometri di Sekitar Kita',
    ],
  },
  SD_FASE_A: {
    'Bahasa Indonesia': [
      'Bunyi Huruf dan Suku Kata (B-A, B-I, B-U)',
      'Mengenal Tanda Titik dan Huruf Kapital',
      'Menceritakan Pengalaman Diri di Rumah & Sekolah',
      'Memahami Isi Cerita Bergambar',
      'Kosakata Benda di Sekitar Kita',
    ],
    Matematika: [
      'Membilang dan Mengurutkan Bilangan 1-20',
      'Penjumlahan dan Pengurangan Dasar sampai 20',
      'Mengenal Bangun Datar Sederhana (Segitiga, Segiempat, Lingkaran)',
      'Membandingkan Panjang dan Berat Benda dengan Satuan Tidak Baku',
      'Waktu: Mengenal Jam dan Hari dalam Seminggu',
    ],
    'Pendidikan Pancasila': [
      'Aku Cinta Garuda Pancasila dan Simbol-Simbolnya',
      'Aturan di Rumah dan di Sekolah',
      'Menghargai Keberagaman Teman di Kelas',
      'Indahnya Gotong Royong Membersihkan Kelas',
    ],
    'Seni Rupa & Prakarya': [
      'Garis, Bentuk, dan Warna Pelangi',
      'Membuat Kolase dari Daun Kering',
      'Mencetak Pola dengan Buah dan Pelepah Pisang',
    ],
  },
  SD_FASE_B: {
    'IPAS (Ilmu Pengetahuan Alam & Sosial)': [
      'Tumbuhan, Sumber Kehidupan di Bumi (Fotosintesis & Bagian Tumbuhan)',
      'Wujud Zat dan Perubahannya (Padat, Cair, Gas, Menguap, Mencair)',
      'Gaya di Sekitar Kita (Gaya Otot, Gesek, Magnet, Gravitasi)',
      'Mengubah Bentuk Energi (Energi Kinetik, Potensial, Listrik)',
      'Cerita Tentang Daerahku (Sejarah & Kearifan Lokal)',
      'Indonesiaku Kaya Budaya (Keberagaman Suku & Rumah Adat)',
      'Bagaimana Air Mengalir dan Menjadi Hujan (Siklus Hidrologi)',
      'Peta Lingkungan Sekitar & Denah Sekolah',
    ],
    Matematika: [
      'Pecahan Senilai dan Operasi Hitung Campuran',
      'Pecahan Desimal dan Persen Sederhana',
      'Keliling dan Luas Persegi & Persegi Panjang',
      'Pengukuran Sudut Menggunakan Busur Derajat',
      'Penyajian Data dalam Bentuk Tabel dan Diagram Batang',
      'Pola Gambar dan Pola Bilangan',
    ],
    'Bahasa Indonesia': [
      'Teks Prosedur: Langkah Membuat Sesuatu',
      'Menemukan Ide Pokok dan Gagasan Pendukung',
      'Membaca Intensif Cerita Fabel & Pesan Moral',
      'Surat Pribadi dan Surat Undangan Sederhana',
      'Majas Personifikasi dan Hiperbola Sederhana',
    ],
    'Pendidikan Pancasila': [
      'Makna Sila-Sila Pancasila dalam Kehidupan Sehari-hari',
      'Hak dan Kewajiban sebagai Warga Sekolah',
      'Musyawarah untuk Mencapai Mufakat di Kelas',
      'Mengenal Keberagaman Budaya Indonesia',
    ],
    'Bahasa Inggris': [
      'Things in My Classroom and School Bag',
      'Daily Activities and Telling Time',
      'Food and Drinks (What would you like to eat?)',
      'Feelings and Emotions',
    ],
  },
  SD_FASE_C: {
    'IPAS (Ilmu Pengetahuan Alam & Sosial)': [
      'Melihat Karena Cahaya, Mendengar Karena Bunyi',
      'Harmoni dalam Ekosistem (Rantai Makanan & Jaring-Jaring)',
      'Magnet, Listrik, dan Teknologi untuk Kehidupan',
      'Sistem Pernapasan dan Pencernaan Manusia',
      'Bumi Kita Berubah (Lapisan Bumi & Bencana Alam)',
      'Warisan Budaya Indonesia dan Pengaruh Geografis',
      'Perjuangan Para Pahlawan Kemerdekaan Indonesia',
    ],
    Matematika: [
      'Operasi Hitung Pecahan Biasa, Campuran, dan Desimal',
      'Perbandingan dan Skala pada Peta',
      'Volume Kubus dan Balok serta Jaring-Jaringnya',
      'Pengolahan Data: Mean (Rata-rata), Median, Modus',
      'Operasi Bilangan Bulat Positif dan Negatif',
    ],
    'Bahasa Indonesia': [
      'Teks Eksplanasi Ilmiah: Mengapa Terjadi Gempa & Gunung Meletus',
      'Teks Laporan Hasil Pengamatan (Investigasi Lapangan)',
      'Pidato Singkat Persuasif Hari Pahlawan',
      'Menulis Puisi Bebas Bertema Alam',
      'Unsur Intrinsik Cerita Pendek (Tokoh, Latar, Alur, Amanat)',
    ],
    'Pendidikan Pancasila': [
      'Penerapan Nilai Pancasila dalam Menyelesaikan Konflik',
      'Pelaksanaan Hak dan Kewajiban di Lingkungan Masyarakat',
      'Mengenal Wilayah NKRI dan Batas-Batasnya',
    ],
  },
  SMP_FASE_D: {
    'IPA (Ilmu Pengetahuan Alam)': [
      'Hakikat Ilmu Sains dan Metode Ilmiah',
      'Zat dan Perubahannya (Suhu, Kalor, Pemuaian)',
      'Klasifikasi Makhluk Hidup dan Kunci Determinasi',
      'Ekologi dan Keanekaragaman Hayati Indonesia',
      'Bumi dan Tata Surya (Rotasi, Revolusi, Gerhana)',
      'Sistem Gerak, Sirkulasi, dan Ekskresi Manusia',
      'Usaha, Energi, dan Pesawat Sederhana',
      'Getaran, Gelombang, dan Cahaya',
      'Listrik Statis dan Listrik Dinamis',
    ],
    Matematika: [
      'Bilangan Bulat dan Bilangan Berpangkat (Eksponen)',
      'Bentuk Aljabar dan Persamaan Linier Satu Variabel (PLSV)',
      'Perbandingan Senilai dan Berbalik Nilai',
      'Garis dan Sudut serta Teorema Pythagoras',
      'Statistika dan Peluang Teoritik',
      'Fungsi Linier dan Sistem Persamaan Linier Dua Variabel (SPLDV)',
    ],
    'Bahasa Indonesia': [
      'Teks Deskripsi: Keindahan Objek Wisata Nusantara',
      'Teks Puisi Rakyat (Pantun, Syair, Gurindam)',
      'Teks Prosedur Kompleks dan Infografis',
      'Teks Berita Aktual (Unsur 5W+1H / ADIKSIMBA)',
      'Teks Diskusi dan Debat Pro-Kontra',
    ],
    'Bahasa Inggris': [
      'Describing People, Animals, and Everyday Objects',
      'Recount Text: My Unforgettable Holiday Experience',
      'Procedure Text: How to Make Traditional Indonesian Drink',
      'Narrative Text: Local Folklore and Legends',
    ],
    Informatika: [
      'Berpikir Komputasional (Dekomposisi, Pola, Algoritma)',
      'Teknologi Informasi dan Komunikasi (Aplikasi Perkantoran)',
      'Analisis Data dengan Spreadsheet Sederhana',
      'Pemrograman Blok (Scratch / Block-based Code)',
      'Dampak Sosial Informatika dan Etika Digital',
    ],
    IPS: [
      'Kondisi Geografis Indonesia dan Sumber Daya Alam',
      'Interaksi Sosial dan Lembaga Kemasyarakatan',
      'Kegiatan Ekonomi (Produksi, Distribusi, Konsumsi)',
      'Dinamika Penduduk dan Kolonialisme di Indonesia',
    ],
  },
  SMA_FASE_E: {
    Biologi: [
      'Keanekaragaman Hayati Tingkat Gen, Jenis, dan Ekosistem',
      'Virus dan Peranannya dalam Kehidupan',
      'Inovasi Bioteknologi Konvensional dan Modern',
      'Perubahan Lingkungan dan Pemanasan Global',
    ],
    Fisika: [
      'Pengukuran dan Angka Penting dalam Eksperimen Ilmiah',
      'Energi Terbarukan dan Efisiensi Konsumsi Energi',
      'Hukum Gerak Newton dan Aplikasinya',
    ],
    Kimia: [
      'Struktur Atom dan Konfigurasi Elektron',
      'Hukum Dasar Kimia dan Perhitungan Stoikiometri',
      'Prinsip Kimia Hijau (Green Chemistry) dalam Pembangunan Berkelanjutan',
    ],
    Matematika: [
      'Eksponen dan Logaritma',
      'Barisan dan Deret Aritmatika serta Geometri',
      'Vektor dan Operasi Geometrinya',
      'Trigonometri Dasar pada Segitiga Siku-siku',
      'Statistika Data Kelompok dan Boxplot',
    ],
    'Bahasa Indonesia': [
      'Teks Laporan Hasil Observasi (LHO) Kritis',
      'Teks Anekdot: Kritik Sosial Bernada Humor',
      'Teks Negosiasi dalam Kehidupan Bisnis & Sehari-hari',
      'Teks Biografi Tokoh Inspiratif',
    ],
    Ekonomi: [
      'Kelangkaan Sumber Daya dan Skala Prioritas',
      'Keseimbangan Pasar dan Struktur Pasar',
      'Lembaga Jasa Keuangan (Bank, OJK, Pasar Modal)',
    ],
  },
  SMA_FASE_F: {
    Biologi: [
      'Struktur dan Fungsi Sel (Organel & Transpor Membran)',
      'Metabolisme Sel: Katabolisme (Respirasi Sel) & Anabolisme (Fotosintesis)',
      'Genetika: DNA, RNA, dan Sintesis Protein',
      'Pola-Pola Hereditas Mendel dan Tautan Gen',
      'Evolusi dan Mekanisme Seleksi Alam',
    ],
    Fisika: [
      'Kinematika Gerak Lurus, Parabola, dan Melingkar',
      'Dinamika Rotasi dan Kesetimbangan Benda Tegar',
      'Termodinamika dan Mesin Kalor',
      'Gelombang Mekanik dan Gelombang Bunyi',
      'Rangkaian Arus Bolak-Balik (AC) dan Gelombang Elektromagnetik',
    ],
    Kimia: [
      'Ikatan Kimia dan Bentuk Molekul (Teori VSEPR)',
      'Termokimia dan Entalpi Reaksi',
      'Laju Reaksi dan Faktor-Faktor yang Mempengaruhinya',
      'Kesetimbangan Kimia dan Asam Basa',
      'Senyawa Karbon dan Makromolekul (Polimer, Karbohidrat, Protein)',
    ],
    Matematika: [
      'Limit Fungsi Aljabar dan Trigonometri',
      'Turunan Fungsi (Diferensial) dan Aplikasinya',
      'Integral Tak Tentu dan Integral Tentu (Luas Daerah)',
      'Geometri Ruang (Dimensi Tiga: Jarak Titik ke Garis/Bidang)',
    ],
  },
  SMK: {
    'Dasar Kejuruan / Produktif': [
      'Keselamatan dan Kesehatan Kerja Lingkungan Hidup (K3LH)',
      'Pengenalan Alat Ukur Presisi dan Peralatan Kerja Bengkel',
      'Dasar Kelistrikan dan Elektronika Industri',
      'Dasar Pemrograman Web dan Perangkat Lunak',
      'Manajemen Bisnis Ritel dan Layanan Pelanggan Prima',
      'Standar Operasional Prosedur (SOP) Industri Mitra',
    ],
    'Projek Kreatif dan Kewirausahaan (PKK)': [
      'Analisis Peluang Usaha dan Pembuatan Business Model Canvas (BMC)',
      'Perancangan Prototipe Produk Layak Jual',
      'Penetapan Harga Pokok Produksi (HPP) dan Strategi Pemasaran Digital',
      'Penyusunan Laporan Keuangan Sederhana Usaha Siswa',
    ],
    Matematika: [
      'Aplikasi Matematika Finansial (Bunga Tunggal, Bunga Majemuk, Anuitas)',
      'Matriks dan Transformasi Geometri Desain',
      'Program Linier untuk Optimasi Produksi',
      'Statistika Industri dan Kendali Kualitas (Quality Control)',
    ],
  },
};

// Map Mata Pelajaran Otomatis Sesuai Jenjang / Fase
export const LEVEL_SUBJECTS_MAPPING: Record<EducationLevel, string[]> = {
  PAUD: [
    'Dasar-Dasar Literasi & STEAM',
    'Jati Diri (Sosial Emosional & Fisik)',
    'Nilai Agama dan Budi Pekerti',
    'Seni & Kreativitas',
  ],
  SD_FASE_A: [
    'Bahasa Indonesia',
    'Matematika',
    'Pendidikan Pancasila',
    'Seni Rupa & Prakarya',
    'PABP (Pendidikan Agama)',
    'PJOK',
  ],
  SD_FASE_B: [
    'IPAS (Ilmu Pengetahuan Alam & Sosial)',
    'Matematika',
    'Bahasa Indonesia',
    'Pendidikan Pancasila',
    'Bahasa Inggris',
    'Seni Rupa & Budaya',
    'PJOK',
  ],
  SD_FASE_C: [
    'IPAS (Ilmu Pengetahuan Alam & Sosial)',
    'Matematika',
    'Bahasa Indonesia',
    'Pendidikan Pancasila',
    'Bahasa Inggris',
    'Seni Budaya & Keterampilan',
    'PJOK',
  ],
  SMP_FASE_D: [
    'IPA (Ilmu Pengetahuan Alam)',
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Informatika',
    'IPS (Ilmu Pengetahuan Sosial)',
    'Pendidikan Pancasila',
    'PABP (Pendidikan Agama)',
    'Seni Budaya',
    'PJOK',
  ],
  SMA_FASE_E: [
    'Biologi',
    'Fisika',
    'Kimia',
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Informatika',
    'Ekonomi',
    'Sosiologi',
    'Geografi',
    'Sejarah',
    'Pendidikan Pancasila',
  ],
  SMA_FASE_F: [
    'Biologi',
    'Fisika',
    'Kimia',
    'Matematika Lanjut',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Ekonomi',
    'Sosiologi',
    'Geografi',
    'Sejarah',
  ],
  SMK: [
    'Dasar Kejuruan / Produktif',
    'Projek Kreatif dan Kewirausahaan (PKK)',
    'Matematika Terapan',
    'Informatika & Pemrograman',
    'Bahasa Indonesia',
    'Bahasa Inggris Komunikasi Bisnis',
    'K3LH & Etika Profesi',
  ],
};

// 22 Jenis / Bentuk LKPD Lengkap
export const ALL_LKPD_TYPES: string[] = [
  'LKPD Observasi',
  'LKPD Eksperimen',
  'LKPD Eksplorasi',
  'LKPD Berbasis Gambar',
  'LKPD Cerita Bergambar',
  'LKPD Mencocokkan',
  'LKPD Menjodohkan',
  'LKPD Pilihan Ganda',
  'LKPD Benar/Salah',
  'LKPD Isian',
  'LKPD Studi Kasus',
  'LKPD Investigasi',
  'LKPD Pemecahan Masalah (HOTS)',
  'LKPD Berbasis Proyek (PjBL)',
  'LKPD Diskusi Kelompok',
  'LKPD Analisis Data',
  'LKPD Refleksi',
  'LKPD Diagnostik',
  'LKPD Pengayaan',
  'LKPD Remedial',
  'LKPD Proyek',
  'LKPD Campuran',
];

// Pilihan Kegiatan Bergambar
export const LKPD_PICTURE_ACTIVITIES: string[] = [
  'Mengamati gambar',
  'Mencocokkan gambar',
  'Mengisi jawaban',
  'Memberi label pada gambar',
  'Mengurutkan gambar',
  'Menghubungkan konsep dengan ilustrasi',
  'Mewarnai (khusus jenjang tertentu)',
  'Diskusi sederhana',
  'Bermain sambil belajar',
];

// Opsi Latihan Tambahan
export const LKPD_EXERCISES: string[] = [
  'Pilihan Ganda',
  'Isian Singkat',
  'Menjodohkan',
  'Uraian Singkat / Studi Kasus',
];

// Opsi Jumlah Halaman LKPD
export const LKPD_PAGE_OPTIONS: string[] = [
  '1 Halaman (Ringkas Siap Cetak)',
  '2 Halaman (Standar Lembar Bolak-Balik)',
  '3 Halaman (Eksplorasi Proyek)',
  '4 Halaman (Workbook Lengkap)',
];

// Opsi Jumlah Soal LKPD
export const LKPD_QUESTION_OPTIONS: string[] = [
  '3 Soal (Ringkas)',
  '5 Soal (Standar)',
  '8 Soal (Pendalaman)',
  '10 Soal (Lengkap)',
  '15 Soal (Bank Soal)',
];

// Gaya Seni Ilustrasi
export interface IllustrationStyleOption {
  id: string;
  name: string;
  desc: string;
  badge: string;
  previewColor: string;
}

export const ILLUSTRATION_STYLES: IllustrationStyleOption[] = [
  {
    id: 'kartun',
    name: 'Kartun Edukatif',
    desc: 'Ceria, hangat, ramah anak Indonesia, warna cerah dan menggemaskan.',
    badge: 'Paling Populer',
    previewColor: 'from-amber-400 to-orange-400',
  },
  {
    id: 'anime',
    name: 'Anime Edukasi',
    desc: 'Gaya visual anime modern, ekspresif, dan disukai murid SD-SMA.',
    badge: 'Modern',
    previewColor: 'from-pink-400 to-rose-400',
  },
  {
    id: '2d',
    name: '2D Flat Vector',
    desc: 'Minimalis, bersih, infografis modern, fokus pada kejelasan konsep.',
    badge: 'Clean & Simpel',
    previewColor: 'from-sky-400 to-blue-500',
  },
  {
    id: '3d',
    name: '3D Render Ceria',
    desc: 'Berdimensi halus seperti figur animasi 3D, glossy dan menarik perhatian.',
    badge: 'Eye Catching',
    previewColor: 'from-purple-400 to-violet-500',
  },
  {
    id: 'classic',
    name: 'Classic Realistic',
    desc: 'Ilustrasi ilmiah akurat, anatomis/geografis, naturalistik dan rapi.',
    badge: 'Ilmiah',
    previewColor: 'from-emerald-500 to-teal-600',
  },
];

// Jenis / Bentuk LKPD Modern Workbook A4
export interface LkpdTypeOption {
  id: LkpdActivityType;
  title: string;
  badge: string;
  desc: string;
  iconName: string;
  color: string;
}

export const LKPD_TYPES_LIST: LkpdTypeOption[] = [
  {
    id: 'eksperimen',
    title: 'Eksperimen & Praktikum Sains',
    badge: 'Hands-on Learning',
    desc: 'Langkah visual investigasi ilmiah, tabel pengamatan alat & bahan, serta hipotesis.',
    iconName: 'FlaskConical',
    color: 'emerald',
  },
  {
    id: 'kasus',
    title: 'Studi Kasus & Pemecahan Masalah',
    badge: 'Critical Thinking',
    desc: 'Cerita kontekstual bergambar, analisis sebab-akibat, dan diskusi solusi.',
    iconName: 'FileText',
    color: 'sky',
  },
  {
    id: 'observasi',
    title: 'Tabel Observasi & Analisis Data',
    badge: 'Inquiry Learning',
    desc: 'Format tabel modern, checklist kriteria, dan pengolahan fakta nyata.',
    iconName: 'TableProperties',
    color: 'purple',
  },
  {
    id: 'teka_teki',
    title: 'Teka-Teki Konsep & Maze Edukatif',
    badge: 'Fun Learning',
    desc: 'Permainan tebak kata, puzzle silang konsep, dan tantangan logika visual.',
    iconName: 'Puzzle',
    color: 'amber',
  },
  {
    id: 'menjodohkan',
    title: 'Menjodohkan Visual & Peta Konsep',
    badge: 'Visual Literacy',
    desc: 'Menghubungkan istilah dengan ilustrasi, diagram alur, dan kotak deskripsi.',
    iconName: 'Split',
    color: 'teal',
  },
  {
    id: 'projek',
    title: 'Misi Projek Kolaboratif Tim',
    badge: 'PjBL / P5',
    desc: 'Pembagian peran anggota tim, timeline aksi nyata, dan rubrik karya bersama.',
    iconName: 'Users',
    color: 'rose',
  },
];
