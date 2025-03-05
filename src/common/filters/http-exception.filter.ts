import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Response } from 'express';
import { AppResponse } from '../response/response';

@Catch(HttpException)
export class HttpExceptionFilter extends ExceptionsHandler {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse() as string;
    response
      .status(status)
      .json(AppResponse.initResponse(false, message, null));
  }
}
