import { z } from "zod";

// Reviews
export const reviewSchema = z.object({
  full_name: z.string().min(1, "Ism kiritilishi shart").max(150, "Maksimum 150 ta belgi"),
  course_name: z.string().min(1, "Kurs nomi kiritilishi shart").max(100, "Maksimum 100 ta belgi"),
  text: z.string().min(1, "Izoh matni kiritilishi shart").max(500, "Maksimum 500 ta belgi"),
  rating: z.number().min(1, "Minimum 1").max(5, "Maksimum 5"),
});

export type ReviewFormSchema = z.infer<typeof reviewSchema>;

// Pricing Plans
export const pricingSchema = z.object({
  name: z.string().min(1, "Tarif nomi kiritilishi shart").max(100, "Maksimum 100 ta belgi"),
  description: z.string().max(300, "Maksimum 300 ta belgi").optional().or(z.literal("")),
  price: z.number().min(0, "Narx 0 dan kam bo'lishi mumkin emas"),
  is_popular: z.boolean().default(false),
  features: z.string().optional().or(z.literal("")),
});

export type PricingFormSchema = z.infer<typeof pricingSchema>;

// Features
export const featureSchema = z.object({
  title: z.string().min(1, "Sarlavha kiritilishi shart").max(100, "Maksimum 100 ta belgi"),
  description: z.string().min(1, "Tavsif kiritilishi shart").max(300, "Maksimum 300 ta belgi"),
  icon: z.string().max(50, "Maksimum 50 ta belgi").optional().or(z.literal("")),
});

export type FeatureFormSchema = z.infer<typeof featureSchema>;

// Site Settings
export const siteSettingsSchema = z.object({
  phone: z.string().min(1, "Telefon raqami kiritilishi shart").max(20, "Maksimum 20 ta belgi"),
  email: z.string().min(1, "Email kiritilishi shart").email("Noto'g'ri email formati"),
  address: z.string().min(1, "Manzil kiritilishi shart").max(300, "Maksimum 300 ta belgi"),
  telegram: z.string().url("URL https:// bilan boshlanishi kerak").or(z.literal("")).optional(),
  instagram: z.string().url("URL https:// bilan boshlanishi kerak").or(z.literal("")).optional(),
  youtube: z.string().url("URL https:// bilan boshlanishi kerak").or(z.literal("")).optional(),
});

export type SiteSettingsFormSchema = z.infer<typeof siteSettingsSchema>;
