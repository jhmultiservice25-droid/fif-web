export interface IParticipantNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface IParticipantNotificationList {
  unread: number;
  items: IParticipantNotification[];
}
