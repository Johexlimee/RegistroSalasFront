import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Programa } from '../modelos/programa.modelo';

@Injectable({
  providedIn: 'root',
})
export class ProgramaService {
  private baseUrl = 'http://localhost:8080/programa/'; // URL base del backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Token no encontrado. Redirigiendo a login...');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  obtenerPrograma(): Observable<Programa[]> {
    return this.http.get<Programa[]>(`${this.baseUrl}all`, { headers: this.getAuthHeaders() });
  }
}
