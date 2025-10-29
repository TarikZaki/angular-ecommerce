import { Route } from '@angular/router';
export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@org/auth').then((m) => m.authRoutes),
  },
];
