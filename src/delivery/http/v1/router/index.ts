import Express from 'express';
import cors from 'cors';

import { buildSwagger } from '../swagger';
import { errorHandler, loggerMiddleware } from '../middlewares';

export const buildRouter = (handler: Express.Router) => {
  const router = Express.Router();

  router.use(cors());
  router.use(Express.json());
  router.use(loggerMiddleware);
  router.use(handler);
  router.use(buildSwagger());
  router.use(errorHandler);

  return router;
};
