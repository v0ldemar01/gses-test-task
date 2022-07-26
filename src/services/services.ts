import { Http } from './http/http.service.js';
import { Currency } from './currency/currency.service.js';
import { Subscription } from './subscription/subscription.service.js';
import { initRepositories } from '~/data/repositories/repositories.js';

interface IInitServicesReturn {
  http: Http;
  currency: Currency;
  subscription: Subscription;
}

const initServices = (repositories: ReturnType<typeof initRepositories>): IInitServicesReturn => {
  const { user: userRepository } = repositories;

  const http = new Http();

  const currency = new Currency({
    http,
  });

  const subscription = new Subscription({
    userRepository,
  });

  return { http, currency, subscription };
};

export { initServices, type Http, type Currency, type Subscription };
