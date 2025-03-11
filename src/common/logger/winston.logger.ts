import { ConfigService } from '@nestjs/config';
import { createLogger, format, Logger, transports } from 'winston';

// custom log display format
const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`;
});

export const instance = (cfgService: ConfigService): Logger => {
  const level = cfgService.get<string>('logger.level');
  const output = cfgService.get<string>('logger.output');
  const loggerFormat = cfgService.get<string>('logger.format');
  return createLogger({
    transports:
      output === 'console'
        ? new transports.Console({
            level,
          })
        : new transports.File({
            filename: cfgService.get<string>('logger.file.fileName'),
            level,
          }),
    format:
      loggerFormat === 'json'
        ? format.combine(
            format.timestamp(),
            format.errors({ stack: true }),
            format.json(),
          )
        : format.combine(
            format.timestamp(),
            format.errors({ stack: true }),
            customFormat,
          ),
  });
};
