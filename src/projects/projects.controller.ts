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

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (!projectId) {
      return res.status(400).json({ error: "Invalid Project ID" });
    }
    const project = await projectsService.getProject(projectId);
    return res.json(project);
  } catch (e) {
    console.error("Failed to get project");
    res.status(500).json({ error: "Int" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    if (!projectId) {
      return res.status(400).json({ error: "Invalid Project ID" });
    }
    await projectsService.deleteProject(projectId);
    res.status(204).end();
  } catch (e) {
    console.error("Error deleting project");
    res.status(500).json({ error: "Int" });
  }
});
export const projectsRouter = router;
