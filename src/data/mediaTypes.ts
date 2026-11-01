import { MediaCategory } from '../types';

export const MEDIA_CATEGORIES: MediaCategory[] = [
  {
    id: 'presentasi',
    title: 'Presentasi Interaktif (PPT/Canva)',
    subtitle: 'Slide menarik & interaktif',
    categoryName: 'Presentasi',
    iconName: 'Presentation',
    themeColor: 'blue',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textDark: 'text-sky-900',
    badgeBg: 'bg-sky-500',
    defaultTopic: 'Siklus Air dan Pengaruhnya bagi Bumi',
    subjectDefault: 'IPAS (Ilmu Pengetahuan Alam & Sosial)',
    quickQuestions: [
      {
        field: 'slideCount',
        label: 'Jumlah Slide',
        type: 'select',
        options: ['5 Slide (Ringkas)', '8 Slide (Standar)', '10 Slide (Lengkap)', '15 Slide (Mendalam)'],
        defaultValue: '8 Slide (Standar)',
      },
      {
        field: 'presentationStyle',
        label: 'Gaya Desain / Format',
        type: 'select',
        options: [
          'Canva Edukasi (Ceria, Ilustratif, Ramah Anak)',
          'PowerPoint Interaktif (Kuis Di Antara Slide)',
          'Infografis Modern & Minimalis',
          'Storytelling Berkarakter / Maskot Edukatif'
        ],
        defaultValue: 'Canva Edukasi (Ceria, Ilustratif, Ramah Anak)',
      },
      {
        field: 'interactiveElement',
        label: 'Elemen Interaktif',
        type: 'pills',
        options: ['Pertanyaan Pemantik', 'Tebak Gambar', 'Diskusi Teman Sebangku', 'Kuis Cepat Akhir Slide'],
        defaultValue: 'Pertanyaan Pemantik',
      }
    ],
  },
  {
    id: 'kuis',
    title: 'Kuis & Soal Evaluasi',
    subtitle: 'Soal HOTS, pilihan ganda, dll.',
    categoryName: 'Asesmen & Kuis',
    iconName: 'ClipboardList',
    themeColor: 'yellow',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200',
    textDark: 'text-amber-950',
    badgeBg: 'bg-amber-500',
    defaultTopic: 'Pecahan Senilai dan Operasi Hitung Campuran',
    subjectDefault: 'Matematika',
    quickQuestions: [
      {
        field: 'quizType',
        label: 'Bentuk Soal',
        type: 'select',
        options: [
          'Pilihan Ganda HOTS (Analisis & Penalaran)',
          'Kombinasi (PG, Isian Singkat, & Uraian)',
          'Menjodohkan & Benar/Salah Bersebab',
          'Soal Berbasis Studi Kasus Nyata / AKM'
        ],
        defaultValue: 'Pilihan Ganda HOTS (Analisis & Penalaran)',
      },
      {
        field: 'questionCount',
        label: 'Jumlah Butir Soal',
        type: 'select',
        options: ['5 Soal (Kuis Singkat)', '10 Soal (Asesmen Harian)', '15 Soal (Penilaian Sumatif)', '20 Soal (Bank Soal)'],
        defaultValue: '10 Soal (Asesmen Harian)',
      },
      {
        field: 'includeAnswerKey',
        label: 'Kelengkapan Jawaban',
        type: 'pills',
        options: ['Lengkap Kunci + Pembahasan Langkah Demi Langkah', 'Dilengkapi Rubrik Penilaian Skor', 'Dilengkapi Kisi-kisi Soal'],
        defaultValue: 'Lengkap Kunci + Pembahasan Langkah Demi Langkah',
      }
    ],
  },
  {
    id: 'game',
    title: 'Game Edukasi & Ice Breaking',
    subtitle: 'Permainan seru untuk belajar',
    categoryName: 'Game & Ice Breaking',
    iconName: 'Gamepad2',
    themeColor: 'green',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textDark: 'text-emerald-950',
    badgeBg: 'bg-emerald-500',
    defaultTopic: 'Ciri-Ciri Makhluk Hidup & Rantai Makanan',
    subjectDefault: 'IPAS / IPA',
    quickQuestions: [
      {
        field: 'gameFormat',
        label: 'Jenis Game Edukasi',
        type: 'select',
        options: [
          'Game Tanpa Alat (Tebak Gerak, Kata Berantai, Tepuk Konsentrasi)',
          'Game Kuis Interaktif Cepat (Gaya Quizizz / Kahoot / Siapa Cepat)',
          'Teka-Teki Silang & Tebak Kata Misteri',
          'Roleplay & Simulasi Peran Sederhana',
          'Estafet Pengetahuan / Tantangan Kelompok'
        ],
        defaultValue: 'Game Tanpa Alat (Tebak Gerak, Kata Berantai, Tepuk Konsentrasi)',
      },
      {
        field: 'duration',
        label: 'Durasi Permainan',
        type: 'select',
        options: ['5 Menit (Ice Breaking Awal Kelas)', '10-15 Menit (Penyegar di Tengah Materi)', '20-30 Menit (Aktivitas Inti Belajar)'],
        defaultValue: '10-15 Menit (Penyegar di Tengah Materi)',
      },
      {
        field: 'classEnergy',
        label: 'Tujuan Suasana Kelas',
        type: 'pills',
        options: ['Meningkatkan Fokus & Konsentrasi', 'Memecah Suasana Kantuk', 'Membangun Kerjasama Regu', 'Review Materi Menyenangkan'],
        defaultValue: 'Meningkatkan Fokus & Konsentrasi',
      }
    ],
  },
  {
    id: 'modul',
    title: 'Modul Ajar & RPPM',
    subtitle: 'Rencana pembelajaran lengkap',
    categoryName: 'Perangkat Ajar',
    iconName: 'BookOpenCheck',
    themeColor: 'purple',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textDark: 'text-purple-950',
    badgeBg: 'bg-purple-600',
    defaultTopic: 'Pancasila dalam Kehidupan Sehari-hari & Gotong Royong',
    subjectDefault: 'Pendidikan Pancasila',
    quickQuestions: [
      {
        field: 'teachingModel',
        label: 'Model Pembelajaran',
        type: 'select',
        options: [
          'Problem Based Learning (PBL)',
          'Project Based Learning (PjBL)',
          'Inquiry / Discovery Learning',
          'Differentiated Learning (Berdiferensiasi)'
        ],
        defaultValue: 'Problem Based Learning (PBL)',
      },
      {
        field: 'curriculumComponents',
        label: 'Komponen yang Dihasilkan',
        type: 'select',
        options: [
          'Lengkap (Tujuan, Pemahaman Bermakna, Pertanyaan Pemantik, Langkah Ajar, Asesmen & Remedial)',
          'Ringkas 1-2 Halaman (Efisien Siap Administrasi)',
          'RPPM / Modul Tematik PAUD Ramah Anak'
        ],
        defaultValue: 'Lengkap (Tujuan, Pemahaman Bermakna, Pertanyaan Pemantik, Langkah Ajar, Asesmen & Remedial)',
      },
      {
        field: 'meetingCount',
        label: 'Alokasi Waktu Pertemuan',
        type: 'select',
        options: ['1 Pertemuan (2 x 35/40/45 Menit)', '2 Pertemuan Bertahap', '3 Pertemuan Proyek'],
        defaultValue: '1 Pertemuan (2 x 35/40/45 Menit)',
      }
    ],
  },
  {
    id: 'lkpd',
    title: 'LKM / LKPD (Lembar Kerja Murid)',
    subtitle: 'Lembar kerja kreatif & menarik',
    categoryName: 'Lembar Kerja',
    iconName: 'FileEdit',
    themeColor: 'green',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textDark: 'text-emerald-950',
    badgeBg: 'bg-emerald-600',
    defaultTopic: 'Mengamati Bagian Tumbuhan dan Fungsinya',
    subjectDefault: 'IPAS / IPA',
    quickQuestions: [
      {
        field: 'pageCount',
        label: 'Jumlah Halaman LKPD',
        type: 'select',
        options: [
          '1 Halaman (Ringkas Siap Cetak)',
          '2 Halaman (Standar Lembar Bolak-Balik)',
          '3 Halaman (Eksplorasi Proyek)',
          '4 Halaman (Workbook Lengkap)',
        ],
        defaultValue: '1 Halaman (Ringkas Siap Cetak)',
      },
      {
        field: 'questionCount',
        label: 'Jumlah Butir Soal',
        type: 'select',
        options: [
          '3 Soal (Ringkas)',
          '5 Soal (Standar)',
          '8 Soal (Pendalaman)',
          '10 Soal (Lengkap)',
          '15 Soal (Bank Soal)',
        ],
        defaultValue: '5 Soal (Standar)',
      },
      {
        field: 'lkpdStyle',
        label: 'Bentuk Lembar Kerja',
        type: 'select',
        options: [
          'Aktivitas Eksplorasi & Percobaan Sederhana',
          'Tabel Pengamatan & Analisis Gambar',
          'Tantangan Teka-Teki & Menjodohkan Kreatif',
          'Studi Kasus Kontekstual Berkelompok'
        ],
        defaultValue: 'Aktivitas Eksplorasi & Percobaan Sederhana',
      },
      {
        field: 'targetStudent',
        label: 'Pendekatan Siswa',
        type: 'select',
        options: ['Mandiri (Individu)', 'Kolaborasi Kelompok Kecil (3-4 Siswa)', 'Berdiferensiasi 3 Tingkat Kemampuan'],
        defaultValue: 'Kolaborasi Kelompok Kecil (3-4 Siswa)',
      },
      {
        field: 'includesReflection',
        label: 'Elemen Pelengkap',
        type: 'pills',
        options: ['Refleksi Diri / Emotikon', 'Instruksi Langkah Visual', 'Rubrik Penilaian Diri'],
        defaultValue: 'Refleksi Diri / Emotikon',
      }
    ],
  },
  {
    id: 'infografis',
    title: 'Media Visual & Infografis',
    subtitle: 'Poster, diagram & infografis',
    categoryName: 'Visual & Desain',
    iconName: 'Image',
    themeColor: 'blue',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    textDark: 'text-blue-950',
    badgeBg: 'bg-blue-600',
    defaultTopic: 'Urutan Siklus Metamorfosis Kupu-Kupu dan Katak',
    subjectDefault: 'IPAS / Biologi',
    quickQuestions: [
      {
        field: 'visualType',
        label: 'Jenis Media Visual',
        type: 'select',
        options: [
          'Poster Edukasi Dinding Kelas (Ukuran A3)',
          'Infografis Alur / Diagram Alir (Step-by-step)',
          'Peta Konsep / Mind Map Materi',
          'Format Konten Sosial Media Edukatif (9:16 Canva)'
        ],
        defaultValue: 'Poster Edukasi Dinding Kelas (Ukuran A3)',
      },
      {
        field: 'visualTone',
        label: 'Gaya Ilustrasi & Warna',
        type: 'select',
        options: [
          'Kartun Ceria & Ramah Anak (Flat 2D Vector)',
          'Ilmiah Realistis & Jelas',
          'Infografis Modern Minimalis dengan Ikon & Angka',
          'Sketsa Doodle Lucu Bernuansa Pastel'
        ],
        defaultValue: 'Kartun Ceria & Ramah Anak (Flat 2D Vector)',
      },
      {
        field: 'canvaPromptIncluded',
        label: 'Fitur Tambahan',
        type: 'pills',
        options: ['Sertakan Prompt Generator Gambar (Midjourney/DALL-E)', 'Susunan Teks Siap Tempel Canva', 'Palet Warna Rekomendasi'],
        defaultValue: 'Susunan Teks Siap Tempel Canva',
      }
    ],
  },
  {
    id: 'audio',
    title: 'Audio & Lagu Pembelajaran',
    subtitle: 'Lagu edukatif & narasi',
    categoryName: 'Audio & Musik',
    iconName: 'Music',
    themeColor: 'orange',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textDark: 'text-orange-950',
    badgeBg: 'bg-orange-500',
    defaultTopic: 'Menghafal Nama-Nama Planet Tata Surya',
    subjectDefault: 'IPAS / Sains',
    quickQuestions: [
      {
        field: 'audioMedium',
        label: 'Format Karya Audio',
        type: 'select',
        options: [
          'Lirik Lagu Pembelajaran dengan Irama Lagu Anak Populer (Balonku, Naik Kereta Api, dll)',
          'Jingle / Yel-Yel Penyemangat Kelas',
          'Naskah Sandiwara Radio / Podcast Edukasi 2 Karakter',
          'Narasi Dongeng Audio Berkarakter Moral'
        ],
        defaultValue: 'Lirik Lagu Pembelajaran dengan Irama Lagu Anak Populer (Balonku, Naik Kereta Api, dll)',
      },
      {
        field: 'rhymeScheme',
        label: 'Pola Rima & Gaya',
        type: 'select',
        options: ['Rima Berirama Mudah Dihafal (AABB / ABAB)', 'Gaya Ceria Anak-Anak', 'Gaya Rap Edukatif Berenergi'],
        defaultValue: 'Rima Berirama Mudah Dihafal (AABB / ABAB)',
      },
      {
        field: 'movementPrompt',
        label: 'Kombinasi Gerak',
        type: 'pills',
        options: ['Sertakan Panduan Gerakan Tangan & Tubuh', 'Sertakan Not Balok / Kunci Nada Sederhana'],
        defaultValue: 'Sertakan Panduan Gerakan Tangan & Tubuh',
      }
    ],
  },
  {
    id: 'video',
    title: 'Media Video Pembelajaran',
    subtitle: 'Video edukatif berkualitas',
    categoryName: 'Video & Skrip',
    iconName: 'Video',
    themeColor: 'teal',
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200',
    textDark: 'text-teal-950',
    badgeBg: 'bg-teal-600',
    defaultTopic: 'Kenapa Langit Berwarna Biru & Terjadinya Pelangi',
    subjectDefault: 'Fisika / IPAS',
    quickQuestions: [
      {
        field: 'videoFormat',
        label: 'Format Skrip Video',
        type: 'select',
        options: [
          'Skrip 3 Kolom Lengkap (Visual / B-Roll, Voiceover / Narasi, Text on Screen)',
          'Video Pendek Reels / TikTok Edukasi (Kurang dari 60 detik)',
          'Video Animasi Naratif dengan Karakter Guru & Murid',
          'Video Demonstrasi Praktikum Sains Sederhana'
        ],
        defaultValue: 'Skrip 3 Kolom Lengkap (Visual / B-Roll, Voiceover / Narasi, Text on Screen)',
      },
      {
        field: 'videoDuration',
        label: 'Target Durasi Video',
        type: 'select',
        options: ['60 Detik (Shorts/Reels)', '2-3 Menit (Mikro-learning)', '5-7 Menit (Penjelasan Konsep Penuh)'],
        defaultValue: '2-3 Menit (Mikro-learning)',
      },
      {
        field: 'hookType',
        label: 'Tipe Hook Pembuka',
        type: 'pills',
        options: ['Pertanyaan Mengejutkan', 'Mitos vs Fakta', 'Cerita Masalah Sehari-hari'],
        defaultValue: 'Pertanyaan Mengejutkan',
      }
    ],
  },
  {
    id: 'chatbot',
    title: 'Chatbot AI Asisten Kelas',
    subtitle: 'Asisten belajar cerdas',
    categoryName: 'Chatbot AI',
    iconName: 'Bot',
    themeColor: 'purple',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textDark: 'text-purple-950',
    badgeBg: 'bg-purple-600',
    defaultTopic: 'Konsultasi Belajar Matematika & Pemecahan Masalah Logika',
    subjectDefault: 'Matematika / Logika',
    quickQuestions: [
      {
        field: 'botPersona',
        label: 'Karakter / Persona AI',
        type: 'select',
        options: [
          'Tutor Ramah Metode Socratic (Membimbing bertahap tanpa langsung memberi jawaban)',
          'Kakak Pendamping Belajar yang Ceria & Suka Analogi Seru',
          'Ilmuwan Cilik Penasaran yang Ajak Eksplorasi Sains',
          'Kamus & Teman Latihan Bahasa Interaktif'
        ],
        defaultValue: 'Tutor Ramah Metode Socratic (Membimbing bertahap tanpa langsung memberi jawaban)',
      },
      {
        field: 'antiCheatRules',
        label: 'Aturan Anti-Contekan',
        type: 'select',
        options: [
          'Ketat: Beri petunjuk dan pertanyaan pancingan, jangan beri jawaban final',
          'Moderat: Tunjukkan langkah penyelesaian contoh serupa, murid mengerjakan soal aslinya',
          'Diskusi Bebas: Jelaskan konsep dengan berbagai analogi visual'
        ],
        defaultValue: 'Ketat: Beri petunjuk dan pertanyaan pancingan, jangan beri jawaban final',
      },
      {
        field: 'systemInstructionOutput',
        label: 'Format Prompt AI',
        type: 'pills',
        options: ['System Instructions Siap Pasang di ChatGPT GPTs / Gemini Gem', 'Roleplay Prompt Langsung Chat'],
        defaultValue: 'System Instructions Siap Pasang di ChatGPT GPTs / Gemini Gem',
      }
    ],
  },
  {
    id: 'cetak',
    title: 'Cetak & Alat Peraga',
    subtitle: 'Flashcard, puzzle, dll.',
    categoryName: 'Media Cetak & Fisik',
    iconName: 'Printer',
    themeColor: 'green',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200',
    textDark: 'text-emerald-950',
    badgeBg: 'bg-emerald-600',
    defaultTopic: 'Kosakata Bahasa Inggris Benda di Rumah & Sekolah',
    subjectDefault: 'Bahasa Inggris',
    quickQuestions: [
      {
        field: 'printableType',
        label: 'Jenis Media Cetak',
        type: 'select',
        options: [
          'Flashcard 2 Sisi (Sisi Depan Gambar & Kata, Sisi Belakang Definisi & Kalimat)',
          'Lembar Potong & Tempel (Cut and Glue Matching)',
          'Papan Permainan (Board Game Edukasi dengan Dadu & Kartu Tantangan)',
          'Teka-Teki Kata & Maze Labirin Konsep'
        ],
        defaultValue: 'Flashcard 2 Sisi (Sisi Depan Gambar & Kata, Sisi Belakang Definisi & Kalimat)',
      },
      {
        field: 'cardQuantity',
        label: 'Jumlah Kartu / Lembar',
        type: 'select',
        options: ['12 Kartu', '20 Kartu', '30 Kartu (Set Komplit)'],
        defaultValue: '20 Kartu',
      },
      {
        field: 'printLayout',
        label: 'Instruksi Percetakan',
        type: 'pills',
        options: ['Panduan Garis Potong Kertas A4', 'Saran Bahan Kertas & Laminasi'],
        defaultValue: 'Panduan Garis Potong Kertas A4',
      }
    ],
  },
  {
    id: 'literasi',
    title: 'Bacaan, Cerita & Literasi',
    subtitle: 'Cerita menarik & bahan literasi',
    categoryName: 'Literasi & Cerita',
    iconName: 'BookOpen',
    themeColor: 'blue',
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textDark: 'text-sky-950',
    badgeBg: 'bg-sky-600',
    defaultTopic: 'Persahabatan Satwa Hutan yang Saling Menolong Tanpa Membedakan',
    subjectDefault: 'Bahasa Indonesia / Literasi Karakter',
    quickQuestions: [
      {
        field: 'storyGenre',
        label: 'Genre & Bentuk Bacaan',
        type: 'select',
        options: [
          'Fabel Edukatif Fiksi Karakter Pancasila',
          'Cerita Rakyat Berbasis Kearifan Lokal Nusantara yang Disederhanakan',
          'Teks Bacaan Non-Fiksi Sains Populer untuk Anak',
          'Cerita Bergambar (Picture Book Script dengan Panduan Ilustrasi)'
        ],
        defaultValue: 'Fabel Edukatif Fiksi Karakter Pancasila',
      },
      {
        field: 'wordCount',
        label: 'Panjang Teks',
        type: 'select',
        options: ['200 - 300 Kata (Pembaca Pemula)', '400 - 600 Kata (Pembaca Sedang)', '700 - 1000 Kata (Pembaca Mahir)'],
        defaultValue: '400 - 600 Kata (Pembaca Sedang)',
      },
      {
        field: 'readingAssessment',
        label: 'Fitur Pemahaman',
        type: 'pills',
        options: ['5 Soal Pemahaman Berjenjang Literasi AKM', 'Daftar Kosakata Baru & Glosarium', 'Pesan Moral Reflektif'],
        defaultValue: '5 Soal Pemahaman Berjenjang Literasi AKM',
      }
    ],
  },
  {
    id: 'projek',
    title: 'Projek Kokurikuler',
    subtitle: 'Projek P5 & kegiatan kreatif',
    categoryName: 'Kokurikuler & P5',
    iconName: 'Rocket',
    themeColor: 'red',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textDark: 'text-orange-950',
    badgeBg: 'bg-orange-500',
    defaultTopic: 'Pengolahan Sampah Plastik Menjadi Produk Bernilai Guna di Sekolah',
    subjectDefault: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    quickQuestions: [
      {
        field: 'p5Theme',
        label: 'Tema Utama P5',
        type: 'select',
        options: [
          'Gaya Hidup Berkelanjutan',
          'Kearifan Lokal',
          'Bhinneka Tunggal Ika',
          'Bangunlah Jiwa dan Raganya',
          'Suara Demokrasi',
          'Rekayasa dan Teknologi',
          'Kewirausahaan'
        ],
        defaultValue: 'Gaya Hidup Berkelanjutan',
      },
      {
        field: 'stageFlow',
        label: 'Alur Tahapan Pelaksanaan',
        type: 'select',
        options: [
          'Lengkap 4 Tahap (Pengenalan -> Kontekstualisasi -> Aksi Nyata -> Refleksi & Tindak Lanjut)',
          'Fokus Rencana Pameran Karya / Gelar Seni P5',
          'Aktivitas Aksi Singkat Berkelanjutan 2 Pekan'
        ],
        defaultValue: 'Lengkap 4 Tahap (Pengenalan -> Kontekstualisasi -> Aksi Nyata -> Refleksi & Tindak Lanjut)',
      },
      {
        field: 'p5Assessment',
        label: 'Kelengkapan Asesmen',
        type: 'pills',
        options: ['Rubrik Penilaian 4 Kategori (BB, MB, BSH, SB)', 'Lembar Jurnal Refleksi Siswa', 'Panduan Fasilitator Guru'],
        defaultValue: 'Rubrik Penilaian 4 Kategori (BB, MB, BSH, SB)',
      }
    ],
  },
];

export const EDUCATION_LEVELS = [
  { id: 'PAUD', label: 'PAUD / TK', desc: 'Usia 4-6 Tahun' },
  { id: 'SD_FASE_A', label: 'SD Kelas 1-2 (Fase A)', desc: 'Pengenalan & Membaca Pemula' },
  { id: 'SD_FASE_B', label: 'SD Kelas 3-4 (Fase B)', desc: 'Konsep Dasar & Eksplorasi' },
  { id: 'SD_FASE_C', label: 'SD Kelas 5-6 (Fase C)', desc: 'Penalaran & Logika Tingkat Lanjut' },
  { id: 'SMP_FASE_D', label: 'SMP Kelas 7-9 (Fase D)', desc: 'Pemikiran Kritis & Kolaboratif' },
  { id: 'SMA_FASE_E', label: 'SMA Kelas 10 (Fase E)', desc: 'Pondasi Akademik Menengah' },
  { id: 'SMA_FASE_F', label: 'SMA Kelas 11-12 (Fase F)', desc: 'Peminatan & Persiapan Lanjut' },
  { id: 'SMK', label: 'SMK (Kejuruan)', desc: 'Vokasi, Praktik & Siap Kerja' },
];

export const COMMON_SUBJECTS = [
  'IPAS (Ilmu Pengetahuan Alam & Sosial)',
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Pendidikan Pancasila (PPKn)',
  'Pendidikan Agama & Budi Pekerti (PABP)',
  'Informatika & Koding',
  'Seni Rupa & Seni Budaya',
  'Pendidikan Jasmani, Olahraga, & Kesehatan (PJOK)',
  'Projek P5 (Kokurikuler)',
  'Biologi / Fisika / Kimia',
  'Ekonomi / Geografi / Sosiologi',
  'Kejuruan / Produktif SMK'
];

export const PANCASILA_DIMENSIONS = [
  'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia',
  'Berkebhinekaan Global',
  'Bergotong Royong',
  'Mandiri',
  'Bernalar Kritis',
  'Kreatif'
];
