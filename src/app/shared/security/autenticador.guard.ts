import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

export const autenticadorGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  if (usuarioService.usuarioLogado) {
    return true;
  }

  Swal.fire(
    'Sessão Expirada',
    'Favor realizar novo Login.',
    'info'
  );

  router.navigate(['/auth/login']);

  return false;
};
