import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',

    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login').then((m) => m.Login),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register').then((m) => m.Register),
        title: 'register',
      },
    ],
  },
];
