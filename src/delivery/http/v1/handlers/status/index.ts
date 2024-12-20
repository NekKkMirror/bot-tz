import Express from 'express';

import { DeliveryParams } from '@/delivery/types';

import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';

import { buildGet, Get } from './get';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildList, List } from './list';
import { createStatusRules, deleteStatusRules, getStatusRules, listStatusesRules } from './rules';

type Params = Pick<DeliveryParams, 'status'>;

export type StatusMethods = {
  create: Create;
  list: List;
  get: Get;
  delete: Delete;
};

const buildStatusRoutes = (methods: StatusMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /statuses:
     *   post:
     *     tags: [Status]
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/createStatus'
     *     responses:
     *        201:
     *           description: Created status.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Status'
     */
    namespace.post('/', createStatusRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /statuses:
     *   get:
     *     tags: [Status]
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: query
     *         name: skip
     *         schema:
     *           type: integer
     *         description: Number of items to skip
     *       - in: query
     *         name: take
     *         schema:
     *           type: integer
     *         description: Number of items to take
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: Name filter
     *     responses:
     *        200:
     *           description: List of statuses.
     *           content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/entities/Status'
     */
    namespace.get('/', listStatusesRules, createRouteHandler(methods.list));

    /**
     * @openapi
     * /statuses/{id}:
     *   get:
     *     tags: [Status]
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Status ID
     *     responses:
     *        200:
     *           description: The requested status.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Status'
     */
    namespace.get('/:id', getStatusRules, createRouteHandler(methods.get));

    /**
     * @openapi
     * /statuses/{id}:
     *   delete:
     *     tags: [Status]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Status ID
     *     responses:
     *        204:
     *           description: The status was deleted successfully.
     */
    namespace.delete('/:id', deleteStatusRules, createRouteHandler(methods.delete));

    root.use('/statuses', namespace);
  };
};

export const buildStatusHandler = (params: Params): IHandler => {
  const create = buildCreate(params);
  const list = buildList(params);
  const get = buildGet(params);
  const deleteStatus = buildDelete(params);

  return {
    registerRoutes: buildStatusRoutes({ create, list, get, delete: deleteStatus }),
  };
};
