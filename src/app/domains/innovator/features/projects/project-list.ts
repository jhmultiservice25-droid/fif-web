import { httpResource } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IApiSuccess, IProject } from '@/app/shared/interfaces';
import { catalogLabel } from '@/app/shared/helpers';
import { MarketplaceCatalogStore } from '@/app/shared/data-access';

@Component({
  templateUrl: './project-list.html',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink]
})
export default class ProjectList implements OnInit {
  protected readonly catalogStore = inject(MarketplaceCatalogStore);
  protected readonly projectsResource = httpResource<IApiSuccess<IProject[]>>(() => '/me/projects');

  ngOnInit(): void {
    this.catalogStore.load().subscribe();
  }

  protected statusLabel(status: string): string {
    return catalogLabel(this.catalogStore.recordStatuses(), status);
  }

  protected consentLabel(consent: string): string {
    return catalogLabel(this.catalogStore.publicationConsents(), consent);
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium' }).format(new Date(value));
  }
}
