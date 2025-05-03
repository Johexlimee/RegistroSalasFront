import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../modelos/equipo.modelo';
import { Sala } from '../modelos/sala.modelo';
import { TipoEquipo } from '../modelos/tipo-equipo.modelo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private baseUrl = 'http://localhost:8080/'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los equipos
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}equipos/listaEquipos`);
  }
//prueba

  // Obtener salas
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.baseUrl}sala/ListarSalas`);
  }

  // Obtener tipos de equipos
  getTiposEquipo(): Observable<TipoEquipo[]> {
    return this.http.get<TipoEquipo[]>(`${this.baseUrl}Tipo-Equipo/ListarTiposEquipos`);
  }

  // Guardar un nuevo equipo
  guardarEquipo(equipo: Equipo): Observable<any> {
    return this.http.post(`${this.baseUrl}equipos/agregar-equipo`, equipo);
  }

  // Actualizar un equipo
  actualizarEquipo(id: number, equipo: Equipo): Observable<any> {
    return this.http.put(`${this.baseUrl}equipos/editarEquipo-id?id=${id}`, equipo);
  }

  // Filtrar equipos por tipo
  filtrarEquiposPorTipo(tipoEquipo: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}equipos/filtrar-por-tipo?tipoEquipo=${tipoEquipo}`);
  }
}
