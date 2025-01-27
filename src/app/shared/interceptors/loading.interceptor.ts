import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, delay, finalize } from 'rxjs';
import Swal from 'sweetalert2';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  Swal.fire({
    title: 'Carregando...',
    // text: 'Aguarde enquanto carrega os dados.',
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
      // Lida com o erro da requisição
      console.error('Erro na requisição:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um problema durante a requisição.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      throw error; // Repassa o erro para outros manipuladores
    }),
    finalize(() => {
      Swal.close()
    }
    ) // Fecha o alerta ao completar ou falhar a requisição
  );
};