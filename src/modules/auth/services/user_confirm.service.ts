import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { MailService } from "src/common/mail/mail.service";
import { RedisService } from "src/common/redis/redis.service";
import { User } from "src/modules/users/entities/user";

@Injectable()
export class UserConfirmService {
  constructor(
    private redisService: RedisService,
    private mailService: MailService
  ) {}
  async storeUser(user: User): Promise<string> {
    //store email of user
    const code = randomUUID().toString();
    await Promise.all([
      this.redisService.setString(
        `user_email_confirm_pending:${user.email}`,
        "1",
        30
      ),
      this.redisService.setObject(`user_confirm_pending:${code}`, user, 30),
    ]);
    //return code
    return code;
  }
  async isUserPendingConfirm(email: string): Promise<boolean> {
    const isPending = await this.redisService.getString(
      `user_email_confirm_pending:${email}`
    );
    return isPending && isPending == "1";
  }

  async sendMailConfirm(args: {
    email: string;
    firstName: string;
    lastName: string;
    url: string;
  }) {
    await this.mailService.sendMail({
      subject: "LMS Confirmation",
      to: args.email,
      template: "confirm_sign_up",
      value: {
        firstName: args.firstName,
        lastName: args.lastName,
        url: args.url,
      },
    });
  }
  async getUser(code: string): Promise<User> {
    return this.redisService.getObject<User>(
      `user_confirm_pending:${code}`,
      User
    );
  }
}
