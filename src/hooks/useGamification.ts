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

export function useRanking() {
  return useQuery({
    queryKey: ["ranking"],
    queryFn: async () => {
      const { data } = await gamificationApi.getRanking();
      return data.data;
    },
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
