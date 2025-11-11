import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * Guard that allows navigation only when a valid auth token exists.
 *
 * @param route - Activated route snapshot.
 * @param state - Router state snapshot.
 * @returns `true` if authenticated; otherwise a `UrlTree` redirecting to `/login`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('token')) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
