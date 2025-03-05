import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppResponse } from '../response/response';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Reflector } from '@nestjs/core';
import {
  REPONSE_DATA,
  REPONSE_MESSAGE,
} from '../decorators/response.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        if (!(data instanceof AppResponse)) {
          this.transformResponse(context, data);
        }
      }),
    );
  }
  private transformResponse(ctx: ExecutionContext, data: any): AppResponse {
    const cls = this.reflector.get<ClassConstructor<any>>(
      REPONSE_DATA,
      ctx.getHandler(),
    );
    if (cls) {
      data = plainToInstance<any, any>(cls, instanceToPlain(data));
    }
    const msg = this.reflector.get<string>(REPONSE_MESSAGE, ctx.getHandler());

    return AppResponse.initResponse(true, msg, data);
  }
}
