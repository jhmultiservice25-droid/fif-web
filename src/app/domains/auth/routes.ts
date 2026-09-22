import { Routes } from '@angular/router';
import { AuthLayout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'choice',
        title: 'Choisir un profil',
        loadComponent: () => import('./features/account-choice/account-choice').then((c) => c.AuthAccountChoice)
      },
      {
        path: 'inscription/organisation',
        title: 'Inscription organisation',
        loadComponent: () => import('./features/register/register').then((c) => c.AuthRegister),
        data: { kind: 'organization' }
      },
      {
        path: 'inscription/innovateur',
        title: 'Inscription innovateur',
        loadComponent: () => import('./features/register/register').then((c) => c.AuthRegister),
        data: { kind: 'innovator' }
      },
      {
        path: 'connexion',
        title: 'Connexion',
        loadComponent: () => import('./features/sign-in/sign-in').then((c) => c.AuthSignIn)
      },
      {
        path: 'sign-in',
        redirectTo: 'connexion',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'choice',
        pathMatch: 'full'
      }
    ]
  }
];

export default routes;
