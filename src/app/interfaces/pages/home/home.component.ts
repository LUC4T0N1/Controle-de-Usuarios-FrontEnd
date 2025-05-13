import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../infrastructure/services/token.service';
import { UsuarioService } from '../../../application/services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emailUsuario: string | null = null;
  roleUsuario: string | null = null;
  usuario: any = null;

  constructor(
    private tokenService: TokenService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.emailUsuario = this.tokenService.obterEmailDoUsuario();
    this.roleUsuario = this.tokenService.obterRoleDoUsuario();

    if (this.emailUsuario) {
      this.usuarioService.buscarPorEmail(this.emailUsuario).subscribe({
        next: (res) => {
          this.usuario = res;
        },
        error: (err) => {
          console.error('Erro ao buscar usuário por email:', err);
        },
      });
    }
  }

  deslogar() {
    this.tokenService.removerToken();
    this.router.navigate(['/inicial']);
  }

  irParaUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  isAdmin(): boolean {
    return this.roleUsuario === 'ADMIN';
  }

   editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }
}
