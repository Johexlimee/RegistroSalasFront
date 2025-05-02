import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './componentProfe/welcome/welcome.component';
import { PrincipalComponent } from './compoenenteAdmin/principal/principal.component';
import { TipoEquipoComponent } from './compoenenteAdmin/Inventario/tipo-equipo/tipo-equipo.component';
import { LayoutProfeComponent } from './layout/layout-profe/layout-profe.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { CheaderComponent } from './cheader/cheader.component';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from './componentProfe/formulario/formulario.component';
import { EquipoComponent } from './compoenenteAdmin/Inventario/equipo/equipo.component';

import { FormularioSalidaComponent } from './componentProfe/formulario-salida/formulario-salida.component';
import { ModalEnviarComponent } from './componentProfe/modal-enviar/modal-enviar.component';

import { AdminNovedadesComponent } from './compoenenteAdmin/admin-novedades/admin-novedades.component';
import { DashboardComponent } from './compoenenteAdmin/dashboard/dashboard.component';
import { NovedadComponent } from './componentProfe/novedad/novedad.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    EquipoComponent,
    TipoEquipoComponent,
    LayoutProfeComponent,
    LayoutAdminComponent,
    CheaderComponent,
    FormularioComponent,
    FormularioSalidaComponent,
    AdminNovedadesComponent,
    WelcomeComponent,
    NovedadComponent,
    ModalEnviarComponent,
    AdminNovedadesComponent,
    DashboardComponent 
  ],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  LoginComponent,
],

  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
