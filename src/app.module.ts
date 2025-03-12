import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { APP_FILTER, APP_INTERCEPTOR, BaseExceptionFilter } from "@nestjs/core";
import { AppExceptionFilter } from "./common/filters/app-exception.filter";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { UserContextInterceptor } from "./common/interceptors/user-context.interceptor";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
  ],
})
export class AppModule {}
