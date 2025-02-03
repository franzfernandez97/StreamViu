import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Disco } from '../../models/disco';
import { Cancion } from '../../models/cancion';
import { CancionComponent } from '../cancion/cancion.component';
import { DiscoService } from '../../services/disco.service';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-musica',
  imports: [CommonModule, CancionComponent],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css',
  providers: [DiscoService, CancionService]
})
export class MusicaComponent {
  public records:Array<any>;
  public playing:string
  

  constructor(
    private discoService: DiscoService,
    private cancionService: CancionService
  ){
    
    this.playing=""
    
    this.records = this.discoService.getDiscs()

    //add discs
    this.discoService.getDiscsService().subscribe({
      next: (info) => {
        //console.log("Recibido: ", info)
        this.records = this.records.concat(info.data)

        //add songs
        for (let i=0;i<this.records.length;i++){
          //solo consult las canciones para los discos con ID menor a 10
          if (this.records[i].id< 10) {
            this.cancionService.getSongsById(this.records[i].id).subscribe({
              next: (info_songs) => {
                //console.log("Recibido: ", info_songs.data)
                this.records[i].songs = info_songs.data
              },
              error: (error_songs) => console.log("Error songs: ", error_songs)
            })
          }
        }
      },
      error: (error)=> console.log("Error: ", error)
    })
  }

  reproducirCancion(var_song: Cancion):void{
    console.log("---------",var_song)
    this.playing = var_song.artist + " - "+ var_song.title
    let audioPlayer = document.getElementById("audio_player") as HTMLAudioElement
    audioPlayer?.setAttribute('src',var_song.path)
    audioPlayer?.play()
  }
  playSong():void{
    let audioPlayer = document.getElementById("audio_player") as HTMLAudioElement
    audioPlayer?.play()
  }
}
