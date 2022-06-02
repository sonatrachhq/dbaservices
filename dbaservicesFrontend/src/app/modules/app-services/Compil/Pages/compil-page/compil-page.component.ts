import { MenuItem, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compil-page',
  templateUrl: './compil-page.component.html',
  styleUrls: ['./compil-page.component.css']
})
export class CompilPageComponent implements OnInit {

  items: MenuItem[];
    
 

  constructor(public messageService: MessageService) {}

  ngOnInit() {
      this.items = [{
              label: 'Choisir la plateforme',
              routerLink: 'platform',

          },
          {
              label: 'Choisir l\'application',
              routerLink: 'application'
          },
          {
              label: 'Compiler l\'application',
              routerLink: 'confirmCompil'
          },
        
      ];

      
  }

 
}
