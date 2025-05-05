import { Component } from '@angular/core';
import { NovedadService } from '../../../services/novedad.service';

@Component({
  selector: 'app-admin-novedades',
  standalone: false,
  
  templateUrl: './admin-novedades.component.html',
  styleUrl: './admin-novedades.component.css'
})
export class AdminNovedadesComponent {
  novedades: any[] = [];

  constructor(private novedadService: NovedadService) {}

  ngOnInit(): void {
    this.cargarNovedades();
  }

  cargarNovedades(): void {
    this.novedadService.getAllNovedades().subscribe(
      (data) => {
        // Procesar datos para la vista
        this.novedades = data.map((novedad: any) => ({
          idNovedad: novedad.idNovedad,
          descripcion: novedad.descripcion,
          tipoNovedad: novedad.tipoNovedad1.nombre,
          equipo: {
            serial: novedad.equipo.serial,
            sala: novedad.equipo.sala.nombre,
            tipoEquipo: novedad.equipo.tipoEquipo.nombre
          },
          isOpen: false // Estado inicial cerrado
        }));
      },
      (error) => {
        console.error('Error al cargar las novedades:', error);
      }
    );
  }

  toggleDetail(novedad: any): void {
    novedad.isOpen = !novedad.isOpen; // Alterna entre abierto y cerrado
  }
}
