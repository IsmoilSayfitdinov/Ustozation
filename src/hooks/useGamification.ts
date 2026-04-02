import { useQuery } from "@tanstack/react-query";
import { gamificationApi } from "@/api/gamification";

export function useStreak() {
  return useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const { data } = await gamificationApi.getStreak();
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Student: courseId yo'q → o'z kursining reytingi
// Teacher/Admin: courseId bor → shu kursning reytingi
export function useRanking(courseId?: number) {
  return useQuery({
    queryKey: courseId ? ["ranking", courseId] : ["ranking"],
    queryFn: async () => {
      const { data } = await gamificationApi.getRanking(courseId);
      return data.data;
    },
  });
}

export function useBadges() {
  return useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const { data } = await gamificationApi.getBadges();
      return data.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyBadges() {
  return useQuery({
    queryKey: ["my-badges"],
    queryFn: async () => {
      const { data } = await gamificationApi.getMyBadges();
      return data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function usePoints() {
  return useQuery({
    queryKey: ["points"],
    queryFn: async () => {
      const { data } = await gamificationApi.getPoints();
      return data.data;
    },
  });
}
