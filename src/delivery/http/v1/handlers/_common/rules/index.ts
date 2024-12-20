import { param } from 'express-validator';

/**
 * General rules for pagination
 * Includes:
 * - sortDirection: "asc" or "desc"
 * - cursor: string
 * - take: positive integer
 */
export const paginationRules = [
  param('sortDirection')
    .optional()
    .isString()
    .isIn(['asc', 'desc'])
    .withMessage('Sort direction must be "asc" or "desc"'),
  param('cursor').optional().isString().withMessage('Cursor must be a string'),
  param('take').optional().isInt({ min: 1 }).withMessage('Take must be a positive integer'),
];
