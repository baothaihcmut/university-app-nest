import { UUID } from "crypto";
import { User } from "./user";

type RequiredStudentField = "studentId";
export type CreateStudentArg = Required<Pick<Student, RequiredStudentField>> &
  Partial<Omit<Student, RequiredStudentField>>;
export class Student {
  user: User;
  studentId: string;
  schoolYear?: string;
  startYear?: Date;
  endYear?: Date;
  majorId: UUID;

  constructor(args: CreateStudentArg) {
    Object.assign(this, args);
  }
}
