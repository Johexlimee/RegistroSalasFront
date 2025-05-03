import { Component } from '@angular/core';
import { ProgramaService } from '../../services/programa.service';
import { SalaService } from '../../services/sala.service';
import { PromocionService } from '../../services/promocion.service';
import { ControlSalasService } from '../../services/control-sala.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-formulario-salida',
  standalone: false,
  templateUrl: './formulario-salida.component.html',
  styleUrls: ['./formulario-salida.component.css']
})
export class FormularioSalidaComponent {
  formData: any = {
    programa: '',
    promocion: '',
    sala: '',
    fecha: '',
    descripcion: '',
    horaEntrada: '',
    horaSalida: '',
    nombreBocero1: '',
    codigoBocero1: '',
    nombreBocero2: '',
    codigoBocero2: ''
  };
  dataPrograma: any;
  dataSala: any;
  dataPromocion: any;
  mostrarVocero2: boolean = false;
  idregistro: string | number;

  constructor(
    private programas: ProgramaService,
    private sala: SalaService,
    private promocion: PromocionService,
    private controlSala: ControlSalasService,
    private route: ActivatedRoute,
    public router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.obtenerPrograma();
    this.obtenerSala();
    this.obtenerPromocion();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idregistro = +id;
      this.obtenerDatosSala();
    } else {
      this.router.navigate(['/profesores/formulario']); // Redirigir si no hay ID
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

  obtenerDatosSala(): void {
    if (this.idregistro) {
      this.controlSala.getSalaById(this.idregistro).subscribe({
        next: (data) => {
          console.log('Datos obtenidos de la sala:', data);  // Imprime la respuesta del servidor
          if (data) {
            this.formData = { 
              programa: data.programa?.idPrograma,
              promocion: data.promocion?.idProm,
              sala: data.sala?.idSala,
              fecha: data.fecha,
              descripcion: data.descripcion,
              descripcion_dos: data.descripcion_dos,
              horaEntrada: data.horaEntrada,
              horaSalida: data.horaSalida,
              nombreBocero1: data.nombreBocero1,
              codigoBocero1: data.codigoBocero1,
              nombreBocero2: data.nombreBocero2,
              codigoBocero2: data.codigoBocero2
            };
            this.idregistro = data.idRegistro;  // Usamos 'idRegistro' en lugar de 'idregistro'
            console.log('idRegistro:', this.idregistro);  // Verifica que ahora esté asignado correctamente
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos de la sala:', error);
          this.alertService.showError('No se pudo obtener los datos de la sala.');
        }
      });
    }
  }
  

  private formatTime(time: string): string {
    if (!time) {
      return '00:00:00';  // Valor por defecto si `time` es null o undefined
    }
    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return time;
    }
    return `${time}:00`;
  }

  onSubmit(): void {
    if (!this.formData.programa || !this.formData.promocion || !this.formData.sala) {
      this.alertService.showError('Todos los campos son obligatorios.');
      return;
    }
    
    // Formateamos las horas antes de enviarlas
    this.formData.horaEntrada = this.formatTime(this.formData.horaEntrada);
    this.formData.horaSalida = this.formatTime(this.formData.horaSalida);

    // Verificamos que tenemos el idregistro
    if (!this.idregistro) {
      this.alertService.showError('No se pudo obtener el registro de la sala.');
      return;
    }

    // Imprimimos los datos que vamos a enviar al backend
    console.log('Datos enviados al backend:', this.formData);

    // Llamamos al servicio de edición de sala
    this.controlSala.editSala(
      this.idregistro,  // Usamos el idregistro directamente
      this.formData.programa,
      this.formData.promocion,
      this.formData.sala,
      this.formData.fecha,
      this.formData.descripcion,
      this.formData.descripcion_dos,
      this.formData.horaEntrada,
      this.formData.horaSalida,
      this.formData.nombreBocero1,
      this.formData.codigoBocero1,
      this.formData.nombreBocero2,
      this.formData.codigoBocero2
    ).subscribe({
      next: (response) => {
        console.log('Registro editado con éxito:', response);
        this.alertService.showSuccess('Registro editado con éxito');
      },
      error: (error) => {
        console.error('Error al editar el registro:', error);
        this.alertService.showError('Error al editar el registro.');
      },
      complete: () => {
        console.log('Edición de registro completada.');
      }
    });
  }

  toggleVocero2(): void {
    this.mostrarVocero2 = !this.mostrarVocero2;
    if (!this.mostrarVocero2) {
      this.formData.nombreBocero2 = '';
      this.formData.codigoBocero2 = '';
    }
  }
}
