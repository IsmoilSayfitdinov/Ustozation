import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  password: z.string().min(8, "Parol kamida 8 ta belgidan iborat bo'lishi kerak"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };