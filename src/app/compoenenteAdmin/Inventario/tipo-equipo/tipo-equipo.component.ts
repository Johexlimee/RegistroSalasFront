import { Component, OnInit } from '@angular/core';
import { TipoEquipoService } from '../../../services/tipo-equipo.service';

declare var bootstrap: any; // Para usar las funciones JS de Bootstrap

@Component({
  selector: 'app-tipo-equipo',
  standalone: false,
  templateUrl: './tipo-equipo.component.html',
  styleUrls: ['./tipo-equipo.component.css'],
})
export class TipoEquipoComponent implements OnInit {
  tipoEquipos: any[] = []; // Lista de equipos
  equipoActual: any = {}; // Equipo actual para agregar o editar
  editando: boolean = false; // Indica si se está editando

  constructor(private tipoEquipoService: TipoEquipoService) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  // Método para cargar los equipos desde el servicio
  cargarEquipos(): void {
    this.tipoEquipoService.obtenerEquipos().subscribe(
      (data) => {
        this.tipoEquipos = data;
      },
      (error) => {
        console.error('Error al cargar los equipos', error);
      }
    );
  }

  // Mostrar el modal para agregar un equipo
  mostrarFormularioAgregar(): void {
    this.equipoActual = {}; // Limpia el equipo actual
    this.editando = false;
    const modal = new bootstrap.Modal(document.getElementById('tipoEquipoModal'));
    modal.show();
  }

  // Mostrar el modal para editar un equipo
  mostrarFormularioEditar(equipo: any): void {
    this.equipoActual = { ...equipo }; // Copia el equipo actual
    this.editando = true;
    const modal = new bootstrap.Modal(document.getElementById('tipoEquipoModal'));
    modal.show();
  }

  // Guardar un equipo (nuevo o actualizado)Guardar
  guardarEquipo(): void {
    const observable = this.editando
      ? this.tipoEquipoService.actualizarEquipo(this.equipoActual.idTipoEquipo, this.equipoActual)
      : this.tipoEquipoService.guardarEquipo(this.equipoActual);
  
    observable.subscribe(
      () => {
        this.cargarEquipos(); // Recargar la lista
        const modalElement = document.getElementById('tipoEquipoModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide(); // Cierra el modal
          }
        }
      },
      (error) => {
        console.error('Error al guardar o actualizar el equipo', error);
      }
    );
  }
  
}
