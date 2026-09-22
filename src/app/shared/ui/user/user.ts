import { AuthStore } from '@/app/domains/auth/data-access';
import { Component, computed, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'user',
  imports: [MatDivider, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './user.html'
})
export class User {
  authStore = inject(AuthStore);

  readonly roleLabel = input('Utilisateur FIF');

  user = computed(() => this.authStore.user());

  // avatarImageUrl = computed(() => {
  //   return this.user()?.profile
  //     ? `${environment.apiUrl}/uploads/profiles/${this.user()?.profile}`
  //     : '/images/avatar.webp';
  // });

  signOut(): void {
    this.authStore.signOut();
  }
}
