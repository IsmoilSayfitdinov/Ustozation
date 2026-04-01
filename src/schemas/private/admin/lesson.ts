import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(1, "Dars nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  description: z.string().max(1000, "Maksimum 1000 ta belgi").optional().or(z.literal("")),
});

export type CreateLessonSchema = z.infer<typeof createLessonSchema>;

export const editLessonSchema = z.object({
  title: z.string().min(1, "Dars nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  description: z.string().max(1000, "Maksimum 1000 ta belgi").optional().or(z.literal("")),
});

export type EditLessonSchema = z.infer<typeof editLessonSchema>;
