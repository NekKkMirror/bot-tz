import { Adapter } from '@/domain/types';

import { buildCheckUpvote, CheckUpvote } from './checkUpvote';

export type UpvoteService = {
  checkUpvote: CheckUpvote;
};

export const buildUpvoteService = (params: Adapter): UpvoteService => {
  const checkUpvote = buildCheckUpvote(params);

  return {
    checkUpvote,
  };
};
