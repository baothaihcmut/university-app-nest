import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthInteractor } from './interactors/auth.interactor';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTAccessTokenAgeKey } from 'src/common/constant';


@Module({
    imports:[
        JwtModule.registerAsync({
            imports: [ ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService:ConfigService)=>({
                secret: configService.get<string>(JWTAccessTokenAgeKey),
                signOptions: {expiresIn: `${configService.get<number>(JWTAccessTokenAgeKey)}h`}
            })
        }),
        UsersModule],
    providers:[AuthInteractor],
})
export class AuthModule {}
