import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
export interface Application{
  "idapplication":number,
  "descapplication":string
}
@Component({
  selector: 'app-app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.css']
})
export class AppSelectComponent implements OnInit {
  options:Application[]=[
    {  "idapplication":2,"descapplication":"Payroll"},
    { "idapplication":1,"descapplication":"IDMS"},
    { "idapplication":0,"descapplication":"PAIE"}]
    selectedApplication: Application;
    selectedPlatform:number

  submitted: boolean = false;

  constructor( private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() { 
      this.activatedRoute.queryParams.subscribe(
        params=>{
          //console.log(params)
          this.selectedPlatform=params.idplatform
          this.selectedApplication=this.options.filter(value=>value.idapplication==params.idapplication)[0]
        }
      )
  }

  nextPage() {
      if (this.selectedApplication) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "idplatform":this.selectedPlatform,
            "idapplication":this.selectedApplication.idapplication

            
          }
      };
          this.router.navigate(['compil/confirmCompil'],navigationExtras);

          return;
      }

      this.submitted = true;
  }
  
  prevPage() {
    //console.log("this.selectedPlatform   "+  this.selectedPlatform)
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "idplatform":this.selectedPlatform,
        

        
      }
  };
    this.router.navigate(['compil/platform'],navigationExtras);
}
}
