import Express from 'express';

import { DeliveryParams } from '@/delivery/types';

import { createRouteHandler } from '../../routeHandler';
import { IHandler } from '../types';

import { buildGet, Get } from './get';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildList, List } from './list';
import {
  createCategoryRules,
  deleteCategoryRules,
  getCategoryRules,
  listCategoriesRules,
} from './rules';

type Params = Pick<DeliveryParams, 'category'>;

export type CategoryMethods = {
  create: Create;
  list: List;
  get: Get;
  delete: Delete;
};

const buildCategoryRoutes = (methods: CategoryMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router();

    /**
     * @openapi
     * /categories:
     *   post:
     *     tags: [Category]
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/createCategory'
     *     responses:
     *        201:
     *           description: Created category.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Category'
     */
    namespace.post('/', createCategoryRules, createRouteHandler(methods.create));

    /**
     * @openapi
     * /categories:
     *   get:
     *     tags: [Category]
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
     *           description: FindPaginate of categories.
     *           content:
     *              application/json:
     *                schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/entities/Category'
     */
    namespace.get('/', listCategoriesRules, createRouteHandler(methods.list));

    /**
     * @openapi
     * /categories/{id}:
     *   get:
     *     tags: [Category]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Category ID
     *     responses:
     *        200:
     *           description: The requested category.
     *           content:
     *              application/json:
     *                schema:
     *                  $ref: '#/components/entities/Category'
     */
    namespace.get('/:id', getCategoryRules, createRouteHandler(methods.get));

    /**
     * @openapi
     * /categories/{id}:
     *   delete:
     *     tags: [Category]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Category ID
     *     responses:
     *        204:
     *           description: The category was deleted successfully.
     */
    namespace.delete('/:id', deleteCategoryRules, createRouteHandler(methods.delete));

    root.use('/categories', namespace);
  };
};

export const buildCategoryHandler = (params: Params): IHandler => {
  const create = buildCreate(params);
  const list = buildList(params);
  const get = buildGet(params);
  const deleteCategory = buildDelete(params);

  return {
    registerRoutes: buildCategoryRoutes({ create, list, get, delete: deleteCategory }),
  };
};
