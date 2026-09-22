import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { IAdminListPage, IAdminNeedListItem, IApiSuccess } from '@/app/shared/interfaces';

@Component({
  templateUrl: './admin-need-list.html',
  imports: [MatButtonModule, MatCardModule, MatPaginatorModule, MatTableModule, RouterLink]
})
export default class AdminNeedList {
  protected readonly page = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly displayedColumns = ['organization', 'challenge', 'status', 'consent', 'updatedAt', 'actions'];

  protected readonly needsResource = httpResource<IApiSuccess<IAdminListPage<IAdminNeedListItem>>>(() => {
    return `/admin/needs?page=${this.page()}&pageSize=${this.pageSize()}`;
  });

  protected readonly needs = computed(() =>
    this.needsResource.hasValue() ? this.needsResource.value().data.items : []
  );

  protected readonly total = computed(() =>
    this.needsResource.hasValue() ? this.needsResource.value().data.total : 0
  );

  protected changePage(event: PageEvent): void {
    this.page.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
  }

  protected formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-CD', { dateStyle: 'medium' }).format(new Date(value));
  }
}
