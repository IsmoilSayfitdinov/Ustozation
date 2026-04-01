import { z } from "zod";

export const createQuizSchema = z.object({
  title: z.string().min(1, "Test nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  description: z.string().max(500, "Maksimum 500 ta belgi").optional().or(z.literal("")),
  lesson: z.string().min(1, "Dars tanlanishi shart"),
  quiz_type: z.string().min(1, "Test turi tanlanishi shart"),
  max_score: z.string().min(1, "Max ball kiritilishi shart"),
  passing_score: z.string().min(1, "O'tish balli kiritilishi shart"),
  penalty_per_retake: z.string().optional().or(z.literal("")),
  time_limit: z.string().min(1, "Vaqt limiti kiritilishi shart"),
});

export type CreateQuizSchema = z.infer<typeof createQuizSchema>;
