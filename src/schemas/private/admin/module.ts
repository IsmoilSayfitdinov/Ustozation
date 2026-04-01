import { z } from "zod";

export const createModuleSchema = z.object({
  title: z.string().min(1, "Modul nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  description: z.string().max(1000, "Maksimum 1000 ta belgi").optional().or(z.literal("")),
});

export type CreateModuleSchema = z.infer<typeof createModuleSchema>;

export const editModuleSchema = z.object({
  title: z.string().min(1, "Modul nomi kiritilishi shart").max(200, "Maksimum 200 ta belgi"),
  description: z.string().max(1000, "Maksimum 1000 ta belgi").optional().or(z.literal("")),
});

export type EditModuleSchema = z.infer<typeof editModuleSchema>;
