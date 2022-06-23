import { CompilPrivs } from './../../Models/CompilPrivs';



import { Observable, Subscription } from 'rxjs';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalCompilService } from '../../Services/global-compil.service';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { DialogModel } from 'src/app/helpers/dialog-model';
export interface Application {
  "idapplication": number,
  "descapplication": string
}
@Component({
  selector: 'app-app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css']
})
export class AppSelectComponent implements OnInit {
  compilPrivs$: Observable<any>;
  applications: Application[]
  subscriptionCompilPrivs: Subscription;

  selectedApplication: Application;
  selectedPlatformId: number
  selectedPlatform: string;
  submitted: boolean = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, 
    private globalCompilService: GlobalCompilService, 
    private cookieService: CookieService,
    private dialogModel:DialogModel) { }

  ngOnInit() {

    this.globalCompilService.getCompilPrivs(Number(this.cookieService.get("userId")));
    this.compilPrivs$ = this.globalCompilService.compilPrivs$;
    this.subscriptionCompilPrivs = this.compilPrivs$.subscribe(
      data => {
        this.activatedRoute.queryParams.subscribe(
          params => {
            ////console.log(params)
            this.selectedPlatformId = Number(params.idplatform)
            this.selectedPlatform = params.selectedPlatform;
            //console.log(this.selectedPlatformId)
            if (data != null) {
              //console.log(data)
              this.applications = data.map(val => val.application).filter(value => value.applicationmode == this.selectedPlatformId)



              //val.applicationmode==this.selectedPlatform


              //console.log(this.applications)
              this.selectedApplication = this.applications.filter(value => value.idapplication == Number(params.idapplication))[0]
            }



          }
        )

      },
      error=>{
          this.dialogModel.showErrorDialog("Une erreur d'\est produite! veuillez réessayer plus tard")
      }
    )







  }

  nextPage() {
    if (this.selectedApplication) {
      //console.log(JSON.stringify(this.selectedApplication))
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "idplatform": this.selectedPlatformId,
          "idapplication": this.selectedApplication.idapplication,
          "selectedApp": JSON.stringify(this.selectedApplication),
          "selectedPlatform": this.selectedPlatform

        }, skipLocationChange: true
      };
      this.router.navigate(['compil/confirmCompil'], navigationExtras);

      return;
    }

    this.submitted = true;
  }

  prevPage() {
    //console.log("this.selectedPlatform   " + this.selectedPlatformId)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "idplatform": this.selectedPlatformId,



      }, skipLocationChange: true
    };
    this.router.navigate(['compil/platform'], navigationExtras);
  }
}
