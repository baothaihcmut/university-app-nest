import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_USER,
} from "../constant";
import { MailService } from "./mail.service";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import * as path from "path";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (cfgService: ConfigService) => ({
        transport: {
          host: cfgService.get<string>(MAIL_HOST),
          port: cfgService.get<number>(MAIL_PORT),
          secure: cfgService.get<boolean>(MAIL_SECURE), // `true` for port 465
          auth: {
            user: cfgService.get<string>(MAIL_USER),
            pass: cfgService.get<string>(MAIL_PASSWORD),
          },
        },
        defaults: {
          from: `"NestJS Mailer" <${cfgService.get<string>(MAIL_USER)}>`,
        },
        template: {
          dir: path.join(process.cwd(), "templates"),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
