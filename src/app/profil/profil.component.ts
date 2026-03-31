import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProfilForm {
  prenom: string;
  nom: string;
  email: string;
  ville: string;
  description: string;
  ancienMotDePasse: string;
  nouveauMotDePasse: string;
  confirmMotDePasse: string;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent implements OnInit {
  profil: ProfilForm = {
    prenom: '',
    nom: '',
    email: '',
    ville: '',
    description: '',
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmMotDePasse: '',
  };

  stats = {
    annonces: 0,
    services: 0,
  };

  nomAffiche: string = 'Adam X.';
  lieuHabitation: string = "Lieu d'habitation";

  ngOnInit(): void {
    this.nomAffiche = 'Adam X.';
    this.lieuHabitation = 'Paris, France';
    this.stats = { annonces: 5, services: 3 };
    this.profil = {
      prenom: 'Adam',
      nom: 'X.',
      email: 'adam@email.com',
      ville: 'Paris',
      description: '',
      ancienMotDePasse: '',
      nouveauMotDePasse: '',
      confirmMotDePasse: '',
    };
  }

  sauvegarder(): void {
    console.log('Sauvegarde :', this.profil);
    // this.api.updateProfil(this.profil).subscribe(...)
  }
}
