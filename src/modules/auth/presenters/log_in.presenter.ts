import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/common/enums/role";

export class LoginPresenterInput {
  @IsEmail({}, { message: "email is invalid" })
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @IsNotEmpty({ message: "password is required" })
  password: string;
}

export class LogInPresenterOutput {
  constructor(
    private role: Role,
    private accessToken: string,
    private refreshToken: string
  ) {}
}
