import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoNovedadService } from '../../services/tipo-novedad.service';
import { TipoEquipoService } from '../../services/tipo-equipo.service';
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
  dataTipoEquipo: any[] = [];

  constructor(
    private tipoNovedadService: TipoNovedadService,
    private tipoEquipoService: TipoEquipoService,
    private novedadService: NovedadService,
    private router: Router,
    @Inject(NgbModal) private modalService: NgbModal // Servicio para manejar el modal
  ) {}

  ngOnInit(): void {
    this.cargarTiposNovedad();
    this.cargarTiposEquipo();
  }

  cargarTiposNovedad(): void {
    this.tipoNovedadService.getAllTipoNovedad().subscribe({
      next: (data) => (this.dataTipoNovedad = data),
      error: (err) => console.error('Error al cargar tipos de novedad:', err)
    });
  }

  cargarTiposEquipo(): void {
    this.tipoEquipoService.obtenerEquipos().subscribe({
      next: (data) => (this.dataTipoEquipo = data),
      error: (err) => console.error('Error al cargar tipos de equipo:', err)
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

    this.novedadService.createNovedad(
      this.formData.descripcion,
      this.formData.tipoEquipo,
      this.formData.tipoNovedad
    ).subscribe({
      next: () => {
        this.modalService.open(modal, { centered: true }); // Abre el modal de éxito
      },
      error: (err) => {
        console.error('Error al crear la novedad:', err);
        alert('Error al registrar la novedad.');
      }
    });
  }

  irAlInicio(): void {
    this.router.navigate(['/welcome']);
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
