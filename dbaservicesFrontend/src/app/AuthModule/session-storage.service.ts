import { UsersObject } from './../Models/UsersObject';
import { RoleIDMS } from './../Models/RoleIDMS';
import { Injectable } from '@angular/core';


const HOST_KEY = 'HostKey';
const IDMS_HOST_KEY = 'IdmsHostKey';
const ROLES_KEY = 'Roles';
const USERSOBJECTS_KEY='UsersObjects';
@Injectable({
  providedIn: 'root'
})


export class SessionStorageService {
  private roles: RoleIDMS[] = [];
  private objects:UsersObject[]=[];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveHost(host: string) {
    window.sessionStorage.removeItem(HOST_KEY);
    window.sessionStorage.setItem(HOST_KEY, host);
  }

  public getHost(): string {
    let host=sessionStorage.getItem(HOST_KEY);
    return host !==null? host :"";
  }

  public saveIdmsHost(idmshost: string) {
    window.sessionStorage.removeItem(IDMS_HOST_KEY);
    window.sessionStorage.setItem(IDMS_HOST_KEY, idmshost);
  }

  public getIdmsHost(): string {
    let idmshost=sessionStorage.getItem(IDMS_HOST_KEY);
    return idmshost !==null? idmshost :"";
  }

  public getRoles():RoleIDMS[]{
    this.roles = [];
    
      JSON.parse(sessionStorage.getItem(ROLES_KEY)).forEach(role => {
        this.roles.push(role);
      });
   

    return this.roles;
  }

  public saveRoles(roles: RoleIDMS[]) {
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }

  
  public getObjects():UsersObject[]{
    this.objects = [];

      JSON.parse(sessionStorage.getItem(USERSOBJECTS_KEY)).forEach(obj => {
        this.objects.push(obj);
      });
    

    return this.objects;
  }

  public saveObjects(objects: UsersObject[]) {
    window.sessionStorage.removeItem(USERSOBJECTS_KEY);
    window.sessionStorage.setItem(USERSOBJECTS_KEY, JSON.stringify(objects));
  }
}
