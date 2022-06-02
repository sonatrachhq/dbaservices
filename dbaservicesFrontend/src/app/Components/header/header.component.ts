import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Option } from 'src/app/Theme/Models/Option';
import { ThemeService } from 'src/app/Theme/Services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();


  constructor(private readonly themeService: ThemeService) { }
  ngOnInit() {
    this.items = [
      {
        label: ' <img src="assets/images/logoSh2.png" style="border-radius: 50%;" >',
        escape: false,
    },
    {
        label: ' <h3>DBA SERVICES</h3>',
        escape: false,
    },
      {
        label: 'Services Serveur d\'application ',
        icon: 'pi pi-fw pi-desktop' ,
        items: [
          {
          label: 'Compilation',
          icon: 'pi pi-fw pi-align-center',
          routerLink: 'compil/platform'
        },
        { label: 'Vider L\'éspace Disk',
          icon: 'pi pi-fw pi-trash', 
        },
        { label: 'Démarrer le serveur d\'application' ,
          icon: 'pi pi-fw pi-circle-on',
        },
        { label: 'Arreter le serveur d\'application' ,
        icon: 'pi pi-fw pi-circle-off',
      }
        ]
      },
      {
        label: 'Services Base de données',
        icon: 'pi pi-fw pi-cloud-upload',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Autres Services',
        icon: 'pi pi-fw pi-sliders-v',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ]
  }
      //update theme if changed
      themeChangeHandler(themeToSet: Option) {
        this.themeService.setTheme(themeToSet.value);


    }
}
