import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  get authLabel(): string {
    return this.authService.getAuthStatus();
  }

  async onAuthClick(): Promise<void> {
    if (this.authService.isAuth) {
      this.authService.signOut();
      localStorage.removeItem('angular17token');
      this.router.navigate(['/login']);
    } else {
      await this.authService.signIn();
    }
  }
}
