import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoRepository } from '@app/infrastructure/repository/autenticacao.repository';
import { Usuario } from '@app/domain/entities/usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  form: FormGroup;
  formSubmetido = false;
  erro = '';

  constructor(private fb: FormBuilder, private auth: AutenticacaoRepository, private router: Router) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [Validators.required, Validators.minLength(5), Validators.pattern(/.*\d.*/)],
      ],
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(this.formSubmetido && control && control.invalid);
  }

  cadastrar() {
    this.formSubmetido = true;
    if (this.form.invalid) return;

    const usuario: Usuario = this.form.value;

    this.auth.cadastrar(usuario).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.erro = 'Erro ao cadastrar usuário.'),
    });
  }
}
