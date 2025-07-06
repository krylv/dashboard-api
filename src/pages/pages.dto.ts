import { z } from "zod";

export const createPageDto = z.object({
  id: z.number(),
  project_id: z.number(),
  title: z.string().min(1, "Title is required").max(15),
  slug: z.string().min(1, "Slug is required"),
});
