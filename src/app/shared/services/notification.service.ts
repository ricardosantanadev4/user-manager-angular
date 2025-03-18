import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showError(message: string, title: string = 'Erro') {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: "#28A745",
    });
  }

  showSuccess(message: string, title: string = 'Sucesso') {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: "#28A745",
    });
  }

  showWarning(message: string, title: string = 'Atenção') {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      reverseButtons: true
    })
  }

}
