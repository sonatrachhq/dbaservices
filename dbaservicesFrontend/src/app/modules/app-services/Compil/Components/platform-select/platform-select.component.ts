
import { Observable, Subscription } from 'rxjs';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalCompilService } from '../../Services/global-compil.service';
import { filter } from '@angular-devkit/schematics';
import { tap } from 'rxjs/operators';
import { DialogModel } from 'src/app/helpers/dialog-model';
export interface Platform {
  "idplatform": number,
  "descplatform": string
}
@Component({
  selector: 'app-platform-select',
  templateUrl: './platform-select.component.html',
  styleUrls: ['./platform-select.component.css']
})
export class PlatformSelectComponent implements OnInit {
  platforms$: Observable<any>;
  platforms: Platform[]
  selectedPlatform: Platform;
  subscriptionPlatforms: Subscription;

  submitted: boolean = false;

  constructor(private router: Router,
     private globalCompilService: GlobalCompilService, 
     private dialogModel:DialogModel,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.globalCompilService.getAllPlatforms();

    this.platforms$ = this.globalCompilService.platforms$;
    this.subscriptionPlatforms = this.platforms$.subscribe(
      value => {
        this.platforms = value
        //console.log(value)
        this.activatedRoute.queryParams.subscribe(
          params => {
           // console.log(params)
            if (this.platforms != null) {
              this.selectedPlatform = this.platforms.filter(val => val.idplatform == params.idplatform)[0]
            }

          }
        )
      },
      error => {
        this.dialogModel.showErrorDialog("Une erreur d'\est produite! veuillez réessayer plus tard")
      }
    )


  }


  nextPage() {
   // console.log(this.selectedPlatform)
    if (this.selectedPlatform) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "idplatform": this.selectedPlatform.idplatform,
          "selectedPlatform": this.selectedPlatform.descplatform,
        }, skipLocationChange: true
      };
      this.router.navigate(['compil/application'], navigationExtras);

      return;
    }

    this.submitted = true;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptionPlatforms.unsubscribe()
  }
}
