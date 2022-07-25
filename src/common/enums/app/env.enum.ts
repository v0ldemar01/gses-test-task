import { config } from 'dotenv';

config();

const { PORT, HOST } = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST as string,
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
} as const;

export { ENV };
