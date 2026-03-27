export interface StudentStats {
  streak: number;
  wordsLearned: number;
  grammarLevel: number;
  readingLevel: number;
}

export interface Lesson {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export interface StreakDay {
  date: string;
  status: 'once' | 'twice' | 'none';
}
