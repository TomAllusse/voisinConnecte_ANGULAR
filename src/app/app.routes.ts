import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { authGuard } from './service/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { roleGuard } from './service/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'annonces',
    component: AnnonceComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'user' },
  },
  {
    path: 'panel',
    component: PanelAdminComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'user' },
  },
];
