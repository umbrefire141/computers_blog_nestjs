import { PostDto } from '@/posts/dtos/post.dto';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  avatar: string;

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @Type(() => PostDto)
  posts: PostDto[];
}
