import { randomUUID, UUID } from 'crypto';
import { Role } from 'src/common/enums/role';
import { CreateStudentArg, Student } from './student';
import { CreateTeacherArg, Teacher } from './teacher';

export interface CreateUserArg {
  id: UUID;
  email: string;
  student?: CreateStudentArg;
  teacher?: CreateTeacherArg;
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  birthplace?: string;
  birthday?: Date;
  socialNetworkInfo?: string;
  address?: string;
  image?: string;
  currentRefreshToken?: string;
  isActive: boolean;
  role: Role;
}

export interface ActivateUserArg {
  firstName?: string;
  lastName?: string;
  password?: string;
  phoneNumber?: string;
  birthplace?: string;
  birthday?: Date;
  socialNetworkInfo?: string;
  address?: string;
  image?: string;
  currentRefreshToken?: string;
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

  constructor(args: CreateUserArg) {
    this.id = randomUUID();
    this.email = args.email;
    this.role = args.role;
    this.firstName = args.firstName;
    this.lastName = args.lastName;
    this.birthday = args.birthday;
    this.birthplace = args.birthplace;
    this.password = args.password;
    this.phoneNumber = args.phoneNumber;
    this.socialNetworkInfo = args.socialNetworkInfo;
    this.currentRefreshToken = args.currentRefreshToken;
    this.address = args.address;
    this.isActive = args.isActive ?? false; // Default to false if not provided
    this.image = args.image;
    if (args.role === Role.STUDENT && args.student) {
      this.student = new Student({
        ...args.student,
        user: this,
      });
    }
    if (args.role === Role.TEACHER && args.teacher) {
      this.teacher = new Teacher({
        ...args.teacher,
        user: this,
      });
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
  }
}
