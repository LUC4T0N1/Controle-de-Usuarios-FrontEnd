import { Injectable } from '@angular/core';
import { UsuarioRepository } from '../../infrastructure/repository/usuario.repository';
import { Observable } from 'rxjs';
import { UsuarioDto } from '@app/domain/entities/dto/usuario.dto';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  buscarUsuariosPaginados(pagina: number, ordenacaoSelecionada: number): Observable<any> {
    return this.usuarioRepository.buscarUsuariosPaginados(pagina, ordenacaoSelecionada);
  }

  
  criarUsuario(usuario: { nome: string; email: string; senha: string }): Observable<void> {
    return this.usuarioRepository.criarUsuario(usuario);
  }

    excluirUsuario(id: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    return this.usuarioRepository.excluirUsuario(id, token);
  }

  atualizar(usuario: UsuarioDto, usuarioId: number): Observable<any> {
    return this.usuarioRepository.atualizar(usuario, usuarioId);
  }

  buscarPorId(id: number): Observable<UsuarioDto> {
    return this.usuarioRepository.buscarPorId(id);
  }

  buscarPorEmail(email: string): Observable<UsuarioDto> {
    return this.usuarioRepository.buscarPorEmail(email);
  }
}