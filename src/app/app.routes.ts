import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { authGuard } from './service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    /*canActivate: [authGuard],*/
  },
  {
    path: 'annonces',
    component: AnnonceComponent,
    /*canActivate: [authGuard],*/
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    /*canActivate: [authGuard],*/
  },
  {
    path: 'profil',
    component: ProfilComponent,
    /*canActivate: [authGuard],*/
  },
];
