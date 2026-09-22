import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@/app/domains/auth/data-access/auth.store';

export const unauthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const user = authStore.user();
  if (!user) {
    return true;
  }

  return router.parseUrl(authStore.homeRoute());
};
