import { IUpvote } from '@/domain/entity/upvote';
import { InvalidDataError } from '@/domain/errors';

import { UseCaseParams } from '../types';

export type Create = (data: { userId: string; feedbackId: string }) => Promise<IUpvote | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({ userId, feedbackId }) => {
    const existingUpvote = await adapter.upvoteRepository.get({
      where: {
        userId: { equals: userId, mode: 'insensitive' },
        feedbackId: { equals: feedbackId },
      },
    });

    if (existingUpvote) {
      throw new InvalidDataError({
        code: 'UPVOTE_ALREADY_EXISTS',
      });
    }

    return adapter.upvoteRepository.create({
      data: { userId, feedbackId },
      select: { id: true, userId: true, feedbackId: true },
    });
  };
};
