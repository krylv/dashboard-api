import { PrismaClient, Project } from "@/generated/prisma";

interface IProject {
  id?: number;
  title: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export class ProjectService {
  private prisma = new PrismaClient();
  createProject(project: IProject): Promise<Project> {
    const { id, ...projectData } = project;
    return this.prisma.project.create({
      data: projectData,
    });
  }

  async getProjects(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async getProject(projectId: number): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id: projectId } });
  }

  async deleteProject(projectId: number) {
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}
