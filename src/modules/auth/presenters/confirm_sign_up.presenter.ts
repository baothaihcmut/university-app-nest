import { IsNotEmpty, IsUUID } from "class-validator";

export class ConfirmSignUpPresenterInput {
  @IsNotEmpty()
  @IsUUID()
  code: string;
}

export class ConfirmSignUpPresenterOuput {
  constructor() {}
}
