import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { IAdminNeedDetail, IApiSuccess } from '@/app/shared/interfaces';

@Component({
  templateUrl: './admin-need-detail.html',
  imports: [JsonPipe, MatButtonModule, MatCardModule, RouterLink]
})
export default class AdminNeedDetail {
  readonly id = input.required<string>();

  protected readonly needResource = httpResource<IApiSuccess<IAdminNeedDetail>>(() =>
    `/admin/needs/${encodeURIComponent(this.id())}`
  );
}
