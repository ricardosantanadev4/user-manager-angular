import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const usuarioService = inject(UsuarioService);
  const token = usuarioService.token;

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};

