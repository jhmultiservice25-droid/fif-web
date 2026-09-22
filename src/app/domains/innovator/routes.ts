import { Routes } from '@angular/router';
import { innovatorGuard } from '@/app/core/guards';
import { InnovatorLayout } from './layout/layout';

const routes: Routes = [
  {
    path: 'interdit',
    title: 'Accès refusé',
    loadComponent: () => import('./features/forbidden/forbidden')
  },
  {
    path: '',
    component: InnovatorLayout,
    canActivate: [innovatorGuard],
    children: [
      { path: '', redirectTo: 'profil', pathMatch: 'full' },
      {
        path: 'profil',
        title: 'Profil innovateur',
        loadComponent: () => import('./features/profile/innovator-profile')
      },
      {
        path: 'projets',
        title: 'Projets',
        loadComponent: () => import('./features/projects/project-list')
      },
      {
        path: 'projets/nouveau',
        title: 'Nouveau projet',
        loadComponent: () => import('./features/projects/project-form')
      },
      {
        path: 'projets/:id',
        title: 'Modifier le projet',
        loadComponent: () => import('./features/projects/project-form')
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
