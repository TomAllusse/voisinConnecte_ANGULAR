import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Annonce } from '../models/annonce.model';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [],
  templateUrl: './annonce.component.html',
  styleUrl: './annonce.component.css'
})
export class AnnonceComponent implements OnInit {
  private api = inject(ApiService);
  annonces: Annonce[] = [];

  ngOnInit(): void {
    console.log('PAGE ANNONCES CHARGÉE');
    this.api.getAnnonces().subscribe((data: Annonce[]) => {
      console.log('DATA :', data);
      this.annonces = data;
    });
  }
}
