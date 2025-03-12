import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContextService, USER_CONTEXT_KEY } from '../context/context.service';
import { Request } from 'express';
import { AccessTokenPayload } from 'src/modules/auth/services/jwt.service';

@Injectable()
export class UserContextInterceptor implements NestInterceptor {
  constructor(private ctxService: ContextService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const user = req["user"] as AccessTokenPayload;
    if (user) {
      return new Observable((subscriber) => {
        this.ctxService.run(() => {
          this.ctxService.set(USER_CONTEXT_KEY, user);
          next.handle().subscribe({
            next: (value) => subscriber.next(value),
            error: (err) => subscriber.error(err),
            complete: () => subscriber.complete(),
          });
        });
      });
    }
    return next.handle();
  }
}
