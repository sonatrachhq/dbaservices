import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compil-confirm',
  templateUrl: './compil-confirm.component.html',
  styleUrls: ['./compil-confirm.component.css']
})
export class CompilConfirmComponent implements OnInit {



selectedApplication: number;
selectedPlatform:number
constructor( private router: Router,private activatedRoute: ActivatedRoute) { }

ngOnInit() { 
  this.activatedRoute.queryParams.subscribe(
    params=>{
      //console.log(params)
      this.selectedPlatform=params.idplatform
      this.selectedApplication=params.idapplication
    }
  )
}

compiler() {
 
}

prevPage() {
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "idapplication":this.selectedApplication,
      "idplatform":this.selectedPlatform,
      

      
    }
};
  this.router.navigate(['compil/application'],navigationExtras);
}
}
