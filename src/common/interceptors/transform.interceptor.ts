import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
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
  RESPONSE_DATA,
  RESPONSE_MESSAGE,
  RESPONSE_STATUS,
} from '../decorators/response.decorator';
import { Response } from 'express';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.reflector.get<HttpStatus>(
      RESPONSE_STATUS,
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => {
        response.status(status);
        if (!(data instanceof AppResponse)) {
          return this.transformResponse(context, data);
        }
      }),
    );
  }
  private transformResponse(ctx: ExecutionContext, data: any): AppResponse {
    if (data) {
      const cls = this.reflector.get<ClassConstructor<any>>(
        RESPONSE_DATA,
        ctx.getHandler(),
      );
      if (cls) {
        if (Array.isArray(data)) {
          data = data.map((data) =>
            plainToInstance(cls, instanceToPlain(data), {
              excludeExtraneousValues: true,
            }),
          );
        } else {
          data = plainToInstance(cls, instanceToPlain(data), {
            excludeExtraneousValues: true,
          });
        }
      }
    }
    const msg = this.reflector.get<string>(RESPONSE_MESSAGE, ctx.getHandler());

    return AppResponse.initResponse(true, msg, data);
  }
}
