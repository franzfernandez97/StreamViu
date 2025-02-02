import { Cancion } from "./cancion";

export class Disco{
    constructor(
        public id: number,
        public title: string,
        public artist: string,
        public year: number,
        public image: string,
        public songs: Array<Cancion>
    ){

    }
}