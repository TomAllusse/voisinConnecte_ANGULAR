import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './service/auth.guard';

export const routes: Routes = [
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },*/
  {
    path: '',
    component: HomeComponent,
    /*canActivate: [authGuard],*/
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'annonces',
    component: AnnonceComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [authGuard]
  },

];
