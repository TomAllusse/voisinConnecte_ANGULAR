import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginData, RegisterData } from '../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = '/api/user';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        if (res.status === 'ok' && res.result?.token && this.isBrowser()) {
          localStorage.setItem('auth_token', res.result.token);
          localStorage.setItem('user', JSON.stringify(res.result));
        }
      }),
    );
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/sign`, data).pipe(
      tap((res) => {
        if (res.status === 'ok' && res.result?.token && this.isBrowser()) {
          localStorage.setItem('auth_token', res.result.token);
          localStorage.setItem('user', JSON.stringify(res.result));
        }
      }),
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
    }
  }

  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('auth_token');
  }
}
