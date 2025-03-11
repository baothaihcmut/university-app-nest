import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { instance } from './winston.logger';

@Module({
  imports: [ConfigModule],

  providers: [
    {
      provide: Logger,
      useFactory: (cfg: ConfigService) => instance(cfg),
      inject: [ConfigService],
    },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
