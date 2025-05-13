import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../infrastructure/services/token.service';

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.isTokenValid()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/inicial']);
    }
    return false;
  }
}
