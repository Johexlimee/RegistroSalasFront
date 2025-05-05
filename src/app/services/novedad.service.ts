import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class NovedadService {
  private apiUrl: string = 'http://localhost:8080/Novedad/'; // URL base del backend

  constructor(private http: HttpClient, private alertService: AlertService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token no encontrado.');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos "Bearer" al token
    });
  }

  // Método para registrar una nueva novedad
  public createNovedad(
    descripcion: string,
    idEquipo: number,
    idTipoNovedad: number
  ): Observable<any> {
    const data = {
      descripcion,
      equipo: { idEquipo },
      tipoNovedad1: { idTipoNovedad },
    };

    return this.http
      .post<any>(`${this.apiUrl}Agregar-Novedad`, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap((response) => {
          this.alertService.showSuccess(
            `Novedad registrada con éxito: ID ${response.idNovedad}.`
          );
        }),
        catchError((error) => {
          console.error('Error al crear la novedad', error);
          this.alertService.showError('Error al registrar la novedad.');
          return of(null);
        })
      );
  }

  // Método para editar una novedad existente
  public updateNovedad(
    idNovedad: number,
    descripcion: string,
    idEquipo: number,
    idTipoNovedad: number
  ): Observable<any> {
    const data = {
      idNovedad,
      descripcion,
      equipo: { idEquipo },
      tipoNovedad1: { idTipoNovedad },
    };

    return this.http
      .put<any>(`${this.apiUrl}Novedad/${idNovedad}`, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => {
          this.alertService.showSuccess(
            `Novedad con ID ${idNovedad} actualizada con éxito.`
          );
        }),
        catchError((error) => {
          console.error('Error al actualizar la novedad', error);
          this.alertService.showError('Error al actualizar la novedad.');
          return of(null);
        })
      );
  }

  // Método para obtener una novedad por ID
  public getNovedadById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}novedad/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la novedad por ID', error);
          this.alertService.showError(
            'Error al obtener la novedad por ID.'
          );
          return of(null);
        })
      );
  }

  // Método para listar todas las novedades
  public getAllNovedades(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}listaNovedades`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al listar las novedades', error);
          this.alertService.showError('Error al listar las novedades.');
          return of([]);
        })
      );
  }
}
