import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { map, catchError, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const userService = inject(UserService); // On injecte ton service

  if (!isPlatformBrowser(platformId)) return of(false);

  const session = localStorage.getItem('user');
  if (!session) {
    router.navigate(['/auth']);
    return of(false);
  }

  const expectedRole = route.data['expectedRole'];

  return userService.checkToken().pipe(
    map((user) => {
      console.log(user);
      if (user.role === expectedRole || user.role === 'admin') {
        return true;
      }

      alert('Accès refusé : Droits insuffisants.');
      router.navigate(['/home']);
      return false;
    }),
    catchError((err) => {
      console.error('Erreur Guard:', err);
      localStorage.removeItem('user');
      router.navigate(['/auth']);
      return of(false);
    }),
  );
};
