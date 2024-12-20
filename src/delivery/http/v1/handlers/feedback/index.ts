import Express from 'express';

import { DeliveryParams } from '@/delivery/types';

import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';

import { buildCreate, Create } from './create';
import { buildGet, Get } from './get';
import { buildDelete, Delete } from './delete';
import { buildFindPaginate, FindPaginate } from './findPaginate';
import { buildUpdate, Update } from './update';
import {
  createFeedbackRules,
  deleteFeedbackRules,
  getFeedbackRules,
  findPaginateFeedbackRules,
  updateFeedbackRules,
} from './rules';

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: Create;
  findPaginate: FindPaginate;
  get: Get;
  delete: Delete;
  update: Update;
};

const buildFeedbackRoutes = (methods: FeedbackMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /feedbacks:
     *   post:
     *     tags: [Feedback]
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
     *             $ref: '#/components/rules/createFeedback'
     *     responses:
     *        201:
     *           description: Created feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Feedback'
     */
    namespace.post('/', createFeedbackRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /feedbacks:
     *   get:
     *     tags: [Feedback]
     *     security:
     *       - bearerAuth: []
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: query
     *         name: categoryIds
     *         schema:
     *           type: array
     *           items:
     *             type: string
     *         description: List of category IDs for filtering
     *       - in: query
     *         name: statusIds
     *         schema:
     *           type: array
     *           items:
     *             type: string
     *         description: List of status IDs for filtering
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term
     *       - in: query
     *         name: sortBy
     *         schema:
     *           type: string
     *         description: Sorting field (e.g., "createdAt", "voteCount")
     *       - in: query
     *         name: sortDirection
     *         schema:
     *           type: string
     *           enum: [asc, desc]
     *         description: Sorting direction
     *       - in: query
     *         name: cursor
     *         schema:
     *           type: string
     *         description: Pagination cursor
     *       - in: query
     *         name: take
     *         schema:
     *           type: integer
     *         description: Number of feedbacks to fetch
     *     responses:
     *        200:
     *           description: Paginated list of feedbacks.
     *           content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/entities/Feedback'
     */
    namespace.get('/', findPaginateFeedbackRules, createRouteHandler(methods.findPaginate));

    /**
     * @openapi
     * /feedbacks/{id}:
     *   get:
     *     tags: [Feedback]
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
     *         description: Feedback ID
     *     responses:
     *        200:
     *           description: The requested feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Feedback'
     */
    namespace.get('/:id', getFeedbackRules, createRouteHandler(methods.get));

    /**
     * @openapi
     * /feedbacks/{id}:
     *   delete:
     *     tags: [Feedback]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Feedback ID
     *     responses:
     *        204:
     *           description: The feedback was deleted successfully.
     */
    namespace.delete('/:id', deleteFeedbackRules, createRouteHandler(methods.delete));

    /**
     * @openapi
     * /feedbacks/{id}:
     *   patch:
     *     tags: [Feedback]
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
     *         description: Feedback ID
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/updateFeedback'
     *     responses:
     *        200:
     *           description: The updated feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Feedback'
     */
    namespace.patch('/:id', updateFeedbackRules, createRouteHandler(methods.update));

    root.use('/feedbacks', namespace);
  };
};

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreate(params);
  const findPaginate = buildFindPaginate(params);
  const get = buildGet(params);
  const deleteFeedback = buildDelete(params);
  const update = buildUpdate(params);

  return {
    registerRoutes: buildFeedbackRoutes({
      create,
      findPaginate,
      get,
      delete: deleteFeedback,
      update,
    }),
  };
};
