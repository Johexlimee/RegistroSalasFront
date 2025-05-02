import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/admin/${route}`]); // Navega al módulo "admin" con la ruta seleccionada
  }
}
