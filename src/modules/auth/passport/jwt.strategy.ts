import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTAccessTokenSecretKey } from 'src/common/constant';
import { AccessTokenPayload } from '../services/jwt.service';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWTAccessTokenSecretKey),
    });
  }

  validate(payload: AccessTokenPayload) {
    return payload;
  }
}
