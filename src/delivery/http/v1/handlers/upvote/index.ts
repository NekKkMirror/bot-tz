import Express from 'express';

import { DeliveryParams } from '@/delivery/types';

import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';

import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { createUpvoteRules, deleteUpvoteRules } from './rules';

type Params = Pick<DeliveryParams, 'upvote'>;

export type UpvoteMethods = {
  create: Create;
  delete: Delete;
};

const buildUpvoteRoutes = (methods: UpvoteMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /upvotes:
     *   post:
     *     tags: [Upvote]
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/createUpvote'
     *     responses:
     *        201:
     *           description: Created upvote.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Upvote'
     */
    namespace.post('/', createUpvoteRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /upvotes/{id}:
     *   delete:
     *     tags: [Upvote]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Upvote ID
     *     responses:
     *        204:
     *           description: The upvote was deleted successfully.
     */
    namespace.delete('/:id', deleteUpvoteRules, createRouteHandler(methods.delete));

    root.use('/upvotes', namespace);
  };
};

export const buildUpvoteHandler = (params: Params): IHandler => {
  const create = buildCreate(params);
  const deleteUpvote = buildDelete(params);

  return {
    registerRoutes: buildUpvoteRoutes({ create, delete: deleteUpvote }),
  };
};
