import { findPaginate, PaginatedResponse } from '@/adapter/repository/_common/cursor';
import { IFeedback } from '@/domain/entity/feedback';
import { AdapterParams } from '@/adapter/types';

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

type Params = Pick<AdapterParams, 'db'>;

export type FindPaginate = (params: ListParams) => Promise<PaginatedResponse<IFeedback> | never>;

export const buildFindPaginate = ({ db }: Params): FindPaginate => {
  return async (params) => {
    const { filter = {}, sort = {}, paginate } = params;

    const where: any = {};

    if (filter.categoryIds) {
      where.categoryId = { in: filter.categoryIds };
    }
    if (filter.statusIds) {
      where.statusId = { in: filter.statusIds };
    }
    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = [];
    if (sort.voteCount) {
      orderBy.push({ upvotes: { _count: sort.voteCount } });
    }
    if (sort.createdAt) {
      orderBy.push({ createdAt: sort.createdAt });
    }

    return findPaginate({
      model: db.client.feedback,
      filter: {
        where,
        include: {
          upvotes: true,
          category: true,
          status: true,
        },
      },
      sort: orderBy,
      paginate,
    });
  };
};
