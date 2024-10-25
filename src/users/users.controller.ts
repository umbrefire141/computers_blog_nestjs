import { AuthGuard } from '@/auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InputUserDto } from './dtos/input-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();
    return plainToInstance(UserDto, users);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.usersService.getUser(id);
    return plainToInstance(UserDto, user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() dto: InputUserDto) {
    const user = await this.usersService.update(id, dto);
    return plainToInstance(UserDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    const user = await this.usersService.delete(id);
    return plainToInstance(UserDto, user);
  }
}
