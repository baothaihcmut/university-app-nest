import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import {
  USER_CONFIRM_SIGN_UP_EVENT,
  USER_SIGN_UP_EVENT,
} from "src/common/constant";
import { UserSigUpEvent } from "../events/user_sign_up.event";
import { UserConfirmService } from "src/modules/auth/services/user_confirm.service";
import { LoggerService } from "src/common/logger/logger.service";
import { UserConfirmSignUpEvent } from "../events/user_confirm_sign_up.event";
import { UsersRespository } from "../repositories/users.repository";

@Injectable()
export class UserEventHandler {
  constructor(
    private userRepo: UsersRespository,
    private userConfirmService: UserConfirmService,
    private logger: LoggerService
  ) {}
  @OnEvent(USER_SIGN_UP_EVENT)
  async handleUserSignUp(event: UserSigUpEvent) {
    //store user info
    const u = event.user;
    try {
      const code = await this.userConfirmService.storeUser(u);
      //send mail to user
      await this.userConfirmService.sendMailConfirm({
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        url: `http://localhost:3000/confirm?code=${code}`,
      });
      this.logger.info("handle event user sign up success", {
        email: u.email,
      });
    } catch (e) {
      console.log(e);
      this.logger.error("error handle user sign up event", {
        detail: e,
        email: u.email,
      });
    }
  }

  @OnEvent(USER_CONFIRM_SIGN_UP_EVENT)
  async handleUSerConfirmSignUp(event: UserConfirmSignUpEvent) {
    const u = event.user;
    try {
      //store user to db
      this.userRepo.updateUser(u);
      this.logger.info("handle user confirm sign up success", {
        email: u.email,
        userId: u.id.toString(),
      });
    } catch (e) {
      this.logger.error(`Handle user confrim sign up err${e.message}`, {
        email: u.email,
        userId: u.id,
      });
    }
  }
}
