import * as nodemailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')

import { mailerConfig } from '../utils/mailerConfig';

export interface SendMail {
    from: string;
    to: string;
    title: string;
    content?: string;
}
export class MailerService {
    mailer: Mail;

    constructor() {
        this.mailer = nodemailer.createTransport(mailerConfig);
    }

    public async sendMail(data: SendMail) {
        return this.mailer.sendMail({
            from: data.from,
            to: data.to,
            subject: data.title,
            html: data.content
        });
    }
}