import { NextFunction, Response, Request } from 'express';

export type RouteHandler = (req: Request, res: Response) => Promise<Response | void>;

export const createRouteHandler = (handler: RouteHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      return next(error);
    }
  };
};
