import { FastifyPluginAsync } from 'fastify';
import { ValidationSchema } from '~/common/model-types/model-types.js';
import { ApiPath } from '../common/enums/enums.js';
import {
  Currency as CurrencyService,
  Subscription as SubscriptionService,
} from '../services/services.js';
import { initCurrencyApi } from './currency/currency.api.js';
import { initSubscriptionApi } from './subscription/subscription.api.js';

interface IInitApiOptions {
  services: {
    currency: CurrencyService;
    subscription: SubscriptionService;
  };
}

const initApi: FastifyPluginAsync<IInitApiOptions> = async (
  fastify,
  { services: { currency, subscription } },
) => {
  fastify.setValidatorCompiler<ValidationSchema>(({
    schema,
  }) => <T>(data: T): ReturnType<ValidationSchema['validate']> => schema.validate(data));
  fastify.register(initCurrencyApi, {
    services: {
      currency,
    },
    prefix: ApiPath.CURRENCY,
  });

  fastify.register(initSubscriptionApi, {
    services: {
      subscription,
    },
  });
};

export { initApi };
