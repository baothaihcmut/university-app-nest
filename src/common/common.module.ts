import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppConfigModule } from './app_config/app_config.module';
import { ContextModule } from './context/context.module';

@Module({
  imports: [PrismaModule, AppConfigModule, ContextModule],
  providers: [],
  exports: [PrismaModule, ContextModule],
})
export class CommonModule {}
