import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const environmentSchema = z.object({
  // Application
  APP_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_PORT: z.string().regex(/^\d+$/).transform(Number),
  APP_IMAGE_NAME: z.string(),
  APP_CONTAINER_NAME: z.string(),
  APP_HOSTNAME: z.string(),

  // Database
  DB_IMAGE_NAME: z.string(),
  DB_CONTAINER_NAME: z.string(),
  DB_HOSTNAME: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  // Security
  JWT_SECRET: z.string(),

  // Example
  EXAMPLE_MESSAGE: z.string(),
});

const parsed = environmentSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const environment = parsed.data;
