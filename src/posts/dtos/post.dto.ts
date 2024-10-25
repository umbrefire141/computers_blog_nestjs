import { UserDto } from '@/users/dtos/user.dto';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  @IsOptional()
  img: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  @IsOptional()
  content: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  published: boolean;

  @Expose()
  @Type(() => UserDto)
  author: UserDto;
}
