import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  telegram_username: z.string().min(3, "Telegram username kamida 3 ta belgidan iborat bo'lishi kerak"),
  gender: z.string().min(1, "Jinsni tanlang"),
  age: z.string().min(1, "Yoshni kiriting"),
  course: z.string().min(1, "Kursni tanlang"),
  teacher: z.string().min(1, "O'qituvchini tanlang"),
  password: z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterSchema };
