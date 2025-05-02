import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Importación necesaria para [(ngModel)]
import { CommonModule } from '@angular/common'; // Importación necesaria para funcionalidad base de Angular
import { AuthService } from '../services/auth.service'; // Importar el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class LoginComponent {
  loginData = {
    correo: '',  
    contrasena: '',  
  };

  showPassword: boolean = false;  // Para mostrar u ocultar la contraseña
  errorMessage: string = '';  // Mensaje de error en caso de fallo

  constructor(private authService: AuthService, private router: Router) {}

  // Método que se llama al hacer submit en el formulario
  onLogin(): void {
    console.log('Intentando iniciar sesión con:', this.loginData);
    // Llamar al servicio de autenticación
    this.authService.login(this.loginData).subscribe({
      next: (response) => {

        if (!response || !response.token || !response.rol) {
          console.error('La respuesta del servidor no contiene rol:', response);
          this.errorMessage = 'Error en la autenticación. Contacte al administrador.';
          return;
        }

        console.log('Respuesta del servidor:', response);
        const token = response.token;  // Extraer el token de la respuesta
        const rol = response.rol;  // Obtener el estado de acceso

        console.log('Token guardado en localStorage:', token);

        // Guardar el token en localStorage
        localStorage.setItem('authToken', token);

        // Redirigir al usuario según el estado de acceso
        switch (rol) {
          case 'ADMINISTRADOR':
            console.log('Usuario identificado como Administrador, redirigiendo...');
            this.router.navigate(['/admin']);  // Administrador
            break;
          case 'PROFESOR':
            console.log('Usuario identificado como Profesor, redirigiendo...');
            this.router.navigate(['/profesores/welcome']);  // Profesor
            break;
          default:
            console.error('Estado de acceso desconocido:', rol);
            this.errorMessage = 'Estado de acceso desconocido. Contacte al administrador.';
            break;
        }
      },
      error: (error) => {
        // Manejo de errores al iniciar sesión
        console.error('Error al iniciar sesión:', error);
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, intente de nuevo.';
        } else {
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Intente más tarde.';
        }
        console.error('Error al iniciar sesión:', error);  // Log para depuración
      },
    });
  }

  // Función para cambiar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;  // Cambia el estado de visibilidad
    console.log('Visibilidad de contraseña cambiada:', this.showPassword);
  }
}