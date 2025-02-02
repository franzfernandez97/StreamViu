import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cancion } from '../../models/cancion';

@Component({
  selector: 'app-cancion',
  imports: [],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css'
})
export class CancionComponent {
  @Input() public var_song:Cancion = new Cancion(0, 0, "", "", "", 0)
  @Output() songToPlay = new EventEmitter()

  reproducirCancion():void{
    this.songToPlay.emit(this.var_song)
  }
}
