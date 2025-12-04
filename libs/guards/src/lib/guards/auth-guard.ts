import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@org/services';
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
  const auth = inject(AuthService);
  return auth.verifyToken().pipe(
    tap((valid) => {
      if (!valid) router.navigate(['/login']);
    })
  );
};
