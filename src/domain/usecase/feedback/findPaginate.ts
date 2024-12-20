import { UseCaseParams } from '@/domain/usecase/types';
import { PaginatedResponse } from '@/adapter/repository/_common/cursor';
import { IFeedbackWithVotes } from '@/domain/entity/feedback';

export type ListParams = {
  filter?: {
    categoryIds?: string[];
    statusIds?: string[];
    search?: string;
  };
  sort?: {
    createdAt?: 'asc' | 'desc';
    voteCount?: 'asc' | 'desc';
  };
  paginate?: {
    cursor?: string;
    take?: number;
  };
};

export type FindPaginate = (
  params: ListParams,
) => Promise<PaginatedResponse<IFeedbackWithVotes> | never>;

export const buildFindPaginate = ({ adapter }: UseCaseParams): FindPaginate => {
  return async (params) => {
    const { meta, data } = await adapter.feedbackRepository.findPaginate(params);

    return {
      meta,
      data: data.map((feedback) => ({
        ...feedback,
        voteCount: feedback.upvotes ? feedback.upvotes.length : 0,
      })),
    };
  };
};
