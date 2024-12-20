import { check, param } from 'express-validator';

import { authRequired, validateSchema } from '../../middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *     createUpvote:
 *       required:
 *         - feedbackId
 *       properties:
 *         feedbackId:
 *           type: string
 */
export const createUpvoteRules = [
  check('feedbackId').exists().notEmpty().isUUID().withMessage('Feedback ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];

/**
 * @openapi
 * components:
 *   rules:
 *     deleteUpvote:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 */
export const deleteUpvoteRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];
