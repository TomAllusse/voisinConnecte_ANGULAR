import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private api = inject(ApiService);
  mode = signal<'connexion' | 'inscription'>('connexion');
  msg = '';

  // Connexion
  loginObj = { login: '', password: '' };

  // Inscription
  registerObj = {
    prenom: '',
    nom: '',
    email: '',
    ville: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  basculer(m: 'connexion' | 'inscription') {
    this.mode.set(m);
    this.msg = '';
  }

  onLogin() {
    this.http.post('https://gsbrapport.allusse-tom.tech/gsbapi/?connexion', this.loginObj)
      .subscribe((res: any) => {
        if (res != null && res !== undefined && res.length !== 0) {
          this.msg = 'Connexion réussie !';
          localStorage.setItem('angular17token', res[0]['hash']);
          setTimeout(() => {
            this.msg = '';
            this.router.navigate(['']);
          }, 1000);
        } else {
          this.msg = 'Identifiant ou mot de passe incorrect !';
          setTimeout(() => this.msg = '', 2000);
        }
      });
  }

  onRegister() {
    if (this.registerObj.password !== this.registerObj.confirmPassword) {
      this.msg = 'Les mots de passe ne correspondent pas !';
      setTimeout(() => this.msg = '', 2000);
      return;
    }

    this.http.post('https://gsbrapport.allusse-tom.tech/gsbapi/?inscription', this.registerObj)
      .subscribe({
        next: () => {
          this.msg = 'Inscription réussie ! Connectez-vous.';
          setTimeout(() => {
            this.msg = '';
            this.basculer('connexion');
          }, 1500);
        },
        error: () => {
          this.msg = 'Erreur lors de l\'inscription.';
          setTimeout(() => this.msg = '', 2000);
        }
      });
  }
}
