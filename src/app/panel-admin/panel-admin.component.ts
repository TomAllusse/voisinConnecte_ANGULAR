import { Component, OnInit, inject } from '@angular/core';

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  annonces: number;
  statut: 'actif' | 'banni';
}

interface AnnonceSignalee {
  id: number;
  titre: string;
  auteur: string;
  motif: string;
}

@Component({
  selector: 'app-panel-admin',
  imports: [],
  templateUrl: './panel-admin.component.html',
  styleUrl: './panel-admin.component.css',
})
export class PanelAdminComponent {
  stats = { actif: 0, annonces: 0, signalements: 0, bannis: 0 };
  utilisateurs: Utilisateur[] = [];
  annoncesSignalees: AnnonceSignalee[] = [];
  pageUtilisateurs = 1;
  pageSignalements = 1;

  ngOnInit(): void {
    // Données mock — à remplacer par vrais appels API Symfony
    this.stats = { actif: 142, annonces: 87, signalements: 5, bannis: 3 };

    this.utilisateurs = [
      { id: 1, nom: 'Adam Dupont', email: 'adam@mail.com', annonces: 4, statut: 'actif' },
      { id: 2, nom: 'Marie Martin', email: 'marie@mail.com', annonces: 2, statut: 'actif' },
      { id: 3, nom: 'Paul Robert', email: 'paul@mail.com', annonces: 1, statut: 'banni' },
    ];

    this.annoncesSignalees = [
      { id: 1, titre: 'Aide déménagement', auteur: 'Adam D.', motif: 'Contenu inapproprié' },
      { id: 2, titre: 'Cours de maths', auteur: 'Paul R.', motif: 'Arnaque suspectée' },
    ];
  }

  bannir(id: number) {
    this.utilisateurs = this.utilisateurs.map((u) =>
      u.id === id ? { ...u, statut: 'banni' as const } : u,
    );
  }

  supprimerAnnonce(id: number) {
    this.annoncesSignalees = this.annoncesSignalees.filter((a) => a.id !== id);
  }
}
