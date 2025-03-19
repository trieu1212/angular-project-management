import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return router.createUrlTree(['/home'])
      } else {
        return true
      }
    })
  )
};
