import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { Stats } from '../models/stats.model';
import { Categorie } from '../models/categorie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  stats!: Stats;
  categories: Categorie[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getStats().subscribe((data: Stats) => {
      this.stats = data;
    });

    this.api.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }
}
