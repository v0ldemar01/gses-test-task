/* eslint-disable no-console */
import Fastify from 'fastify';
import cors from '@fastify/cors';

import { ENV } from './common/enums/enums.js';

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

app.listen({ port: ENV.APP.SERVER_PORT, host: ENV.APP.SERVER_HOST });

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});
