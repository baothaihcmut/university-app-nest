import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppConfigModule } from './app_config/app_config.module';

@Module({
  imports: [PrismaModule, AppConfigModule],
  exports: [PrismaModule, AppConfigModule],
})
export class CommonModule {}
