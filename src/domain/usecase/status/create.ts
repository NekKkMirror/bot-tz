import { IStatus } from '@/domain/entity/status';
import { InvalidDataError } from '@/domain/errors';

import { UseCaseParams } from '../types';

export type Create = (data: { name: string }) => Promise<IStatus | never>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({ name }) => {
    const existingStatus = await adapter.statusRepository.list({
      where: { name: { equals: name, mode: 'insensitive' } },
    });

    if (existingStatus.length > 0) {
      throw new InvalidDataError({
        code: 'STATUS_ALREADY_EXISTS',
      });
    }

    return adapter.statusRepository.create({
      data: { name },
      select: { id: true, name: true },
    });
  };
};
