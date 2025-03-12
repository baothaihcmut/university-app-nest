import { randomUUID, UUID } from "crypto";
import { Role } from "src/common/enums/role";
import { Student } from "./student";
import { Teacher } from "./teacher";
import * as bcrypt from "bcryptjs";

export interface ActivateUserArg {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  birthplace: string;
  birthday: Date;
  socialNetworkInfo?: string;
  address: string;
  image?: string;
}

export class User {
  id: UUID;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  currentRefreshToken?: string;
  phoneNumber?: string;
  birthplace: string;
  birthday: Date;
  socialNetworkInfo?: string;
  address: string;
  role: Role;
  isActive: boolean;
  student?: Student;
  teacher?: Teacher;
  image?: string;

  constructor(args: Partial<User>) {
    this.id = args?.id ?? (randomUUID() as UUID);
    this.email = args?.email;
    this.role = args?.role;
    this.firstName = args?.firstName;
    this.lastName = args?.lastName;
    this.birthday = args?.birthday ?? new Date(); // Default to current date
    this.birthplace = args?.birthplace ?? "";
    this.password = args?.password;
    this.phoneNumber = args?.phoneNumber;
    this.socialNetworkInfo = args?.socialNetworkInfo;
    this.currentRefreshToken = args?.currentRefreshToken;
    this.address = args?.address ?? "";
    this.isActive = args?.isActive ?? false;
    this.image = args?.image;

    if (args?.role === Role.STUDENT && args?.student) {
      this.student = new Student({ ...args.student, user: this });
    }
    if (args?.role === Role.TEACHER && args?.teacher) {
      this.teacher = new Teacher({ ...args.teacher, user: this });
    }
  }

  activate(args: ActivateUserArg) {
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.birthday = args.birthday;
    this.birthplace = args.birthplace;
    this.password = args.password;
    this.phoneNumber = args.phoneNumber;
    this.socialNetworkInfo = args.socialNetworkInfo;
    this.isActive = true;
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
