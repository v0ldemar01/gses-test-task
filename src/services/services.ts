import { Http } from './http/http.service.js';
import { Currency } from './currency/currency.service.js';

interface IInitServicesReturn {
  http: Http;
  currency: Currency;
}

const initServices = (): IInitServicesReturn => {
  const http = new Http();

  const currency = new Currency({
    http,
  });

  return { http, currency };
};

export { initServices, type Http, type Currency };
