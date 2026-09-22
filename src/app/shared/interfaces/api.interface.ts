export interface IApiSuccess<T> {
  success: true;
  statusCode: number;
  data: T;
}

export interface IApiError {
  success: false;
  statusCode: number;
  message: string;
  errors?: string[];
}

export type IApiResponse<T> = IApiSuccess<T> | IApiError;

export interface IHealth {
  ok: boolean;
  service: string;
}

import { IUserRole } from './marketplace.interface';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: IUserRole;
}
