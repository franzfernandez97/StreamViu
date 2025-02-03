import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-libros',
  imports: [ MatCardModule, MatButton],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
  public titulo:string
  public autor:string
  public ruta:string
  public sinopsis:string

  constructor(){
    {
      this.titulo = "Don Quijote de la Mancha";
      this.autor = "Miguel de Cervantes";
      this.ruta = "https://www.planetadelibros.com/usuaris/libros/fotos/374/original/portada_don-quijote-de-la-mancha-comic_miguel-de-cervantes_202310231106.jpg";
      this.sinopsis = "El ingenioso hidalgo don Quijote de la Mancha narra las aventuras de Alonso Quijano, un hidalgo pobre que de tanto leer novelas de caballería acaba enloqueciendo y creyendo ser un caballero andante, nombrándose a sí mismo como don Quijote de la Mancha.";
    }
  }

}
