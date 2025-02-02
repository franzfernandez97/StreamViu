import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Disco } from '../../models/disco';
import { Cancion } from '../../models/cancion';
import { CancionComponent } from '../cancion/cancion.component';
@Component({
  selector: 'app-musica',
  imports: [CommonModule, CancionComponent],
  templateUrl: './musica.component.html',
  styleUrl: './musica.component.css'
})
export class MusicaComponent {
  public records:Array<any>;
  public playing:string

  constructor(){
    this.playing=""
    this.records = [
      new Disco (1, "Master of Puppets","Metallica",1986,"https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg",
        [
          new Cancion(1,1,"Battery","Metallica","assets/songs/Master of Puppets - Metallica.mp3",1),
          new Cancion(2,2,"Master of Puppets","Metallica","assets/songs/Master of Puppets - Metallica.mp3",1),
          new Cancion(3,3,"The Thing That Should Not Be","Metallica","assets/songs/Master of Puppets - Metallica.mp3",1),
          new Cancion(4,4,"Welcome Home (Sanitarium)","Metallica","assets/songs/Master of Puppets - Metallica.mp3",1),
          new Cancion(5,5,"Disposable Heroes","Metallica","assets/songs/Master of Puppets - Metallica.mp3",1)
        ]
      ),

      new Disco (2, "Painkiller","Judas Priest",1990,"https://upload.wikimedia.org/wikipedia/en/1/16/Judaspainkiller.JPG",
      [
        new Cancion(6,1,"Painkiller","Judas Priest","assets/songs/Painkiller - Judas Priest.mp3",2),
        new Cancion(7,2,"Hell Patrol","Judas Priest","assets/songs/Painkiller - Judas Priest.mp3",2),
        new Cancion(8,3,"All Guns Blazing","Judas Priest","assets/songs/Painkiller - Judas Priest.mp3",2),
        new Cancion(9,4,"Leather Rebel","Judas Priest","assets/songs/Painkiller - Judas Priest.mp3",2),
        new Cancion(10,5,"Metal Meltdown","Judas Priest","assets/songs/Painkiller - Judas Priest.mp3",2)
      ]),

      new Disco (3, "Paranoid","Black Sabbath",1970,"https://upload.wikimedia.org/wikipedia/en/6/64/Black_Sabbath_-_Paranoid.jpg",
      [
        new Cancion(11,1,"War Pigs","Black Sabbath","assets/songs/BLACK SABBATH - Paranoid.mp3",3),
        new Cancion(12,2,"Paranoid","Black Sabbath","assets/songs/BLACK SABBATH - Paranoid.mp3",3),
        new Cancion(13,3,"Planet Caravan","Black Sabbath","assets/songs/BLACK SABBATH - Paranoid.mp3",3),
        new Cancion(14,4,"Iron Man","Black Sabbath","assets/songs/BLACK SABBATH - Paranoid.mp3",3),
        new Cancion(15,5,"Electric Funeral","Black Sabbath","assets/songs/BLACK SABBATH - Paranoid.mp3",3),
      ]),

      new Disco (4, "Rust in Peace","Megadeth",1990,"https://upload.wikimedia.org/wikipedia/en/d/dc/Megadeth-RustInPeace.jpg",
      [
        new Cancion(16,1,"Holy Wars... The Punishment Due","Megadeth","assets/songs/Tornado Of Souls - Megadeth.mp3",4),
        new Cancion(17,2,"Hangar 18","Megadeth","assets/songs/Tornado Of Souls - Megadeth.mp3",4),
        new Cancion(18,3,"Take No Prisoners","Megadeth","assets/songs/Tornado Of Souls - Megadeth.mp3",4),
        new Cancion(19,4,"Five Magics","Megadeth","assets/songs/Tornado Of Souls - Megadeth.mp3",4),
        new Cancion(20,5,"Poison Was the Cure","Megadeth","assets/songs/Tornado Of Souls - Megadeth.mp3",4)
      ]),

      new Disco (5, "Reign in Blood","Slayer",1986,"https://upload.wikimedia.org/wikipedia/en/8/8e/Reign_in_blood.jpg",
      [
        new Cancion(21,1,"Angel of Death","Slayer","assets/songs/Raining Blood.mp3",5),
        new Cancion(22,2,"Piece by Piece","Slayer","assets/songs/Raining Blood.mp3",5),
        new Cancion(23,3,"Altar of Sacrifice","Slayer","assets/songs/Raining Blood.mp3",5),
        new Cancion(24,4,"Jesus Saves","Slayer","assets/songs/Raining Blood.mp3",5),
        new Cancion(25,5,"Criminally Insane","Slayer","assets/songs/Raining Blood.mp3",5)
      ])
    ]
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
