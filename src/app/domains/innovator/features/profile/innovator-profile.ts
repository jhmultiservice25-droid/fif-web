import { httpResource } from '@angular/common/http';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IApiSuccess, IInnovatorProfile } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { InnovatorStore } from '../../data-access';

@Component({
  templateUrl: './innovator-profile.html',
  providers: [InnovatorStore],
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, Message]
})
export default class InnovatorProfile implements OnInit {
  protected readonly store = inject(InnovatorStore);

  protected readonly profileResource = httpResource<IApiSuccess<IInnovatorProfile>>(() => '/me/innovator');

  protected readonly model = signal({
    displayName: '',
    organization: '',
    city: '',
    phone: '',
    email: ''
  });

  protected readonly profileForm = form(this.model, (schemaPath) => {
    required(schemaPath.displayName);
    required(schemaPath.city);
    email(schemaPath.email);
  });

  constructor() {
    effect(() => {
      if (this.profileResource.hasValue()) {
        const profile = this.profileResource.value().data;
        this.model.set({
          displayName: profile.displayName,
          organization: profile.organization ?? '',
          city: profile.city,
          phone: profile.phone,
          email: profile.email
        });
      }
    });

    let revision = 0;
    effect(() => {
      if (this.store.revision() > revision) {
        revision = this.store.revision();
        this.profileResource.reload();
      }
    });
  }

  ngOnInit(): void {
    this.store.clearError();
  }

  protected saveProfile(): void {
    submit(this.profileForm, async () => {
      const value = this.model();
      this.store.saveProfile({
        ...value,
        organization: value.organization.trim() ? value.organization.trim() : null
      });
    });
  }
}
