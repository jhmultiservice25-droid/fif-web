export type IStaffNotificationType =
  | "APPLICATION_RECEIVED"
  | "STATUS_CHANGED";

export interface IStaffNotification {
  id: string;
  type: IStaffNotificationType;
  title: string;
  body: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface INotificationList {
  unread: number;
  items: IStaffNotification[];
}
