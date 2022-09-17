import { CurrencyProvider } from '../common/enums/enums.js';
import { CurrencyServices } from './currency/types.js';
import { ENV } from '../configs/env.config.js';
import { Http } from './http/http.service.js';
import { Email } from './email/email.service.js';
import { Subscription } from './subscription/subscription.service.js';
import { initRepositories } from '../data/repositories/repositories.js';
import { EmailTransporter } from './email-transporter/email-transporter.service.js';
import { initCurrencyServices } from './currency/currency.service.js';
interface IInitServicesReturn {
  http: Http;
  email: Email;
  subscription: Subscription;
  currency: CurrencyServices[keyof CurrencyServices];
}

const initServices = (repositories: ReturnType<typeof initRepositories>): IInitServicesReturn => {
  const { user: userRepository } = repositories;

  const http = new Http();

  const emailTransporter = new EmailTransporter({
    options: {
      host: ENV.EMAIL.HOST,
      port: ENV.EMAIL.PORT,
      secure: ENV.EMAIL.SECURE,
      auth: {
        user: ENV.EMAIL.USERNAME,
        pass: ENV.EMAIL.PASSWORD,
      },
    },
  });

  const email = new Email({
    emailTransporter,
    sourceEmail: ENV.EMAIL.USERNAME,
  });

  const currency = initCurrencyServices({
    http,
    provider: ENV.CURRENCY.CRYPTO_CURRENCY_PROVIDER as CurrencyProvider,
  });

  const subscription = new Subscription({
    userRepository,
    emailService: email,
    currencyService: currency,
  });

  return { http, currency, subscription, email };
};

export { initServices, type Http, type Subscription, type Email };
