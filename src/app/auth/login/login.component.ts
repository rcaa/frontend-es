import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <section>
      <div class="login-container">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="Digite seu email" required (blur)="onBlur('email')"/>
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            Invalid email.
          </div>

          <label>Password</label>
          <input type="password" formControlName="password" placeholder="Digite sua senha" required />
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password is mandatory.
          </div>

          <button type="submit" [disabled]="loginForm.invalid">Login</button>
        </form>
        <p>No account?  <a [routerLink]="['/register']">Register</a></p>
      </div>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(users => {
        if (users.length > 0) {
          this.router.navigate(['home']);
        } else {
          alert('Credenciais inválidas');
        }
      });
    }
  }

  onBlur(field: string) {
    this.loginForm.get(field)?.markAsTouched();
  }
}
