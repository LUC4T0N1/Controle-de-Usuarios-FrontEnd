import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario } from '@app/domain/entities/usuario';

@Injectable({ providedIn: 'root' })
export class AutenticacaoRepository {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:8080/api/autenticacao';

  login(email: string, senha: string): Observable<string> {
    return this.http.post<any>(this.API_URL+'/login', { email, senha }).pipe(
      map((response) => response.token)
    );
  }

  cadastrar(usuario: Usuario): Observable<boolean> {
    return this.http.post<any>(this.API_URL+'/cadastro', usuario).pipe(
      map(() => true)
    );
  }
}
