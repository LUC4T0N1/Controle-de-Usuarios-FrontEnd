import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UsuarioService } from '@app/application/services/usuario.service';
import { Router } from '@angular/router';
import { EnderecoFormComponent } from '../endereco-form/endereco-form.component';

@Component({
  standalone: true,
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css'],
  imports: [EnderecoFormComponent, CommonModule, ReactiveFormsModule],
})
export class CriarUsuarioComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  erro: string | null = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

ngOnInit(): void {
  this.form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^(?=.*[0-9]).+$/)
    ]],
    role: ['', Validators.required],
    enderecos: this.fb.array([])
  });
}

campoInvalido(campo: string): boolean {
  const control = this.form.get(campo);
  return !!(control && control.invalid && control.touched);
}



  get enderecos(): FormArray {
    return this.form.get('enderecos') as FormArray;
  }

  novoEndereco(): FormGroup {
    return this.fb.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }

  adicionarEndereco() {
    this.enderecos.push(this.novoEndereco());
  }

  removerEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

criarUsuario() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.erro = null;

  this.usuarioService.criarUsuario(this.form.value).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigate(['/usuarios']);
    },
    error: (err) => {
      this.loading = false;
      this.erro = 'Erro ao criar usuário';
      console.error(err);
    },
  });
}


  get enderecoFormGroups(): FormGroup[] {
    return this.enderecos.controls as FormGroup[];
  }

      voltar() {
  this.router.navigate(['/usuarios']);
}

}
