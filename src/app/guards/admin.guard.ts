import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../infrastructure/services/token.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

canActivate(): boolean {
  const role = this.tokenService.obterRoleDoUsuario();
  if (role === 'ADMIN') {
    return true;
  }

  this.router.navigate(['/home']);
  return false;
}
}
