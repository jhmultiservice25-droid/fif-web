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
    path: 'participant',
    title: 'Inscription participant',
    loadComponent: () =>
      import('./features/participant-registration/participant-registration').then(
        (component) => component.ParticipantRegistration
      )
  },
  {
    path: 'badge',
    loadComponent: () =>
      import('./features/participant-badge/participant-badge').then((m) => m.ParticipantBadge)
  },
  {
    path: 'volunteer',
    title: 'Devenir volontaire',
    loadComponent: () =>
      import('./features/volunteer-application/volunteer-application').then(
        (component) => component.VolunteerApplication
      )
  },
  { path: '', pathMatch: 'full', redirectTo: 'participant' }
];

export default routes;
