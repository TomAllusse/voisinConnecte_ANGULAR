import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import { Annonce } from '../models/annonce.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiUrl = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.http.get<any>(this.apiUrl).pipe(map((response) => response.result));
  }

  getCategoriesTendency(): Observable<Categorie[]> {
    return this.http.get<any>(`${this.apiUrl}/tendency`).pipe(map((response) => response.result));
  };
}
