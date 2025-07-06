import { authMiddleware } from "../auth.middleware";
import { Router, Request, Response } from "express";
import { BlocksService } from "./blocks.service";
import { createBlockDts } from "./blocks.dto";

const router = Router();

const blocksService = new BlocksService();
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createBlockDts.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ message: validation.error.issues });
  }
  const project = await blocksService.createBlock(req.body);
  res.status(201).json(project);
});

router.get("/", async (req: Request, res: Response) => {
  const blocks = await blocksService.getBlocks();
  res.json(blocks);
});
export const blocksRouter = router;
