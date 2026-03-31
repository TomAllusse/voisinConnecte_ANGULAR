import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stats } from '../models/stats.model';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getStats(): Observable<Stats> {
    return of({
      membres: 120,
      annonces: 45,
      termines: 30
    });
  }

  getCategories(): Observable<Categorie[]> {
    return of([
      { id: 1, nom: 'Bricolage' },
      { id: 2, nom: 'Jardinage' },
      { id: 3, nom: 'Cours' },
      { id: 4, nom: 'Ménage' },
      { id: 5, nom: 'Transport' }
    ]);
  }
}
