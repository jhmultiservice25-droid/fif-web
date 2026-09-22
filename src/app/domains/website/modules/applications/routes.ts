import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'committee',
    title: 'Candidature comité',
    loadComponent: () =>
      import('./features/committee-application/committee-application').then(
        (component) => component.CommitteeApplication
      )
  },
  {
    path: 'volunteer',
    title: 'Devenir volontaire',
    loadComponent: () =>
      import('./features/volunteer-application/volunteer-application').then(
        (component) => component.VolunteerApplication
      )
  },
  { path: '', pathMatch: 'full', redirectTo: 'volunteer' }
];

export default routes;
