import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../service/categorie.service';
import { AnnounceService } from '../service/announce.service';
import { FormResponseComponent } from '../form-response/form-response.component';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [CommonModule, FormResponseComponent],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css',
})
export class AnnonceComponent implements OnInit {
  private apiCategories = inject(CategorieService);
  private apiAnnounces = inject(AnnounceService);

  categories$!: Observable<any[]>;
  annonces$!: Observable<any[]>;
  canvasVisible = false;

  ngOnInit(): void {
    this.loadAllAnnonces();
    this.loadCategories();
  }

  loadAllAnnonces(): void {
    this.annonces$ = this.apiAnnounces
      .getAnnoncesAll()
      .pipe(map((data: any) => data.result ?? data));
  }

  loadCategories(): void {
    this.categories$ = this.apiCategories
      .getCategories()
      .pipe(map((data: any) => data.result ?? data));
  }

  formatUserName(user: any): string {
    if (!user || !user.first_name || !user.last_name) return 'Voisin anonyme';

    const first = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase();
    const lastInit = user.last_name.charAt(0).toUpperCase();

    return `${first} ${lastInit}.`;
  }

  onCategoryClick(id: number): void {
    this.annonces$ = this.apiAnnounces
      .getAnnoncesByCategorie(id)
      .pipe(map((data: any) => data.result ?? data));
  }

  resetFiltres(): void {
    this.loadAllAnnonces();
  }

  ouvrirFormAnnonce(): void {
    this.canvasVisible = true;
  }

  fermerFormAnnonce(): void {
    this.canvasVisible = false;
  }
}
