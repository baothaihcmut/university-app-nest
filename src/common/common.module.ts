import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppConfigModule } from './app_config/app_config.module';
import { ContextModule } from './context/context.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, AppConfigModule, ContextModule, LoggerModule],
  providers: [],
  exports: [PrismaModule, ContextModule, LoggerModule],
})
export class CommonModule {}
