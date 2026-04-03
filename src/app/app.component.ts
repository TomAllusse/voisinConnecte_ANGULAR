import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('angular17token', crypto.randomUUID());
    }
  }
}
