import { Flame, BookOpen, Trophy, Star, Clock, BarChart3, BookMarked, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

// --- Dashboard Stats ---
export const DASHBOARD_STATS = [
  { 
    icon: Flame, 
    value: "12", 
    label: "kunlik streak", 
    iconBg: "rgba(249, 115, 22, 0.1)", 
    iconColor: "#F97316" 
  },
  { 
    icon: BookMarked, 
    value: "234", 
    label: "So'zlar o'rganildi", 
    actionText: "Sinab ko'ring", 
    iconBg: "rgba(249, 115, 22, 0.1)", 
    iconColor: "#F97316" 
  },
  { 
    icon: Trophy, 
    value: "72%", 
    label: "Grammar darajasi", 
    actionText: "Sinab ko'ring", 
    iconBg: "#141F381A", 
    iconColor: "#141F38" 
  },
  { 
    icon: BookOpen, 
    value: "15/48", 
    label: "Darslar tugatildi", 
    actionText: "Davom etish", 
    iconBg: "#10B9811A", 
    iconColor: "#10B981" 
  }
];

// --- Lessons Map ---
export const LEARNING_PATH_NODES = [
  { id: 1, label: 'Modul 1', status: 'completed' as const },
  { id: 2, label: 'Modul 2', status: 'current' as const },
  { id: 3, label: 'Modul 3', status: 'locked' as const },
  { id: 4, label: 'Modul 4', status: 'locked' as const },
  { id: 5, label: 'Modul 5', status: 'locked' as const },
];

export const MODULES = [
  {
    id: 1,
    title: "1-Modul: Asosiy tushunchalar",
    lessons: 12,
    words: 120,
    completedLessons: 12,
    status: 'completed' as const
  },
  {
    id: 2,
    title: "2-Modul: Zamonaviy iboralar",
    lessons: 8,
    words: 85,
    completedLessons: 4,
    status: 'current' as const
  },
  {
    id: 3,
    title: "3-Modul: Grammatika asoslari",
    lessons: 15,
    words: 200,
    completedLessons: 0,
    status: 'locked' as const
  }
];

// --- Tests ---
export const TEST_TYPES = [
  { 
    icon: BookOpen, 
    title: 'Grammatika Test', 
    subtitle: 'Grammatika bilimlarini sinang', 
    count: 12, 
    iconBg: '#F973161A', 
    iconColor: '#F97316' 
  },
  { 
    icon: Star, 
    title: "Lug'at Test", 
    subtitle: "So'z boyligini tekshiring", 
    count: 8, 
    iconBg: '#F973161A', 
    iconColor: '#F97316' 
  },
  { 
    icon: Clock, 
    title: 'Tezkor Test', 
    subtitle: '5 daqiqalik tezkor test', 
    count: 20, 
    iconBg: '#F973161A', 
    iconColor: '#F97316' 
  },
  { 
    icon: BarChart3, 
    title: 'Daraja Testi', 
    subtitle: 'Umumiy darajangizni aniqlang', 
    count: 4, 
    iconBg: '#F973161A', 
    iconColor: '#F97316' 
  },
];

export const TEST_HISTORY = [
  { 
    percentage: 90, 
    name: 'Grammar Mix Test', 
    date: '2026-03-01', 
    ball: 65, 
    score: '5/10', 
    time: '22 daqiqa', 
    color: 'success' as const 
  },
  { 
    percentage: 65, 
    name: 'Grammar Mix Test', 
    date: '2026-03-01', 
    ball: 65, 
    score: '5/10', 
    time: '22 daqiqa', 
    color: 'warning' as const 
  },
  { 
    percentage: 65, 
    name: 'Grammar Mix Test', 
    date: '2026-03-01', 
    ball: 65, 
    score: '5/10', 
    time: '22 daqiqa', 
    color: 'warning' as const 
  },
  { 
    percentage: 65, 
    name: 'Grammar Mix Test', 
    date: '2026-03-01', 
    ball: 65, 
    score: '5/10', 
    time: '22 daqiqa', 
    color: 'warning' as const 
  },
];

// --- Leaderboard ---
export const LEADERBOARD = [
  { rank: 1, name: 'Sardor Aliyev', streak: 45, score: 2850 },
  { rank: 2, name: 'Nodira Karimova', streak: 38, score: 2720 },
  { rank: 3, name: 'Jasur Toshmatov', streak: 30, score: 2680 },
  { rank: 4, name: 'Dilnoza Rahimova', streak: 28, score: 2540 },
  { rank: 5, name: 'Otabek Nazarov', streak: 22, score: 2490 },
  { rank: 6, name: 'Malika Usmonova', streak: 20, score: 2350 },
  { rank: 7, name: 'Ali Karimov', streak: 12, score: 2280, isCurrentUser: true },
  { rank: 8, name: 'Shaxlo Mirzayeva', streak: 15, score: 2150 },
  { rank: 9, name: 'Bekzod Ruziyev', streak: 10, score: 2050 },
  { rank: 10, name: 'Gulnora Abdullayeva', streak: 8, score: 1980 },
  { rank: 11, name: 'Javohir Ergashev', streak: 7, score: 1850 },
  { rank: 12, name: 'Maftuna Saydullaeva', streak: 6, score: 1720 },
  { rank: 13, name: 'Diyorbek Kobilov', streak: 5, score: 1680 },
  { rank: 14, name: 'Zilola Ganiyeva', streak: 4, score: 1540 },
  { rank: 15, name: 'Anvar Toshpulatov', streak: 3, score: 1490 },
];

// --- Analytics ---
export const WEEKLY_DATA = [
  { day: 'Du', count: 8 },
  { day: 'Se', count: 12 },
  { day: 'Cho', count: 6 },
  { day: 'Pa', count: 14 },
  { day: 'Ju', count: 15, active: true },
  { day: 'Sha', count: 16 },
  { day: 'Ya', count: 13 },
];

export const GRAMMAR_LEVELS = [
  { name: 'Tenses', level: 85 },
  { name: 'Articles', level: 72 },
  { name: 'Prepositions', level: 60 },
  { name: 'Modals', level: 45 },
  { name: 'Conditionals', level: 30 },
];

export const STREAK_DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  status: [1, 2, 4, 5, 6, 8, 9, 10, 11, 14, 15, 17, 18, 20, 21, 23, 24, 25, 27, 28, 29].includes(i) 
    ? 'active' as const 
    : i === 3 || i === 7 || i === 13 ? 'missed' as const : 'upcoming' as const
}));

export const AI_INSIGHTS = [
  {
    type: 'warning' as const,
    title: 'Zaif mavzu aniqlandi',
    description: "Siz 'Present Continuous' mavzusida qiynalyapsiz. 2-modul 3-darsni qayta ko'rib chiqishni maslahat beramiz."
  },
  {
    type: 'success' as const,
    title: 'Yaxshi natija',
    description: "Vocabulary bo'limida so'nggi 7 kunda 92% to'g'ri javob berdingiz. Davom eting!"
  }
];

// --- Profile ---
export const STUDENT_PROFILE = {
  firstName: 'Ali',
  lastName: 'Karimov',
  email: 'ali.karimov@email.com',
  phone: '+998 90 123 45 67',
  bio: 'Ingliz tilini o\'rganuvchi talaba',
  level: 'B1 daraja',
  isPremium: true,
  avatar: 'A',
  stats: [
    { label: 'Streak', value: '12 kun', icon: Flame },
    { label: 'Darslar', value: '28 tugallangan', icon: BookOpen },
    { label: 'Reyting', value: '#7', icon: Trophy },
    { label: 'O\'rtacha ball', value: '78%', icon: BarChart3 },
    { label: 'Qo\'shilgan', value: '2025-yil', icon: Clock },
  ]
};

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: '7 kunlik streak',
    description: 'Ketma-ket 7 kun mashq',
    icon: '🔥'
  },
  {
    id: 2,
    title: '100 ta so\'z',
    description: '100 ta yangi so\'z o\'rgandingiz',
    icon: '📚'
  },
  {
    id: 3,
    title: 'Birinchi test',
    description: 'Birinchi testni topshirdingiz',
    icon: '🏆'
  },
  {
    id: 4,
    title: 'Top 10',
    description: 'Reytingda top 10 ga kirdingiz',
    icon: '⭐'
  }
];

export const TEST_QUESTIONS = [
  {
    id: 1,
    question: '"Book" so\'zining tarjimasi nima?',
    options: [
      { id: 'A', text: 'Daftar' },
      { id: 'B', text: 'Kitob' },
      { id: 'C', text: 'Qalam' },
      { id: 'D', text: 'Ruchka' },
    ],
    correctAnswer: 'B'
  },
  {
    id: 2,
    question: 'Qaysi biri meva?',
    options: [
      { id: 'A', text: 'Apple' },
      { id: 'B', text: 'Potato' },
      { id: 'C', text: 'Carrot' },
      { id: 'D', text: 'Cucumber' },
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    question: '"Hello" so\'ziga sinonim toping.',
    options: [
      { id: 'A', text: 'Bye' },
      { id: 'B', text: 'Hi' },
      { id: 'C', text: 'Good' },
      { id: 'D', text: 'Nice' },
    ],
    correctAnswer: 'B'
  },
  {
    id: 4,
    question: 'Ingliz tilida nechta artikl bor?',
    options: [
      { id: 'A', text: '1 ta' },
      { id: 'B', text: '2 ta' },
      { id: 'C', text: '3 ta' },
      { id: 'D', text: '4 ta' },
    ],
    correctAnswer: 'C'
  },
  {
    id: 5,
    question: '"I ____ a student."',
    options: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'are' },
      { id: 'C', text: 'am' },
      { id: 'D', text: 'be' },
    ],
    correctAnswer: 'C'
  }
];

// --- Review Page ---
export const REVIEW_CATEGORIES = [
  {
    title: "Lug'at boyligi",
    subtitle: "O'rganilgan so'zlarni takrorlang",
    count: 124,
    icon: Star,
    iconBg: '#F973161A',
    iconColor: '#F97316'
  },
  {
    title: 'Grammatika',
    subtitle: 'O\'tilgan qoidalarni mustahkamlang',
    count: 15,
    icon: BookOpen,
    iconBg: '#10B9811A',
    iconColor: '#10B981'
  },
  {
    title: 'Eshittirish',
    subtitle: 'Audio topshiriqlar bilan ishlang',
    count: 8,
    icon: Clock,
    iconBg: '#141F381A',
    iconColor: '#141F38'
  },
  {
    title: 'O\'qish',
    subtitle: 'Matnlar va maqolalar',
    count: 12,
    icon: BarChart3,
    iconBg: '#F973161A',
    iconColor: '#F97316'
  }
];

export const REVIEW_STATS = [
  { label: 'Bugun takrorlandi', value: '45', icon: CheckCircle2, color: '#10B981' },
  { label: 'Rejada bor', value: '12', icon: Clock, color: '#F97316' },
  { label: 'O\'zlashtirildi', value: '88%', icon: TrendingUp, color: '#141F38' },
];

export const MASTERED_TOPICS = [
  { title: 'Present Simple', level: 'Easy', date: '2026-03-20', score: 95 },
  { title: 'Personal Pronouns', level: 'Easy', date: '2026-03-18', score: 100 },
  { title: 'Basic Greeting', level: 'Easy', date: '2026-03-15', score: 88 },
  { title: 'Numbers 1-100', level: 'Medium', date: '2026-03-12', score: 92 },
];
