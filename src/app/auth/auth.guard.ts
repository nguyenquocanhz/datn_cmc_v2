import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const isLoggedIn = !!localStorage.getItem('token');
  if (!isLoggedIn) {
    return false;
  }
  return true;
};
