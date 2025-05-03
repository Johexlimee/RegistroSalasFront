import { Component } from '@angular/core';

@Component({
  selector: 'app-cheader',
  standalone: false,
  templateUrl: './cheader.component.html',
  styleUrl: './cheader.component.css'
})
export class CheaderComponent {
  rol: string | null = localStorage.getItem('userRole'); // Recuperar el rol del usuario
}