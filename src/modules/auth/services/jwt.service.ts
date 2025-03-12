import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService as LibJwtService } from "@nestjs/jwt";
import { UUID } from "crypto";
import {
  JWTRefreshTokenAgeKey,
  JWTRefreshTokenSecretKey,
} from "src/common/constant";
import { Role } from "src/common/enums/role";

export interface AccessTokenPayload {
  userId: UUID;
  role: Role;
}

export interface RefreshTokenPayload {
  userId: UUID;
}
@Injectable()
export class JwtService {
  constructor(
    private jwtService: LibJwtService,
    private configService: ConfigService
  ) {}

  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(JWTRefreshTokenSecretKey),
      expiresIn: `${this.configService.get<number>(JWTRefreshTokenAgeKey)}`,
    });
  }
}
