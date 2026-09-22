import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {
  IApiSuccess,
  IApplicationKind,
  IApplicationListPage,
  IApplicationListQuery,
  IApplicationStatus,
  IPoleWithJobs,
  IVolunteerTeamId
} from '@/app/shared/interfaces';
import { VOLUNTEER_TEAMS } from '@/app/domains/website/modules/applications/helpers/application-options';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { ApplicationAdminStore } from '../../data-access';
import { ALL_STATUS_OPTIONS, APPLICATION_KIND_OPTIONS, STATUS_LABELS } from '../../data';
import { buildApplicationUrl } from '../../helpers';
import { IApplicationFilterModel } from '../../interfaces';

@Component({
  templateUrl: './application-list.html',
  providers: [ApplicationAdminStore],
  imports: [
    FormField,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    Message,
    RouterLink
  ]
})
export default class ApplicationList {
  protected readonly store = inject(ApplicationAdminStore);

  protected readonly filterModel = signal<IApplicationFilterModel>({
    q: '',
    kind: '',
    status: '',
    poleId: '',
    jobId: '',
    teamId: ''
  });
  protected readonly filterForm = form(this.filterModel);
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly displayedColumns = ['applicant', 'kind', 'choice', 'status', 'createdAt', 'actions'];
  protected readonly kindOptions = APPLICATION_KIND_OPTIONS;
  protected readonly statusOptions = ALL_STATUS_OPTIONS;
  protected readonly teamOptions = VOLUNTEER_TEAMS;

  protected readonly applicationQuery = computed<IApplicationListQuery>(() => {
    const filters = this.filterModel();
    return {
      kind: filters.kind ? (filters.kind as IApplicationKind) : undefined,
      q: filters.q || undefined,
      status: filters.status ? (filters.status as IApplicationStatus) : undefined,
      poleId: filters.poleId || undefined,
      jobId: filters.jobId || undefined,
      teamId: filters.teamId ? (filters.teamId as IVolunteerTeamId) : undefined,
      page: this.page(),
      pageSize: this.pageSize()
    };
  });
  protected readonly applicationsResource = httpResource<IApiSuccess<IApplicationListPage>>(() =>
    buildApplicationUrl(this.applicationQuery())
  );
  protected readonly polesResource = httpResource<IApiSuccess<IPoleWithJobs[]>>(() => '/poles');
  protected readonly poles = computed(() => (this.polesResource.hasValue() ? this.polesResource.value().data : []));
  protected readonly jobs = computed(() => {
    const poleId = this.filterModel().poleId;
    return this.poles()
      .filter((pole) => !poleId || pole.id === poleId)
      .flatMap((pole) => pole.jobs);
  });
  protected readonly applications = computed(() =>
    this.applicationsResource.hasValue() ? this.applicationsResource.value().data : null
  );

  protected resetPage(): void {
    this.page.set(1);
  }

  protected changePole(): void {
    this.filterModel.update((filters) => ({ ...filters, jobId: '' }));
    this.resetPage();
  }

  protected changePage(event: PageEvent): void {
    this.page.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

  protected exportCsv(): void {
    this.store.exportCsv(this.applicationQuery());
  }

  protected kindLabel(kind: IApplicationKind): string {
    return kind === 'COMMITTEE' ? 'Comité' : 'Volontaire';
  }

  protected statusLabel(status: IApplicationStatus): string {
    return STATUS_LABELS[status];
  }

  protected formatDate(value: string): string {
    const date = new Date(value);
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }
}
