import { isLogginGuard } from './../../../../libs/shared/src/lib/guards/is-loggin-guard';
import { authGuard } from './../../../../libs/shared/src/lib/guards/auth-guard';
import { Route } from '@angular/router';
import { isLogginGuard } from '@org/guards';
import { authGuard } from '@org/guards';
export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [isLogginGuard],
    loadChildren: () => import('@org/auth').then((m) => m.authRoutes),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('@org/home').then((m) => m.homeRoutes),
  },
];
