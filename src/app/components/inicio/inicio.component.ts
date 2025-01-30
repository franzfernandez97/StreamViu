import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  public titulo:string
  public pulsaciones:number

  constructor(){
    this.titulo = "Universidad Internacional de Valencia"
    this.pulsaciones = 0
  }

  pulsar(){
    this.pulsaciones++
  }

  resetPulsaciones(){
    this.pulsaciones = 0
  }
}
