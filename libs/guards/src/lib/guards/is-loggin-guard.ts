import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * Guard that prevents access to auth routes if already logged in.
 *
 * @param route - Activated route snapshot.
 * @param state - Router state snapshot.
 * @returns `true` if not authenticated; otherwise a `UrlTree` redirecting to `/home`.
 */
export const isLogginGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('token')) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
