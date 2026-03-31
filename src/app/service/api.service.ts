import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stats } from '../models/stats.model';
import { Categorie } from '../models/categorie.model';
import { Annonce } from '../models/annonce.model';

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

  getAnnonces(): Observable<Annonce[]> {
    return of([
      { id: 1, titre: 'Aide jardinage', description: 'Taille de haie', auteur: 'Adam X.', tarif: 15, couleurCategorie: '#4ade80', statut: 'en_attente', categorie: 'Jardinage' },
      { id: 2, titre: 'Soutien scolaire', description: 'Maths lycée', auteur: 'Marie L.', tarif: 20, couleurCategorie: '#a3e635', statut: 'en_cours', categorie: 'Scolaire' },
      { id: 3, titre: 'Bricolage', description: 'Montage meubles', auteur: 'Paul M.', tarif: 10, couleurCategorie: '#fb923c', statut: 'en_attente', categorie: 'Bricolage' },
      { id: 4, titre: 'Garde animaux', description: 'Garde chien', auteur: 'Sophie R.', couleurCategorie: '#f0abfc', statut: 'termine', categorie: 'Animaux' },
    ]);
  }
}
