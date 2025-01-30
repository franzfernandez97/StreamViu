import { afterNextRender, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cine',
  imports: [],
  templateUrl: './cine.component.html',
  styleUrl: './cine.component.css'
})
export class CineComponent {
  public genero:string;
  
  constructor(private route:ActivatedRoute){
    this.genero="";

    afterNextRender(()=>{
      this.route.params.subscribe((params:Params)=>{
      this.genero = params["genero"];
      })
    });
  }
}