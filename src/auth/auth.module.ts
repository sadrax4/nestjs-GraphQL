import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constant';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';


@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: ['jwt', 'google'] }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: 3600 }
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
