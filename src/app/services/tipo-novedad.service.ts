import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class TipoNovedadService {
  private apiUrl: string = 'http://localhost:8080/tipo-novedad/'; // URL base del backend

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

  // Método para registrar un nuevo tipo de novedad
  public createTipoNovedad(nombre: string): Observable<any> {
    const data = { nombre };

    return this.http
      .post<any>(`${this.apiUrl}agregar-novedad`, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap((response) => {
          this.alertService.showSuccess(
            `Tipo de novedad "${response.nombre}" registrado con éxito.`
          );
        }),
        catchError((error) => {
          console.error('Error al crear el tipo de novedad', error);
          this.alertService.showError('Error al registrar el tipo de novedad.');
          return of(null);
        })
      );
  }

  // Método para editar un tipo de novedad existente
  public updateTipoNovedad(id: number, nombre: string): Observable<any> {
    const data = { idTipoNovedad: id, nombre };

    return this.http
      .put<any>(`${this.apiUrl}tipo-novedad-id/${id}`, data, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap(() => {
          this.alertService.showSuccess(
            `Tipo de novedad con ID ${id} actualizado con éxito.`
          );
        }),
        catchError((error) => {
          console.error('Error al actualizar el tipo de novedad', error);
          this.alertService.showError(
            'Error al actualizar el tipo de novedad.'
          );
          return of(null);
        })
      );
  }

  // Método para obtener un tipo de novedad por ID
  public getTipoNovedadById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}tipo-novedad-id/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el tipo de novedad por ID', error);
          this.alertService.showError(
            'Error al obtener el tipo de novedad por ID.'
          );
          return of(null);
        })
      );
  }

  // Método para listar todos los tipos de novedades
  public getAllTipoNovedad(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}listanovedades`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((error) => {
          console.error('Error al listar los tipos de novedades', error);
          this.alertService.showError(
            'Error al listar los tipos de novedades.'
          );
          return of([]);
        })
      );
  }
}
