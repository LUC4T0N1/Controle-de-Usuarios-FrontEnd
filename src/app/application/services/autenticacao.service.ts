import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '@app/domain/entities/usuario';
import { AutenticacaoRepository } from '@app/infrastructure/repository/autenticacao.repository';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  constructor(private repository: AutenticacaoRepository) {}

  login(email: string, senha: string): Observable<string> {
    return this.repository.login(email, senha).pipe(
      tap((token: string) => {
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  cadastrar(usuario: Usuario): Observable<boolean> {
    return this.repository.cadastrar(usuario);
  }
}
