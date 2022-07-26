import { config } from 'dotenv';

config();

const { PORT, HOST, CURRENCY_RATE_API_URL, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
    SERVER_HOST: String(HOST),
  },
  API: {
    V1_PREFIX: '/api/v1',
    DOCUMENTATION_PREFIX: '/swagger',
  },
  CURRENCY: {
    CURRENCY_RATE_API_URL,
  },
  EMAIL: {
    USERNAME: String(EMAIL_USERNAME),
    PASSWORD: String(EMAIL_PASSWORD),
  },
} as const;

export { ENV };
