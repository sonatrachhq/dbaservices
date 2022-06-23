import { Servers } from './Servers';
export interface Application{
    idapplication:number;
    applicationtitle:string;
    applicationdesc:string;
    applicationstatus:number;
    applicationmode:number;
    compilename:string;
	cfname:string;
    server:Servers;
    

}