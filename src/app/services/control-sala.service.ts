import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ControlSalasService {
  private apiUrl: string = 'http://localhost:8080/'; // URL base del backend
  private currentUserId: string | number = 1; // ID del usuario actual

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    console.log("Token recuperado del localStorage:", token);
    if (!token) {
      console.error('Token no encontrado.');
      return new HttpHeaders();
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Añadimos "Bearer" al token
    });
  }

  public registerSala(
    programa: string,
    promocion: string,
    sala: string,
    fecha: string,
    descripcion: string,
    horaEntrada: string,
    horaSalida: string,
    nombreBocero1: string,
    codigoBocero1: string,
    nombreBocero2: string,
    codigoBocero2: string
  ): Observable<any> {
    const registerData = {
      programa: { idPrograma: programa },
      promocion: { idProm: promocion },
      sala: { idSala: sala },
      fecha,
      descripcion,
      horaEntrada,
      horaSalida,
      nombreBocero1,
      codigoBocero1,
      nombreBocero2,
      codigoBocero2,
      usuario: { idUsuario: this.currentUserId },
    };

    return this.http
      .post<any>(`${this.apiUrl}control-salas/registro`, registerData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap((response) => {
          this.alertService.showConfirmation(
            'Sala registrada con éxito.',
            response.idRegistro
          );
        }),
        catchError((error) => {
          console.error('Error en el registro de sala', error);
          this.alertService.showError('Algo salió mal al registrar la sala.');
          return of(null);
        })
      );
  }

  public editSala(
    idRegistro: string | number,
    programa: string,
    promocion: string,
    sala: string,
    fecha: string,
    descripcion: string,
    descripcion_dos: string,
    horaEntrada: string,
    horaSalida: string,
    nombreBocero1: string,
    codigoBocero1: string,
    nombreBocero2: string,
    codigoBocero2: string
  ): Observable<any> {
    const editData = {
      programa: { idPrograma: programa },
      promocion: { idProm: promocion },
      sala: { idSala: sala },
      fecha,
      descripcion,
      descripcion_dos,
      horaEntrada,
      horaSalida,
      nombreBocero1,
      codigoBocero1,
      nombreBocero2,
      codigoBocero2,
      usuario: { idUsuario: this.currentUserId },
    };

    const params = new HttpParams().set('id', idRegistro.toString());
    return this.http
      .put<any>(`${this.apiUrl}control-salas/control-id`, editData, {
        headers: this.getAuthHeaders(),
        params,
      })
      .pipe(
        tap(() => {
          this.alertService.showSuccess('Sala editada con éxito.');
        }),
        catchError((error) => {
          console.error('Error en la edición de la sala', error);
          this.alertService.showError('Algo salió mal al editar la sala.');
          return of(null);
        })
      );
  }

  public getSalaById(id: string | number): Observable<any> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(`${this.apiUrl}control-salas/control-id`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }
}
