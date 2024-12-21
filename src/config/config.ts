import { environment } from './environment';

export const config = {
  http: {
    port: environment.APP_PORT,
    host: environment.APP_HOST,
  },
  postgres: {
    url: environment.DATABASE_URL,
  },
  jwt: {
    secret: environment.JWT_SECRET,
  },
  app: {
    env: environment.APP_NODE_ENV,
    driveDir: environment.APP_DRIVE_PATH,
  },
  example: {
    message: environment.EXAMPLE_MESSAGE,
  },
};

export const devMode = config.app.env === 'development';

export type AppConfig = typeof config;
