import { Router, Request, Response } from "express";
import { PagesService } from "./pages.service";
import { authMiddleware } from "@/auth.middleware";
import { createPageDto } from "./pages.dto";

const router = Router();

const pageService = new PagesService();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createPageDto.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ message: validation.error.issues });
  }
  const project = await pageService.createPage(req.body);
  res.status(201).json(project);
});

router.get("/", async (req: Request, res: Response) => {
  const pages = await pageService.getPages();
  res.json(pages);
});

export const pagesRouter = router;
