import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@/app/domains/auth/data-access/auth.store';

export const organizationGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.user()) {
    return router.createUrlTree(['/auth/connexion'], { queryParams: { redirect: state.url } });
  }

  return authStore.isOrganization() ? true : router.parseUrl('/organisation/interdit');
};

export const innovatorGuard: CanActivateFn = (_route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.user()) {
    return router.createUrlTree(['/auth/connexion'], { queryParams: { redirect: state.url } });
  }

  return authStore.isInnovator() ? true : router.parseUrl('/innovateur/interdit');
};
