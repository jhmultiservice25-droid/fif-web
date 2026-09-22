import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION, NavigationItem } from '@/app/domains/admin/layout/data/navigation';
import { Navigation } from '../navigation/navigation';
import { User } from '../user/user';

@Component({
  selector: 'sidebar',
  imports: [Navigation, User, RouterLink],
  host: {
    class: 'flex w-full flex-auto flex-col'
  },
  templateUrl: './sidebar.html'
})
export class Sidebar {
  readonly navigation = input<NavigationItem[]>(NAVIGATION);
}
