import { check, query, param } from 'express-validator';

import { authRequired, validateSchema } from '../../middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *      createStatus:
 *          required:
 *             - name
 *          properties:
 *             name:
 *                type: string
 */
export const createStatusRules = [
  check('name').exists().notEmpty().isString().withMessage('Name is required and must be a string'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      deleteStatus:
 *        description: Authorization is required to access this resource.
 */
export const deleteStatusRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      getStatus:
 *        description: Authorization is required to access this resource.
 */
export const getStatusRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      listStatuses:
 *          properties:
 *             skip:
 *                type: integer
 *             take:
 *                type: integer
 *             name:
 *                type: string
 */
export const listStatusesRules = [
  query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be a positive integer'),
  query('take')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Take must be a positive integer greater than 0'),
  query('name').optional().isString().withMessage('Name must be a string'),
  authRequired({}),
  validateSchema,
];
