import { check, param } from 'express-validator';

import { validateSchema } from '../../middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *     createUpvote:
 *       required:
 *         - userId
 *         - feedbackId
 *       properties:
 *         userId:
 *           type: string
 *         feedbackId:
 *           type: string
 */
export const createUpvoteRules = [
  check('userId').exists().notEmpty().isUUID().withMessage('User ID must be a valid UUID'),
  check('feedbackId').exists().notEmpty().isUUID().withMessage('Feedback ID must be a valid UUID'),
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
  validateSchema,
];
