import { z } from "zod";

export const createTeacherSchema = z.object({
  username: z.string().min(1, "Username kiritilishi shart").max(150, "Maksimum 150 ta belgi"),
  password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"),
  telegram_username: z.string().max(64, "Maksimum 64 ta belgi").optional().or(z.literal("")),
});

export type CreateTeacherSchema = z.infer<typeof createTeacherSchema>;
