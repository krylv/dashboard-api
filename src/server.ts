import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { projectsRouter } from "./projects/projects.controller";
import { PrismaClient } from "./generated/prisma";
import { pagesRouter } from "./pages/pages.controller";
import { blocksRouter } from "./blocks/blocks.controller";

dotenv.config();
const app = express();
export const prisma = new PrismaClient();
async function main() {
  app.use(express.json());
  app.use(cors());

  app.use("/api/projects", projectsRouter); //Подключение контроллера проектов
  app.use("/api/pages", pagesRouter);
  app.use("/api/blocks", blocksRouter);
  app.get("/error", (req, res) => {
    //Просто для вывода ошибки роут
    throw new Error("error");
  });
  app.all("/{*any}", (req, res) => {
    res.status(404).json({ message: "Not found" });
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).send("Что-то пошло не так");
  });
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process?.env?.PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
