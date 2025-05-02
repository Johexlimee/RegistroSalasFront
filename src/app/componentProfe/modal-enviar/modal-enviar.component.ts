import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-enviar',
  templateUrl: './modal-enviar.component.html',
  styleUrls: ['./modal-enviar.component.css'],
  standalone: false,
})
export class ModalEnviarComponent {
  @Output() onCrearNovedad: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {}

  volverInicio(): void {
    this.router.navigate(['/welcome']); // Redirige al componente de inicio
  }

  crearNovedad(): void {
    this.onCrearNovedad.emit(); // Emite un evento para manejarlo en el componente padre
  }
}
