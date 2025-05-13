import { Component, Input } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['../criar-usuario/criar-usuario.component.css'],
  templateUrl: './endereco-form.component.html'
})
export class EnderecoFormComponent {
  @Input() form!: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.form.addControl('cep', this.form.get('cep')!);
    this.form.addControl('logradouro', this.form.get('logradouro')!);
    this.form.addControl('numero', this.form.get('numero')!);
    this.form.addControl('complemento', this.form.get('complemento')!);
    this.form.addControl('bairro', this.form.get('bairro')!);
    this.form.addControl('cidade', this.form.get('cidade')!);
    this.form.addControl('estado', this.form.get('estado')!);

    this.form.get('cep')?.setValidators([Validators.required]);
    this.form.get('logradouro')?.setValidators([Validators.required]);
    this.form.get('numero')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
    this.form.get('bairro')?.setValidators([Validators.required]);
    this.form.get('cidade')?.setValidators([Validators.required]);
    this.form.get('estado')?.setValidators([Validators.required]);
  }

  buscarCep() {
    const cep = this.form.get('cep')?.value;
    if (cep) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(dados => {
        this.form.patchValue({
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        });
      });
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return control?.invalid && control?.touched ? true : false;
  }
}
