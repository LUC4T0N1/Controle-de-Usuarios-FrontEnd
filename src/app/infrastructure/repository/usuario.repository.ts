import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Usuario } from '@app/domain/entities/usuario';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UsuarioDto } from '@app/domain/entities/dto/usuario.dto';

@Injectable({ providedIn: 'root' })
export class UsuarioRepository {
  private API_URL = 'http://localhost:8080/api/usuarios';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

    buscarUsuariosPaginados(pagina: number, ordenacaoSelecionada: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.API_URL}?pagina=${pagina}&ordenacao=${ordenacaoSelecionada}`, { headers });
  }

   criarUsuario(usuario: any): Observable<void> {
    const headers = {
      Authorization: `Bearer ${this.tokenService.getToken()}`
    };
    return this.http.post<void>(this.API_URL, usuario, { headers });
  }

    excluirUsuario(id: number, token: string): Observable<void> {
    const headers = {
      Authorization: `Bearer ${this.tokenService.getToken()}`
    };
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers });
  }

atualizar(usuario: UsuarioDto, usuarioId: number): Observable<any> {
    const token = this.tokenService.getToken();
    return this.http.put(`${this.API_URL}/${usuarioId}`, usuario, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  buscarPorId(id: number): Observable<UsuarioDto> {
    const token = this.tokenService.getToken();
    return this.http.get<UsuarioDto>(`${this.API_URL}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

   buscarPorEmail(email: string): Observable<UsuarioDto> {
    const token = this.tokenService.getToken();
    return this.http.get<UsuarioDto>(`${this.API_URL}/usuario?email=${email}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
