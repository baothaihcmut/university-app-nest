import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailer: MailerService) { }
    async sendMail(args: {
        subject: string,
        to: string,
        template: string,
        value: any,
    }) {
        await this.mailer.sendMail({
            to: args.to,
            template: args.template,
            subject: args.subject,
            context: {
                ...args.value,
            }
        })
    }
}