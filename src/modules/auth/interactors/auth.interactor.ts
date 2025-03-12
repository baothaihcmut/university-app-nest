import { Injectable } from "@nestjs/common";
import { LoggerService } from "src/common/logger/logger.service";
import { UsersRespository } from "src/modules/users/repositories/users.repository";
import {
  SignUpPresenterInput,
  SignUpPresenterOutput,
} from "../presenters/sign_up.presenter";
import { AppException, ErrorCode } from "src/common/exeption/app.exception";
import { UserConfirmService } from "../services/user_confirm.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
  USER_CONFIRM_SIGN_UP_EVENT,
  USER_SIGN_UP_EVENT,
} from "src/common/constant";
import { UserSigUpEvent } from "../../users/events/user_sign_up.event";
import {
  ConfirmSignUpPresenterInput,
  ConfirmSignUpPresenterOuput,
} from "../presenters/confirm_sign_up.presenter";
import { UserConfirmSignUpEvent } from "src/modules/users/events/user_confirm_sign_up.event";
import * as bcrypt from "bcryptjs";
import {
  LoginPresenterInput,
  LogInPresenterOutput,
} from "../presenters/log_in.presenter";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class AuthInteractor {
  constructor(
    private userRepo: UsersRespository,
    private loggerService: LoggerService,
    private userConfirmService: UserConfirmService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2
  ) {}

  async signUp(input: SignUpPresenterInput): Promise<SignUpPresenterOutput> {
    //check if user pending for confirm and email exist in system
    const [user] = await Promise.all([
      this.userRepo.findUserByEmail(input.email).then((user) => {
        if (!user) {
          throw new AppException(ErrorCode.EMAIL_NOT_EXIST_IN_SYSTEM);
        }
        return user;
      }),
      this.userConfirmService.isUserPendingConfirm(input.email).then((res) => {
        if (res) {
          throw new AppException(ErrorCode.USER_PENDING_FOR_CONFIRM);
        }
      }),
    ]);
    //activate user
    user.activate({
      firstName: input.firstName,
      lastName: input.lastName,
      birthday: input.birthDate,
      birthplace: input.birthPlace,
      address: input.address,
      password: bcrypt.hashSync(input.password, 10),
      phoneNumber: input.phoneNumber,
    });
    //publish user signup event
    this.eventEmitter.emit(USER_SIGN_UP_EVENT, new UserSigUpEvent(user));
    return new SignUpPresenterOutput();
  }
  async confirmSignUp(
    input: ConfirmSignUpPresenterInput
  ): Promise<ConfirmSignUpPresenterOuput> {
    //find user by code
    const user = await this.userConfirmService.getUser(input.code);
    if (!user) {
      throw new AppException(ErrorCode.INVALID_CONFIRM_CODE);
    }
    //pulish event user confirm
    this.eventEmitter.emit(
      USER_CONFIRM_SIGN_UP_EVENT,
      new UserConfirmSignUpEvent(user)
    );
    return new ConfirmSignUpPresenterOuput();
  }
  async logIn(input: LoginPresenterInput): Promise<LogInPresenterOutput> {
    //find user by email
    const user = await this.userRepo.findUserByEmail(input.email);
    if (!user) {
      throw new AppException(ErrorCode.WRONG_EMAIL_OR_PASSWORD);
    }
    if (!user.validatePassword(input.password)) {
      throw new AppException(ErrorCode.WRONG_EMAIL_OR_PASSWORD);
    }
    //gen access and refresh token
    const accessToken = await this.jwtService.generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const refreshToken = await this.jwtService.generateRefreshToken({
      userId: user.id,
    });
    user.currentRefreshToken = refreshToken;

    await this.userRepo.updateUser(user);

    return new LogInPresenterOutput(user.role, accessToken, refreshToken);
  }
}
