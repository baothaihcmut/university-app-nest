import { randomUUID, UUID } from "crypto";
import { Role } from "src/common/enums/role";
import { CreateStudentArg, Student } from "./student";
import { CreateTeacherArg, Teacher } from "./teacher";
import * as bcrypt from "bcryptjs";

type UserRequiredField = "email" | "activate";
type UserField = Required<Pick<User, UserRequiredField>> &
  Partial<Omit<User, UserRequiredField | "student" | "teacher" | "role">>;
type ActivateUserArg = Required<
  Omit<User, UserRequiredField | "student" | "teacher" | "role">
>;
type CreateUserTeacher = UserField & {
  role: Role.TEACHER;
  teacher: CreateTeacherArg;
};
type CreateUserStudent = UserField & {
  role: Role.STUDENT;
  student: CreateStudentArg;
};
type CreateUserArg = CreateUserStudent | CreateUserTeacher;

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

  constructor(args: CreateUserArg) {
    Object.assign(this, {
      id: args.id ?? randomUUID(),
      ...args,
    });
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
