import { PrismaService } from '@/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { InputUserDto } from './dtos/input-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new NotFoundException("User isn't found");
    }
  }

  async create(dto: InputUserDto) {
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password,
      },
    });
  }

  async update(id: number, dto: InputUserDto) {
    const salt = await genSalt(8);
    const hashedPassword = await hash(dto.password, salt);

    return await this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
