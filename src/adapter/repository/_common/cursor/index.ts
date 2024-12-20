import { Prisma } from '@prisma/client';

type PaginationMeta = {
  direction: 1 | -1;
  nextCursor: string | null;
  pageSize: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

type FindPaginateArgs<M> = {
  model: any;
  filter?: Prisma.Args<M, 'findMany'>;
  paginate?: {
    cursor?: string;
    take?: number;
  };
  sort?: Prisma.Args<M, 'findMany'>['orderBy'];
};

export const findPaginate = async <M>(args: FindPaginateArgs<M>): Promise<PaginatedResponse<M>> => {
  const { model, filter = {}, paginate = {}, sort = { createdAt: 'desc' } } = args;
  const { cursor, take = 10 } = paginate;
  const pageSize = Math.abs(take);
  const direction = Math.sign(take) > 0 ? 1 : -1;
  const countFilter = { where: (filter as { where?: Prisma.FeedbackWhereInput }).where || {} };

  const [entitiesWithOverstep, total] = await Promise.all([
    model.findMany({
      ...filter,
      skip: cursor ? 1 : 0,
      take: (pageSize + 1) * direction,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: sort,
    }),
    model.count(countFilter),
  ]);

  const hasNext = entitiesWithOverstep.length === pageSize + 1;
  const data = hasNext ? entitiesWithOverstep.slice(0, -1) : entitiesWithOverstep;
  const nextCursor = hasNext ? (data[data.length - 1] as { id: string }).id : null;

  return {
    data,
    meta: {
      total,
      direction,
      pageSize,
      nextCursor,
    },
  };
};
