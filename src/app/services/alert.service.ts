import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private router: Router) {}

  // Método genérico para mostrar una alerta
  showAlert(options: SweetAlertOptions) {
    Swal.fire({
      ...options,
      confirmButtonColor: '#2e8b57',
      cancelButtonColor: '#2e8b57'
    });
  }

  // Método para mostrar alertas de éxito
  showSuccess(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#2e8b57',
      confirmButtonText: 'Aceptar'
    });
  }

  // Método para mostrar alertas de error
  showError(message: string, title: string = '¡Error!') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#2e8b57',
      confirmButtonText: 'Aceptar'
    });
  }


// Método para mostrar una alerta de confirmación y redirigir a otra ruta
showConfirmation(message: string, idRegistro: string | number, title: string = 'Registro creado exitoso ¿quieres agregar una novedad?') {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#2e8b57',
    cancelButtonColor: '#2e8b57',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirige a otra ruta, pasando el idSala como parámetro
      this.router.navigate([`/profesores/formulario-salida/${idRegistro}`]);  
    }
  });
}

}