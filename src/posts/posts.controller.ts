import { AuthGuard } from '@/auth/auth.guard';
import { CurrentUser } from '@/shared/decorators/user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InputPostDto } from './dtos/input-post.dto';
import { PostDto } from './dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    const posts = await this.postsService.getAll();

    return plainToInstance(PostDto, posts);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const post = await this.postsService.getOne(id);

    return plainToInstance(PostDto, post);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@CurrentUser('id') user_id: number, @Body() dto: InputPostDto) {
    const post = await this.postsService.create(user_id, dto);

    return plainToInstance(PostDto, post);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: InputPostDto) {
    const post = await this.postsService.update(id, dto);

    return plainToInstance(PostDto, post);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const post = await this.postsService.delete(id);

    return plainToInstance(PostDto, post);
  }
}
