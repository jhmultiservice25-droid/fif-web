import { httpResource } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IApiSuccess, INotificationList, IStaffNotification } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { NotificationStore } from '../../data-access';

@Component({
  templateUrl: './notification-list.html',
  providers: [NotificationStore],
  imports: [MatButtonModule, MatCardModule, MatIconModule, Message, RouterLink]
})
export default class NotificationList {
  protected readonly store = inject(NotificationStore);
  protected readonly notificationsResource = httpResource<IApiSuccess<INotificationList>>(
    () => '/admin/notifications?limit=30'
  );

  constructor() {
    let revision = 0;
    effect(() => {
      const currentRevision = this.store.revision();
      if (currentRevision > revision) {
        revision = currentRevision;
        this.notificationsResource.reload();
      }
    });
  }

  protected notificationRoute(notification: IStaffNotification): string | null {
    if (!notification.href) return null;
    return notification.href.startsWith('/admin') ? notification.href : `/admin${notification.href}`;
  }

  protected markRead(notification: IStaffNotification): void {
    if (!notification.readAt) this.store.markRead(notification.id);
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  }
}
