import { check, param } from 'express-validator';

import { paginationRules } from '@/delivery/http/v1/handlers/_common/rules';

import { validateSchema } from '../../middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *      createFeedback:
 *          required:
 *             - title
 *             - description
 *             - authorId
 *          properties:
 *             title:
 *                type: string
 *             description:
 *                type: string
 *             authorId:
 *                type: string
 *             categoryId:
 *                type: string
 *             statusId:
 *                type: string
 */
export const createFeedbackRules = [
  check('title')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Title is required and must be a string'),
  check('description')
    .exists()
    .notEmpty()
    .isString()
    .withMessage('Description is required and must be a string'),
  check('authorId').exists().notEmpty().isUUID().withMessage('Author ID must be a valid UUID'),
  check('categoryId').optional().isUUID().withMessage('Category ID must be a valid UUID'),
  check('statusId').optional().isUUID().withMessage('Status ID must be a valid UUID'),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      deleteFeedback:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 */
export const deleteFeedbackRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      getFeedback:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 */
export const getFeedbackRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      listFeedback:
 *          properties:
 *             categoryId:
 *                type: string
 *             statusId:
 *                type: string
 *             search:
 *                type: string
 *             sortBy:
 *                type: string
 */
export const findPaginateFeedbackRules = [
  param('categoryId').optional().isUUID().withMessage('Category ID must be a valid UUID'),
  param('statusId').optional().isUUID().withMessage('Status ID must be a valid UUID'),
  param('search').optional().isString().withMessage('Search must be a string'),
  param('sortBy')
    .optional()
    .isString()
    .isIn(['createdAt', 'voteCount'])
    .withMessage('Invalid sortBy field'),
  ...paginationRules,
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *      updateFeedback:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 *             title:
 *                type: string
 *             description:
 *                type: string
 *             categoryId:
 *                type: string
 *             statusId:
 *                type: string
 */
export const updateFeedbackRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  check('title').optional().notEmpty().isString().withMessage('Title must be a string'),
  check('description').optional().notEmpty().isString().withMessage('Description must be a string'),
  check('categoryId').optional().isUUID().withMessage('Category ID must be a valid UUID'),
  check('statusId').optional().isUUID().withMessage('Status ID must be a valid UUID'),
  validateSchema,
];
