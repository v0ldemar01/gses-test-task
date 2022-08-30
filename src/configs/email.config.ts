import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IEmailCredentials } from '../common/model-types/email/email';

const getEmailTransportConfig = (credentials: IEmailCredentials): SMTPTransport.Options => ({
  host: 'mail.binary-studio.com',
  port: 465,
  secure: true,
  auth: {
    user: credentials.username,
    pass: credentials.password,
  },
});

export { getEmailTransportConfig };