import { z } from "zod";

export const createLevelSchema = z.object({
  name: z.string().min(1, "Daraja nomi kiritilishi shart").max(100, "Maksimum 100 ta belgi"),
  slug: z.string().min(1, "Slug kiritilishi shart").max(100, "Maksimum 100 ta belgi")
    .regex(/^[a-z0-9-]+$/, "Faqat kichik harflar, raqamlar va tire ishlatiladi"),
  description: z.string().max(1000, "Maksimum 1000 ta belgi").optional().or(z.literal("")),
});

export type CreateLevelSchema = z.infer<typeof createLevelSchema>;
