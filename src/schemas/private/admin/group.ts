import { z } from "zod";

export const createGroupSchema = z.object({
  title: z.string().min(1, "Guruh nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  level: z.string().min(1, "Daraja tanlanishi shart"),
  maxStudents: z.string().optional().or(z.literal("")),
});

export type CreateGroupSchema = z.infer<typeof createGroupSchema>;
