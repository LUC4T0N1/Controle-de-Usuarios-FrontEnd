import { EnderecoDto } from './endereco.dto';

export interface UsuarioDto {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  role: 'ADMIN' | 'USUARIO_COMUM';
  enderecos: EnderecoDto[];
}
