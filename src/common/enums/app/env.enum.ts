import { config } from 'dotenv';

config();

const { PORT, HOST, CURRENCY_RATE_API_URL } = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
    SERVER_HOST: HOST as string,
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
  CURRENCY: {
    CURRENCY_RATE_API_URL,
  },
} as const;

export { ENV };
