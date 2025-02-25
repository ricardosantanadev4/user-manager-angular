import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
const usuarioService = inject(UsuarioService);

  Swal.fire({
    title: 'Carregando...',
    background: '#FFFFFF',
    color: '#000000',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
      // Seleciona o spinner e aplica o estilo diretamente
      const style = document.createElement('style');
      style.innerHTML = `
      .swal2-container .swal2-loader {
        border-color: #3F51B5 rgba(0, 0, 0, 0) #3F51B5 #3F51B5;
      }
    `;
      document.head.appendChild(style);
    }
  });

  return next(req).pipe(
    delay(300),
    catchError((error) => {
      console.error('Erro na requisição:', error);

      // Exibe um alerta de erro que só fecha ao clicar em "OK"
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um problema durante a requisição.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      throw error; // Repassa o erro para outros manipuladores
    }),
    finalize(() => {
      // Fecha apenas se não houver erro
      if (Swal.isVisible() && Swal.getTitle()?.textContent === 'Carregando...') {
        Swal.close();
      }
    })
  );

};