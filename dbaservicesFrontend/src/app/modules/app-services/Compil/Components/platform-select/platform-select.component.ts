import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
export interface Platform{
  "idplatform":number,
  "descplatform":string
}
@Component({
  selector: 'app-platform-select',
  templateUrl: './platform-select.component.html',
  styleUrls: ['./platform-select.component.css']
})
export class PlatformSelectComponent implements OnInit {

  options:Platform[]=[
    {  "idplatform":2,"descplatform":"DEV"},
    { "idplatform":1,"descplatform":"PRE-PROD"},
    { "idplatform":0,"descplatform":"PROD"}]
    selectedPlatform: Platform;


  submitted: boolean = false;

  constructor( private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() { 
    this.activatedRoute.queryParams.subscribe(
      params=>{
       // console.log(params)
        this.selectedPlatform=this.options.filter(value=>value.idplatform==params.idplatform)[0]
     
      }
    )
  }
 

  nextPage() {
   // console.log(this.selectedPlatform)
      if (this.selectedPlatform ) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "idplatform":this.selectedPlatform.idplatform
            
          }
      };
          this.router.navigate(['compil/application'],navigationExtras);

          return;
      }

      this.submitted = true;
  }
}
