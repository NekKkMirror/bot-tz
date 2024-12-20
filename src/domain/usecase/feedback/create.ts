import { IFeedback } from '@/domain/entity/feedback';
import { InvalidDataError } from '@/domain/errors';
import { feedbackSelect } from '@/domain/usecase/feedback/selects';

import { UseCaseParams } from '../types';

export type Create = (data: {
  title: string;
  description: string;
  authorId: string;
  categoryId?: string;
  statusId?: string;
}) => Promise<IFeedback | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async (payload) => {
    const existingFeedback = await adapter.feedbackRepository.list({
      where: { title: { equals: payload.title, mode: 'insensitive' } },
    });

    if (existingFeedback.length > 0) {
      throw new InvalidDataError({
        code: 'FEEDBACK_ALREADY_EXISTS',
        message: 'Feedback with this title already exists.',
      });
    }

    return adapter.feedbackRepository.create({
      data: payload,
      select: feedbackSelect,
    });
  };
};
