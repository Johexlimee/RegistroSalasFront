import { Component } from '@angular/core';
import { ControlSalasService } from '../../services/control-sala.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  idRegistro = 5; // Debe ser un número válido

  constructor(
    private controlSala: ControlSalasService,
  ) {}

  ngOnInit(): void {
    this.controlSala.obtenerUltimoRegistro().subscribe({
      next: (data) => {
        this.idRegistro = data.idRegistro;
      },
      error: (error) => console.error('Error obteniendo el ID del último registro:', error)
    });
  }
}
