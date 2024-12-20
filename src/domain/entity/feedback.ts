import { Feedback, Upvote, Category, Status } from '@prisma/client';

export interface IFeedback extends Feedback {
  upvotes?: Upvote[];
  category?: Category | null;
  status?: Status | null;
}

export interface IFeedbackWithVotes extends IFeedback {
  voteCount: number;
}

/**
 * @openapi
 * components:
 *   entities:
 *      Feedback:
 *          required:
 *            - id
 *            - title
 *            - description
 *            - authorId
 *            - createdAt
 *            - updatedAt
 *          properties:
 *            id:
 *                type: string
 *            title:
 *                type: string
 *            description:
 *                type: string
 *            categoryId:
 *                type: string
 *                nullable: true
 *            category:
 *                $ref: '#/components/entities/Category'
 *            statusId:
 *                type: string
 *                nullable: true
 *            status:
 *                $ref: '#/components/entities/Status'
 *            authorId:
 *                type: string
 *            createdAt:
 *                type: string
 *                format: date
 *            updatedAt:
 *                type: string
 *                format: date
 *            voteCount:
 *                type: number
 */
