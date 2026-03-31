import client from "./client";
import type {
  ApiResponse,
  Feature,
  FeatureCreatePayload,
  LandingPageData,
  PaginatedResponse,
  PricingPlan,
  PricingPlanCreatePayload,
  Review,
  ReviewCreatePayload,
  SiteSetting,
} from "@/types/api";

export const landingApi = {
  // Public
  getLandingPage: () =>
    client.get<LandingPageData>("/landing/"),

  // --- Reviews CRUD (Admin) ---
  getReviews: () =>
    client.get<PaginatedResponse<Review>>("/reviews/"),

  createReview: (data: ReviewCreatePayload) =>
    client.post<ApiResponse<Review>>("/reviews/", data),

  updateReview: (id: number, data: Partial<ReviewCreatePayload>) =>
    client.put<Review>(`/reviews/${id}/`, data),

  deleteReview: (id: number) =>
    client.delete(`/reviews/${id}/`),

  // --- Pricing CRUD (Admin) ---
  getPricingPlans: () =>
    client.get<PaginatedResponse<PricingPlan>>("/pricing/"),

  createPricingPlan: (data: PricingPlanCreatePayload) =>
    client.post<ApiResponse<PricingPlan>>("/pricing/", data),

  updatePricingPlan: (id: number, data: Partial<PricingPlanCreatePayload>) =>
    client.put<PricingPlan>(`/pricing/${id}/`, data),

  deletePricingPlan: (id: number) =>
    client.delete(`/pricing/${id}/`),

  // --- Features CRUD (Admin) ---
  getFeatures: () =>
    client.get<PaginatedResponse<Feature>>("/features/"),

  createFeature: (data: FeatureCreatePayload) =>
    client.post<ApiResponse<Feature>>("/features/", data),

  updateFeature: (id: number, data: Partial<FeatureCreatePayload>) =>
    client.put<Feature>(`/features/${id}/`, data),

  deleteFeature: (id: number) =>
    client.delete(`/features/${id}/`),

  // --- Site Settings (Admin) ---
  getSettings: () =>
    client.get<ApiResponse<SiteSetting>>("/settings/"),

  updateSettings: (data: Partial<SiteSetting>) =>
    client.put<SiteSetting>("/settings/", data),
};
