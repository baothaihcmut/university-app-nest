import { HttpStatus, SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export const RESPONSE_DATA = 'response_data';
export const RESPONSE_MESSAGE = 'response_message';
export const RESPONSE_STATUS = 'response_status';
export const ResponseData = (cls: ClassConstructor<any>) =>
  SetMetadata(RESPONSE_DATA, cls);
export const ResponseMessage = (msg: string) =>
  SetMetadata(RESPONSE_MESSAGE, msg);
export const ResponseStatus = (status: HttpStatus) =>
  SetMetadata(RESPONSE_STATUS, status);
