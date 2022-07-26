import { ENV } from '../common/enums/enums.js';
import { Http } from './http/http.service.js';
import { Currency } from './currency/currency.service.js';
import { Subscription } from './subscription/subscription.service.js';
import { initRepositories } from '~/data/repositories/repositories.js';
import { Email } from './email/email.service.js';

interface IInitServicesReturn {
  http: Http;
  email: Email;
  currency: Currency;
  subscription: Subscription;
}

const initServices = (repositories: ReturnType<typeof initRepositories>): IInitServicesReturn => {
  const { user: userRepository } = repositories;

  const http = new Http();

  const currency = new Currency({
    http,
  });

  const email = new Email({
    username: ENV.EMAIL.USERNAME,
    password: ENV.EMAIL.PASSWORD,
  });

  const subscription = new Subscription({
    userRepository,
    emailService: email,
    currencyService: currency,
  });

  return { http, currency, subscription, email };
};

export { initServices, type Http, type Currency, type Subscription, type Email };
