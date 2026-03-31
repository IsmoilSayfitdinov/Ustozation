import client from "./client";
import type { ApiResponse, PointsData, RankingEntry, StreakData } from "@/types/api";

export const gamificationApi = {
  getStreak: () =>
    client.get<ApiResponse<StreakData>>("/gamification/streak/"),

  getRanking: () =>
    client.get<ApiResponse<RankingEntry[]>>("/gamification/ranking/"),

  getPoints: () =>
    client.get<ApiResponse<PointsData>>("/gamification/points/"),
};
