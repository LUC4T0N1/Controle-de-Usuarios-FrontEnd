import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '@app/application/services/usuario.service';
import { UsuarioDto } from '@app/domain/entities/dto/usuario.dto';
import { EnderecoDto } from '@app/domain/entities/dto/endereco.dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EnderecoFormComponent } from '../endereco-form/endereco-form.component';
import { TokenService } from '@app/infrastructure/services/token.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
  imports: [CommonModule, ReactiveFormsModule, EnderecoFormComponent]

})
export class EditarUsuarioComponent implements OnInit {
  roleUsuario: string | null = null;
  form!: FormGroup;
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private tokenService: TokenService
  ) {}


  ngOnInit() {
    this.roleUsuario = this.tokenService.obterRoleDoUsuario();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioId = +id;
      this.carregarUsuario(); 
    }
  }

  carregarUsuario() {
    this.usuarioService.buscarPorId(this.usuarioId).subscribe(usuario => {
      this.inicializarFormulario(usuario); 
    });
  }

  inicializarFormulario(usuario: UsuarioDto) {
    this.form = this.fb.group({
      nome: [usuario.nome, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      senha: [''], 
      role: [usuario.role, Validators.required],
      enderecos: this.fb.array([]) 
    });

    if (usuario.enderecos && usuario.enderecos.length > 0) {
      usuario.enderecos.forEach(endereco => {
        this.enderecos.push(this.criarEnderecoForm(endereco));
      });
    }
  }

  criarEnderecoForm(endereco?: EnderecoDto): FormGroup {
    return this.fb.group({
      id: [endereco?.id || null],
      logradouro: [endereco?.logradouro || '', Validators.required],
      numero: [endereco?.numero || '', Validators.required],
      complemento: [endereco?.complemento || ''],
      bairro: [endereco?.bairro || '', Validators.required],
      cidade: [endereco?.cidade || '', Validators.required],
      estado: [endereco?.estado || '', Validators.required],
      cep: [endereco?.cep || '', Validators.required]
    });
  }

  get enderecos(): FormArray {
    return this.form.get('enderecos') as FormArray;
  }

  getEnderecoFormGroup(index: number): FormGroup {
    return this.enderecos.at(index) as FormGroup;
  }

  adicionarEndereco(): void {
    this.enderecos.push(this.criarEnderecoForm());
  }

  removerEndereco(index: number): void {
    this.enderecos.removeAt(index);
  }

  salvar(): void {
      if (this.form.invalid) {
    this.form.markAllAsTouched(); 
    return;
  }


  
    const usuarioEditado = {
      ...this.form.value,
      id: this.usuarioId
    };

    this.usuarioService.atualizar(usuarioEditado, this.usuarioId).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  voltar() {
  this.router.navigate(['/home']);
}
campoInvalido(campo: string): boolean {
  const control = this.form.get(campo);
  return !!(control && control.invalid && control.touched);
}

 isAdmin(): boolean {
    return this.roleUsuario === 'ADMIN';
  }

}