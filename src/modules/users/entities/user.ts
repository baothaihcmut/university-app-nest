import { randomUUID, UUID } from 'crypto';
import { Role } from 'src/common/enums/role';
import { CreateStudentArg, Student } from './student';
import { CreateTeacherArg, Teacher } from './teacher';

export interface CreateUserArg {
  id: UUID;
  email: string;
  student?: CreateStudentArg;
  teacher?: CreateTeacherArg;
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
  student?: CreateStudentArg;
  teacher?: CreateTeacherArg;
  image?: string;
  currentRefreshToken?: string;
}

export class User {
  id: UUID;
  firstName: string;
  lastName: string;
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

  private constructor(args: CreateUserArg, role: Role) {
    this.id = randomUUID();
    this.email = args.email;
    this.role = role;
    this.isActive = false;
  }

  static createStudent(args: CreateUserArg): User {
    const user = new User(args, Role.STUDENT);
    user.student = new Student({
      ...args.student,
      user,
    });
    return user;
  }

  static createTeacher(args: CreateUserArg): User {
    const user = new User(args, Role.TEACHER);
    user.teacher = new Teacher({
      ...args.teacher,
      user,
    });
    return user;
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
