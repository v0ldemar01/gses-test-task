/* eslint-disable no-console */
import { ENV } from './common/enums/enums.js';
import { buildServer } from './server.js';

const app = buildServer({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

app.listen({ port: ENV.APP.SERVER_PORT, host: ENV.APP.SERVER_HOST });

process.on('unhandledRejection', (error) => {
  console.error(error);
});

process.on('uncaughtException', (error) => {
  console.error(error);
  process.exit(1);
});