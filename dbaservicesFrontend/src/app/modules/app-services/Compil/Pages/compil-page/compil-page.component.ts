import { Servers } from './../../Models/Servers';
import { Router } from '@angular/router';

import { MenuItem, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GlobalCompilService } from '../../Services/global-compil.service';

@Component({
  selector: 'app-compil-page',
  templateUrl: './compil-page.component.html',
  styleUrls: ['./compil-page.component.css']
})
export class CompilPageComponent implements OnInit {

  items: MenuItem[];

  constructor(public messageService: MessageService,public router:Router) {

  }

  ngOnInit() {
     
 
    
      this.items = [{
              label: 'Choisir la plateforme',
              routerLink: 'platform',
              skipLocationChange:true

          },
          {
              label: 'Choisir l\'application',
              routerLink: 'application'
          },
          {
              label: 'Compiler l\'application',
              routerLink: 'confirmCompil'
          },
          {
            label: 'Résultat de la compilation',
            routerLink: 'resultCompil'
        },
      
        
      ];

      
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  
  }
 
}


