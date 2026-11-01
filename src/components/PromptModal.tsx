import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MediaCategory, EducationLevel, TargetAI, PromptFormData, SavedPrompt, AppTheme } from '../types';
import { generateEducationalPrompt, RAW_LKPD_TEMPLATE_PROMPT } from '../utils/promptGenerator';
import { EDUCATION_LEVELS, COMMON_SUBJECTS, PANCASILA_DIMENSIONS } from '../data/mediaTypes';
import {
  PHASE_CLASS_MAPPINGS,
  CURRICULUM_DATABASE,
  AI_MODELS_LIST,
  LEVEL_SUBJECTS_MAPPING,
  ALL_LKPD_TYPES,
  LKPD_PICTURE_ACTIVITIES,
  LKPD_EXERCISES,
  ILLUSTRATION_STYLES,
  LKPD_PAGE_OPTIONS,
  LKPD_QUESTION_OPTIONS,
} from '../data/curriculumData';
import { APP_THEMES } from '../data/themes';
import { LkpdWorkbookView } from './LkpdWorkbookView';
import { exportToWordDoc, exportToImage, exportToPdf } from '../utils/exportUtils';
import {
  X,
  Copy,
  Check,
  Star,
  ExternalLink,
  Download,
  Sparkles,
  Sliders,
  Eye,
  Send,
  Loader2,
  RefreshCw,
  BookOpen,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  Edit3,
  Layers,
  Image as ImageIcon,
  Palette,
  CheckSquare,
  Wand2,
  Cpu,
  FileText,
  Files,
} from 'lucide-react';

interface PromptModalProps {
  category: MediaCategory;
  onClose: () => void;
  onSaveFavorite: (saved: SavedPrompt) => void;
  isFavorited: boolean;
  currentTheme?: AppTheme;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  category,
  onClose,
  onSaveFavorite,
  isFavorited: initialFavorited,
  currentTheme = 'forest-green',
}) => {
  const theme = APP_THEMES[currentTheme] || APP_THEMES['forest-green'];

  const [educationLevel, setEducationLevel] = useState<EducationLevel>('SD_FASE_B');
  const [gradeClass, setGradeClass] = useState<string>(
    PHASE_CLASS_MAPPINGS['SD_FASE_B'].defaultClass
  );
  const [subject, setSubject] = useState<string>(
    LEVEL_SUBJECTS_MAPPING['SD_FASE_B']?.[0] || category.subjectDefault
  );
  const [topic, setTopic] = useState<string>(category.defaultTopic);
  const [topicInputMode, setTopicInputMode] = useState<'auto' | 'manual'>('auto');
  const [targetAI, setTargetAI] = useState<TargetAI>('dola');
  const [learningObjectives, setLearningObjectives] = useState<string>('');
  const [pancasilaDimensions, setPancasilaDimensions] = useState<string[]>([
    'Bernalar Kritis',
    'Kreatif',
    'Bergotong Royong',
  ]);
  const [differentiation, setDifferentiation] = useState<boolean>(true);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // AI-Assisted topic generation
  const [aiGeneratedTopics, setAiGeneratedTopics] = useState<string[]>([]);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState<boolean>(false);
  const [aiTopicError, setAiTopicError] = useState<string>('');

  // LKPD specific configurations (22 Types, Picture Activities, Exercises, Illustration Style)
  const [lkpdType, setLkpdType] = useState<string>('LKPD Eksperimen');
  const [selectedPictureActivities, setSelectedPictureActivities] = useState<string[]>([
    'Mengamati gambar',
    'Mengisi jawaban',
    'Memberi label pada gambar',
  ]);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([
    'Pilihan Ganda',
    'Isian Singkat',
  ]);
  const [illustrationStyle, setIllustrationStyle] = useState<string>('Kartun Edukatif');
  const [lkpdPromptMode, setLkpdPromptMode] = useState<'filled' | 'raw'>('filled');
  const [lkpdPageCount, setLkpdPageCount] = useState<string>('1 Halaman (Ringkas Siap Cetak)');
  const [lkpdQuestionCount, setLkpdQuestionCount] = useState<string>('5 Soal (Standar)');

  // Category specific answers
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    category.quickQuestions.forEach((q) => {
      if (q.defaultValue) {
        initial[q.field] = q.defaultValue;
      }
    });
    return initial;
  });

  // Default to workbook if LKPD, otherwise preview
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'workbook' | 'test'>(
    category.id === 'lkpd' ? 'workbook' : 'preview'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(initialFavorited);

  // Gemini Live Testing state & AI model selection in Test Tab
  const [selectedTestAI, setSelectedTestAI] = useState<TargetAI>('gemini');
  const [testResult, setTestResult] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testError, setTestError] = useState<string>('');

  // Export states
  const [exportingType, setExportingType] = useState<'word' | 'image' | 'pdf' | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const aiResultRef = useRef<HTMLDivElement>(null);

  // Available subjects for the current level
  const availableSubjects = useMemo(() => {
    return LEVEL_SUBJECTS_MAPPING[educationLevel] || COMMON_SUBJECTS;
  }, [educationLevel]);

  // Automated curriculum topics based on selected Phase and Subject
  const suggestedTopics = useMemo(() => {
    const topicsForLevel = CURRICULUM_DATABASE[educationLevel];
    if (topicsForLevel) {
      const directMatch = topicsForLevel[subject];
      if (directMatch && directMatch.length > 0) return directMatch;

      for (const key of Object.keys(topicsForLevel)) {
        if (
          key.toLowerCase().includes(subject.toLowerCase()) ||
          subject.toLowerCase().includes(key.toLowerCase())
        ) {
          return topicsForLevel[key];
        }
      }
    }
    return [
      'Siklus Air dan Pengaruhnya bagi Bumi',
      'Operasi Hitung Pecahan Campuran',
      'Harmoni dalam Ekosistem & Rantai Makanan',
      'Teks Prosedur & Eksperimen Sains',
      'Kearifan Lokal Nusantara & P5',
      'Gaya dan Energi di Sekitar Kita',
    ];
  }, [educationLevel, subject]);

  // Handle phase change and auto-select appropriate class & subject
  const handleLevelChange = (lvl: EducationLevel) => {
    setEducationLevel(lvl);
    const mapping = PHASE_CLASS_MAPPINGS[lvl];
    if (mapping) {
      setGradeClass(mapping.defaultClass);
    }
    const defaultSub = LEVEL_SUBJECTS_MAPPING[lvl]?.[0];
    if (defaultSub) {
      setSubject(defaultSub);
    }
    setAiGeneratedTopics([]);
  };

  // Generate topics using Server-Side Gemini AI
  const handleGenerateTopicsWithAI = async () => {
    setIsGeneratingTopics(true);
    setAiTopicError('');
    try {
      const prompt = `Berikan daftar 6 topik / materi ajar Kurikulum Merdeka yang paling menarik, penting, dan aplikatif untuk siswa ${gradeClass} (${educationLevel}) pada mata pelajaran "${subject}".
Format jawaban WAJIB HANYA berupa JSON string array tanpa tanda kutip markdown, contoh persis:
["Topik 1: Contoh", "Topik 2: Contoh", "Topik 3: Contoh", "Topik 4: Contoh", "Topik 5: Contoh", "Topik 6: Contoh"]`;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      let text = (data.text || '').trim();
      text = text.replace(/^```json/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();

      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAiGeneratedTopics(parsed);
          return;
        }
      } catch {}

      const lines = text
        .split('\n')
        .map((l: string) => l.replace(/^[-*0-9.)"'\s]+/, '').replace(/["',]+$/, '').trim())
        .filter((l: string) => l.length > 3);

      if (lines.length > 0) {
        setAiGeneratedTopics(lines.slice(0, 6));
      } else {
        setAiGeneratedTopics([
          `Eksplorasi Konseptual ${subject}`,
          `Penyelidikan Lapangan & Praktik ${subject}`,
          `Studi Kasus Kontekstual ${subject}`,
          `Aktivitas Kolaborasi & Pemecahan Masalah ${subject}`,
        ]);
      }
    } catch (err: any) {
      console.warn('AI topic generation fallback:', err);
      // Graceful fallback: Provide contextual topics for the subject and grade
      setAiGeneratedTopics([
        `Eksplorasi Konseptual & Dasar ${subject}`,
        `Penyelidikan Lapangan & Praktik Nyata ${subject}`,
        `Studi Kasus Kontekstual & Kehidupan Sehari-hari ${subject}`,
        `Aktivitas Kolaborasi & Misi Kelompok ${subject}`,
        `Pemecahan Masalah Kritis & Tantangan HOTS ${subject}`,
        `Projek Kreatif & Refleksi Pembelajaran ${subject}`,
      ]);
    } finally {
      setIsGeneratingTopics(false);
    }
  };

  // Toggle picture activity
  const togglePictureActivity = (act: string) => {
    if (selectedPictureActivities.includes(act)) {
      setSelectedPictureActivities(selectedPictureActivities.filter((a) => a !== act));
    } else {
      setSelectedPictureActivities([...selectedPictureActivities, act]);
    }
  };

  // Toggle exercise
  const toggleExercise = (ex: string) => {
    if (selectedExercises.includes(ex)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== ex));
    } else {
      setSelectedExercises([...selectedExercises, ex]);
    }
  };

  // Build the live prompt
  const generatedPrompt = useMemo(() => {
    const formData: PromptFormData = {
      categoryId: category.id,
      educationLevel,
      gradeLevel: gradeClass,
      subject,
      topic: topic.trim() || category.defaultTopic,
      targetAI,
      learningObjectives,
      pancasilaDimensions,
      differentiation,
      additionalNotes,
      lkpdType,
      pictureActivities: selectedPictureActivities,
      includeExercises: selectedExercises,
      illustrationStyle,
      lkpdPageCount,
      lkpdQuestionCount,
    };
    return generateEducationalPrompt(
      category,
      formData,
      customAnswers,
      category.id === 'lkpd' && lkpdPromptMode === 'raw'
    );
  }, [
    category,
    educationLevel,
    gradeClass,
    subject,
    topic,
    targetAI,
    learningObjectives,
    pancasilaDimensions,
    differentiation,
    additionalNotes,
    customAnswers,
    lkpdType,
    selectedPictureActivities,
    selectedExercises,
    illustrationStyle,
    lkpdPromptMode,
    lkpdPageCount,
    lkpdQuestionCount,
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const item: SavedPrompt = {
      id: 'saved-' + Date.now(),
      categoryId: category.id,
      categoryTitle: category.title,
      topic: topic || category.defaultTopic,
      subject,
      educationLevel: `${gradeClass} (${educationLevel})`,
      targetAI,
      promptText: generatedPrompt,
      createdAt: Date.now(),
    };
    onSaveFavorite(item);
    setIsSaved(true);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prompt-${category.id}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  const handleDownloadWordResult = () => {
    try {
      setExportingType('word');
      const content = testResult || generatedPrompt;
      const docTitle = `${category.id === 'lkpd' ? 'LKPD' : category.title} - ${topic || category.defaultTopic}`;
      exportToWordDoc(
        `${category.id === 'lkpd' ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`,
        content,
        {
          title: docTitle,
          topic: topic || category.defaultTopic,
          subject,
          gradeClass,
          categoryTitle: category.title,
          targetAI: selectedTestAI,
        }
      );
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor dokumen Word.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadImageResult = async () => {
    const targetElement =
      aiResultRef.current ||
      document.getElementById('lkpd-workbook-sheet') ||
      document.getElementById('ai-test-result-container');
    if (!targetElement) {
      alert('Tampilan belum siap untuk diunduh sebagai foto.');
      return;
    }
    try {
      setExportingType('image');
      await exportToImage(
        targetElement,
        `${category.id === 'lkpd' ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`,
        'png'
      );
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor foto gambar.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadPdfResult = async () => {
    const targetElement =
      aiResultRef.current ||
      document.getElementById('lkpd-workbook-sheet') ||
      document.getElementById('ai-test-result-container');
    if (!targetElement) {
      window.print();
      return;
    }
    try {
      setExportingType('pdf');
      await exportToPdf(
        targetElement,
        `${category.id === 'lkpd' ? 'LKPD' : category.title}-${topic || category.defaultTopic}-${gradeClass}`
      );
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor dokumen PDF.');
    } finally {
      setExportingType(null);
      setShowDownloadMenu(false);
    }
  };

  const getAIUrl = (ai: TargetAI, promptText: string) => {
    const encodedPrompt = encodeURIComponent(promptText);
    switch (ai) {
      case 'dola': return `https://dola.com/`;
      case 'chatgpt': return `https://chatgpt.com/?q=${encodedPrompt}`;
      case 'gemini': return `https://gemini.google.com/app`;
      case 'claude': return `https://claude.ai/new`;
      case 'canva': return `https://www.canva.com/`;
      case 'deepseek': return `https://chat.deepseek.com/`;
      case 'copilot': return `https://copilot.microsoft.com/`;
      case 'perplexity': return `https://www.perplexity.ai/search?q=${encodedPrompt}`;
      case 'quizizz': return `https://quizizz.com/`;
      case 'gamma': return `https://gamma.app/`;
      case 'poe': return `https://poe.com/`;
      default: return `https://dola.com/`;
    }
  };

  const handleOpenExternalAI = (ai?: TargetAI) => {
    const chosen = ai || targetAI;
    const url = getAIUrl(chosen, generatedPrompt);
    navigator.clipboard.writeText(generatedPrompt);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const togglePancasila = (dim: string) => {
    if (pancasilaDimensions.includes(dim)) {
      setPancasilaDimensions(pancasilaDimensions.filter((d) => d !== dim));
    } else {
      setPancasilaDimensions([...pancasilaDimensions, dim]);
    }
  };

  // Live Preview via server-side Gemini API with dynamic AI model selection
  const runLiveTestWithGemini = async (aiToTest?: TargetAI) => {
    const modelTarget = aiToTest || selectedTestAI;
    setIsTesting(true);
    setTestError('');
    setTestResult('');

    // Dynamic system instruction tailoring output format to the chosen AI
    let specificInstruction =
      'Kamu adalah konsultan Kurikulum Merdeka dan pembuat media ajar edukatif interaktif Indonesia.';
    if (modelTarget === 'dola') {
      specificInstruction =
        'Kamu adalah Dola AI (dola.com), asisten cerdas guru yang sangat komunikatif, ramah, to-the-point, kaya emotikon edukatif, dan menyajikan solusi praktis siap dieksekusi di ruang kelas Kurikulum Merdeka.';
    } else if (modelTarget === 'claude') {
      specificInstruction =
        'Kamu adalah Claude 3.7 (Anthropic), asisten instruksional dengan bahasa Indonesia yang sangat tertata rapi, komprehensif, kaya penjelasan pedagogis, dan memiliki alur bertahap yang mendalam.';
    } else if (modelTarget === 'deepseek') {
      specificInstruction =
        'Kamu adalah DeepSeek AI, asisten spesialis penalaran logis, analitis, sistematis, berlandaskan kaidah sains & logika yang kuat, serta terstruktur rapi.';
    } else if (modelTarget === 'chatgpt') {
      specificInstruction =
        'Kamu adalah ChatGPT (OpenAI GPT-4o), asisten pendidikan interaktif yang menyajikan contoh kontekstual, analogi cerdas, serta format siap pakai untuk guru.';
    } else if (modelTarget === 'canva') {
      specificInstruction =
        'Kamu adalah Canva Magic & Code Designer, buatkan struktur tata letak teks, kata kunci rekomendasi elemen ilustrasi Canva, dan panduan visual siap tempel ke Canva Slides/Docs.';
    } else if (modelTarget === 'quizizz') {
      specificInstruction =
        'Kamu adalah Quizizz AI, rancang paket soal kuis interaktif gamifikasi lengkap dengan alokasi waktu detik, poin skor, opsi pilihan jawaban, dan kunci penjelasan.';
    }

    try {
      const response = await fetch('/api/gemini/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt:
            generatedPrompt +
            `\n\n[SIMULASI RESPON MODEL ${modelTarget.toUpperCase()}]\nTolong eksekusi prompt di atas dan buatkan hasil karya media ajar konkretnya sekarang.`,
          systemInstruction: specificInstruction,
        }),
      });

      if (!response.ok) {
        const fallbackRes = await fetch('/api/gemini/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt:
              generatedPrompt +
              `\n\n[SIMULASI RESPON MODEL ${modelTarget.toUpperCase()}]\nTolong eksekusi prompt di atas dan buatkan hasil karya media ajar konkretnya sekarang.`,
            systemInstruction: specificInstruction,
          }),
        });

        if (!fallbackRes.ok) {
          const errData = await fallbackRes.json().catch(() => ({}));
          throw new Error(errData.error || `Server error (${response.status})`);
        }

        const data = await fallbackRes.json();
        setTestResult(data.text || '');
        setIsTesting(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Streaming response body tidak dapat dibaca.');
      }

      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const dataStr = trimmed.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedText += parsed.text;
              setTestResult(accumulatedText);
            }
            if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (e: any) {
            if (e.message && e.message !== 'Unexpected token') {
              console.warn('SSE parse error:', e);
            }
          }
        }
      }

      if (!accumulatedText) {
        setTestResult('Hasil pratinjau media ajar siap pakai berhasil dibuat.');
      }
    } catch (err: any) {
      console.warn('Live test error caught, switching to fallback preview:', err);
      let cleanMsg = '';
      const rawMsg = err?.message || '';

      if (rawMsg.includes('429') || rawMsg.includes('quota') || rawMsg.includes('RESOURCE_EXHAUSTED')) {
        cleanMsg = 'Batas kuota API Gemini tercapai (429 Rate Limit). Sistem secara otomatis menampilkan simulasi media ajar interaktif langsung agar Anda tetap dapat mengajar tanpa hambatan.';
      } else {
        try {
          const parsed = JSON.parse(rawMsg);
          cleanMsg = parsed.error?.message || parsed.message || rawMsg;
        } catch {
          cleanMsg = rawMsg;
        }
      }

      setTestError(cleanMsg);

      // Ensure testResult has valid educational preview content so user is never blocked
      setTestResult((prev) => {
        if (prev && prev.length > 50) return prev;
        return `✨ **[SIMULASI RESPON AI - MEDIA AJAR KURIKULUM MERDEKA]**\n\n### 📘 Media Ajar: ${category.title}\n- **Mata Pelajaran**: ${subject}\n- **Topik / Materi**: ${topic || category.defaultTopic}\n- **Jenjang & Kelas**: ${gradeClass} (${educationLevel})\n- **Model AI Terpilih**: ${AI_MODELS_LIST.find((m) => m.id === modelTarget)?.name || 'AI'}\n\n### 🎯 Tujuan Pembelajaran Konkret\n1. Siswa mampu memahami dan mengidentifikasi konsep esensial materi "${topic || category.defaultTopic}" melalui aktivitas visual terpadu.\n2. Siswa menunjukkan Profil Pelajar Pancasila (Bernalar Kritis & Gotong Royong) dalam diskusi terbimbing.\n\n### 📋 Langkah Pelaksanaan di Kelas\n1. **Apersepsi**: Guru menampilkan gambar stimulus kontekstual dan mengajukan pertanyaan pemantik.\n2. **Eksplorasi Mandiri**: Siswa mengerjakan lembar aktivitas bergambar berpasangan.\n3. **Refleksi & Asesmen**: Diskusi kelas dan penguatan konsep dari guru.\n\n💡 *Tips: Anda dapat menyalin prompt lengkap ini dan membukanya langsung di ${AI_MODELS_LIST.find((m) => m.id === modelTarget)?.name || 'AI'} menggunakan tombol di atas!*`;
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div
          className={`bg-gradient-to-r ${theme.headerGradient} text-white p-4 sm:px-6 flex items-center justify-between shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-white/90 bg-black/20 px-2 py-0.5 rounded-full">
                  Generator Prompt &amp; Media Ajar
                </span>
                <span className="text-xs text-white/80 hidden sm:inline">• Kurikulum Merdeka</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {category.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              title="Simpan ke Favorit"
              className={`p-2 rounded-full border transition ${
                isSaved
                  ? 'bg-amber-400 text-amber-950 border-amber-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Segmented Controls */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl text-xs font-bold text-slate-700">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Detail Kelas &amp; Materi</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Hasil Prompt ({generatedPrompt.length} char)</span>
            </button>

            {/* Dedicated Workbook A4 Tab */}
            <button
              onClick={() => setActiveTab('workbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'workbook'
                  ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Workbook A4 Siap Cetak</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 bg-white/20 text-[10px] rounded-full text-white">
                Full-Color
              </span>
            </button>

            {/* Uji Langsung AI Tab */}
            <button
              onClick={() => {
                setActiveTab('test');
                if (!testResult && !isTesting) {
                  runLiveTestWithGemini();
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'test'
                  ? 'text-white shadow-xs font-black ring-2 ring-white/20'
                  : 'hover:text-slate-900'
              }`}
              style={{ backgroundColor: activeTab === 'test' ? theme.primaryHex : undefined }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Uji Langsung AI</span>
            </button>
          </div>

          {/* Quick Target AI Selector (Including Dola AI) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="hidden sm:inline">AI Sasaran:</span>
            <select
              value={targetAI}
              onChange={(e) => setTargetAI(e.target.value as TargetAI)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-extrabold focus:outline-hidden focus:ring-2 focus:ring-slate-400 shadow-2xs"
            >
              {AI_MODELS_LIST.map((ai) => (
                <option key={ai.id} value={ai.id}>
                  {ai.name} ({ai.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-5">
          {/* TAB 1: FORM CUSTOMIZATION */}
          {activeTab === 'form' && (
            <div className="space-y-5">
              
              {/* Card 1: Profil Jenjang & Pemilihan Kelas Otomatis */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                    <BookOpen className="w-4 h-4" style={{ color: theme.primaryHex }} />
                    <span>1. Jenjang Pendidikan &amp; Fase Belajar</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {PHASE_CLASS_MAPPINGS[educationLevel]?.phaseName}
                  </span>
                </div>

                {/* 8 Jenjang / Fase Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EDUCATION_LEVELS.map((lvl) => {
                    const isSelected = educationLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => handleLevelChange(lvl.id as EducationLevel)}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                          isSelected
                            ? 'bg-slate-50 font-bold shadow-2xs'
                            : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: theme.primaryHex,
                                borderWidth: '2px',
                                color: theme.primaryHex,
                              }
                            : undefined
                        }
                      >
                        <span className="text-xs font-bold leading-tight">{lvl.label}</span>
                        <span className="text-[10px] text-slate-500 mt-1">{lvl.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Pemilihan Kelas Otomatis untuk Fase Terpilih */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
                      <span>Pilihan Kelas Otomatis untuk {PHASE_CLASS_MAPPINGS[educationLevel]?.phaseName}:</span>
                    </span>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Terpilih: <strong className="font-extrabold">{gradeClass}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {PHASE_CLASS_MAPPINGS[educationLevel]?.classes.map((cls) => {
                      const isCurrent = gradeClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setGradeClass(cls)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
                            isCurrent
                              ? 'text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                          style={isCurrent ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex } : undefined}
                        >
                          {isCurrent && <Check className="w-3 h-3 text-white" />}
                          <span>{cls}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Mata Pelajaran Otomatis & Manual */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span>Mata Pelajaran:</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          (Pilih otomatis dari chip atau ketik manual)
                        </span>
                      </label>
                      <span className="text-[11px] font-bold" style={{ color: theme.primaryHex }}>
                        Aktif: {subject}
                      </span>
                    </div>

                    {/* Quick Automatic Subject Chips for this Level */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {availableSubjects.map((sub) => {
                        const isSelected = subject === sub;
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              setSubject(sub);
                              setAiGeneratedTopics([]);
                            }}
                            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                              isSelected
                                ? 'text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            style={isSelected ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex } : undefined}
                          >
                            {isSelected ? '✓ ' : ''}
                            {sub}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      list="subject-list"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Atau ketik nama mata pelajaran kustom..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-hidden"
                    />
                    <datalist id="subject-list">
                      {COMMON_SUBJECTS.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  {/* Materi Pembelajaran + Tombol Munculkan dengan AI */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <label className="text-xs font-bold text-slate-700">
                        Materi / Topik Pembelajaran:
                      </label>

                      <div className="flex items-center gap-2">
                        {/* Tombol AI Generator Materi */}
                        <button
                          type="button"
                          onClick={handleGenerateTopicsWithAI}
                          disabled={isGeneratingTopics}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition active:scale-95 disabled:opacity-50"
                        >
                          {isGeneratingTopics ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                          )}
                          <span>
                            {isGeneratingTopics ? 'Menyusun Materi...' : '✨ Munculkan Materi dengan AI'}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setTopicInputMode('auto')}
                            className={`px-2 py-0.5 rounded ${
                              topicInputMode === 'auto'
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Otomatis
                          </button>
                          <button
                            type="button"
                            onClick={() => setTopicInputMode('manual')}
                            className={`px-2 py-0.5 rounded ${
                              topicInputMode === 'manual'
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Manual
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Manual text input */}
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Ketik topik materi secara bebas di sini..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-hidden"
                    />

                    {/* If AI Generated Topics are available, show highlighted card */}
                    {aiGeneratedTopics.length > 0 && (
                      <div className="mt-2.5 p-3 rounded-xl bg-purple-50/80 border border-purple-200/90 space-y-1.5 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-purple-950 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                            <span>Topik Rekomendasi AI Generatif ({subject}):</span>
                          </span>
                          <span className="text-[10px] text-purple-700 font-semibold">
                            Klik untuk memilih
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {aiGeneratedTopics.map((aiTopic) => {
                            const isChosen = topic === aiTopic;
                            return (
                              <button
                                key={aiTopic}
                                type="button"
                                onClick={() => setTopic(aiTopic)}
                                className={`text-xs px-2.5 py-1 rounded-lg border text-left transition flex items-center gap-1 ${
                                  isChosen
                                    ? 'bg-purple-600 text-white font-bold border-purple-600 shadow-xs'
                                    : 'bg-white hover:bg-purple-100 text-purple-900 border-purple-200'
                                }`}
                              >
                                {isChosen ? '✓ ' : '+ '}
                                <span>{aiTopic}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {aiTopicError && (
                      <p className="text-xs text-rose-600 mt-1">{aiTopicError}</p>
                    )}

                    {/* Standard Kurikulum Merdeka Topics */}
                    <div className="mt-2.5">
                      <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1 mb-1.5">
                        <BookOpen className="w-3 h-3" style={{ color: theme.primaryHex }} />
                        <span>Materi Acuan Kurikulum Merdeka ({gradeClass}):</span>
                      </span>

                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                        {suggestedTopics.map((item) => {
                          const isChosen = topic === item;
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setTopic(item)}
                              className={`text-xs px-2.5 py-1 rounded-lg border text-left transition flex items-center gap-1 ${
                                isChosen
                                  ? 'text-white font-bold shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                              style={isChosen ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex } : undefined}
                            >
                              {isChosen ? '✓ ' : '+ '}
                              <span>{item}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Pengaturan LKPD Lengkap (Jika Kategori === LKPD) */}
              {category.id === 'lkpd' && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                      <Layers className="w-4 h-4" style={{ color: theme.primaryHex }} />
                      <span>2. Spesifikasi Bentuk LKPD &amp; Kegiatan Bergambar</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Format Modern A4
                    </span>
                  </div>

                  {/* 22 Pilihan Jenis / Bentuk LKPD */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pilih Jenis / Bentuk LKPD:
                    </label>
                    <select
                      value={lkpdType}
                      onChange={(e) => setLkpdType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-bold text-slate-800 focus:outline-hidden"
                    >
                      {ALL_LKPD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Pengaturan Jumlah Halaman & Jumlah Soal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    {/* Jumlah Halaman */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Files className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Jumlah Halaman LKPD:</span>
                        </span>
                        <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                          A4 Portrait
                        </span>
                      </label>
                      <select
                        value={lkpdPageCount}
                        onChange={(e) => setLkpdPageCount(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      >
                        {LKPD_PAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {['1 Halaman', '2 Halaman', '3 Halaman', '4 Halaman'].map((label, idx) => {
                          const optVal = LKPD_PAGE_OPTIONS[idx];
                          const isActive = lkpdPageCount === optVal;
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setLkpdPageCount(optVal)}
                              className={`text-[11px] px-2 py-1 rounded-lg border font-bold transition ${
                                isActive
                                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Jumlah Soal */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                          <span>Jumlah Butir Soal:</span>
                        </span>
                        <span className="text-[10px] text-sky-700 font-extrabold bg-sky-100 px-2 py-0.5 rounded-full">
                          Latihan &amp; HOTS
                        </span>
                      </label>
                      <select
                        value={lkpdQuestionCount}
                        onChange={(e) => setLkpdQuestionCount(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500 shadow-2xs"
                      >
                        {LKPD_QUESTION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {['3 Soal', '5 Soal', '8 Soal', '10 Soal', '15 Soal'].map((label, idx) => {
                          const optVal = LKPD_QUESTION_OPTIONS[idx];
                          const isActive = lkpdQuestionCount === optVal;
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => setLkpdQuestionCount(optVal)}
                              className={`text-[11px] px-2 py-1 rounded-lg border font-bold transition ${
                                isActive
                                  ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                                  : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Kegiatan Bergambar */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" style={{ color: theme.primaryHex }} />
                      <span>Pilihan Kegiatan Bergambar (Interaktif &amp; Ada Ruang Jawaban):</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {LKPD_PICTURE_ACTIVITIES.map((act) => {
                        const isChecked = selectedPictureActivities.includes(act);
                        return (
                          <button
                            key={act}
                            type="button"
                            onClick={() => togglePictureActivity(act)}
                            className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                              isChecked
                                ? 'text-white font-bold shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                            style={isChecked ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex } : undefined}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {act}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Latihan Tambahan (Opsional) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-sky-600" />
                      <span>Latihan Tambahan (Opsional):</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {LKPD_EXERCISES.map((ex) => {
                        const isChecked = selectedExercises.includes(ex);
                        return (
                          <button
                            key={ex}
                            type="button"
                            onClick={() => toggleExercise(ex)}
                            className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                              isChecked
                                ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-xs'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {isChecked ? '✓ ' : '+ '}
                            {ex}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gaya Seni Ilustrasi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-purple-600" />
                      <span>Ketentuan Gaya Seni Ilustrasi (Pilih Salah Satu):</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {ILLUSTRATION_STYLES.map((style) => {
                        const isSelected = illustrationStyle === style.name;
                        return (
                          <button
                            key={style.id}
                            type="button"
                            onClick={() => setIllustrationStyle(style.name)}
                            className={`p-2 rounded-xl border text-left transition flex flex-col justify-between ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50/80 text-purple-950 font-bold ring-2 ring-purple-500/20 shadow-2xs'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="text-xs font-bold leading-tight">{style.name}</span>
                            <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{style.badge}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3: Spesifikasi Kategori Lainnya (Jika Bukan LKPD) */}
              {category.id !== 'lkpd' && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                    <Sliders className="w-4 h-4" style={{ color: theme.primaryHex }} />
                    <span>2. Spesifikasi Khusus {category.categoryName}</span>
                  </div>

                  <div className="space-y-3">
                    {category.quickQuestions.map((q) => (
                      <div key={q.field}>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {q.label}:
                        </label>
                        {q.type === 'select' && q.options && (
                          <select
                            value={customAnswers[q.field] || q.defaultValue || ''}
                            onChange={(e) =>
                              setCustomAnswers({ ...customAnswers, [q.field]: e.target.value })
                            }
                            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm font-medium focus:outline-hidden"
                          >
                            {q.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}

                        {q.type === 'pills' && q.options && (
                          <div className="flex flex-wrap gap-1.5">
                            {q.options.map((opt) => {
                              const isSelected = customAnswers[q.field] === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    setCustomAnswers({ ...customAnswers, [q.field]: opt })
                                  }
                                  className={`text-xs px-3 py-1.5 rounded-xl border transition ${
                                    isSelected
                                      ? 'text-white font-bold shadow-xs'
                                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                  }`}
                                  style={isSelected ? { backgroundColor: theme.primaryHex, borderColor: theme.primaryHex } : undefined}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 4: Profil Pelajar Pancasila & Pembelajaran Berdiferensiasi */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>3. Profil Pelajar Pancasila &amp; Pembelajaran Berdiferensiasi</span>
                  </div>
                </div>

                {/* Pancasila Dimension Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Pilih Dimensi Profil Pelajar Pancasila:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PANCASILA_DIMENSIONS.map((dim) => {
                      const active = pancasilaDimensions.includes(dim);
                      return (
                        <button
                          key={dim}
                          type="button"
                          onClick={() => togglePancasila(dim)}
                          className={`text-xs px-2.5 py-1.2 rounded-lg border transition ${
                            active
                              ? 'bg-purple-100 text-purple-900 border-purple-300 font-bold'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {dim}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Differentiation Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      Aktifkan Pendekatan Pembelajaran Berdiferensiasi
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Menyesuaikan lembar kerja untuk 3 kelompok kesiapan belajar (bimbingan, reguler, pengayaan).
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={differentiation}
                    onChange={(e) => setDifferentiation(e.target.checked)}
                    className="w-5 h-5 rounded-md text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Additional Teacher Note */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Catatan Tambahan Guru (Opsional):
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Contoh: Siswa menyukai gambar sains ceria, buatkan instruksi langkah yang sangat visual..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:outline-hidden"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PROMPT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-100 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" style={{ color: theme.primaryHex }} />
                  <span>
                    Prompt tersusun otomatis untuk model{' '}
                    <strong>{targetAI.toUpperCase()}</strong> dengan spesifikasi{' '}
                    <strong>{gradeClass}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('form')}
                  className="shrink-0 hover:underline font-bold ml-2"
                  style={{ color: theme.primaryHex }}
                >
                  Ubah Parameter &gt;
                </button>
              </div>

              {/* If category is LKPD, display mode toggle: Filled vs Raw Template */}
              {category.id === 'lkpd' && (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider">
                      Prompt Desainer Gambar LKPD A4
                    </span>
                    <span className="text-xs font-bold text-emerald-950">
                      {lkpdPromptMode === 'filled'
                        ? 'Mode Terisi Otomatis (Materi & Spesifikasi Terintegrasi)'
                        : 'Mode Template Mentah [TULIS DISINI]'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-emerald-200 text-xs font-bold self-start sm:self-auto shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setLkpdPromptMode('filled')}
                      className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                        lkpdPromptMode === 'filled'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>Versi Terisi (Siap Pakai)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLkpdPromptMode('raw')}
                      className={`px-3 py-1 rounded-lg transition flex items-center gap-1.5 ${
                        lkpdPromptMode === 'raw'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3 h-3" />
                      <span>Template Mentah [TULIS DISINI]</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Code/Prompt Container */}
              <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed shadow-inner overflow-x-auto border border-slate-800">
                <pre className="whitespace-pre-wrap font-sans">{generatedPrompt}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: DEDICATED WORKBOOK A4 VIEW */}
          {activeTab === 'workbook' && (
            <div className="space-y-4">
              <LkpdWorkbookView
                topic={topic || category.defaultTopic}
                subject={subject}
                educationLevel={educationLevel}
                gradeClass={gradeClass}
                lkpdType={lkpdType}
                pictureActivities={selectedPictureActivities}
                includeExercises={selectedExercises}
                illustrationStyle={illustrationStyle}
                pageCount={lkpdPageCount}
                questionCount={lkpdQuestionCount}
                onPageCountChange={(val) => setLkpdPageCount(val)}
                onQuestionCountChange={(val) => setLkpdQuestionCount(val)}
              />
            </div>
          )}

          {/* TAB 4: LIVE TEST WITH DYNAMIC AI MODEL SELECTION */}
          {activeTab === 'test' && (
            <div className="space-y-4">
              {/* AI Selector Control Panel */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-purple-600" />
                      <span>Pilih AI Penguji Hasil Prompt:</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pilih model AI di bawah untuk mengeksekusi prompt dan melihat hasil nyata media ajarnya.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedTestAI}
                      onChange={(e) => {
                        const newAi = e.target.value as TargetAI;
                        setSelectedTestAI(newAi);
                        runLiveTestWithGemini(newAi);
                      }}
                      className="bg-purple-50 text-purple-900 border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-extrabold focus:outline-hidden focus:ring-2 focus:ring-purple-400 shadow-2xs"
                    >
                      <option value="gemini">Google Gemini 3.8 Flash</option>
                      <option value="dola">Dola AI (dola.com)</option>
                      <option value="chatgpt">ChatGPT (GPT-4o)</option>
                      <option value="claude">Claude (Claude 3.7)</option>
                      <option value="deepseek">DeepSeek AI</option>
                      <option value="canva">Canva Magic &amp; Code</option>
                      <option value="quizizz">Quizizz AI</option>
                      <option value="copilot">Microsoft Copilot</option>
                      <option value="perplexity">Perplexity AI</option>
                      <option value="gamma">Gamma App</option>
                    </select>

                    <button
                      onClick={() => runLiveTestWithGemini(selectedTestAI)}
                      disabled={isTesting}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold disabled:opacity-50 text-xs shadow-xs transition active:scale-95"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Menyusun...' : 'Uji Sekarang'}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Model Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                  {[
                    { id: 'gemini', label: 'Google Gemini', color: 'bg-blue-50 text-blue-800 border-blue-200' },
                    { id: 'dola', label: 'Dola AI (dola.com)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                    { id: 'chatgpt', label: 'ChatGPT-4o', color: 'bg-teal-50 text-teal-800 border-teal-200' },
                    { id: 'claude', label: 'Claude 3.7', color: 'bg-amber-50 text-amber-800 border-amber-200' },
                    { id: 'deepseek', label: 'DeepSeek AI', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
                    { id: 'canva', label: 'Canva Code', color: 'bg-sky-50 text-sky-800 border-sky-200' },
                    { id: 'quizizz', label: 'Quizizz AI', color: 'bg-purple-50 text-purple-800 border-purple-200' },
                  ].map((m) => {
                    const isSelected = selectedTestAI === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          const next = m.id as TargetAI;
                          setSelectedTestAI(next);
                          runLiveTestWithGemini(next);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                            : `${m.color} hover:bg-white`
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isTesting && (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  <p className="text-sm font-bold text-slate-800">
                    Menyusun Media Ajar dengan AI ({selectedTestAI.toUpperCase()})...
                  </p>
                  <p className="text-xs text-slate-500">
                    Menganalisis materi "{topic}" untuk {gradeClass}.
                  </p>
                </div>
              )}

              {testResult && !isTesting && (
                <div className="space-y-3">
                  {/* Action Toolbar for AI Results */}
                  <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-purple-700 uppercase tracking-wider bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Hasil Uji Model: {selectedTestAI.toUpperCase()}</span>
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
                        • {testResult.length} Karakter
                      </span>
                    </div>

                    {/* Download & Action Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Unduh Word */}
                      <button
                        onClick={handleDownloadWordResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                        title="Unduh hasil media ajar sebagai file Dokumen Word (.doc) yang siap diedit"
                      >
                        {exportingType === 'word' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        <span>Unduh Word (.doc)</span>
                      </button>

                      {/* Unduh Foto (PNG) */}
                      <button
                        onClick={handleDownloadImageResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                        title="Unduh hasil media ajar sebagai file Foto / Gambar (.png)"
                      >
                        {exportingType === 'image' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                        )}
                        <span>Unduh Foto (PNG)</span>
                      </button>

                      {/* Unduh PDF */}
                      <button
                        onClick={handleDownloadPdfResult}
                        disabled={exportingType !== null}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                        title="Unduh hasil media ajar sebagai file Dokumen PDF siap cetak"
                      >
                        {exportingType === 'pdf' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        <span>Unduh PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(testResult);
                          alert('Hasil pengujian berhasil disalin ke clipboard!');
                        }}
                        className="text-xs text-slate-700 hover:text-slate-900 font-bold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Salin Hasil</span>
                      </button>

                      <button
                        onClick={() => handleOpenExternalAI(selectedTestAI)}
                        className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Buka di {selectedTestAI.toUpperCase()}</span>
                      </button>
                    </div>
                  </div>

                  {/* Rendered Educational Sheet (Target of Photo / PDF / Image Capture) */}
                  <div
                    ref={aiResultRef}
                    id="ai-test-result-container"
                    className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-slate-800 leading-relaxed text-sm"
                  >
                    {/* Sheet Header */}
                    <div className="border-b-2 border-emerald-600 pb-3">
                      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200 mb-1">
                        <span>LEMBAR MEDIA AJAR • KURIKULUM MERDEKA</span>
                        <span>•</span>
                        <span>AI: {selectedTestAI.toUpperCase()}</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        {topic || category.defaultTopic}
                      </h2>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        Mata Pelajaran: <span className="font-bold text-emerald-700">{subject}</span> |{' '}
                        Jenjang &amp; Kelas: <span className="font-bold text-slate-800">{gradeClass}</span> ({educationLevel})
                      </p>
                    </div>

                    {/* Student Identity Banner */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                      <div className="sm:col-span-8 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-600 w-24 shrink-0">Nama Siswa :</span>
                          <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-bold text-slate-600 w-14 shrink-0">Kelas :</span>
                            <span className="font-semibold text-emerald-800">{gradeClass}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <span className="font-bold text-slate-600 w-20 shrink-0">No. Absen :</span>
                            <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4 bg-white rounded-lg p-2 border border-slate-200 text-center flex flex-col justify-center">
                        <span className="text-[10px] font-extrabold text-emerald-800 uppercase">Nilai / Paraf Guru</span>
                        <div className="text-base font-bold text-slate-400 mt-0.5">___ / 100</div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13.5px] text-slate-800 space-y-3 pt-2 leading-relaxed">
                      {testResult}
                    </div>

                    {/* Footer Signature Box */}
                    <div className="pt-6 mt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
                      <div>
                        <div>Mengetahui,</div>
                        <div className="mt-8 font-bold text-slate-800">( Guru Mata Pelajaran )</div>
                      </div>
                      <div className="text-right">
                        <div>Tanggal: ___________________</div>
                        <div className="mt-8 font-bold text-slate-800">( Peserta Didik / Tim )</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {testError && !isTesting && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-800">
                  {testError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 relative">
            {/* Multi-format Download Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={exportingType !== null}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95 disabled:opacity-50"
                title="Pilih format unduhan (Word, Foto PNG, PDF, atau Teks)"
              >
                {exportingType !== null ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>Unduh Hasil LKPD</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-bold">
                  {exportingType ? 'Memproses...' : 'Doc / Foto / PDF'}
                </span>
              </button>

              {/* Dropdown Options */}
              {showDownloadMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 space-y-1 animate-in fade-in slide-in-from-bottom-2">
                  <div className="px-3 py-1.5 text-[10.5px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                    <span>Pilih Format Unduhan:</span>
                    <button
                      type="button"
                      onClick={() => setShowDownloadMenu(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>

                  {/* 1. Unduh Dokumen Word (.doc) */}
                  <button
                    type="button"
                    onClick={handleDownloadWordResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Dokumen Word (.doc)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Dapat diedit di MS Word &amp; Google Docs
                      </div>
                    </div>
                  </button>

                  {/* 2. Unduh PDF (.pdf) */}
                  <button
                    type="button"
                    onClick={handleDownloadPdfResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Dokumen PDF (.pdf)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Format A4 portrait rapi siap cetak
                      </div>
                    </div>
                  </button>

                  {/* 3. Unduh Foto / Gambar (.png) */}
                  <button
                    type="button"
                    onClick={handleDownloadImageResult}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-800 rounded-xl transition text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div>Foto / Gambar (.png)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Resolusi tinggi untuk media ajar &amp; WA
                      </div>
                    </div>
                  </button>

                  {/* 4. Unduh Teks Mentah (.txt) */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition text-left border-t border-slate-100 mt-1"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div>File Teks Mentah (.txt)</div>
                      <div className="text-[10.5px] text-slate-400 font-normal">
                        Prompt format teks untuk disalin
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold transition ${
                isSaved
                  ? 'border-amber-400 bg-amber-50 text-amber-900'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isSaved ? 'Tersimpan' : 'Favorit'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Prompt</span>
                </>
              )}
            </button>

            {/* Direct Open in AI Button (Supports Dola AI, ChatGPT, Gemini, etc.) */}
            <button
              onClick={() => handleOpenExternalAI()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition active:scale-95"
              style={{ backgroundColor: theme.primaryHex }}
            >
              <span>Buka di {targetAI.toUpperCase()}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
