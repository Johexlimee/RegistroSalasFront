import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoEquipoService {
  private baseUrl = 'http://localhost:8080/Tipo-Equipo';

  constructor(private http: HttpClient) {}

  // Obtener lista de equipos
  obtenerEquipos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ListarTiposEquipos`);
  }

  // Guardar un nuevo equipo
  guardarEquipo(tipoEquipo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/AgregarTipoEquipo`, tipoEquipo);
  }

  // Actualizar un equipo
  actualizarEquipo(id: number, tipoEquipo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/TipoEquipo-id?id=${id}`, tipoEquipo);
  }
}
