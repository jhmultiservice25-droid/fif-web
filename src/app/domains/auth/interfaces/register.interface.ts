export type IRegisterKind = 'organization' | 'innovator';

export interface IRegisterRequestState {
  isLoading: boolean;
  error: string;
}

export type { IRegisterPayload, IRegisterResponse } from '@/app/shared/interfaces';
