/* eslint-disable no-console */
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ENV } from './common/enums/enums.js';
import { initApi } from './api/api.js';
import { initServices } from './services/services.js';
import { initDatabase } from './data/db.js';

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

const repositories = initDatabase();
const { currency, subscription } = initServices(repositories);

app.register(initApi, {
  services: {
    currency,
    subscription,
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
