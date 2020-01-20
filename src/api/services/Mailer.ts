import * as NodeMailer from 'nodemailer';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

require('dotenv').config();

class Mailer {
  transporter: any;

  constructor() {
    this.transporter = NodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 0,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send an email
   */
  send(to: string, subject: string, view: string, data: any = {}) {
    const source = fs.readFileSync(
      path.resolve(__dirname, '..', 'views', 'emails', `${view}.hbs`),
      'utf8',
    );
    const template = Handlebars.compile(source);
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        {
          to,
          subject,
          html: template(data),
          from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
        },
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        },
      );
    });
  }
}

export default new Mailer();
