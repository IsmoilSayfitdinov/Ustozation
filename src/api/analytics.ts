import client from "./client";
import type {
  AIInsight,
  ApiResponse,
  CourseStats,
  GrammarMastery,
  PaginatedResponse,
  StudentDashboard,
  StudentDetail,
  VocabularyWord,
} from "@/types/api";

export const analyticsApi = {
  // Student
  getDashboard: () =>
    client.get<ApiResponse<StudentDashboard>>("/analytics/dashboard/"),

  getInsights: () =>
    client.get<PaginatedResponse<AIInsight>>("/analytics/insights/"),

  getVocabulary: () =>
    client.get<PaginatedResponse<VocabularyWord>>("/analytics/vocabulary/"),

  getGrammarMastery: () =>
    client.get<PaginatedResponse<GrammarMastery>>("/analytics/grammar-mastery/"),

  // Teacher
  getCourseStats: (courseId: number) =>
    client.get<ApiResponse<CourseStats>>(`/analytics/courses/${courseId}/stats/`),

  getStudentDetail: (courseId: number, studentId: number) =>
    client.get<ApiResponse<StudentDetail>>(`/analytics/courses/${courseId}/students/${studentId}/`),

  getStudentPdf: (courseId: number, studentId: number) =>
    client.get(`/analytics/courses/${courseId}/students/${studentId}/pdf/`, {
      responseType: "blob",
    }),

  getStudentsListPdf: (courseId: number) =>
    client.get(`/analytics/courses/${courseId}/students/pdf/`, {
      responseType: "blob",
    }),
};
