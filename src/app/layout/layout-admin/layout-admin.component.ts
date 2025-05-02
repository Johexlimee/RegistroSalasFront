import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: false,
  
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/admin/${route}`]); // Navega al módulo "admin" con la ruta seleccionada
  }


}
