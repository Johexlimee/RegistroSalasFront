import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheader',
  standalone: false,
  templateUrl: './cheader.component.html',
  styleUrl: './cheader.component.css'
})
export class CheaderComponent {
  rol: string | null = localStorage.getItem('userRole'); // Recuperar el rol del usuario

  constructor(private router: Router) {}


  cerrarSesion(): void {
    localStorage.clear(); // Elimina todos los datos guardados en localStorage
    this.router.navigate(['/']); // Redirige al usuario a la pantalla de login
  }

}