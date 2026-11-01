import { MediaCategory, PromptFormData } from '../types';

export const RAW_LKPD_TEMPLATE_PROMPT = `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

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
Jumlah Halaman : [ 1 / 2 / 3 / 4 Halaman - Sesuai Kebutuhan ]
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : TK/SD/SMP/SMA 
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
[ TULIS DISINI ]

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
[ TULIS DISINI ]



IDENTITAS LKPD
Nama : ________________________
Kelas : ________________________
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
[ TULIS DISINI ]
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
Sesuaikan dengan jenis LKPD yang dipilih.
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
Jumlah Butir Soal : [ 3 / 5 / 8 / 10 / 15 Soal - Sesuai Kebutuhan ]
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
kartun edukatif,
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak [ Jumlah Halaman yang ditentukan ],
memuat latihan soal yang variatif dan interaktif [ Jumlah Soal yang ditentukan ],
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.`;

export function generateEducationalPrompt(
  category: MediaCategory,
  data: PromptFormData,
  customAnswers: Record<string, string>,
  rawModeForLkpd: boolean = false
): string {
  if (category.id === 'lkpd' && rawModeForLkpd) {
    return RAW_LKPD_TEMPLATE_PROMPT;
  }
  const {
    educationLevel,
    subject,
    topic,
    targetAI,
    learningObjectives,
    difficulty,
    pancasilaDimensions,
    differentiation,
    additionalNotes,
  } = data;

  const levelLabel = getLevelLabel(educationLevel);
  const targetAIName = getTargetAIName(targetAI);

  let categorySpecificInstructions = '';

  switch (category.id) {
    case 'presentasi': {
      const slides = customAnswers.slideCount || '8 Slide';
      const style = customAnswers.presentationStyle || 'Canva Edukasi Ceria';
      const interactive = customAnswers.interactiveElement || 'Pertanyaan Pemantik';
      categorySpecificInstructions = `
[DETAIL STRUKTUR PRESENTASI]
- Alokasi Slide: ${slides}
- Gaya Desain / Visual: ${style}
- Elemen Interaktif di Kelas: ${interactive}
- Panduan Format Output Tiap Slide:
  * Slide [Nomor]: [Judul Slide yang Menarik]
  * Konten Utama: 3-4 poin ringkas (bullet points yang mudah dibaca siswa)
  * Panduan Visual / Ilustrasi: Deskripsi instruksi visual untuk Canva / PowerPoint (misal: "Gunakan ilustrasi kartun anak mengamati air hujan")
  * Narasi Guru (Script Guru): Kalimat penjelasan hangat dan komunikatif yang bisa dibacakan oleh guru saat slide ditampilkan
  * Aktivitas Interaktif Siswa: Pertanyaan cepat atau respon siswa di slide tersebut`;
      break;
    }

    case 'kuis': {
      const qType = customAnswers.quizType || 'Pilihan Ganda HOTS';
      const qCount = customAnswers.questionCount || '10 Butir Soal';
      const answerKey = customAnswers.includeAnswerKey || 'Lengkap Kunci + Pembahasan';
      categorySpecificInstructions = `
[DETAIL SPESIFIKASI SOAL & KUIS]
- Bentuk / Tipe Soal: ${qType}
- Jumlah Soal: ${qCount}
- Tingkat Kesulitan: ${difficulty || 'HOTS (Higher Order Thinking Skills - C4, C5, C6 Bloom)'}
- Kelengkapan Asesmen: ${answerKey}
- Format Penulisan:
  1. Sajikan stimulus kontekstual berupa cerita singkat, data, atau diagram nyata
  2. Pertanyaan yang menguji nalar, bukan sekadar hafalan fakta
  3. Opsi pilihan ganda A, B, C, D (atau E untuk SMA/SMK) dengan pengecoh (distractor) yang logis
  4. Bagian Kunci Jawaban & Pembahasan Mendalam (jelaskan mengapa jawaban tersebut benar dan mengapa opsi lain salah)`;
      break;
    }

    case 'game': {
      const gFormat = customAnswers.gameFormat || 'Game Tanpa Alat';
      const gDuration = customAnswers.duration || '10-15 Menit';
      const gEnergy = customAnswers.classEnergy || 'Meningkatkan Fokus & Konsentrasi';
      categorySpecificInstructions = `
[DETAIL PERMAINAN EDUKASI & ICE BREAKING]
- Jenis Game: ${gFormat}
- Estimasi Durasi: ${gDuration}
- Target Suasana Kelas: ${gEnergy}
- Struktur Penyusunan:
  * Nama Game yang Unik & Menarik bagi Siswa
  * Filosofi & Kaitan Materi dengan Game
  * Alat & Bahan (jika ada, utamakan yang ramah lingkungan / tanpa alat)
  * Aturan Main & Langkah Pelaksanaan Langkah Demi Langkah (Step-by-Step)
  * Kalimat Aba-Aba / Seruan Pembuka Guru untuk Memancing Antusiasme
  * Variasi Adaptasi untuk Siswa yang Pemalu atau Memerlukan Bantuan
  * Pertanyaan Refleksi Singkat (Debriefing 2 Menit) setelah game selesai`;
      break;
    }

    case 'modul': {
      const model = customAnswers.teachingModel || 'Problem Based Learning (PBL)';
      const comp = customAnswers.curriculumComponents || 'Lengkap Kurikulum Merdeka';
      const meet = customAnswers.meetingCount || '1 Pertemuan';
      categorySpecificInstructions = `
[DETAIL KOMPONEN MODUL AJAR KURIKULUM MERDEKA]
- Model Pembelajaran: ${model}
- Kelengkapan Modul: ${comp}
- Alokasi Pertemuan: ${meet}
- Susun dengan Struktur Resmi:
  A. INFORMASI UMUM: Identitas Modul, Kompetensi Awal, Sarana Prasarana, Target Murid, Model Pembelajaran
  B. KOMPONEN INTI:
     1. Tujuan Pembelajaran (berdasarkan Capaian Pembelajaran)
     2. Pemahaman Bermakna (manfaat nyata di kehidupan murid)
     3. Pertanyaan Pemantik (3 pertanyaan menggugah rasa ingin tahu)
     4. Alur Kegiatan Pembelajaran:
        - Kegiatan Pendahuluan (Apersepsi, Orientasi, Motivasi - 10-15 menit)
        - Kegiatan Inti (Sesuai sintaks model ${model} - 50-60 menit)
        - Kegiatan Penutup (Refleksi, Rangkuman, Doa/Penutup - 10-15 menit)
  C. ASESMEN & TINDAK LANJUT:
     - Asesmen Diagnostik, Formatif, dan Sumatif
     - Rencana Pengayaan (murid mahir) & Remedial (murid butuh bimbingan)`;
      break;
    }

    case 'lkpd': {
      const selectedLkpdType = data.lkpdType || customAnswers.lkpdStyle || 'LKPD Eksperimen';
      const pageCountValue = data.lkpdPageCount || customAnswers.pageCount || '1 Halaman (Ringkas Siap Cetak)';
      const questionCountValue = data.lkpdQuestionCount || customAnswers.questionCount || '5 Soal (Standar)';
      const pictureActs = data.pictureActivities && data.pictureActivities.length > 0
        ? data.pictureActivities.join(', ')
        : 'Mengamati gambar, Memberi label pada gambar, Mengisi jawaban';
      const exercises = data.includeExercises && data.includeExercises.length > 0
        ? data.includeExercises.join(', ')
        : 'Pilihan Ganda, Isian Singkat';
      const styleArt = data.illustrationStyle || 'Kartun Edukatif';
      const materiValue = topic && topic.trim()
        ? `${topic.trim()}${subject ? ` (Mata Pelajaran: ${subject} - ${data.gradeLevel || levelLabel})` : ''}`
        : '[ TULIS DISINI ]';
      const tujuanValue = learningObjectives && learningObjectives.trim()
        ? learningObjectives.trim()
        : '[ TULIS DISINI ]';
      const jenjangValue = data.gradeLevel ? `${data.gradeLevel} (${levelLabel})` : 'TK/SD/SMP/SMA';
      const kelasValue = data.gradeLevel || '________________________';

      return `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

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
Jumlah Halaman : ${pageCountValue}
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : ${jenjangValue} 
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
${materiValue}

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
${selectedLkpdType}



IDENTITAS LKPD
Nama : ________________________
Kelas : ${kelasValue}
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
${tujuanValue}
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
Sesuaikan dengan jenis LKPD yang dipilih (${selectedLkpdType}).
${pictureActs ? `Aktivitas Utama: ${pictureActs}\n` : ''}Contoh aktivitas:
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
Jumlah Butir Soal : ${questionCountValue}
${exercises ? `Bentuk Soal Latihan : ${exercises}\n` : ''}Buat soal tambahan yang:
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
${styleArt.toLowerCase()},
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak sebanyak ${pageCountValue},
memuat ${questionCountValue} yang relevan, terstruktur, dan interaktif,
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.`;
    }

    case 'infografis': {
      const vType = customAnswers.visualType || 'Poster Edukasi A3';
      const vTone = customAnswers.visualTone || 'Kartun Ceria Ramah Anak';
      const vExtra = customAnswers.canvaPromptIncluded || 'Susunan Teks Siap Tempel';
      categorySpecificInstructions = `
[DETAIL MEDIA VISUAL & INFOGRAFIS]
- Tipe Media Visual: ${vType}
- Tone Visual & Gaya Seni: ${vTone}
- Fitur Desain: ${vExtra}
- Struktur Desain Siap Canva / AI:
  * Judul Utama (Headline Besar & Menarik Perhatian)
  * Sub-Headline Penjelasan Ringkas (1 Kalimat)
  * 3-4 Bagian Utama / Alur dengan Ikon & Teks Singkat Padat
  * Kotak Fakta Unik / "Tahukah Kamu?"
  * Panduan Palet Warna (Color Palette Hex Code) yang Harmonis
  * Prompt Khusus untuk Text-to-Image AI (Canva / Midjourney / DALL-E) dalam Bahasa Inggris yang siap disalin`;
      break;
    }

    case 'audio': {
      const medium = customAnswers.audioMedium || 'Lirik Lagu Pembelajaran';
      const rhyme = customAnswers.rhymeScheme || 'Rima Berirama Mudah Dihafal';
      const movement = customAnswers.movementPrompt || 'Panduan Gerak Tubuh';
      categorySpecificInstructions = `
[DETAIL AUDIO & LAGU EDUKASI]
- Format Karya Audio: ${medium}
- Pola Rima: ${rhyme}
- Aksi Pelengkap: ${movement}
- Susun dengan Lengkap:
  * Judul Lagu / Audio: Nada acuan (misal: "Dinyanyikan dengan irama lagu Balonku Ada Lima")
  * Bait 1 (Pembuka & Pengenalan Masalah)
  * Reff / Chorus (Inti materi yang catchy dan mudah diulang-ulang murid)
  * Bait 2 (Penjelasan & Contoh Nyata)
  * Reff Ulang + Outro Ceria
  * Panduan Gerakan Tangan / Bahasa Tubuh di setiap baris agar murid aktif bergerak`;
      break;
    }

    case 'video': {
      const vFormat = customAnswers.videoFormat || 'Skrip 3 Kolom';
      const duration = customAnswers.videoDuration || '2-3 Menit';
      const hook = customAnswers.hookType || 'Pertanyaan Mengejutkan';
      categorySpecificInstructions = `
[DETAIL SKRIP VIDEO PEMBELAJARAN]
- Format Skrip: ${vFormat}
- Target Durasi: ${duration}
- Tipe Hook Pembuka: ${hook}
- Struktur Tabel Skrip 3 Kolom:
  | Waktu (Detik) | Visual & Gerakan Kamera (B-Roll) | Narasi Voiceover (Kata-kata Guru/Host) | Teks & Grafis di Layar (On-Screen Text) |
- Pastikan 5 detik pertama memiliki daya pikat tinggi (Hook)
- Gaya bahasa santai, ekspresif, dan ramah seperti guru kreator konten edukasi`;
      break;
    }

    case 'chatbot': {
      const persona = customAnswers.botPersona || 'Tutor Ramah Socratic';
      const antiCheat = customAnswers.antiCheatRules || 'Ketat: Beri petunjuk, bukan jawaban langsung';
      const promptStyle = customAnswers.systemInstructionOutput || 'System Instructions Siap Pasang';
      categorySpecificInstructions = `
[DETAIL CHATBOT AI ASISTEN KELAS]
- Persona AI: ${persona}
- Aturan Anti-Contekan: ${antiCheat}
- Format Instruksi: ${promptStyle}
- Buat System Prompt Lengkap Meliputi:
  * Identitas & Nada Suara: Ramah, sabar, memuji usaha murid, tidak menghakimi
  * Batasan Operasional: Jangan pernah memberi jawaban PR secara instan; gunakan metode dialog Socratic (tanyakan balik pemahaman murid)
  * Format Respon: Pendek (maksimal 2-3 paragraf), beri contoh konkret dengan analogi anak-anak
  * Contoh Percakapan (Few-Shot Examples): 2 contoh dialog tanya-jawab murid vs bot saat murid mentok belajar`;
      break;
    }

    case 'cetak': {
      const pType = customAnswers.printableType || 'Flashcard 2 Sisi';
      const pCount = customAnswers.cardQuantity || '20 Kartu';
      const pLayout = customAnswers.printLayout || 'Panduan Garis Potong A4';
      categorySpecificInstructions = `
[DETAIL ALAT PERAGA & MEDIA CETAK]
- Format Media Fisik: ${pType}
- Target Jumlah: ${pCount}
- Format Percetakan: ${pLayout}
- Rincian Konten Siap Cetak:
  * Daftar Isi Kartu / Komponen (Nomor, Bagian Depan, Bagian Belakang)
  * Instruksi Perakitan untuk Guru/Murid (Kertas yang disarankan, laminasi, cara memotong)
  * 3 Variasi Cara Bermain / Menggunakan Alat Peraga Ini di Kelas`;
      break;
    }

    case 'literasi': {
      const genre = customAnswers.storyGenre || 'Fabel Edukatif Fiksi Karakter';
      const length = customAnswers.wordCount || '400 - 600 Kata';
      const assess = customAnswers.readingAssessment || '5 Soal Pemahaman Literasi AKM';
      categorySpecificInstructions = `
[DETAIL BACAAN LITERASI & CERITA EDUKATIF]
- Genre & Bentuk Cerita: ${genre}
- Estimasi Panjang: ${length}
- Fitur Asesmen Literasi: ${assess}
- Struktur Teks Literasi:
  * Judul Cerita yang Memikat
  * Karakter Utama & Karakter Pembantu yang Punya Ciri Khas
  * Alur Cerita (Orientasi, Komplikasi Menarik, Resolusi Bermakna)
  * Sisipkan Nilai-Nilai Kearifan Lokal dan Kebaikan
  * Glosarium Kata-Kata Baru (3-5 kata penting beserta artinya)
  * 5 Pertanyaan Pemahaman Literasi (Menemukan informasi, Menginterpretasikan makna, Merefleksikan isi cerita)`;
      break;
    }

    case 'projek': {
      const p5 = customAnswers.p5Theme || 'Gaya Hidup Berkelanjutan';
      const flow = customAnswers.stageFlow || 'Lengkap 4 Tahap';
      const assess = customAnswers.p5Assessment || 'Rubrik 4 Kategori (BB, MB, BSH, SB)';
      categorySpecificInstructions = `
[DETAIL MODUL PROJEK KOKURIKULER (P5)]
- Tema Projek: ${p5}
- Alur Pelaksanaan: ${flow}
- Instrumen Asesmen: ${assess}
- Struktur Lengkap Projek P5:
  * Judul Projek Aksi Nyata yang Inspiratif
  * Latar Belakang Masalah Kontekstual di Lingkungan Sekolah / Masyarakat
  * Dimensi, Elemen, dan Subelemen Profil Pelajar Pancasila yang Dikembangkan
  * Rencana Aktivitas Per Tahap:
    1. Tahap Pengenalan (Membangun kesadaran murid)
    2. Tahap Kontekstualisasi (Riset & wawancara di lingkungan sekitar)
    3. Tahap Aksi (Pembuatan karya / solusi nyata)
    4. Tahap Refleksi & Tindak Lanjut (Pameran karya / Gelar karya & evaluasi)
  * Rubrik Penilaian dengan Indikator Jelas`;
      break;
    }

    default:
      break;
  }

  const dimensionsText = pancasilaDimensions && pancasilaDimensions.length > 0
    ? pancasilaDimensions.map(d => `- ${d}`).join('\n')
    : '- Bernalar Kritis\n- Kreatif\n- Bergotong Royong';

  const diffText = differentiation
    ? `\n[PENDEKATAN BERDIFERENSIASI]
- Sediakan variasi aktivitas untuk 3 kelompok kesiapan belajar:
  1. Murid Butuh Bimbingan: Instruksi lebih visual & bertahap dengan scaffolding
  2. Murid Reguler: Aktivitas sesuai standar Capaian Pembelajaran
  3. Murid Mahir: Tantangan pengayaan / eksplorasi tingkat lanjut`
    : '';

  const objText = learningObjectives && learningObjectives.trim()
    ? `\n[TUJUAN PEMBELAJARAN KHUSUS]\n${learningObjectives.trim()}`
    : '';

  const noteText = additionalNotes && additionalNotes.trim()
    ? `\n[CATATAN TAMBAHAN DARI GURU]\n${additionalNotes.trim()}`
    : '';

  return `Kamu adalah seorang Konsultan Kurikulum Merdeka senior, Ahli Desain Instruksional, dan Pengembang Media Pembelajaran Interaktif terkemuka di Indonesia.

TUGAS UTAMA:
Buatkan rancangan dan konten menyeluruh untuk: "${category.title}" yang siap pakai, berkualitas tinggi, dan interaktif untuk guru di kelas.

[PROFIL KELAS & SASARAN]
- Jenjang Pendidikan & Fase: ${levelLabel}
- Mata Pelajaran: ${subject}
- Materi / Topik Utama: ${topic}
- Model AI Sasaran: ${targetAIName}

[INTEGRASI DIMENSI PROFIL PELAJAR PANCASILA]
${dimensionsText}
${diffText}
${objText}
${categorySpecificInstructions}
${noteText}

[PEDOMAN BAHASA & KUALITAS]
1. Gunakan Bahasa Indonesia yang baku, edukatif, inspiratif, hangat, dan ramah terhadap dunia anak/remaja.
2. Hindari teori yang terlalu berbelit-belit; prioritaskan instruksi praktis, interaktif, dan langsung bisa dieksekusi di ruang kelas.
3. Gunakan formatting Markdown yang rapi (headings, bold, lists, tabel) agar mudah dibaca dan disalin ke dokumen atau slide.

Mulailah hasil karyamu langsung dengan judul yang menarik, tanpa basa-basi pengantar klise seperti "Tentu, ini adalah...".`;
}

function getLevelLabel(level: string): string {
  switch (level) {
    case 'PAUD': return 'PAUD / TK (Usia 4-6 Tahun)';
    case 'SD_FASE_A': return 'SD Kelas 1-2 (Fase A - Membaca Dasar & Konkret)';
    case 'SD_FASE_B': return 'SD Kelas 3-4 (Fase B - Pemahaman Konsep & Eksplorasi)';
    case 'SD_FASE_C': return 'SD Kelas 5-6 (Fase C - Berpikir Kritis & Mandiri)';
    case 'SMP_FASE_D': return 'SMP Kelas 7-9 (Fase D - Kolaborasi & Penalaran)';
    case 'SMA_FASE_E': return 'SMA Kelas 10 (Fase E - Eksplorasi Minat & Analisis)';
    case 'SMA_FASE_F': return 'SMA Kelas 11-12 (Fase F - Pendalaman Konsep & HOTS)';
    case 'SMK': return 'SMK (Kejuruan & Keterampilan Praktik Kerja Nyata)';
    default: return level;
  }
}

function getTargetAIName(ai: string): string {
  switch (ai) {
    case 'dola': return 'Dola AI (Asisten Edukasi Web & WhatsApp)';
    case 'chatgpt': return 'ChatGPT (OpenAI)';
    case 'gemini': return 'Google Gemini (Google AI)';
    case 'claude': return 'Claude (Anthropic)';
    case 'canva': return 'Canva Magic Studio / Canva Code';
    case 'deepseek': return 'DeepSeek AI';
    case 'copilot': return 'Microsoft Copilot';
    case 'perplexity': return 'Perplexity AI';
    case 'quizizz': return 'Quizizz AI';
    case 'gamma': return 'Gamma App AI';
    case 'poe': return 'Poe AI';
    default: return ai;
  }
}
