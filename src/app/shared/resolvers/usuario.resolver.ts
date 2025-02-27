import { ResolveFn } from '@angular/router';
import { IUsuario, Role } from '../models/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { map, of } from 'rxjs';

export const usuarioResolver: ResolveFn<IUsuario> = (route, state) => {
  const usurioService = inject(UsuarioService);

  if (route.params && route.params['id']) {
    return usurioService.buscarUsuarioPorId(route.params['id']).pipe(
      map((response: HttpResponse<IUsuario>) => response.body as IUsuario)
    );
  }

  // Retorna um objeto padrão do tipo IServico
  return of({
    id: 0, dataHoraCadastro: new Date(), usuarioCadastrado: '', nome: '', email: '',
    senha: '', telefone: '', role: Role.USER
  });
};
