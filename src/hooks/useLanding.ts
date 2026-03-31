import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { landingApi } from "@/api/landing";
import type {
  ReviewCreatePayload,
  PricingPlanCreatePayload,
  FeatureCreatePayload,
  SiteSetting,
} from "@/types/api";
import { AxiosError } from "axios";

// ==================== Public Landing Page ====================

export function useLandingPage() {
  return useQuery({
    queryKey: ["landing-page"],
    queryFn: async () => {
      const { data } = await landingApi.getLandingPage();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    if (data.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const val = data.errors[firstKey];
      return Array.isArray(val) ? val[0] : val;
    }
    if (data.detail) return data.detail;
  }
  return "Xatolik yuz berdi";
}

// ==================== Reviews ====================

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await landingApi.getReviews();
      return data.results;
    },
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReviewCreatePayload) => landingApi.createReview(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Izoh qo'shildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useUpdateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ReviewCreatePayload> }) =>
      landingApi.updateReview(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Izoh yangilandi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => landingApi.deleteReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("Izoh o'chirildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

// ==================== Pricing ====================

export function usePricingPlans() {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const { data } = await landingApi.getPricingPlans();
      return data.results;
    },
  });
}

export function useCreatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PricingPlanCreatePayload) => landingApi.createPricingPlan(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("Tarif qo'shildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useUpdatePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PricingPlanCreatePayload> }) =>
      landingApi.updatePricingPlan(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("Tarif yangilandi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeletePricingPlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => landingApi.deletePricingPlan(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("Tarif o'chirildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

// ==================== Features ====================

export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const { data } = await landingApi.getFeatures();
      return data.results;
    },
  });
}

export function useCreateFeature() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: FeatureCreatePayload) => landingApi.createFeature(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
      toast.success("Xususiyat qo'shildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useUpdateFeature() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<FeatureCreatePayload> }) =>
      landingApi.updateFeature(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
      toast.success("Xususiyat yangilandi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

export function useDeleteFeature() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => landingApi.deleteFeature(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
      toast.success("Xususiyat o'chirildi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}

// ==================== Settings ====================

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await landingApi.getSettings();
      return data.data;
    },
  });
}

export function useUpdateSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SiteSetting>) => landingApi.updateSettings(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Sozlamalar saqlandi!");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
