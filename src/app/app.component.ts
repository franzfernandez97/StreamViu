import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, InicioComponent, CabeceraComponent, NavegacionComponent, PieComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StreamViu';
}
