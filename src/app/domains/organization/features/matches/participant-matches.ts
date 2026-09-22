import { Component } from '@angular/core';
import { ParticipantMatchesPanel } from '@/app/shared/ui/participant-matches/participant-matches';

@Component({
  template: '<participant-matches />',
  imports: [ParticipantMatchesPanel]
})
export default class OrganizationMatches {}
