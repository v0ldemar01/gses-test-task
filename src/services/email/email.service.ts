import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class EmailService {
  private _transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(credentials: { username: string, password: string }) {
    this._transporter = this._createTransporter(credentials);
  }

  private _createTransporter(credentials: { username: string, password: string }): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: credentials.username,
        pass: credentials.password,
      },
    });
  }

  public sendCurrentBTCToUAHCurrencyEmail(
    from: string,
    to: string,
    params: { rate: number },
  ): Promise<SMTPTransport.SentMessageInfo> {
    const emailOptions = {
      from,
      to,
      subject: 'BTC to UAH currency subscription',
      text: `
        <div>You have subcribed to receive currency BTC to UAH. Current rate is ${params.rate}</div>
      `,
    };
    return this._sendEmail(emailOptions);
  }

  private async _sendEmail(emailOptions: Mail.Options): Promise<SMTPTransport.SentMessageInfo> {
    return this._transporter.sendMail(emailOptions);
  }
}