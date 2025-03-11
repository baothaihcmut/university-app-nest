import { Injectable } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: Logger) {}

  info(msg: string, detail?: any) {
    this.logger.info(msg, detail);
  }

  error(msg: string, detail?: any) {
    this.logger.error(msg, detail);
  }

  warn(msg: string, detail?: any) {
    this.logger.warn(msg, detail);
  }

  debug(msg: string, detail?: any) {
    this.logger.debug(msg, detail);
  }

  verbose(msg: string, detail?: any) {
    this.logger.verbose(msg, detail);
  }
}
