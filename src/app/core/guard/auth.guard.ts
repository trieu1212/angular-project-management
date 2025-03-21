import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.getCurrentUser().pipe(
    map(user => {
      if(user){
        return true
      } else {
        return router.createUrlTree(['/login'])
      }
    })
  )
};
