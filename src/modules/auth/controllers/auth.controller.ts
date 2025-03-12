import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthInteractor } from "../interactors/auth.interactor";
import {
  ResponseMessage,
  ResponseStatus,
} from "src/common/decorators/response.decorator";
import { SignUpPresenterInput } from "../presenters/sign_up.presenter";
import { ValidateInputPipe } from "src/common/pipes/validate.pipe";
import { ConfirmSignUpPresenterInput } from "../presenters/confirm_sign_up.presenter";
import { LoginPresenterInput } from "../presenters/log_in.presenter";
import { AuthGuard } from "@nestjs/passport";
import {
  ContextService,
  USER_CONTEXT_KEY,
} from "src/common/context/context.service";
import { UserContext } from "src/common/context/user.context";

@Controller("/auth")
export class AuthController {
  constructor(
    private authInteractor: AuthInteractor,
    private userCtx: ContextService
  ) {}

  @Post("/sign-up")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage("user sign up success")
  @UsePipes(ValidateInputPipe)
  async signUp(@Body() req: SignUpPresenterInput) {
    return await this.authInteractor.signUp(req);
  }
  @Post("/confirm")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage("confirm sign up success")
  @UsePipes(ValidateInputPipe)
  async confirmSignUp(@Body() input: ConfirmSignUpPresenterInput) {
    return await this.authInteractor.confirmSignUp(input);
  }

  @Post("/log-in")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage("log in success")
  @UsePipes(ValidateInputPipe)
  async logIn(@Body() input: LoginPresenterInput) {
    return await this.authInteractor.logIn(input);
  }

  @Get("/test")
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage("log in success")
  @UseGuards(AuthGuard("jwt"))
  async test() {
    console.log(this.userCtx.get<UserContext>(USER_CONTEXT_KEY));
  }
}
