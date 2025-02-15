import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}?email=${email}
        &password=${password}`);
      const users: User[] = await response.json();
      
      if (users.length > 0) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        return users[0];
      }
      return null;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  async register(newUser: User): Promise<User | null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  hasRole(requiredRole: string): boolean {
    const user = this.getUser();
    return user ? user.role === requiredRole : false;
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
