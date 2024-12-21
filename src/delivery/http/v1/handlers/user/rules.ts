import { check, param } from 'express-validator';

import { authRequired, validateSchema } from '@/delivery/http/v1/middlewares';

/**
 * @openapi
 * components:
 *   rules:
 *      updateUser:
 *          properties:
 *             email:
 *                type: string
 */
export const updateUserRules = [
  param('id').exists().notEmpty().isUUID().withMessage('ID must be a valid UUID'),
  check('email').optional().notEmpty().isEmail().withMessage('Title email must be a valid'),
  authRequired({}),
  validateSchema,
];

export * from './avatar/rules';
