import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoNovedadService } from '../../services/tipo-novedad.service';
import { EquipoService } from '../../services/equipo.service';
import { NovedadService } from '../../services/novedad.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css'],
  standalone: false,
})
export class NovedadComponent implements OnInit {
  formData: any = {
    tipoNovedad: null,
    tipoEquipo: null,
    descripcion: ''
  };

  dataTipoNovedad: any[] = [];
  dataEquipo: any[] = [];

  constructor(
    private tipoNovedadService: TipoNovedadService,
    private equipoService: EquipoService,
    private novedadService: NovedadService,
    private router: Router,
    @Inject(NgbModal) private modalService: NgbModal // Servicio para manejar el modal
  ) {}

  ngOnInit(): void {
    this.cargarTiposNovedad();
    this.cargarEquipos();
  }

  cargarTiposNovedad(): void {
    this.tipoNovedadService.getAllTipoNovedad().subscribe({
      next: (data) => (this.dataTipoNovedad = data),
      error: (err) => console.error('Error al cargar tipos de novedad:', err)
    });
  }

  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (data) => {
        console.log('Equipos obtenidos:', data);
        this.dataEquipo = data; // ✅ Usamos `dataEquipo` en lugar de `dataTipoEquipo`
      },
      error: (err) => console.error('Error al cargar equipos:', err)
    });
  }
  
  

  validarFormulario(): boolean {
    return (
      this.formData.tipoNovedad &&
      this.formData.tipoEquipo &&
      this.formData.descripcion
    );
  }

  onSubmit(modal: any): void {
    if (!this.validarFormulario()) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    console.log('Datos enviados al servicio:', this.formData);

    const tipoEquipoId = Number(this.formData.tipoEquipo);
    if (isNaN(tipoEquipoId)) {
      alert('Error: Tipo de equipo no válido.');
      return;
    }

    console.log('Validando antes de enviar:', this.formData);
    if (!this.formData.tipoNovedad || !this.formData.tipoEquipo || !this.formData.descripcion) {
      alert('Todos los campos deben estar completos.');
      return;
    }

    this.novedadService.createNovedad(
      this.formData.descripcion,
      Number(this.formData.tipoEquipo), // ✅ Ahora enviamos el ID correctamente
      Number(this.formData.tipoNovedad)
    ).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.modalService.open(modal, { centered: true });
        console.log('Validando formulario:', this.formData);
        console.log('Tipo Novedad:', this.formData.tipoNovedad);
        console.log('Tipo Equipo:', this.formData.tipoEquipo);
        console.log('Descripción:', this.formData.descripcion);
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        alert('Error al registrar la novedad.');
      }
    });
    
  }

  irAlInicio(): void {
    this.router.navigate(['profesores/welcome']);
  }

  crearOtraNovedad(): void {
    // Resetea el formulario para permitir la creación de una nueva novedad
    this.formData = {
      tipoNovedad: null,
      tipoEquipo: null,
      descripcion: ''
    };
  }
}
