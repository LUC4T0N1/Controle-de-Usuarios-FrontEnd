import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AutenticacaoRepository } from '@app/infrastructure/repository/autenticacao.repository';
import { AutenticacaoService } from '@app/application/services/autenticacao.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  formSubmetido = false;

  constructor(
    private fb: FormBuilder,
    private auth: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(5), Validators.pattern('.*\\d.*')]],
    });
  }

  campoInvalido(campo: string): boolean {
  const control = this.form.get(campo);
  return !!(this.formSubmetido && control && control.invalid);
}


  fazerLogin() {
    this.formSubmetido = true;

    if (this.form.invalid) return;

    const { email, senha } = this.form.value;
    this.auth.login(email, senha).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro de login:', error);
        alert('Falha no login! Email ou senha incorretos!');
      }
    );
  }
}
