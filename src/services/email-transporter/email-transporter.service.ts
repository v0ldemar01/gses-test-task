/* eslint-disable @typescript-eslint/no-empty-interface */
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IEmailCredentials } from '../../common/model-types/email/email.js';
import { getEmailTransportConfig } from '../../configs/email.config.js';

interface IEmailTransporterServiceConstructor extends IEmailCredentials {}

class EmailTransporter {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(credentials: IEmailTransporterServiceConstructor) {
    this.transporter = this._createTransporter(credentials);
  }

  private _createTransporter(credentials: IEmailCredentials): Transporter<SMTPTransport.SentMessageInfo> {
    return nodemailer.createTransport(getEmailTransportConfig(credentials));
  }
}

export { EmailTransporter };