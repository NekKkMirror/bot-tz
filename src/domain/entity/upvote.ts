import { Upvote, Feedback, User } from '@prisma/client';

export interface IUpvote extends Upvote {
  user?: User;
  feedback?: Feedback;
}

/**
 * @openapi
 * components:
 *   entities:
 *      Upvote:
 *          required:
 *            - id
 *            - userId
 *            - feedbackId
 *            - createdAt
 *          properties:
 *            id:
 *                type: string
 *            userId:
 *                type: string
 *            feedbackId:
 *                type: string
 *            user:
 *                $ref: '#/components/entities/User'
 *            feedback:
 *                $ref: '#/components/entities/Feedback'
 *            createdAt:
 *                type: string
 *                format: date
 */
