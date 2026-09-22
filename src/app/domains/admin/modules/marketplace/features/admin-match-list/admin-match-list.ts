import { httpResource } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IAdminMatch, IApiSuccess } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { AdminMarketplaceStore } from '../../data-access';

@Component({
  templateUrl: './admin-match-list.html',
  providers: [AdminMarketplaceStore],
  imports: [MatButtonModule, MatCardModule, Message]
})
export default class AdminMatchList {
  protected readonly store = inject(AdminMarketplaceStore);
  protected readonly matchesResource = httpResource<IApiSuccess<IAdminMatch[]>>(() => '/admin/matches');

  constructor() {
    effect(() => {
      if (this.store.revision() > 0) {
        this.matchesResource.reload();
      }
    });
  }

  protected computeAll(): void {
    this.store.computeMatches({ force: true });
  }
}
