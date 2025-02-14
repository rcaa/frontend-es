import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <div class="register-container">
        <h2>Register</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="Digite seu email" required />
          <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
            Invalid email.
          </div>

          <label>Password</label>
          <input type="password" formControlName="password" placeholder="Digite sua senha" required />
          <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
            Password is mandatory.
          </div>

          <label>Password confirmation</label>
          <input type="password" formControlName="confirmPassword" placeholder="Confirme sua senha" required />
          <div *ngIf="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
            Password confirmation is mandatory.
          </div>
          
          <button type="submit" [disabled]="registerForm.invalid">Register</button>
        </form>
      </div>
    </section>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  // Validador customizado para confirmar as senhas
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      const newUser = { id: 0, email, password, role: 'user' }; // Personalize conforme necessário

      // Chama o AuthService para criar um novo usuário
      this.authService.register(newUser).subscribe({
        next: () => {
          this.router.navigate(['/login']); // Redireciona para a página de login após o cadastro
        },
        error: (err) => {
          alert('Erro ao cadastrar usuário: ' + err);
        }
      });
    }
  }
}