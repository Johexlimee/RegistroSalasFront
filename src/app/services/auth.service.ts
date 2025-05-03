import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Definir la respuesta esperada del servidor
export interface LoginResponse {
  token: string;
  acceso_status: number;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios/login';

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar el login
  login(loginData: { correo: string; contrasena: string }): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<LoginResponse>(this.apiUrl, loginData, {
      headers: headers,
      withCredentials: true,
    }).pipe(
      tap((response) => {
        console.log('Respuesta del backend en login:', response);

        if (!response.token || !response.rol) {
          console.error('El backend no envió el rol correctamente:', response);
          return;
        }

        localStorage.setItem('authToken', response.token); // ✅ Guarda el token
        localStorage.setItem('userRole', response.rol); // ✅ Guarda el rol

        console.log('Token guardado:', response.token);
        console.log('Rol guardado:', response.rol);
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para redirigir al login si no está autenticado
  verificarAutenticacion(): void {
    if (!this.isAuthenticated()) {
      console.warn('Usuario no autenticado. Redirigiendo al login...');
      localStorage.clear(); // Borra todos los datos guardados
      this.router.navigate(['/']); // Redirige al login
    }
  }
}