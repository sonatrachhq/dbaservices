import { SessionStorageService } from './../AuthModule/session-storage.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Config {

  url: string;
  idmsHost:string;

}
@Injectable({
  providedIn: 'root'
})


export class CommunService {
  public host:string="";
  public idmsHost="";
  constructor(private http: HttpClient,private sessionStorage: SessionStorageService,private router:Router) { 
 
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/hostPath.json");
}
  

  
public load(): Promise<void> {
    //console.log("load")
      return this.http.get<Config>("./assets/hostPath.json")
      .toPromise()
      .then(config => {

        this.host = config.url;
        this.idmsHost=config.idmsHost;
        this.sessionStorage.saveHost(this.host);
        this.sessionStorage.saveIdmsHost(this.idmsHost);
        });

    }

    
    public getHost():String{
      return this.host;
    }
    public getIdmsHost():string{
      return this.idmsHost;
    }
 
  }
 
    export function initConfig(config: CommunService): () => Promise<void> {
  
    return () => config.load();
 
  } 
 


