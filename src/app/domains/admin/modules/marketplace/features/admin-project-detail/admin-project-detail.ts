import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { IAdminProjectDetail, IApiSuccess } from '@/app/shared/interfaces';

@Component({
  templateUrl: './admin-project-detail.html',
  imports: [MatButtonModule, MatCardModule, RouterLink]
})
export default class AdminProjectDetail {
  readonly id = input.required<string>();

  protected readonly projectResource = httpResource<IApiSuccess<IAdminProjectDetail>>(() =>
    `/admin/projects/${encodeURIComponent(this.id())}`
  );
}
