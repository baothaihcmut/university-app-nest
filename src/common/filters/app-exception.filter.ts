import { ArgumentsHost, Catch } from '@nestjs/common';
import { AppException } from '../exeption/app.exception';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Response } from 'express';
import { AppResponse } from '../response/response';

@Catch(AppException)
export class AppExceptionFilter extends ExceptionsHandler {
  catch(exception: AppException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.code;
    const message = exception.message;
    response
      .status(status)
      .json(AppResponse.initResponse(false, message, null));
  }
}
