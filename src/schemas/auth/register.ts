import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  telegram_username: z.string().optional(),
  gender: z.string().optional(),
  age: z.string().optional(),
  course_id: z.string().optional(),
  teacher_id: z.string().optional(),
  password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterSchema };
