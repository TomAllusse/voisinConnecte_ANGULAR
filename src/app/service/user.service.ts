import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthResponse, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/user';

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/sign`, userData).pipe(map((res: any) => res.result));
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(map((res: any) => res.result));
  }

  checkToken(): Observable<User> {
    const rawData = localStorage.getItem('auth_token');

    if (!rawData) {
      throw new Error('Aucun token trouvé');
    }

    let token: string;

    try {
      const parsed = JSON.parse(rawData);
      token = parsed.token || rawData;
    } catch (e) {
      token = rawData;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<AuthResponse>(`${this.API_URL}/token/check`, { headers }).pipe(
      map((res) => {
        if (res.status === 'ok' && res.result?.user) {
          console.log(res.result);
          return res.result.user;
        }
        throw new Error('Session invalide');
      }),
    );
  }

  updateProfil(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/update/${id}`, data);
  }
}
