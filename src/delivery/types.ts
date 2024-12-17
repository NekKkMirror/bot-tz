import Express from 'express';

import { Adapter } from '@/domain/types';
import { UseCase } from '@/domain/usecase';

export type DeliveryParams = UseCase & Adapter;

export interface IUserRequest extends Express.Request {
  user?: {
    id?: string;
  };
}
