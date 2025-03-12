import { User } from "src/modules/users/entities/user";

export class UserSigUpEvent {
  user: User;
  constructor(user: User) {
    this.user = user;
  }
}
