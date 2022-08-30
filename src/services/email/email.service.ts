/* eslint-disable @typescript-eslint/no-empty-interface */
import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IEmailCredentials } from '../../common/model-types/email/email';
import { getEmailTransportConfig } from '../../configs/email.config';

interface IEmailServiceConstructor extends IEmailCredentials {}

class Email {
  #transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(credentials: IEmailServiceConstructor) {
    this.#transporter = this._createTransporter(credentials);
    this.#sourceEmail = credentials.username;
  }

  private _createTransporter(credentials: IEmailCredentials): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport(getEmailTransportConfig(credentials));
  }

  public sendCurrentBTCToUAHCurrencyEmail(
    params: { to: string, rate: number },
  ): Promise<SMTPTransport.SentMessageInfo> {
    const emailOptions = {
      to: params.to,
      from: this.#sourceEmail,
      subject: 'BTC to UAH currency subscription',
      text: `
        You have subcribed to receive currency BTC to UAH. Current BTC rate is ${params.rate} UAH
      `,
    };
    return this._sendEmail(emailOptions);
  }

  private async _sendEmail(emailOptions: Mail.Options): Promise<SMTPTransport.SentMessageInfo> {
    return this.#transporter.sendMail(emailOptions);
  }
}

export { Email };