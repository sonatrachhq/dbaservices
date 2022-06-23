import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';



const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(    private messageService: MessageService,
    private sessionStorage: SessionStorageService,public router: Router) {
     
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
        const token = this.sessionStorage.getToken();
 
        if (request.headers.get("skip"))
        return next.handle(request);
        if (token != null ) {
            authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
        }
    return next.handle(authReq).pipe(
      catchError((error) => {
         ////console.log('error in intercept')
        console.error(error);
       
      
            if(error.status==401||error.status==403){
              this.messageService.add({ severity: 'error', summary: 'Erreur d\'authentification', detail: "Vous allez être rediriger vers IDMS, Veuillez vous reconnecter!"});
              setTimeout(() => {
                window.open("http://localhost:4200/idms", "_self")
              }, 2000);
            
              
            }else{
                if(error.status==500||error.status==503||error.status==504){
                  this.messageService.add({ severity: 'error', summary: ' Le serveur ne repond pas', detail:"Veuillez actualiser la page ou bien contacter l'administrateur."});
                }
        
        }
        return throwError(error)
      })
    );
  }
}
