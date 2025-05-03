import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',//Nombre del componente
  templateUrl: './app.component.html',//
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema-registro';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.warn('No hay token en localStorage. Redirigiendo al login...');
      this.router.navigate(['/']);
    }
  }

}
