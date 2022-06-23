import { MessageService } from 'primeng/api';
import { CompilFormRequest } from './../../Models/CompilFormRequest';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalCompilService } from '../../Services/global-compil.service';
import { Application } from '../../Models/Application';
import { DialogModel } from 'src/app/helpers/dialog-model';

@Component({
  selector: 'app-compil-confirm',
  templateUrl: './compil-confirm.component.html',
  styleUrls: ['./compil-confirm.component.css']
})
export class CompilConfirmComponent implements OnInit {



selectedApplication: number;
selectedPlatform:string;
selectedApp:Application;
constructor(private globalCompilService:GlobalCompilService,
   private router: Router,
   private dialogModel:DialogModel,
   private activatedRoute: ActivatedRoute,
   private messageService: MessageService) { }

ngOnInit() { 
  this.activatedRoute.queryParams.subscribe(
    params=>{
     // console.log(params)
      this.selectedPlatform=params.selectedPlatform
      this.selectedApplication=params.idapplication
      this.selectedApp=JSON.parse(params.selectedApp) as Application;
    //  console.log(this.selectedApp)
    }
  )
}

compiler() {
 this.globalCompilService.checkCompil(this.selectedApp.applicationtitle).subscribe(
   data=>{
    // console.log(data)
    if(data!=null){
      if(data==true){
        
        this.messageService.add({severity: 'error', summary: "Impossible de compiler", detail: "Un autre utilisateur est en train de compiler! Veuillez réessayer plus tard"});
      }else{
        this.compilerApp()
      }
    }
   },
   error=>{
       this.dialogModel.showErrorDialog("Une erreur d'\est produite! veuillez réessayer plus tard")
   }
 )
}
compilerApp(){
  let compilFormRequest:CompilFormRequest={
    "applicationtitle":this.selectedApp.applicationtitle,
    "serveripadress":this.selectedApp.server.ipadress,
    "psw":"",
    "username":""
  }
  this.globalCompilService.compilApplication(compilFormRequest).subscribe(
   data=>{
   // console.log(data)
    let navigationExtras: NavigationExtras = {
      queryParams: {
    "selectedApp":JSON.stringify(this.selectedApp),
      },skipLocationChange:true
    }
    this.router.navigate(['compil/resultCompil'],navigationExtras)
   },
   error=>{
       this.dialogModel.showErrorDialog("Une erreur d'\est produite! veuillez réessayer plus tard")
   }
 ) 

}
prevPage() {
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "idapplication":this.selectedApplication,
      "idplatform":this.selectedPlatform,
      

      
    },skipLocationChange:true
};
  this.router.navigate(['compil/application'],navigationExtras);
}
}
