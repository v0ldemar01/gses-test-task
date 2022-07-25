import { FastifyPluginAsync } from 'fastify';
import { ApiPath } from '../common/enums/enums.js';
import {
  Currency as CurrencyService,
} from '../services/services.js';
import { initCurrencyApi } from './currency/currency.api.js';

interface IInitApiOptions {
  services: {
    currency: CurrencyService;
  };
}

const initApi: FastifyPluginAsync<IInitApiOptions> = async (
  fastify,
  { services: { currency } },
) => {
  fastify.register(initCurrencyApi, {
    services: {
      currency,
    },
    prefix: ApiPath.CURRENCY,
  });
};

export { initApi };
