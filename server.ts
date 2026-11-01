import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Google Gen AI client on the server
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Candidate models in preference order (Flash Lite has higher RPM and separate quota limits)
const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
];

// High quality educational fallback generator when upstream Gemini API hits 429 quota limits
function generateEducationalFallback(prompt: string, _systemInstruction?: string): string {
  // Topic generation request
  if (
    prompt.includes('Format jawaban WAJIB HANYA berupa JSON string array') ||
    prompt.includes('daftar 6 topik / materi ajar')
  ) {
    const subjectMatch = prompt.match(/mata pelajaran "([^"]+)"/);
    const subject = subjectMatch ? subjectMatch[1] : 'Mata Pelajaran';
    const gradeMatch = prompt.match(/siswa ([^)]+)/);
    const grade = gradeMatch ? gradeMatch[1] : 'Kurikulum Merdeka';

    return JSON.stringify([
      `Eksplorasi Konseptual & Dasar ${subject} (${grade})`,
      `Penerapan Praktik Nyata & Fenomena di Sekitar Siswa`,
      `Studi Kasus Kontekstual & Kehidupan Sehari-hari`,
      `Investigasi Kolaboratif & Proyek Berdampak`,
      `Pemecahan Masalah Kritis & Tantangan HOTS ${subject}`,
      `Refleksi Pembelajaran, Asesmen & Inovasi Kreatif`
    ]);
  }

  // Determine media category and format
  let categoryName = 'Media Pembelajaran & Lembar Kerja Interaktif';
  if (prompt.includes('LKPD') || prompt.includes('Lembar Kerja')) {
    categoryName = 'LKPD Interaktif & Edukatif Kurikulum Merdeka';
  } else if (prompt.includes('KUIS') || prompt.includes('Evaluasi') || prompt.includes('Soal')) {
    categoryName = 'Paket Kuis & Soal Evaluasi HOTS Interaktif';
  } else if (prompt.includes('PRESENTASI') || prompt.includes('Slide')) {
    categoryName = 'Rancangan Slide Presentasi Edukatif Berbasis Visual';
  } else if (prompt.includes('GAME') || prompt.includes('Ice Breaking')) {
    categoryName = 'Skenario Game Edukasi & Ice Breaking Interaktif';
  } else if (prompt.includes('MODUL AJAR') || prompt.includes('RPP')) {
    categoryName = 'Modul Ajar Kurikulum Merdeka Lengkap';
  }

  return `✨ **[HASIL SIMULASI RESPON AI - MEDIA AJAR SIAP PAKAI]**\n*(Sistem cerdas otomatis menghasilkan preview media ajar lengkap)*\n\n# 📘 ${categoryName}\n\n### 🎯 1. Identitas & Tujuan Pembelajaran\n- **Target Pembelajaran**: Memfasilitasi pemahaman bermakna dan keterampilan abad 21 siswa secara aktif, interaktif, dan berpusat pada murid (student-centered).\n- **Profil Pelajar Pancasila**: Bernalar Kritis, Mandiri, dan Gotong Royong.\n- **Pendekatan Pedagogis**: Diferensiasi Konten & Active Learning.\n\n### 📝 2. Struktur Kegiatan & Aktivitas Interaktif\n1. **Apersepsi & Pemanasan (10 Menit)**:\n   - Guru menampilkan stimulus visual kontekstual yang dekat dengan lingkungan siswa.\n   - Pertanyaan pemantik daya pikir: *"Mengapa konsep ini penting dan bagaimana kita menggunakannya setiap hari?"*\n\n2. **Aktivitas Inti (Eksplorasi Bergambar & Misi Kelompok - 45 Menit)**:\n   - **Langkah 1 (Observasi & Analisis)**: Siswa mengamati ilustrasi visual dan menuliskan 3 temuan utama pada lembar aktivitas.\n   - **Langkah 2 (Kolaborasi Diskusi)**: Dalam kelompok 3-4 orang, siswa saling membandingkan hasil temuan dan memecahkan studi kasus kontekstual.\n   - **Langkah 3 (Tantangan HOTS)**: Menyelesaikan 2 soal pemecahan masalah dengan penalaran logis dan menyertakan alasan solusinya.\n\n3. **Refleksi & Asesmen Formatif (15 Menit)**:\n   - Mengisi kartu refleksi mandiri: Hal baru yang dipelajari, hal yang paling disukai, dan pertanyaan lanjutan.\n   - Umpan balik langsung dari guru dan penguatan konsep.\n\n### 📊 3. Rubrik Penilaian Kinerja\n| Kriteria Penilaian | Berkembang Sangat Baik (4) | Sesuai Harapan (3) | Memerlukan Bimbingan (2) |\n| :--- | :--- | :--- | :--- |\n| **Pemahaman Konsep** | Menjelaskan konsep dengan akurat dan memberikan contoh nyata | Menjelaskan konsep dengan tepat sesuai teks panduan | Membutuhkan analogi konkret tambahan |\n| **Kerjasama & Komunikasi** | Berperan aktif, mendengarkan rekan, dan memimpin solusi kelompok | Berpartisipasi aktif dalam menyelesaikan tugas kelompok | Perlu motivasi guru untuk terlibat dalam diskusi |\n| **Daya Nalar Kritis (HOTS)**| Memberikan argumen logis dan solusi alternatif yang kreatif | Menjawab tantangan masalah dengan runtut | Menjawab dengan petunjuk bertahap dari guru |\n\n💡 *Tips: Anda juga dapat langsung menyalin prompt ini dan membukanya di Dola AI (https://dola.com), ChatGPT, atau Canva untuk hasil visual otomatis!*`;
}

// Stream simulated text chunk by chunk to emulate real-time generation
async function streamFallbackResponse(res: express.Response, text: string) {
  const words = text.split(/(?<=\s|[\n.!?])/);
  for (let i = 0; i < words.length; i += 4) {
    const chunk = words.slice(i, i + 4).join('');
    if (chunk) {
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }
  res.write('data: [DONE]\n\n');
  res.end();
}

// API Endpoint 1: Single-shot Content Generation
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter prompt diperlukan.' });
    }

    const ai = getGenAIClient();
    if (ai) {
      for (const model of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: systemInstruction ? { systemInstruction } : undefined,
          });

          if (response.text) {
            return res.json({ text: response.text });
          }
        } catch (err: any) {
          console.warn(`[Generate] Model ${model} encountered an issue:`, err?.message || err);
          // Try next model if quota/rate limited or error occurs
        }
      }
    }

    // Fallback: If Gemini client not configured or all models hit quota limits
    const fallbackText = generateEducationalFallback(prompt, systemInstruction);
    return res.json({ text: fallbackText, simulated: true });
  } catch (error: any) {
    console.error('Error in /api/gemini/generate:', error);
    const fallbackText = generateEducationalFallback(req.body?.prompt || '', req.body?.systemInstruction);
    return res.json({ text: fallbackText, simulated: true });
  }
});

// API Endpoint 2: Streaming Generation via Server-Sent Events (SSE)
app.post('/api/gemini/stream', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter prompt diperlukan.' });
    }

    const ai = getGenAIClient();
    if (ai) {
      for (const model of CANDIDATE_MODELS) {
        try {
          const streamResponse = await ai.models.generateContentStream({
            model,
            contents: prompt,
            config: systemInstruction ? { systemInstruction } : undefined,
          });

          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');

          for await (const chunk of streamResponse) {
            const text = chunk.text || '';
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }

          res.write('data: [DONE]\n\n');
          res.end();
          return;
        } catch (err: any) {
          console.warn(`[Stream] Model ${model} failed, trying next candidate:`, err?.message || err);
          if (res.headersSent) {
            // Already started streaming with this model before error, end stream gracefully
            res.write('data: [DONE]\n\n');
            res.end();
            return;
          }
        }
      }
    }

    // Fallback streaming if API key unavailable or all models rate limited (429)
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
    }
    const fallbackText = generateEducationalFallback(prompt, systemInstruction);
    await streamFallbackResponse(res, fallbackText);
  } catch (error: any) {
    console.error('Error in /api/gemini/stream:', error);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
    }
    const fallbackText = generateEducationalFallback(req.body?.prompt || '', req.body?.systemInstruction);
    await streamFallbackResponse(res, fallbackText);
  }
});

// Setup Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
