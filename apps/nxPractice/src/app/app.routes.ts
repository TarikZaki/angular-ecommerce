import { Route } from '@angular/router';
import { authGuard, cartIdGuard, isLogginGuard } from '@org/guards';

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
  {
    path: 'products',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@org/products-component').then((m) => m.productsComponentRoutes),
  },
  {
    path: 'details/:slug/:id',
    canActivate: [authGuard],
    loadChildren: () =>
      import('@org/product-details').then((m) => m.ProductDetailsRoutes),
  },
  {
    path: 'checkout/:id',
    canActivate: [authGuard, cartIdGuard],
    loadChildren: () => import('@org/checkout').then((m) => m.checkoutRoutes),
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    loadChildren: () => import('@org/allorders').then((m) => m.allordersRoutes),
  },
  {
    path: '**',
    loadChildren: () => import('@org/notfound').then((m) => m.notfoundRoutes),
  },
];
