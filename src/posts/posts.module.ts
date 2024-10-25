import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/prisma.service';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports: [AuthModule, UsersModule],
})
export class PostsModule {}
