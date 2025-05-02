import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../modelos/promocion.modelo';

@Injectable({
  providedIn: 'root',
})
export class PromocionService {
  private baseUrl = 'http://localhost:8080/promocion/'; // URL base del backend

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn('Token no encontrado. Redirigiendo a login...');
      return new HttpHeaders();
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  obtenerPromocion(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.baseUrl}all`, { headers: this.getAuthHeaders() });
  }
}
