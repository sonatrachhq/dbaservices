import { UsersObject } from './../Models/UsersObject';
import { SessionStorageService } from './../AuthModule/session-storage.service';
import { CommunService } from './commun.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserIDMS } from './../Models/UserIDMS';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RoleIDMS } from '../Models/RoleIDMS';
import { MessageService } from 'primeng/api';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {
  currentUser: UserIDMS = {
    "idlang": 0,
    "iduser": 181,//id app idms to get roles just for idms roles and use it in dbaservices to get roles for dbaservices
    "iduseridms": 0,
    "pswuser": "",
    "sonuser": "",
    "sysdate": new Date,
    "userstatus": 0,
    "username": ""
  };
  idmsHost: string;
  httpOptions = {};

  constructor(private cookieService: CookieService,
    private sessionStorage: SessionStorageService,
    private messageService: MessageService,
    private http: HttpClient) {
  }

  getUsersRoles() {
    this.currentUser.sonuser = this.cookieService.get('sonUser')
    this.idmsHost = this.sessionStorage.getIdmsHost()
    this.httpOptions = {
      headers: new HttpHeaders({ skip: "true" })
        .set(TOKEN_HEADER_KEY, 'Bearer ' + this.cookieService.get('token'))
    }
    this.http.post<Array<RoleIDMS>>(this.idmsHost + "getUsersRoles", this.currentUser, this.httpOptions).toPromise().then(
      (data) => {
        console.log(data)
        this.sessionStorage.saveRoles(data);
        this.getAppObjectsByRole();
      },
      error => {
        console.log(error);
        if (error.status == 401 || error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Erreur d\'authentification', detail: "Vous allez être rediriger vers IDMS, Veuillez vous reconnecter!" });
          window.open("http://10.100.22.95/idms/", "_self")

        }



      }
    )
  }

  getAppObjectsByRole() {
    this.idmsHost = this.sessionStorage.getIdmsHost();
    this.httpOptions = {
      headers: new HttpHeaders({ skip: "true" })
        .set(TOKEN_HEADER_KEY, 'Bearer ' + this.cookieService.get('token'))
        .set('Access-Control-Allow-Origin', '*')
    }
    let currentUser: UserIDMS = {
      "idlang": 181, //id app (ici c'est DBA services 181)
      "iduser": Number(this.cookieService.get('roleid')),//id role avec qui l'utilisateur à accéder DBA Services
      "iduseridms": 0,
      "pswuser": "",
      "sonuser": this.cookieService.get('sonUser'),
      "sysdate": new Date,
      "userstatus": 0,
      "username": ""
    };
    this.http.post<Array<UsersObject>>(this.idmsHost + "getAppObjectsByRole", currentUser, this.httpOptions).toPromise().then(
      (data) => {
        console.log(data)
        this.sessionStorage.saveObjects(data);
      },
      error => {
        console.log(error);
        if (error.status == 401 || error.status == 403) {
          this.messageService.add({ severity: 'error', summary: 'Erreur d\'authentification', detail: "Vous allez être rediriger vers IDMS, Veuillez vous reconnecter!" });
          setTimeout(() => {
            window.open("http://localhost:4200/idms", "_self")
          }, 2000);
       

        }



      }
    )
  }

}
