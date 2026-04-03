import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "@/api/analytics";

export function useDashboard(studentId?: number) {
  return useQuery({
    queryKey: ["dashboard", studentId],
    queryFn: async () => {
      const { data } = await analyticsApi.getDashboard(studentId);
      return data.data;
    },
    staleTime: 0,
  });
}

export function useInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: async () => {
      const { data } = await analyticsApi.getInsights();
      return data.results;
    },
    staleTime: 0,
  });
}

export function useVocabulary() {
  return useQuery({
    queryKey: ["vocabulary"],
    queryFn: async () => {
      const { data } = await analyticsApi.getVocabulary();
      return data.results;
    },
  });
}

export function useGrammarMastery() {
  return useQuery({
    queryKey: ["grammar-mastery"],
    queryFn: async () => {
      const { data } = await analyticsApi.getGrammarMastery();
      return data.results;
    },
  });
}

export function useCourseStats(courseId: number) {
  return useQuery({
    queryKey: ["course-stats", courseId],
    queryFn: async () => {
      const { data } = await analyticsApi.getCourseStats(courseId);
      return data.data;
    },
    enabled: !!courseId,
  });
}

export function useStudentDetail(courseId: number, studentId: number) {
  return useQuery({
    queryKey: ["student-detail", courseId, studentId],
    queryFn: async () => {
      const { data } = await analyticsApi.getStudentDetail(courseId, studentId);
      return data.data;
    },
    enabled: !!courseId && !!studentId,
  });
}
