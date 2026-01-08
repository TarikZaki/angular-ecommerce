import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cartIdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id) {
    return true;
  }
  return router.parseUrl('/cart');
};
