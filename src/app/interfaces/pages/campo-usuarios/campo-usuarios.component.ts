import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../application/services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './campo-usuarios.component.html',
  styleUrls: ['./campo-usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CampoUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  paginaAtual = 0;
  totalPaginas = 1;
  ordenacaoSelecionada = 1;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.buscarUsuariosPaginados(this.paginaAtual, this.ordenacaoSelecionada).subscribe((res) => {
      this.usuarios = res.content.map((u: any) => ({ ...u, mostrarEnderecos: false }));
      this.totalPaginas = res.totalPages;
    });
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.carregarUsuarios();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.carregarUsuarios();
    }
  }

  irParaCriacaoDeUsuarios() {
    this.router.navigate(['/usuarios/criar']);
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuarios/editar', id]);
  }

  removerUsuario(id: number) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.excluirUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir usuário', err);
        }
      });
    }
  }

    voltar() {
  this.router.navigate(['/home']);
}
}
