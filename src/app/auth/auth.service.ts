import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL da API de autenticação

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Salvar token no localStorage
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Remover token ao fazer logout
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica se há um token
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
