import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../../services/equipo.service';
import { Equipo } from '../../../modelos/equipo.modelo';
import { Sala } from '../../../modelos/sala.modelo';
import { TipoEquipo } from '../../../modelos/tipo-equipo.modelo';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-equipo',
  standalone: false,
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  equipos: Equipo[] = [];
  salas: Sala[] = [];
  tiposEquipo: TipoEquipo[] = [];
  tipoEquipoSeleccionado: string = ''; // Variable para el filtro de tipo de equipo
  equiposFiltrados: Equipo[] = [];    // Lista de equipos filtrados

  equipoActual: Equipo = {
    idEquipo: 0,
    estadoEquipo: false,
    serial: '',
    sala: { idSala: 0, nombre: '' }, // ✅ Inicialización correcta
    tipoEquipo: { idTipoEquipo: 0, nombre: '' },
  };
  
  editando: boolean = false;

  constructor (
    private equipoService: EquipoService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarEquipos();
    this.cargarSalas();
    this.cargarTiposEquipo();
  }

  // Filtro por tipo de equipo
  filtrarPorTipoEquipo(): void {
    if (this.tipoEquipoSeleccionado) {
      this.equiposFiltrados = this.equipos.filter(
        (equipo) => equipo.tipoEquipo.nombre === this.tipoEquipoSeleccionado
      );
    } else {
      this.equiposFiltrados = [...this.equipos];
    }
  }

  // Cargar equipos desde el servicio
  private cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe(
      (datos) => {
        this.equipos = datos;
        this.equiposFiltrados = [...this.equipos];
        console.log(datos);
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }

  // Cargar salas desde el servicio
  private cargarSalas(): void {
    this.equipoService.getSalas().subscribe(
      (datos) => {
        this.salas = datos;
        console.log(datos)
      },
      (error) => {
        console.error('Error al obtener salas:', error);
      }
    );
  }

  // Cargar tipos de equipo desde el servicio
  private cargarTiposEquipo(): void {
    this.equipoService.getTiposEquipo().subscribe(
      (datos) => {
        this.tiposEquipo = datos;
        console.log(datos)
      },
      (error) => {
        console.error('Error al obtener tipos de equipo:', error);
      }
    );
  }

  // Mostrar modal para agregar un equipo
  mostrarModalAgregar(): void {
    this.equipoActual = {
      idEquipo: 0,
      estadoEquipo: false,
      serial: '',
      sala: { idSala: 0, nombre: '' },
      tipoEquipo: { idTipoEquipo: 0, nombre: '' },
    };
    this.editando = false;
    const modal = new bootstrap.Modal(document.getElementById('equipoModal'));
    modal.show();
  }

  // Mostrar modal para editar un equipo
  mostrarModalEditar(equipo: Equipo): void {
    this.equipoActual = { ...equipo };
    this.editando = true;
    const modal = new bootstrap.Modal(document.getElementById('equipoModal'));
    modal.show();
  }

  // Guardar o actualizar equipo
  guardarEquipo(): void {
    console.log('Antes de validar:', this.equipoActual);
  
    if (
      this.equipoActual.serial.trim() === '' ||
      !this.equipoActual.sala?.idSala ||
      !this.equipoActual.tipoEquipo?.idTipoEquipo
    ) {
      console.error('❌ Faltan datos obligatorios:', this.equipoActual);
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    this.equipoActual.sala.idSala = Number(this.equipoActual.sala.idSala);
    this.equipoActual.tipoEquipo.idTipoEquipo = Number(this.equipoActual.tipoEquipo.idTipoEquipo);
  
    console.log('✅ Datos validados, preparando envío:', JSON.stringify(this.equipoActual));
  
    const observable = this.editando
      ? this.equipoService.actualizarEquipo(this.equipoActual.idEquipo, this.equipoActual)
      : this.equipoService.guardarEquipo(this.equipoActual);
  
    console.log(`ℹ️ Llamando a ${this.editando ? 'actualizarEquipo' : 'guardarEquipo'}`);
  
    observable.subscribe({
      next: (respuesta) => {
        console.log('✅ Respuesta del backend:', respuesta);
        this.cargarEquipos();
        const modal = bootstrap.Modal.getInstance(document.getElementById('equipoModal'));
        modal.hide();
      },
      error: (error) => {
        console.error('❌ Error en la petición:', error);
      }
    });
  }
}

