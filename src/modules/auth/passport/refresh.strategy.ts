import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTRefreshTokenSecretKey } from 'src/common/constant';
import { RefreshTokenPayload } from '../services/jwt.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWTRefreshTokenSecretKey),
    });
  }

  validate(payload: RefreshTokenPayload): unknown {
    return payload;
  }
}
