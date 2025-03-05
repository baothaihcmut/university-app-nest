import { User } from './user';

export interface CreateTeacherArg {
  teacherId: string;
  user: User;
}

export class Teacher {
  user: User;
  teacherId: string;

  constructor(args: CreateTeacherArg) {
    this.teacherId = args.teacherId;
    this.user = args.user;
  }
}
