export type EducationLevel = 
  | 'PAUD'
  | 'SD_FASE_A' // Kelas 1-2
  | 'SD_FASE_B' // Kelas 3-4
  | 'SD_FASE_C' // Kelas 5-6
  | 'SMP_FASE_D' // Kelas 7-9
  | 'SMA_FASE_E' // Kelas 10
  | 'SMA_FASE_F' // Kelas 11-12
  | 'SMK';

export type AppTheme = 'forest-green' | 'sky-blue' | 'sunset-orange' | 'royal-purple';

export type TargetAI = 
  | 'dola' 
  | 'chatgpt' 
  | 'gemini' 
  | 'claude' 
  | 'canva' 
  | 'deepseek' 
  | 'copilot' 
  | 'perplexity' 
  | 'quizizz' 
  | 'gamma' 
  | 'poe';

export type LkpdActivityType = 
  | 'eksperimen' 
  | 'kasus' 
  | 'teka_teki' 
  | 'observasi' 
  | 'projek' 
  | 'menjodohkan';

export interface MediaCategory {
  id: string;
  title: string;
  subtitle: string;
  categoryName: string;
  badgeCount?: string;
  iconName: string;
  themeColor: 'blue' | 'yellow' | 'green' | 'purple' | 'teal' | 'orange' | 'cyan' | 'red';
  bgLight: string;
  borderLight: string;
  textDark: string;
  badgeBg: string;
  defaultTopic: string;
  subjectDefault: string;
  quickQuestions: {
    field: string;
    label: string;
    type: 'select' | 'text' | 'number' | 'pills';
    options?: string[];
    placeholder?: string;
    defaultValue?: string;
  }[];
}

export interface PromptFormData {
  categoryId: string;
  educationLevel: EducationLevel;
  gradeLevel: string;
  subject: string;
  topic: string;
  targetAI: TargetAI;
  learningObjectives?: string;
  duration?: string;
  slideCount?: number;
  questionCount?: number;
  difficulty?: 'Dasar' | 'Sedang' | 'HOTS / Menantang';
  pancasilaDimensions: string[];
  differentiation: boolean;
  gameType?: string;
  canvaFormat?: string;
  lkpdType?: string;
  pictureActivities?: string[];
  includeExercises?: string[];
  illustrationStyle?: string;
  lkpdPageCount?: string;
  lkpdQuestionCount?: string;
  additionalNotes?: string;
}

export interface SavedPrompt {
  id: string;
  categoryId: string;
  categoryTitle: string;
  topic: string;
  subject: string;
  educationLevel: string;
  targetAI: TargetAI;
  promptText: string;
  createdAt: number;
}

export interface PresetTemplate {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  targetAI: TargetAI;
  tags: string[];
  prompt: string;
}
