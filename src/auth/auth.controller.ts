import { CurrentUser } from '@/shared/decorators/user.decorator';
import { InputUserDto } from '@/users/dtos/input-user.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthDto, LoginDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: LoginDto) {
    const user = await this.authService.signIn(dto);

    return plainToInstance(AuthDto, user);
  }

  @Post('sign-up')
  async signUp(@Body() dto: InputUserDto) {
    const user = await this.authService.signUp(dto);

    return plainToInstance(AuthDto, user);
  }

  @UseGuards(AuthGuard)
  @Get('getMe')
  async getMe(@CurrentUser('id') id: number) {
    const user = await this.authService.getMe(id);

    return plainToInstance(AuthDto, user);
  }
}
