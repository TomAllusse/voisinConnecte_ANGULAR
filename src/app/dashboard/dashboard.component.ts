import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { Annonce } from '../models/annonce.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  annonces: Annonce[] = [];

  ngOnInit(): void {
    this.api.getAnnonces().subscribe((data) => (this.annonces = data));
  }

  get annonceAttente(): Annonce[] {
    return this.annonces.filter((a) => a.statut === 'en_attente');
  }

  get annonceEnCours(): Annonce[] {
    return this.annonces.filter((a) => a.statut === 'en_cours');
  }

  get annonceTermine(): Annonce[] {
    return this.annonces.filter((a) => a.statut === 'termine');
  }
}
