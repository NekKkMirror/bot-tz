import { environment } from './environment';

export const config = {
  http: {
    port: environment.APP_PORT,
    host: environment.APP_HOSTNAME,
  },
  postgres: {
    host: environment.DB_HOST,
    port: environment.DB_PORT,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    db: environment.DB_NAME,
  },
  jwt: {
    secret: environment.JWT_SECRET,
  },
  app: {
    env: environment.APP_NODE_ENV,
  },
  example: {
    message: environment.EXAMPLE_MESSAGE,
  },
};

export const devMode = config.app.env === 'development';

export type AppConfig = typeof config;
