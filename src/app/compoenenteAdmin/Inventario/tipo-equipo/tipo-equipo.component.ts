import { Component, OnInit } from '@angular/core';
import { TipoEquipoService } from '../../../services/tipo-equipo.service';
import { Router } from '@angular/router';

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

  constructor (
    private tipoEquipoService: TipoEquipoService,
    public router: Router,
  ) {}

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

    const tipoEquipoExistente = this.tipoEquipos.find(tipo => tipo.nombre === this.equipoActual.nombre);
    if (tipoEquipoExistente) {
      console.error('❌ Tipo de equipo ya existe:', tipoEquipoExistente);
      alert('Este tipo de equipo ya está registrado.');
      return;
    }
  
    observable.subscribe({
      next: (respuesta) => {
        console.log('✅ Respuesta del backend:', respuesta);
  
        if (typeof respuesta === 'string') {
          console.log('ℹ️ Respuesta en formato string:', respuesta);
          alert(respuesta); // Mostrar mensaje del backend en una alerta
        } else {
          console.log('ℹ️ Respuesta en formato JSON:', JSON.stringify(respuesta));
        }
  
        this.cargarEquipos(); // Recargar lista de tipos de equipo
  
        const modalElement = document.getElementById('tipoEquipoModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
      },
      error: (error) => {
        console.error('❌ Error en la petición:', error);
        if (error.status === 409) {
          alert("Conflicto: El tipo de equipo ya existe.");
        }
      }
    });
  }
  
}
