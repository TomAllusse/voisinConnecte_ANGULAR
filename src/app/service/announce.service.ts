import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Annonce, AnnonceCreate } from '../models/annonce.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnnounceService {
  private http = inject(HttpClient); // Utilisation de inject() plus moderne
  private apiUrl = '/api/announces';

  createAnnonce(annonce: AnnonceCreate): Observable<any> {
    const token = localStorage.getItem('auth_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}`, annonce, { headers });
  }

  getAnnoncesAll(): Observable<Annonce[]> {
    return this.http.get<any>(this.apiUrl).pipe(map((response) => response.result));
  }

  getAnnoncesByCategorie(id: number): Observable<Annonce[]> {
    return this.http
      .get<any>(`${this.apiUrl}/categories/${id}`)
      .pipe(map((response) => response.result));
  }

  getCountsAnnouncesByMonth(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/counts`).pipe(map((response) => response.result));
  }

  getMemberActifsCountsAnnouncesByMonth(): Observable<number> {
    return this.http
      .get<any>(`${this.apiUrl}/member_actifs`)
      .pipe(map((response) => response.result));
  }

  getCountsAnnouncesByMonthTerminated(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/terminated`).pipe(map((response) => response.result));
  }

  getCountsAnnouncesByUser(id: number): Observable<number> {
    return this.http
      .get<any>(`${this.apiUrl}/stats/${id}`)
      .pipe(map((response) => response.result));
  }

  getCountsAnnouncesByUserTerminated(id: number): Observable<number> {
    return this.http
      .get<any>(`${this.apiUrl}/stats/terminated/${id}`)
      .pipe(map((response) => response.result));
  }
}
