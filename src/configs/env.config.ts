import { config } from 'dotenv';

config();

const {
  PORT,
  HOST,
  EMAIL_HOST,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  CURRENCY_RATE_API_URL,
} = process.env;

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
    HOST: String(EMAIL_HOST),
    PORT: 465,
    SECURE: true,
    USERNAME: String(EMAIL_USERNAME),
    PASSWORD: String(EMAIL_PASSWORD),
  },
} as const;

export { ENV };
