import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginData, RegisterData } from '../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {

  loginData: LoginData = { email: '', password: '' };
  registerData: RegisterData = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    city: '',
  };
  confirmPassword = '';

  feedbackMsg = '';
  isError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(): void {
    console.log(this.loginData);
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        //console.log(res.status);
        if (res.status === 'ok') {
          console.log("ok");
          this.showMessage('Connexion réussie !', false);
          setTimeout(() => this.router.navigate(['/home']), 1500);
        } else {
          this.showMessage(res.message, true);
        }
      },
      error: () => this.showMessage('Erreur de connexion au serveur.', true),
    });
  }

  onRegister(): void {
    if (this.registerData.password !== this.confirmPassword) {
      this.showMessage('Les mots de passe ne correspondent pas.', true);
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.showMessage('Compte créé ! Connexion en cours...', false);
          setTimeout(() => this.router.navigate(['/home']), 1500);
        } else {
          this.showMessage(res.message, true);
        }
      },
      error: () => this.showMessage("Erreur lors de l'inscription.", true),
    });
  }

  private showMessage(text: string, error: boolean): void {
    this.feedbackMsg = text;
    this.isError = error;
    setTimeout(() => (this.feedbackMsg = ''), 3000);
  }
}
