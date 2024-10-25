import { InputUserDto } from '@/users/dtos/input-user.dto';
import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(dto: InputUserDto) {
    const foundUser = await this.usersService.getUserByEmail(dto.email);

    if (foundUser) throw new BadRequestException('User is already existed');

    const salt = await genSalt(8);
    const hashedPassword = await hash(dto.password, salt);

    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });

    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
    });

    return {
      ...tokens,
      user,
    };
  }

  async signIn(dto: LoginDto) {
    const currentUser = await this.usersService.getUserByEmail(dto.email);

    const verifiedPassword = await compare(dto.password, currentUser.password);

    if (!verifiedPassword) throw new UnauthorizedException('Wrong password');

    const tokens = this.generateTokens({
      id: currentUser.id,
      email: currentUser.email,
    });

    return {
      ...tokens,
      user: currentUser,
    };
  }

  async getMe(id: number) {
    const user = await this.usersService.getUser(id);

    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
    });

    return {
      ...tokens,
      user,
    };
  }

  private generateTokens(payload: any) {
    const accessToken = this.jwt.sign(payload);
    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '32d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
