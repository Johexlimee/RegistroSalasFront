import { Component, OnInit } from '@angular/core';
import { TipoNovedadService } from '../../../services/tipo-novedad.service';
import { Router } from '@angular/router';

declare var bootstrap: any; // Para usar las funciones JS de Bootstrap

@Component({
  selector: 'app-tipo-novedad',
  standalone: false,
  templateUrl: './tipo-novedad.component.html',
  styleUrl: './tipo-novedad.component.css'
})
export class TipoNovedadComponent {
  tipoNovedad: any[] = [];
  novedadActual: any = {};
  editando: boolean = false;

  constructor (
    private tipoNovedadService: TipoNovedadService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarTipoNovedad();
  }

  cargarTipoNovedad(): void {
    this.tipoNovedadService.getAllTipoNovedad().subscribe(
      (data) => {
        this.tipoNovedad = data;
        console.log(data)
      },
      (error) => {
        console.error('Error al cargar los equipos', error);
      }
    );
  }

  mostrarFormularioAgregar(): void {
    this.novedadActual = {}; // Limpia el equipo actual
    this.editando = false;
    const modal = new bootstrap.Modal(document.getElementById('tipoEquipoModal'));
    modal.show();
  }

  mostrarFormularioEditar(tipoNovedad: any): void {
    this.novedadActual = { ...tipoNovedad }; // Copia el equipo actual
    this.editando = true;
    const modal = new bootstrap.Modal(document.getElementById('tipoEquipoModal'));
    modal.show();
  }

  guardarTipoNovedad(): void {
    const observable = this.editando
      ? this.tipoNovedadService.updateTipoNovedad(this.novedadActual.idTipoNovedad, this.novedadActual.nombre)
      : this.tipoNovedadService.createTipoNovedad(this.novedadActual.nombre);

    const tipoEquipoExistente = this.tipoNovedad.find(tipo => tipo.nombre === this.novedadActual.nombre);
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
  
        this.cargarTipoNovedad(); // Recargar lista de tipos de equipo
  
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
