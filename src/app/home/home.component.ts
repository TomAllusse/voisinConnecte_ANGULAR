import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormAnnonceComponent } from '../form-annonce/form-annonce.component';
import { CategorieService } from '../service/categorie.service';
import { AnnounceService } from '../service/announce.service';
import { map, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormAnnonceComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private apiCategories = inject(CategorieService);
  private apiAnnounces = inject(AnnounceService);
  private authService = inject(AuthService);

  canvasVisible = false;

  categories$!: Observable<any[]>;
  countAnnounces$!: Observable<number>;
  countMemberActifs$!: Observable<number>;
  countAnnouncesTerminated$!: Observable<number>;

  ngOnInit(): void {
    this.countAnnounces$ = this.apiAnnounces
      .getCountsAnnouncesByMonth()
      .pipe(map((data: any) => data.result ?? data));

    this.countMemberActifs$ = this.apiAnnounces
      .getMemberActifsCountsAnnouncesByMonth()
      .pipe(map((data: any) => data.result ?? data));

    this.countAnnouncesTerminated$ = this.apiAnnounces
      .getCountsAnnouncesByMonthTerminated()
      .pipe(map((data: any) => data.result ?? data));

    this.categories$ = this.apiCategories
      .getCategoriesTendency()
      .pipe(map((data: any) => data.result ?? data));
  }

  get isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  ouvrirFormAnnonce(): void {
    this.canvasVisible = true;
  }

  fermerFormAnnonce(): void {
    this.canvasVisible = false;
  }
}
