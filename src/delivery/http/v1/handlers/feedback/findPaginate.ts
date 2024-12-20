import { Response, Request } from 'express';

import { DeliveryParams } from '@/delivery/types';

import { PaginationParams } from '../_common/types';

type Params = Pick<DeliveryParams, 'feedback'>;
type QueryParams = {
  categoryIds?: string[] | string;
  statusIds?: string[] | string;
  search?: string;
} & PaginationParams;
export type FindPaginate = (req: Request, res: Response) => Promise<Response>;

export const buildFindPaginate = ({ feedback }: Params): FindPaginate => {
  return async (req, res) => {
    const { categoryIds, statusIds, search, sortBy, sortDirection, cursor, take } =
      req.query as QueryParams;
    const feedbacks = await feedback.findPaginate({
      filter: {
        categoryIds: Array.isArray(categoryIds)
          ? categoryIds
          : categoryIds
            ? [categoryIds]
            : undefined,
        statusIds: Array.isArray(statusIds) ? statusIds : statusIds ? [statusIds] : undefined,
        search,
      },
      sort: {
        [sortBy || 'createdAt']: sortDirection || 'asc',
      },
      paginate: {
        cursor,
        take: take ? Number(take) : undefined,
      },
    });

    return res.status(200).json(feedbacks);
  };
};
