import { User } from "./user";

type RequiredTeacherField = "teacherId";
export type CreateTeacherArg = Required<Pick<Teacher, RequiredTeacherField>> &
  Partial<Omit<Teacher, RequiredTeacherField>>;
export class Teacher {
  user: User;
  teacherId: string;

  constructor(args: CreateTeacherArg) {
    Object.assign(this, args);
  }
}
