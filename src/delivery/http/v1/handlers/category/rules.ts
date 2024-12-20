import { check, query, param } from 'express-validator';

import { authRequired, validateSchema } from '../../middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *      createCategory:
 *          required:
 *             - name
 *          properties:
 *             name:
 *                type: string
 */
export const createCategoryRules = [
  check('name').exists().notEmpty().isString().withMessage('Name is required and must be a string'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      deleteCategory:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 */
export const deleteCategoryRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      getCategory:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 */
export const getCategoryRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      listCategories:
 *          properties:
 *             skip:
 *                type: integer
 *             take:
 *                type: integer
 *             name:
 *                type: string
 */
export const listCategoriesRules = [
  query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be a positive integer'),
  query('take')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Take must be a positive integer greater than 0'),
  query('name').optional().isString().withMessage('Name must be a string'),
  authRequired({}),
  validateSchema,
];
