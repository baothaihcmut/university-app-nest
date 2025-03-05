import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import 'reflect-metadata';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new HttpException(
          this.handleError(e.getResponse()),
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  private handleError(errors: any) {
    if (typeof errors === 'string') {
      return errors;
    } else if (Array.isArray(errors.message)) {
      return errors.message[0];
    } else {
      return Object.values(errors.message)[0];
    }
  }
}
