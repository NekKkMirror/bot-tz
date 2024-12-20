import Express from 'express';

import { DeliveryParams } from '@/delivery/types';
import { buildCategoryHandler } from '@/delivery/http/v1/handlers/category';
import { buildStatusHandler } from '@/delivery/http/v1/handlers/status';
import { buildFeedbackHandler } from '@/delivery/http/v1/handlers/feedback';
import { buildAuthHandler } from '@/delivery/http/v1/handlers/auth';
import { IHandler } from '@/delivery/http/v1/handlers/types';
import { buildUpvoteHandler } from '@/delivery/http/v1/handlers/upvote';

import { buildExampleHandler } from './example';

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router();

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildUpvoteHandler(params),
    buildFeedbackHandler(params),
    buildCategoryHandler(params),
    buildStatusHandler(params),
    buildExampleHandler(params),
  ];

  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];

    handler.registerRoutes(router);
  }

  return router;
};
