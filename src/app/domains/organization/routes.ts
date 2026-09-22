import { Routes } from '@angular/router';
import { organizationGuard } from '@/app/core/guards';
import { OrganizationLayout } from './layout/layout';

const routes: Routes = [
  {
    path: 'interdit',
    title: 'Accès refusé',
    loadComponent: () => import('./features/forbidden/forbidden')
  },
  {
    path: '',
    component: OrganizationLayout,
    canActivate: [organizationGuard],
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      {
        path: 'profil',
        title: 'Profil organisation',
        loadComponent: () => import('./features/profile/organization-profile')
      },
      {
        path: 'fiches',
        title: 'Fiches de besoin',
        loadComponent: () => import('./features/needs/need-list')
      },
      {
        path: 'fiches/nouveau',
        title: 'Nouvelle fiche',
        loadComponent: () => import('./features/needs/need-form')
      },
      {
        path: 'fiches/:id',
        title: 'Modifier la fiche',
        loadComponent: () => import('./features/needs/need-form')
      },
      {
        path: 'correspondances',
        title: 'Correspondances',
        loadComponent: () => import('./features/matches/participant-matches')
      },
      {
        path: 'notifications',
        title: 'Notifications',
        loadComponent: () => import('./features/notifications/participant-notifications')
      }
    ]
  }
];

export default routes;
