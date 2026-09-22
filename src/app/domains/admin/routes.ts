import { Routes } from '@angular/router';
import { AdminLayout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        title: 'Admin',
        loadComponent: () => import('./modules/stats/features/stats')
      },
      {
        path: 'applications',
        title: 'Candidatures',
        loadComponent: () => import('./modules/applications/features/application-list/application-list')
      },
      {
        path: 'applications/:id',
        title: 'Détail de la candidature',
        loadComponent: () => import('./modules/applications/features/application-detail/application-detail')
      },
      {
        path: 'notifications',
        title: 'Notifications',
        loadComponent: () => import('./modules/notifications/features/notification-list/notification-list')
      },
      {
        path: 'besoins',
        title: 'Fiches de besoin',
        loadComponent: () => import('./modules/marketplace/features/admin-need-list/admin-need-list')
      },
      {
        path: 'besoins/:id',
        title: 'Détail fiche',
        loadComponent: () => import('./modules/marketplace/features/admin-need-detail/admin-need-detail')
      },
      {
        path: 'projets',
        title: 'Projets',
        loadComponent: () => import('./modules/marketplace/features/admin-project-list/admin-project-list')
      },
      {
        path: 'projets/:id',
        title: 'Détail projet',
        loadComponent: () => import('./modules/marketplace/features/admin-project-detail/admin-project-detail')
      },
      {
        path: 'matchs',
        title: 'Correspondances',
        loadComponent: () => import('./modules/marketplace/features/admin-match-list/admin-match-list')
      }
    ]
  }
];

export default routes;
