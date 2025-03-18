import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../../shared/models/usuario.interface';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { TokenService } from '../../../../shared/services/token.service';

@Component({
  selector: 'app-detalhe-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DatePipe, NgClass],
  templateUrl: './detalhe-usuario.component.html',
  styleUrl: './detalhe-usuario.component.scss'
})
export class DetalheUsuarioComponent implements OnInit{

  form!: FormGroup;
  usuarioCadastrado = '';
  usuarioSalvo: Boolean = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private usuarioService: UsuarioService, private router: Router,
    private notificationService: NotificationService, private tokenService: TokenService) {
    const usuarioResolver: IUsuario = this.route.snapshot.data['usuarioResolver']
    this.initForm(usuarioResolver);
  }
  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    this.usuarioCadastrado = this.tokenService.getUserName();
  }

  initForm(usuarioResolver: IUsuario) {
    this.form = this.formBuilder.group({
      id: [usuarioResolver?.id],
      dataHoraCadastro: [usuarioResolver?.dataHoraCadastro],
      usuarioCadastrado: [usuarioResolver?.usuarioCadastrado],
      nome: [usuarioResolver?.nome, Validators.required],
      email: [usuarioResolver?.email, [Validators.required, Validators.email]],
      senha: [usuarioResolver?.senha, [Validators.required]],
      telefone: [usuarioResolver?.telefone, [Validators.required, , Validators.minLength(11),
      Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      role: [usuarioResolver?.role, [Validators.required]],
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
            this.notificationService.showSuccess('Usuário salvo com sucesso!');
          },
          error: (response) => {
            if (response.status === 403 && this.tokenService.isUser()) {
              this.notificationService.showError('Você não tem permissão para realizar essa ação!')
            }
          }
        }
      );
    }
    if (this.form.valid && this.form.value.id > 0) {
      this.usuarioService.editarUsuario(this.form.value).subscribe({
        next: () => {
          this.usuarioSalvo = true;
          this.notificationService.showSuccess('Usuário editado com sucesso!');
        },
        error: response => {
          if (response.status === 403 && this.tokenService.isUser()) {
            this.notificationService.showError('Você não tem permissão para realizar essa ação!')
          }
        }
      });
    }
    if (this.form.invalid) {
      this.notificationService.showError(
        'Existe algum campo inválido verifique os campos e tente novamete.');
    }
  }

  setarUsuarioCadastrado() {
    this.form.setValue({
      id: this.form.get('id')?.value,
      dataHoraCadastro: this.form.get('dataHoraCadastro')?.value,
      usuarioCadastrado: this.usuarioCadastrado,
      nome: this.form.get('nome')?.value,
      email: this.form.get('email')?.value,
      senha: this.form.get('senha')?.value,
      telefone: this.form.get('telefone')?.value,
      role: this.form.get('role')?.value,
    })
  }

  carregarUsuarioNoFormulario(usuario: IUsuario) {
    console.log(usuario.dataHoraCadastro);
    this.form.setValue({
      id: usuario.id,
      dataHoraCadastro: usuario.dataHoraCadastro,
      usuarioCadastrado: usuario.usuarioCadastrado,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      telefone: usuario.telefone,
      role: usuario.role,
    })
  }
}
