import { httpResource } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IApiSuccess, IParticipantNotificationList } from '@/app/shared/interfaces';
import { ParticipantSharedStore } from '@/app/shared/data-access';
import { Message } from '@/app/shared/ui/app-message/app-message';

@Component({
  selector: 'participant-notifications',
  templateUrl: './participant-notifications.html',
  providers: [ParticipantSharedStore],
  imports: [MatButtonModule, MatCardModule, Message]
})
export class ParticipantNotificationsPanel {
  protected readonly store = inject(ParticipantSharedStore);
  protected readonly notificationsResource = httpResource<IApiSuccess<IParticipantNotificationList>>(
    () => '/me/notifications?limit=30'
  );

  constructor() {
    effect(() => {
      if (this.store.revision() > 0) {
        this.notificationsResource.reload();
      }
    });
  }

  protected markRead(id: string, readAt: string | null): void {
    if (!readAt) {
      this.store.markNotificationRead(id);
    }
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  }
}
