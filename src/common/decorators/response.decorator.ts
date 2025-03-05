import { SetMetadata } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export const REPONSE_DATA = 'response_data';
export const REPONSE_MESSAGE = 'response_message';
export const ResponseData = <T>(cls: ClassConstructor<T>) =>
  SetMetadata(REPONSE_DATA, cls);
export const ResponseMessage = <T>(cls: ClassConstructor<T>) =>
  SetMetadata(REPONSE_DATA, cls);
