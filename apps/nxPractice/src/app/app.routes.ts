import { Route } from '@angular/router';
import { authGuard, isLogginGuard } from '@org/guards';

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
  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () => import('@org/cart').then((m) => m.cartRoutes),
  },
];
