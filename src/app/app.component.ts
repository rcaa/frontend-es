import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule], // Apenas RouterModule para gerenciar rotas
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="assets/logo.svg" 
          alt="logo" aria-hidden="true" />
          <button class="primary" (click)="logout()">Logout</button>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';

  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
