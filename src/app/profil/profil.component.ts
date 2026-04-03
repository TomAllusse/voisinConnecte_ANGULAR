import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AnnounceService } from '../service/announce.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent implements OnInit {
  private userService = inject(UserService);
  private apiAnnounces = inject(AnnounceService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  profil = {
    prenom: '',
    nom: '',
    email: '',
    ville: '',
    bio: '',
    avatar_path: '',
    ancienMotDePasse: '',
    nouveauMotDePasse: '',
    confirmMotDePasse: '',
  };

  nomAffiche = '';
  lieuHabitation = '';
  stats = { annonces: 0, services: 0 };

  private userId: number | null = null;

  ngOnInit(): void {
    this.loadUserByToken();
  }

  loadUserByToken(): void {
    this.userService.checkToken().subscribe({
      next: (user: User) => {
        this.userId = user.id;
        this.profil.prenom = user.first_name;
        this.profil.nom = user.last_name;
        this.profil.email = user.email;
        this.profil.ville = user.city ?? '';
        this.profil.bio = user.bio ?? '';
        this.profil.avatar_path = user.avatar_path ?? '';

        this.updateBandeau();

        if (this.userId) {
          this.apiAnnounces.getCountsAnnouncesByUser(this.userId).subscribe((data: any) => {
            this.stats.annonces = data.result ?? data;
          });

          this.apiAnnounces
            .getCountsAnnouncesByUserTerminated(this.userId)
            .subscribe((data: any) => {
              this.stats.services = data.result ?? data;
            });
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Session invalide ou expirée', err);
        this.router.navigate(['/auth']);
      },
    });
  }

  private updateBandeau(): void {
    this.nomAffiche = `${this.profil.prenom} ${this.profil.nom.slice(0, 1).toUpperCase()}.`;
    this.lieuHabitation = this.profil.ville || 'Lieu non renseigné';
  }

  sauvegarder(): void {
    if (!this.userId) {
      alert('Impossible de sauvegarder : Utilisateur non identifié.');
      return;
    }

    if (
      this.profil.nouveauMotDePasse &&
      this.profil.nouveauMotDePasse !== this.profil.confirmMotDePasse
    ) {
      alert('Les nouveaux mots de passe ne correspondent pas !');
      return;
    }

    const dataUpdate = {
      prenom: this.profil.prenom,
      nom: this.profil.nom,
      email: this.profil.email,
      ville: this.profil.ville,
      bio: this.profil.bio,

      old_password: this.profil.ancienMotDePasse,
      new_password: this.profil.nouveauMotDePasse,
    };

    this.userService.updateProfil(this.userId, dataUpdate).subscribe({
      next: () => {
        alert('Profil mis à jour avec succès !');
        this.updateBandeau();

        this.profil.ancienMotDePasse = '';
        this.profil.nouveauMotDePasse = '';
        this.profil.confirmMotDePasse = '';
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde', err);
        alert('Erreur lors de la sauvegarde des modifications.');
      },
    });
  }
}
