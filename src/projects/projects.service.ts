import { PrismaClient, Project } from "@/generated/prisma";

interface IProject {
  id: number;
  title: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export class ProjectService {
  private prisma = new PrismaClient();
  createProject(project: IProject): Promise<Project> {
    return this.prisma.project.create({
      data: project,
    });
  }

  async getProjects(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }
}
