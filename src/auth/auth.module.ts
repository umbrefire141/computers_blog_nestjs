import { UsersModule } from '@/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: new ConfigService().get('JWT_SECRET'),
      signOptions: { expiresIn: '30m' },
      global: true,
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
