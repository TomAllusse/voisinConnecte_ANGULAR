import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Annonce } from '../models/annonce.model';
import { AnnounceService } from '../service/announce.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private api = inject(AnnounceService);

  annonces$!: Observable<Annonce[]>;

  annoncesAttente$!: Observable<Annonce[]>;
  annoncesEnCours$!: Observable<Annonce[]>;
  annoncesTerminees$!: Observable<Annonce[]>;

  ngOnInit() {
    this.annonces$ = this.api.getAnnoncesAll().pipe(map((res: any) => res.result ?? res ?? []));

    this.annoncesAttente$ = this.annonces$.pipe(
      map((list) => list.filter((a) => a.status === 'pending')),
    );

    this.annoncesEnCours$ = this.annonces$.pipe(
      map((list) => list.filter((a) => a.status === 'in_progress')),
    );

    this.annoncesTerminees$ = this.annonces$.pipe(
      map((list) => list.filter((a) => a.status === 'terminated')),
    );
  }

  formatUserName(user: any): string {
    if (!user || !user.first_name || !user.last_name) return 'Voisin anonyme';

    const first = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase();
    const lastInit = user.last_name.charAt(0).toUpperCase();

    return `${first} ${lastInit}.`;
  }
}
