import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AppConfigModule } from "./app_config/app_config.module";
import { ContextModule } from "./context/context.module";
import { LoggerModule } from "./logger/logger.module";
import { RedisModule } from "./redis/redis.module";
import { MailModule } from "./mail/mail.module";
import { InitializeModule } from "./initialize/initialize.module";

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    ContextModule,
    LoggerModule,
    RedisModule,
    MailModule,
    InitializeModule,
  ],
  providers: [],
  exports: [
    PrismaModule,
    ContextModule,
    LoggerModule,
    RedisModule,
    MailModule,
    InitializeModule,
  ],
})
export class CommonModule {}
