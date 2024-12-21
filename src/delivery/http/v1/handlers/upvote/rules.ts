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
 *      deleteUpvote:
 *        description: Authorization is required to access this resource.
 */
export const deleteUpvoteRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  authRequired({}),
  validateSchema,
];
