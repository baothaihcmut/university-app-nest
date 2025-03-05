import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshGuard extends AuthGuard('refresh') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new HttpException('token is required', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
