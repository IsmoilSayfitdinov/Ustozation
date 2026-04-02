import client from "./client";
import type { ApiResponse, PaginatedResponse, PointsData, RankingEntry, StreakData, BadgeType, StudentBadge } from "@/types/api";

export const gamificationApi = {
  getStreak: () =>
    client.get<ApiResponse<StreakData>>("/gamification/streak/"),

  getRanking: (courseId?: number) =>
    client.get<ApiResponse<RankingEntry[]>>("/gamification/ranking/", {
      params: courseId ? { course_id: courseId } : undefined,
    }),

  getPoints: () =>
    client.get<ApiResponse<PointsData>>("/gamification/points/"),

  // Badges
  getBadges: () =>
    client.get<PaginatedResponse<BadgeType>>("/gamification/badge-types/"),

  getMyBadges: () =>
    client.get<ApiResponse<StudentBadge[]>>("/gamification/badges/"),
};
