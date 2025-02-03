import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export var urlRecord = "https://apiviu.amnislabs.com/pro/api/"

@Injectable()
export class CancionService{
    constructor(
        private http: HttpClient
    ){
    }

    public getSongsById (id:number):Observable<any>{
        return this.http.get(urlRecord+'songs/from_disc/'+id)
    }
}