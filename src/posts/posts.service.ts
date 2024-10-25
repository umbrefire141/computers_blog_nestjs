import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { InputPostDto } from './dtos/input-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async getOne(id: number) {
    return await this.prisma.post.findFirst({ where: { id } });
  }

  async create(user_id: number, dto: InputPostDto) {
    return await this.prisma.post.create({
      data: {
        ...dto,
        authorId: user_id,
      },
    });
  }

  async update(id: number, dto: InputPostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }
}
