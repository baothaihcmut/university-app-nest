import { Transform, Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from "class-validator";
export class SignUpPresenterInput {
  @IsEmail({}, { message: "wrong email format" })
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @IsNotEmpty({ message: "password is required" })
  password: string;

  @IsNotEmpty({ message: "first name is required" })
  firstName: string;

  @IsNotEmpty({ message: "last name is required" })
  lastName: string;

  @IsNumberString({}, { message: "phone number must be numberic" })
  phoneNumber: string;

  @Type(() => Date)
  @IsDate({ message: "Birthdate must be a valid date" })
  birthDate: Date;

  @IsNotEmpty({ message: "birth place is required" })
  birthPlace: string;

  @IsString({ message: "address must be string" })
  @IsNotEmpty({ message: "address is required" })
  address: string;
}

export class SignUpPresenterOutput {}
