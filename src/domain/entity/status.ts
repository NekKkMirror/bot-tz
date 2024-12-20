import { Status } from '@prisma/client';

export interface IStatus extends Status {}

/**
 * @openapi
 * components:
 *   entities:
 *      Status:
 *          required:
 *            - id
 *            - created_at
 *          properties:
 *            id:
 *                type: string
 *            name:
 *                type: string
 */
