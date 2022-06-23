import { CompilResult } from './../Models/CompilResult';
import { CompilFormResponse } from './../Models/CompilFormResponse';
import { CompilFormRequest } from './../Models/CompilFormRequest';
import { CompilPrivs } from './../Models/CompilPrivs';
import { Application } from './../Models/Application';
import { Platform } from './../Models/Platforms';

import { Servers } from './../Models/Servers';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunService } from 'src/app/Services/commun.service';
import { catchError, first } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalCompilService {

  private host:String;
  private _servers: BehaviorSubject<any> = new BehaviorSubject(null);
  public servers$: Observable<any> = this._servers.asObservable();

  private _platforms: BehaviorSubject<any> = new BehaviorSubject(null);
  public platforms$: Observable<any> = this._platforms.asObservable();

  private _apps: BehaviorSubject<any> = new BehaviorSubject(null);
  public apps$: Observable<any> = this._apps.asObservable();

  private _compilPrivs: BehaviorSubject<any> = new BehaviorSubject(null);
  public compilPrivs$: Observable<any> = this._compilPrivs.asObservable();

  constructor(private _http: HttpClient,communService:CommunService) {
    this.host=communService.getHost();
   }
   async getAllServers() {
    await this._http.get(this.host+"getAllServers")
      .pipe(first())
      .toPromise()
      .then((response: Servers[]) => {
        // on assign la reponse au Behavior Subject
        this._servers.next(response);
      })
      .catch(err => console.log(err))
  }

  async getAllPlatforms() {
    await this._http.get(this.host+"getAllPlatforms")
      .pipe(first())
      .toPromise()
      .then((response: Platform[]) => {
        // on assign la reponse au Behavior Subject
        this._platforms.next(response);
      })
      .catch(err => console.log(err))
  }


  async getAllApps() {
    await this._http.get(this.host+"getAllApps")
      .pipe(first())
      .toPromise()
      .then((response: Application[]) => {
        // on assign la reponse au Behavior Subject
        this._apps.next(response);
      })
      .catch(err => console.log(err))
  }


  async getCompilPrivs(userId:number){
    await this._http.get(this.host+"getAllCompilPrivs",{params:new HttpParams().set('userId', userId)})
    .pipe(first())
      .toPromise()
      .then((response: CompilPrivs[]) => {
        // on assign la reponse au Behavior Subject
        this._compilPrivs.next(response);
      })
      .catch(err => console.log(err))
  }
/*    public getAllServers():Observable<Array<Servers>>{
    return this._http.get<Array<Servers>>(this.host+"getAllServers").pipe(
     catchError((err) => {
        ////console.log('error caught in service')
       console.error(err);
       return throwError(err);
     })
   );
  } */

  public compilApplication(compilFormReq:CompilFormRequest):Observable<CompilFormResponse>{
    return this._http.post<CompilFormResponse>(this.host+"compilApplication",compilFormReq).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }


  public getCompilResult(app:Application):Observable<Array<CompilResult>>{
    return this._http.post<Array<CompilResult>>(this.host+"getCompilResult",app).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
  }

  public checkCompil(appName:string):Observable<Boolean>{
    return this._http.get<Boolean>(this.host+"checkCompil",{params:new HttpParams().set('appName', appName)}).pipe(
      catchError((err) => {
         ////console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
    );
}
}
