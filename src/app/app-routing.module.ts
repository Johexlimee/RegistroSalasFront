import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Importar LoginComponent

import { WelcomeComponent } from './componentProfe/welcome/welcome.component';
import { EquipoComponent } from './compoenenteAdmin/Inventario/equipo/equipo.component';
import { PrincipalComponent } from './compoenenteAdmin/principal/principal.component';
import { TipoEquipoComponent } from './compoenenteAdmin/Inventario/tipo-equipo/tipo-equipo.component';
import { LayoutProfeComponent } from './layout/layout-profe/layout-profe.component';
import { FormularioComponent } from './componentProfe/formulario/formulario.component';
import { FormularioSalidaComponent } from './componentProfe/formulario-salida/formulario-salida.component';
import { NovedadComponent } from './componentProfe/novedad/novedad.component';
import { AdminNovedadesComponent } from './compoenenteAdmin/novedades/admin-novedades/admin-novedades.component';
import { TipoNovedadComponent } from './compoenenteAdmin/novedades/tipo-novedad/tipo-novedad.component';

// Definimos las rutas
const routes: Routes = [
  // Ruta por defecto para login
  { path: '', component: LoginComponent },

  // Rutas para profesores
  { path: 'profesores',
    component: LayoutProfeComponent, 
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'formulario', component: FormularioComponent },
      { path: 'formulario-salida/:id', component: FormularioSalidaComponent },
      { path: 'novedades/:id', component: NovedadComponent }    ]
  },

    { path: 'admin',
      component: LayoutProfeComponent, 
      children: [
        { path: 'equipos', component: EquipoComponent },
        { path: 'inventario', component: EquipoComponent},
        { path: 'principal', component: PrincipalComponent },
        { path: 'tipo-equipo', component: TipoEquipoComponent },
        { path: 'admin-novedades', component: AdminNovedadesComponent},
        { path: 'tipo-novedad', component: TipoNovedadComponent},
        { path: '', redirectTo: 'principal', pathMatch: 'full' },  // Redirección por defecto
      ]
    } 
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
