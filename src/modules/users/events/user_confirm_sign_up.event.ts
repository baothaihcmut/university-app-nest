import { User } from "../entities/user";

export class UserConfirmSignUpEvent {
  user: User;
  constructor(user: User) {
    this.user = user;
  }
}
