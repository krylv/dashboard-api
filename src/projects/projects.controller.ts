import { authMiddleware } from "../auth.middleware";
import { createProjectsDto } from "./projects.dto";
import { ProjectService } from "./projects.service";
import { Router, Request, Response } from "express";

const router = Router();

const projectsService = new ProjectService();
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createProjectsDto.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ message: validation.error.issues });
  }
  const project = await projectsService.createProject(req.body);
  res.status(201).json(project);
});

router.get("/", async (req: Request, res: Response) => {
  const projects = await projectsService.getProjects();
  res.json(projects);
});
export const projectsRouter = router;
