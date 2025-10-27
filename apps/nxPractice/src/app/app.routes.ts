import { Register } from './../../../../libs/auth/src/lib/components/register/register';
import { Login } from './../../../../libs/auth/src/lib/components/login/login';
import { BlankLayout } from './../../../../libs/ui/src/lib/layouts/blank-layout/blank-layout';
import { AuthLayout } from './../../../../libs/ui/src/lib/layouts/auth-layout/auth-layout';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, title: 'login' },
      { path: 'register', component: Register, title: 'register' },
    ],
  },
  { path: '', component: BlankLayout, children: [] },
];
