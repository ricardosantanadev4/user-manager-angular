import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../../shared/models/usuario.interface';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DatePipe, NgClass],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent {
  form!: FormGroup;
  usuarioCadastrado = 'User-Teste';
  usuarioSalvo: Boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private usuarioService: UsuarioService, private router: Router) {
    const usuarioResolver: IUsuario = this.route.snapshot.data['usuarioResolver']
    this.initForm(usuarioResolver);
  }

  initForm(usuarioResolver: IUsuario) {
    this.form = this.formBuilder.group({
      id: [usuarioResolver?.id],
      dataHoraCadastro: [usuarioResolver?.dataHoraCadastro],
      usuarioCadastrado: [usuarioResolver?.usuarioCadastrado],
      nome: [usuarioResolver?.nome, Validators.required],
      email: [usuarioResolver?.email, [Validators.required, Validators.email]],
      telefone: [usuarioResolver?.telefone, [Validators.required, , Validators.minLength(11),
      Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
    })
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

  salvar() {
    if (this.form.valid && this.form.get('id')?.value === null) {
      this.setarUsuarioCadastrado();
      this.usuarioService.criarUsuario(this.form.value).subscribe(
        {
          next: response => {
            if (response.body) {
              this.carregarUsuarioNoFormulario(response.body);
              this.usuarioSalvo = true;
            }
            alert('Usuário salvo com sucesso!')
          },
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

  setarUsuarioCadastrado() {
    this.form.setValue({
      id: this.form.get('id')?.value,
      dataHoraCadastro: this.form.get('dataHoraCadastro')?.value,
      usuarioCadastrado: this.usuarioCadastrado,
      nome: this.form.get('nome')?.value,
      email: this.form.get('email')?.value,
      telefone: this.form.get('telefone')?.value
    })
  }

  carregarUsuarioNoFormulario(usuario: IUsuario) {
    this.form.setValue({
      id: usuario.id,
      dataHoraCadastro: usuario.dataHoraCadastro,
      usuarioCadastrado: usuario.usuarioCadastrado,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
    })
  }
}