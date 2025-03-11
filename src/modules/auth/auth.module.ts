import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  JWTAccessTokenAgeKey,
  JWTAccessTokenSecretKey,
} from 'src/common/constant';
import { PassportModule } from '@nestjs/passport';
import { JwtPassportStrategy } from './passport/jwt.strategy';
import { RefreshStrategy } from './passport/refresh.strategy';
import { AuthInteractor } from './interactors/auth.interactor';
import { CommonModule } from 'src/common/common.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWTAccessTokenSecretKey),
        signOptions: {
          expiresIn: `${configService.get<number>(JWTAccessTokenAgeKey)}h`,
        },
      }),
    }),
    PassportModule,
    UsersModule,
    ConfigModule,
    CommonModule,
  ],
  providers: [AuthInteractor, JwtPassportStrategy, RefreshStrategy],
  exports: [JwtPassportStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
