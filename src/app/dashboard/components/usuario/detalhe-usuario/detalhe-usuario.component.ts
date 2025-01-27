import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../../../shared/models/usuario.interface';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private usuarioService: UsuarioService) {
    const usuarioResolver: IUsuario = this.route.snapshot.data['usuarioResolver']
    this.initForm(usuarioResolver);
  }

  initForm(usuarioResolver: IUsuario) {
    this.form = this.formBuilder.group({
      id: [usuarioResolver?.id],
      nome: [usuarioResolver?.nome, Validators.required],
      email: [usuarioResolver?.email, [Validators.required, Validators.email]],
      telefone: [usuarioResolver?.telefone, [Validators.required, , Validators.minLength(11),
      Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
    })
  }

  novoRegistro() {
    alert('Novo registro iniciado!');
  }

  salvar() {
    if (this.form.valid && this.form.get('id')?.value === null) {
      this.usuarioService.criarUsuario(this.form.value).subscribe(
        {
          next: response => { alert('Usuário salvo com sucesso!') },
          error: response => { alert('Ocorreu um erro ao tentar salvar o usuário.') }
        }
      );
    }
    if (this.form.valid && this.form.value.id > 0) {
      this.usuarioService.editarUsuario(this.form.value).subscribe({
        next: response => { alert('Usuário editado com sucesso!') },
        error: response => { alert('Ocorreu um erro ao tentar editar o usuário.') }
      });
    }
    if (this.form.invalid) {
      alert('Existe algum campo inválido verifique os campos e tente novamete.');
    }
  }
}
