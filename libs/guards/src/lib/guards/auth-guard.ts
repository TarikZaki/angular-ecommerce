import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@org/auth';
import { tap } from 'rxjs';

/**
 * Guard that allows navigation only when a valid auth token exists.
 *
 * @param route - Activated route snapshot.
 * @param state - Router state snapshot.
 * @returns `true` if authenticated; otherwise a `UrlTree` redirecting to `/login`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  return auth.verifyToken().pipe(
    tap((valid) => {
      if (!valid) router.navigate(['/login']);
    })
  );
};
