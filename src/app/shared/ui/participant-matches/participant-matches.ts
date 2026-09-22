import { httpResource } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IApiSuccess, IMatch } from '@/app/shared/interfaces';
import { ParticipantSharedStore } from '@/app/shared/data-access';
import { Message } from '@/app/shared/ui/app-message/app-message';

@Component({
  selector: 'participant-matches',
  templateUrl: './participant-matches.html',
  providers: [ParticipantSharedStore],
  imports: [MatButtonModule, MatCardModule, MatIconModule, Message]
})
export class ParticipantMatchesPanel {
  protected readonly store = inject(ParticipantSharedStore);
  protected readonly matchesResource = httpResource<IApiSuccess<IMatch[]>>(() => '/me/matches');

  constructor() {
    effect(() => {
      if (this.store.revision() > 0) {
        this.matchesResource.reload();
      }
    });
  }

  protected computeMatches(): void {
    this.store.computeMatches({ force: true });
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium' }).format(new Date(value));
  }
}
