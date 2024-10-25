import { UserDto } from '@/users/dtos/user.dto';
import { PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}

export class AuthDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
