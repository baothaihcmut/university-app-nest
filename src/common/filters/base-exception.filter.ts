import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Response } from 'express';
import { AppResponse } from '../response/response';

@Catch(Error)
export class BaseExceptionHandler extends ExceptionsHandler {
  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(AppResponse.initResponse(false, 'Internal error', null));
  }
}
