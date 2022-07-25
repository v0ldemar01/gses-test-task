/* eslint-disable no-console */
import Fastify from 'fastify';
import cors from '@fastify/cors';

import { ENV } from './common/enums/enums.js';
import { initApi } from './api/api.js';
import { initServices } from './services/services.js';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

app.register(cors, {
  origin: '*',
});

const { currency } = initServices();
app.register(initApi, {
  services: {
    currency,
  },
  prefix: ENV.API.V1_PREFIX,
});

app.listen({ port: ENV.APP.SERVER_PORT, host: ENV.APP.SERVER_HOST });

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});
