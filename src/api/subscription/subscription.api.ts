import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { ISubscribeUserRequestDto } from '../../common/model-types/model-types.js';
import { HttpCode, HttpMethod, SubscriptionApiPath } from '../../common/enums/enums.js';
import {
  subscribeUser as subscribeUserValidationSchema,
} from '../../validation-schemas/validation-schemas.js';
import { Subscription as SubscriptionService } from '../../services/services.js';

interface IInitSubscriptionApiOptions {
  services: {
    subscription: SubscriptionService;
  };
}

const initSubscriptionApi: FastifyPluginAsync<IInitSubscriptionApiOptions> = async (fastify, opts) => {
  const { subscription: subscriptionService } = opts.services;

  fastify.route({
    method: HttpMethod.POST,
    url: SubscriptionApiPath.Subscribe,
    schema: {
      querystring: subscribeUserValidationSchema,
    },
    handler: async (req: FastifyRequest<{ Params: ISubscribeUserRequestDto }>, rep) => {
      await subscriptionService.subscribeUser({ email: req.params.email });

      return rep.status(HttpCode.OK).send();
    },
  });
};

export { initSubscriptionApi };
