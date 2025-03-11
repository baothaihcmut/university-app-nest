import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AuthInteractor } from '../interactors/auth.interactor';
import {
  ResponseData,
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { SignUpPresenterOutput } from '../presenters/sign-up.presenter';

@Controller('/auth')
export class AuthController {
  constructor(private authInteractor: AuthInteractor) {}

  @Get('/test')
  @ResponseStatus(HttpStatus.OK)
  @ResponseMessage('test')
  @ResponseData(SignUpPresenterOutput)
  async test() {
    this.authInteractor.signUp();
    return new SignUpPresenterOutput('hello');
  }
}
