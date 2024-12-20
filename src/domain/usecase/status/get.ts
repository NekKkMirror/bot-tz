import { IStatus } from '@/domain/entity/status';
import { NotFoundError } from '@/domain/errors';

import { UseCaseParams } from '../types';

export type Get = (data: { id: string }) => Promise<IStatus | never>;

export const buildGet = ({ service, adapter }: UseCaseParams): Get => {
  return async ({ id }) => {
    const isStatusExist = await service.status.checkStatus({ id });

    if (!isStatusExist) {
      throw new NotFoundError({
        code: 'STATUS_NOT_FOUND',
      });
    }

    const status = await adapter.statusRepository.get({
      where: { id },
      select: { id: true, name: true },
    });

    return status as IStatus;
  };
};
