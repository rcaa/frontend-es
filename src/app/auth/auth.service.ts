import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL da API de autenticação
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0])); // Armazena o usuário no localStorage
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user'); // Remove o usuário ao sair
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser(); // Verifica se há um usuário autenticado
  }

  register(newUser: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser); // Envia a solicitação para cadastrar um novo usuário
  }

  hasRole(requiredRole: string): boolean {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString || '{}');
    return user.role === requiredRole;
  }
}
