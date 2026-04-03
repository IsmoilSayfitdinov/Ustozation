// ============================================================
// Backend API Response Types
// ============================================================

// --- Generic API Response ---
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  detail?: string;
}

export interface ApiError {
  success: false;
  errors: Record<string, string | string[]>;
  status_code: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// --- Auth ---
export interface TokenPair {
  access: string;
  refresh: string;
  role?: string;
  username?: string;
  user_id?: number;
}

export interface Profile {
  full_name: string;
  avatar: string | null;
  bio: string;
}

export interface User {
  id: number;
  username: string;
  role: "student" | "teacher" | "admin";
  telegram_username: string;
  gender: string;
  age: number | null;
  is_active: boolean;
  date_joined: string;
  profile: Profile;
}

export interface RegisterPayload {
  username: string;
  password: string;
  password_confirm: string;
  telegram_username?: string;
  gender?: string;
  age?: number;
  course_id?: number;
  course?: string | number; // deprecated alias
  teacher?: string | number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface PasswordResetRequestPayload {
  username: string;
}

export interface PasswordResetConfirmPayload {
  token: string;
  new_password: string;
  new_password_confirm: string;
}

export interface BadgeType {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  condition_type: 'first_quiz' | 'streak_days' | 'quizzes_passed' | 'total_points';
  condition_value: number;
  order: number;
  earned: boolean;
  earned_at: string | null;
}

export interface StudentBadge {
  id: number;
  badge: BadgeType;
  earned_at: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface ProfileUpdatePayload {
  telegram_username?: string;
  gender?: string;
  age?: number;
  profile?: {
    full_name?: string;
    bio?: string;
  };
}

// --- Courses ---
export interface Level {
  id: number;
  name: string;
  slug: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface LevelDetail extends Level {
  modules: Module[];
}

export interface CourseTeacher {
  id: number;
  username: string;
  full_name: string;
  telegram_username: string;
}

export interface Course {
  id: number;
  title: string;
  level: Level;
  teacher: CourseTeacher;
  teacher_name?: string; // deprecated, backward compat
  student_count: number;
  max_students: number;
  is_full: boolean;
  is_active: boolean;
  created_at: string;
}

export interface CourseLessonQuiz {
  id: number;
  title: string;
  quiz_type_name: string;
  question_count: number;
  max_score: number;
  passing_score: number;
  time_limit: number;
  is_active: boolean;
}

export interface CourseLesson {
  id: number;
  lesson: Lesson;
  module_title: string;
  is_unlocked: boolean;
  unlocked_at: string | null;
  quizzes: CourseLessonQuiz[];
}

export interface CourseStudent {
  student_id: number;
  username: string;
  telegram_username: string;
  full_name: string;
  enrolled_at: string;
  is_active: boolean;
}

// --- Quizzes ---
export interface QuizType {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Answer {
  id: number;
  text: string;
  order: number;
}

export interface AnswerWithCorrect extends Answer {
  is_correct: boolean;
}

export interface QuestionMedia {
  id: number;
  file: string;
  media_type: "image" | "audio" | "video";
}

export interface Question {
  id: number;
  text: string;
  order: number;
  points: number;
  penalty?: number;  // teacher view da keladi, student view da kelmaydi
  answers: Answer[];
  media: QuestionMedia[];
}

export interface QuizListItem {
  id: number;
  title: string;
  description: string;
  quiz_type: QuizType;
  max_score: number;
  passing_score: number;
  penalty_per_retake: number;
  time_limit: number;
  question_count: number;
  is_active: boolean;
}

export interface QuizDetail {
  id: number;
  title: string;
  description: string;
  quiz_type: QuizType;
  max_score: number;
  passing_score: number;
  penalty_per_retake: number;
  time_limit: number;
  questions: Question[];
}

export interface StartAttemptResponse {
  attempt_id: number;
  attempt_number?: number;
  max_possible_score?: number;
  time_limit?: number;
  resumed?: boolean;
}

export interface SubmitAnswerPayload {
  question_id: number;
  answer_id: number | null;
}

export interface AttemptAnswerResult {
  question_text: string;
  selected_text: string | null;
  is_correct: boolean;
  points_earned: number;
}

export interface AttemptResult {
  id: number;
  quiz_title: string;
  attempt_number: number;
  raw_score: number;
  adjusted_score: number;
  max_possible_score: number;
  time_spent: number;
  is_passed: boolean;
  started_at: string;
  submitted_at: string;
  answers: AttemptAnswerResult[];
}

export interface AttemptListItem {
  id: number;
  quiz_title: string;
  attempt_number: number;
  adjusted_score: number;
  max_possible_score: number;
  time_spent: number;
  is_passed: boolean;
  submitted_at: string;
}

// --- Gamification ---
export interface StreakData {
  current_streak: number;
  max_streak: number;
}

export interface RankingEntry {
  rank: number;
  student_id: number;
  username: string;
  total_points: number;
  streak: number;
  avg_time: number;
}

export interface PointHistory {
  points: number;
  reason: string;
  created_at: string;
}

export interface PointsData {
  total_points: number;
  history: PointHistory[];
}

// --- Analytics ---
export interface StudentDashboard {
  total_points: number;
  current_streak: number;
  max_streak: number;
  total_quizzes_taken: number;
  total_quizzes_passed: number;
  average_score: number;
  rank: number | null;
  course_name: string | null;
}

export interface AIInsight {
  id: number;
  quiz_title: string;
  insight_text: string;
  recommendations: string[];
  weak_areas: string[];
  created_at: string;
}

export interface VocabularyWord {
  id: number;
  word: string;
  translation: string;
  lesson_title: string | null;
  created_at: string;
}

export interface GrammarMastery {
  id: number;
  topic: string;
  mastery_percentage: number;
  updated_at: string;
}

export interface CourseStats {
  student_count: number;
  average_score: number;
  total_attempts: number;
  pass_rate: number;
  hardest_lessons: { quiz__lesson__title: string; avg: number }[];
}

export interface StudentDetail {
  student_id: number;
  username: string;
  total_points: number;
  current_streak: number;
  average_score: number;
  total_attempts: number;
  pass_rate: number;
  avg_time: number;
  recent_insights: { text: string; date: string }[];
}

// --- Teacher (Admin) ---
export interface TeacherListItem {
  id: number;
  username: string;
  telegram_username: string;
  is_active: boolean;
  date_joined: string;
  profile: Profile;
}

export interface TeacherCreatePayload {
  username: string;
  password: string;
  telegram_username?: string;
}

// --- Module / Lesson CRUD ---
export interface ModuleCreatePayload {
  title: string;
  description: string;
  order: number;
}

export interface LessonCreatePayload {
  title: string;
  description: string;
  order: number;
}

// --- Quiz CRUD (Teacher) ---
export interface QuizCreatePayload {
  lesson: number;
  course?: number | null;
  quiz_type: number;
  title: string;
  description?: string;
  max_score: number;
  passing_score: number;
  penalty_per_retake: number;
  time_limit: number;
}

export interface QuizEditPayload {
  title?: string;
  description?: string;
  max_score?: number;
  passing_score?: number;
  penalty_per_retake?: number;
  time_limit?: number;
  is_active?: boolean;
}

// --- Question CRUD (Teacher) ---
export interface AnswerPayload {
  text: string;
  is_correct: boolean;
  order: number;
}

export interface QuestionCreatePayload {
  text: string;
  order: number;
  points?: number;
  penalty?: number;
  answers: AnswerPayload[];
}

export interface QuestionEditPayload {
  text?: string;
  order?: number;
  points?: number;
  penalty?: number;
}

// --- Landing Admin CRUD ---
export interface ReviewCreatePayload {
  full_name: string;
  course_name: string;
  text: string;
  rating: number;
  is_active?: boolean;
  order?: number;
}

export interface PricingPlanCreatePayload {
  name: string;
  description: string;
  price: number;
  is_popular?: boolean;
  features: string[];
  is_active?: boolean;
  order?: number;
}

export interface FeatureCreatePayload {
  title: string;
  description: string;
  icon: string;
  is_active?: boolean;
  order?: number;
}

// --- Landing ---
export interface Review {
  id: number;
  full_name: string;
  course_name: string;
  text: string;
  rating: number;
  is_active: boolean;
  order: number;
}

export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  is_popular: boolean;
  features: string[];
  is_active: boolean;
  order: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  is_active: boolean;
  order: number;
}

export interface SiteSetting {
  phone: string;
  email: string;
  address: string;
  telegram: string;
  instagram: string;
  youtube: string;
}

export interface LandingStats {
  total_students: number;
  total_courses: number;
  average_rating: number;
}

export interface LandingPageData {
  levels: Level[];
  stats: LandingStats;
  reviews: Review[];
  pricing: PricingPlan[];
  features: Feature[];
  contact: SiteSetting;
}
