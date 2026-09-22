import { httpResource } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormField, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { IApiSuccess, IApplicationDetail, IApplicationStatus, IPatchApplicationInput } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { VOLUNTEER_TEAMS } from '@/app/domains/website/modules/applications/helpers/application-options';
import { ApplicationAdminStore } from '../../data-access';
import { COMMITTEE_STATUS_OPTIONS, STATUS_LABELS, VOLUNTEER_STATUS_OPTIONS } from '../../data';
import { IApplicationUpdateModel } from '../../interfaces';

@Component({
  templateUrl: './application-detail.html',
  providers: [ApplicationAdminStore],
  imports: [
    FormField,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    Message,
    RouterLink
  ]
})
export default class ApplicationDetail {
  readonly id = input.required<string>();
  protected readonly store = inject(ApplicationAdminStore);
  private initializedId = '';

  protected readonly applicationResource = httpResource<IApiSuccess<IApplicationDetail>>(
    () => `/admin/applications/${encodeURIComponent(this.id())}`
  );
  protected readonly application = computed(() =>
    this.applicationResource.hasValue() ? this.applicationResource.value().data : null
  );
  protected readonly updateModel = signal<IApplicationUpdateModel>({
    status: '',
    assignmentTeamId: '',
    assignmentZone: '',
    assignmentLead: '',
    assignmentShift: ''
  });
  protected readonly updateForm = form(this.updateModel);
  protected readonly statusOptions = computed(() =>
    this.application()?.kind === 'COMMITTEE' ? COMMITTEE_STATUS_OPTIONS : VOLUNTEER_STATUS_OPTIONS
  );
  protected readonly teamOptions = VOLUNTEER_TEAMS;

  constructor() {
    effect(() => {
      const application = this.application();
      if (!application || this.initializedId === application.id) return;

      this.initializedId = application.id;
      this.updateModel.set({
        status: application.status,
        assignmentTeamId: application.kind === 'VOLUNTEER' ? (application.assignmentTeamId ?? '') : '',
        assignmentZone: application.kind === 'VOLUNTEER' ? (application.assignmentZone ?? '') : '',
        assignmentLead: application.kind === 'VOLUNTEER' ? (application.assignmentLead ?? '') : '',
        assignmentShift: application.kind === 'VOLUNTEER' ? (application.assignmentShift ?? '') : ''
      });
    });

    let revision = 0;
    effect(() => {
      const currentRevision = this.store.revision();
      if (currentRevision > revision) {
        revision = currentRevision;
        this.initializedId = '';
        this.applicationResource.reload();
      }
    });
  }

  protected save(): void {
    submit(this.updateForm, async () => {
      const application = this.application();
      if (!application) return;

      const value = this.updateModel();
      const payload: IPatchApplicationInput = { status: value.status as IApplicationStatus };

      if (application.kind === 'VOLUNTEER') {
        if (value.assignmentTeamId) payload.assignmentTeamId = value.assignmentTeamId;
        if (value.assignmentZone.trim()) payload.assignmentZone = value.assignmentZone.trim();
        if (value.assignmentLead.trim()) payload.assignmentLead = value.assignmentLead.trim();
        if (value.assignmentShift.trim()) payload.assignmentShift = value.assignmentShift.trim();
      }

      this.store.update({ id: application.id, payload });
    });
  }

  protected statusLabel(status: IApplicationStatus): string {
    return STATUS_LABELS[status];
  }

  protected formatDate(value: string, dateOnly = false): string {
    const options: Intl.DateTimeFormatOptions = dateOnly
      ? { dateStyle: 'long' }
      : { dateStyle: 'medium', timeStyle: 'short' };
    return new Intl.DateTimeFormat('fr-CD', options).format(new Date(value));
  }
}
