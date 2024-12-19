import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const environmentSchema = z.object({
  // Application
  APP_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_PORT: z.string().regex(/^\d+$/).transform(Number),
  APP_HOST: z.string(),

  // Database
  DATABASE_URL: z.string(),

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
