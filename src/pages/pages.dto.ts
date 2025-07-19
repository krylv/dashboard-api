import { z } from "zod";

export const createPageDto = z.object({
  title: z.string().min(1, "Title is required").max(15),
  slug: z.string().min(1, "Slug is required"),
  project_id: z.number(),
});
