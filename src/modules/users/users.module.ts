import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersRespository } from "./repositories/users.repository";
import { CommonModule } from "src/common/common.module";
import { UserInteractor } from "./interactors/user.interactor";
import { AuthModule } from "../auth/auth.module";
import { UserEventHandler } from "./handler/user_event.handler";

@Module({
  providers: [UsersService, UsersRespository, UserInteractor, UserEventHandler],
  imports: [CommonModule, forwardRef(() => AuthModule)],
  exports: [UsersService, UsersRespository],
})
export class UsersModule {}
