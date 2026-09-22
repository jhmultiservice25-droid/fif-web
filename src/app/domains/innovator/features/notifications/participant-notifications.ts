import { Component } from '@angular/core';
import { ParticipantNotificationsPanel } from '@/app/shared/ui/participant-notifications/participant-notifications';

@Component({
  template: '<participant-notifications />',
  imports: [ParticipantNotificationsPanel]
})
export default class InnovatorNotifications {}
