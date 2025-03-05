import { UUID } from 'crypto';
import { User } from './user';

export interface CreateStudentArg {
  user: User;
  studentId: string;
  schoolYear?: string;
  startYear?: Date;
  endYear?: Date;
  majorId?: UUID;
}

export class Student {
  user: User;
  studentId: string;
  schoolYear?: string;
  startYear?: Date;
  endYear?: Date;
  majorId: UUID;

  constructor(args: CreateStudentArg) {
    this.user = args.user;
    this.studentId = args.studentId;
    this.schoolYear = args.schoolYear;
    this.startYear = args.startYear;
    this.endYear = args.endYear;
    this.majorId = args.majorId;
  }
}
