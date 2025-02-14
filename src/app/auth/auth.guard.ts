import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtém o papel necessário da rota
  const requiredRole: string | undefined = route.data?.['role'];

  // Verifica se o usuário está autenticado
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  // Verifica se a role é necessária e se o usuário tem permissão
  if (requiredRole && !authService.hasRole(requiredRole)) {
    return router.createUrlTree(['/unauthorized']); // Redireciona para uma página de "acesso negado"
  }

  return true;
};