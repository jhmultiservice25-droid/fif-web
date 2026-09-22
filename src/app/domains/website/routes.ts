import { Routes } from '@angular/router';
import { WebLayout } from '@/app/domains/website/layout/layout';

const routes: Routes = [
  {
    path: '',
    component: WebLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/landing/routes')
      },
      {
        path: 'applications',
        loadChildren: () => import('./modules/applications/routes')
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

export default routes;
