import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  EMAIL_NOT_EXIST_IN_SYSTEM = 'email not exist in system',
}
export const ErrorCodeMap: Record<ErrorCode, HttpStatus> = {
  [ErrorCode.EMAIL_NOT_EXIST_IN_SYSTEM]: HttpStatus.NOT_FOUND,
};
export class AppException extends Error {
  code: HttpStatus;
  message: string;

  constructor(errorCode: ErrorCode) {
    super(errorCode);
    this.message = errorCode;
    this.code = ErrorCodeMap[errorCode];
    Object.setPrototypeOf(this, AppException.prototype);
  }
}
