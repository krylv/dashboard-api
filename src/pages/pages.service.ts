import { Page, PrismaClient } from "@/generated/prisma";

export interface IPage {
  id: number;
  project_id: number;
  title: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

export class PagesService {
  private prisma = new PrismaClient();

  createPage(page: IPage): Promise<Page> {
    return this.prisma.page.create({ data: page });
  }

  getPages(): Promise<Page[]> {
    return this.prisma.page.findMany();
  }
}
