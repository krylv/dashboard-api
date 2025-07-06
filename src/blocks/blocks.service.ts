import { blocks, PrismaClient } from "@/generated/prisma";

export interface IBlock {
  id: number;
  project_id: number;
  page_id: number;
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  slug: string;
}

export class BlocksService {
  private prisma = new PrismaClient();

  createBlock(block: IBlock): Promise<blocks> {
    return this.prisma.blocks.create({ data: block });
  }

  async getBlocks(): Promise<IBlock[]> {
    return this.prisma.blocks.findMany();
  }
}
