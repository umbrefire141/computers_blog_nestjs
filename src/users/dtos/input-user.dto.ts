import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class InputUserDto extends PickType(UserDto, [
  'email',
  'name',
  'password',
]) {}
