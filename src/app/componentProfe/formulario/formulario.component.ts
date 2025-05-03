import { Component, Inject, OnInit } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { ControlSalasService } from '../../services/control-sala.service';
import { ProgramaService } from '../../services/programa.service';
import { PromocionService } from '../../services/promocion.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formData: any = {
    programa: '',
    promocion: '',
    sala: '',
    fecha: '',
    descripcion: '',
    horaEntrada: '',
    nombreBocero1: '',
    codigoBocero1: '',
    nombreBocero2: '',
    codigoBocero2: ''
  };
  dataPrograma: any;
  dataSala: any;
  dataPromocion: any;
  mostrarVocero2: boolean = false;
  constructor (
    private programas: ProgramaService, 
    private sala: SalaService, 
    private promocion: PromocionService, 
    private controlSala: ControlSalasService,
    public router: Router,
  ) { }

  ngOnInit(): void {

    const userRole = localStorage.getItem('userRole'); // Asegúrate de almacenar el rol en el login
    const token = localStorage.getItem('authToken');
    console.log("Token actual en localStorage:", token);
    console.log("Rol del usuario:", userRole);

    if (!token) {
      console.warn("No hay token en localStorage. No se ejecutarán las peticiones.");
      return; // Evita la ejecución de obtenerPrograma si no hay token
    }
    this.obtenerPrograma();
    this.obtenerSala();
    this.obtenerPromocion();

    const fechaActual = new Date();
    this.formData.fecha = fechaActual.toISOString();
  }

  toggleVocero2() {
    this.mostrarVocero2 = !this.mostrarVocero2;
    if (!this.mostrarVocero2) {
      this.formData.nombreBocero2 = '';
      this.formData.codigoBocero2 = '';
    }
  }

  obtenerPrograma(): void {
    this.programas.obtenerPrograma().subscribe({
      next: (dataPrograma) => {
        this.dataPrograma = dataPrograma;
      },
      error: (error) => console.log(error)
    });
  }

  obtenerSala(): void {
    this.sala.obtenerSala().subscribe({
      next: (dataSala) => {
        this.dataSala = dataSala;
      },
      error: (error) => console.log(error)
    });
  }

  obtenerPromocion(): void {
    this.promocion.obtenerPromocion().subscribe({
      next: (dataPromocion) => {
        this.dataPromocion = dataPromocion;
      },
      error: (error) => console.log(error)
    });
  }


  private formatTime(time: string): string {
    // Si ya incluye segundos, retorna el valor tal cual.
    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return time;
    }
    // Si no tiene segundos, agrega ":00" al final.
    return `${time}:00`;
  }

  onSubmit() {
    // Asegurarse de que las horas tengan el formato correcto
    this.formData.horaEntrada = this.formatTime(this.formData.horaEntrada);

    console.log('Datos enviados al backend:', this.formData);

    // Llamada al servicio para registrar la sala
    this.controlSala
      .registerSala(
        this.formData.programa,
        this.formData.promocion,
        this.formData.sala,
        this.formData.fecha,
        this.formData.descripcion,
        this.formData.horaEntrada,
        this.formData.horaSalida,
        this.formData.nombreBocero1,
        this.formData.codigoBocero1,
        this.formData.nombreBocero2,
        this.formData.codigoBocero2
      )
      .subscribe({
        next: (response) => {
          console.log('Formulario registrado con éxito:', response);
        },
        error: (error) => {
          console.error('Error al registrar formulario:', error);
        },
        complete: () => {
          console.log('Registro completado.');
        }
      });
  }
}