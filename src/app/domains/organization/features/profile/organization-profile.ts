import { httpResource } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IApiSuccess, IOrganizationProfile } from '@/app/shared/interfaces';
import { MarketplaceCatalogStore } from '@/app/shared/data-access';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { OrganizationStore } from '../../data-access';

@Component({
  templateUrl: './organization-profile.html',
  providers: [OrganizationStore],
  imports: [FormField, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, Message]
})
export default class OrganizationProfile implements OnInit {
  protected readonly store = inject(OrganizationStore);
  protected readonly catalogStore = inject(MarketplaceCatalogStore);

  protected readonly profileResource = httpResource<IApiSuccess<IOrganizationProfile>>(() => '/me/organization');

  protected readonly model = signal<IOrganizationProfile>({
    name: '',
    type: '',
    sector: '',
    city: '',
    contactName: '',
    contactTitle: '',
    phone: '',
    professionalEmail: ''
  });

  protected readonly profileForm = form(this.model, (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.type);
    required(schemaPath.sector);
    required(schemaPath.city);
    required(schemaPath.contactName);
    email(schemaPath.professionalEmail);
  });

  constructor() {
    effect(() => {
      if (this.profileResource.hasValue()) {
        this.model.set({ ...this.profileResource.value().data });
      }
    });

    let revision = 0;
    effect(() => {
      const currentRevision = this.store.revision();
      if (currentRevision > revision) {
        revision = currentRevision;
        this.profileResource.reload();
      }
    });
  }

  ngOnInit(): void {
    this.catalogStore.load().subscribe();
  }

  protected saveProfile(): void {
    submit(this.profileForm, async () => {
      this.store.saveProfile(this.model());
    });
  }
}
