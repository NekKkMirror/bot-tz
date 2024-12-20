import { Category } from '@prisma/client';

export interface ICategory extends Category {}

/**
 * @openapi
 * components:
 *   entities:
 *      Category:
 *          required:
 *            - id
 *            - created_at
 *          properties:
 *            id:
 *                type: string
 *            name:
 *                type: string
 */
