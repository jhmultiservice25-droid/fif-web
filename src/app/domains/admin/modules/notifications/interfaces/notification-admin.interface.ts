import { INotificationList } from '@/app/shared/interfaces';

export interface INotificationMutationState {
  isUpdating: boolean;
  error: string;
  notifications: INotificationList | null;
  revision: number;
}
