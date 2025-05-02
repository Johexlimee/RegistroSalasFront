import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../modelos/sala.modelo';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private baseUrl = 'http://localhost:8080/sala/'; // URL base del backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Token no encontrado. Redirigiendo a login...');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  obtenerSala(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.baseUrl}ListarSalas`, { headers: this.getAuthHeaders() });
  }
}
