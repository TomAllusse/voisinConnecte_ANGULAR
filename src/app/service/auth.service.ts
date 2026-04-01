import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth: boolean = false;

  signIn(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuth = true;
        localStorage.setItem('angular17token', crypto.randomUUID());
        resolve(true);
      }, 2000);
    });
  }

  signOut(): void {
    this.isAuth = false;
    localStorage.removeItem('angular17token');
  }

  getAuthStatus(): string {
    return this.isAuth ? 'Déconnexion' : 'Connexion';
  }
}
