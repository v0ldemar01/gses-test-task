import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class Email {
  #transporter: Transporter<SMTPTransport.SentMessageInfo>;
  #sourceEmail: string;

  constructor(credentials: { username: string, password: string }) {
    this.#transporter = this._createTransporter(credentials);
    this.#sourceEmail = credentials.username;
  }

  private _createTransporter(credentials: { username: string, password: string }): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      host: 'mail.binary-studio.com',
      port: 465,
      secure: true,
      auth: {
        user: credentials.username,
        pass: credentials.password,
      },
    });
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