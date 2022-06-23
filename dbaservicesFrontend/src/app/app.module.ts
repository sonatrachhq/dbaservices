import { AuthInterceptor } from './AuthModule/auth.interceptor';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Pages/home/home.component';
import { AppServicesModule } from './modules/app-services/app-services.module';
import { DbServicesModule } from './modules/db-services/db-services.module';
import { OtherServicesModule } from './modules/other-services/other-services.module';
import { ThemeMenuComponent } from './Theme/Component/theme-menu/theme-menu.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalAppService } from './Services/global-app.service';
import { CommunService } from './Services/commun.service';


//***************************primeng modules*************************************** */
import {MenubarModule} from 'primeng/menubar';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';



//Angular Material Modules
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {GalleriaModule} from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ThemeMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    OrganizationChartModule,
    ToastModule,
    BrowserAnimationsModule,
    AppServicesModule,
    DbServicesModule,
    OtherServicesModule,
    MenubarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    GalleriaModule
 
  ],
  providers: [MessageService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [CommunService,GlobalAppService],
      useFactory: (communService: CommunService,globalAppService:GlobalAppService) => {
        return () => {
          return communService.load().then(()=>{
              return globalAppService.getUsersRoles()
          })
        }
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
