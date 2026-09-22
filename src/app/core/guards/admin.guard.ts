import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@/app/domains/auth/data-access/auth.store';

export const adminGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.user() && authStore.hasRights()
    ? true
    : router.createUrlTree(['/auth/connexion'], { queryParams: { redirect: state.url } });
};
