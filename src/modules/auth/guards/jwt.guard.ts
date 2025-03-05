import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<AccessTokenPayload>(
    err: any,
    user: AccessTokenPayload,
  ): AccessTokenPayload {
    if (err || !user) {
      throw new HttpException('token is required', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
