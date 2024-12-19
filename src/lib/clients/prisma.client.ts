import { PrismaClient } from '@prisma/client';

import { config } from '@/config';

export const newClient = () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `${config.postgres.url}?connection_limit=10`,
      },
    },
  });

  const getContextClient = (tx?: unknown) => {
    if (tx instanceof PrismaClient) {
      return tx;
    }
    return client;
  };

  return {
    client,
    getContextClient,
  };
};
