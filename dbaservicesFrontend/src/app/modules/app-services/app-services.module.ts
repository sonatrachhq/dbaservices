import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServicesRoutingModule } from './app-services-routing.module';
import { CompilPageComponent } from './Compil/Pages/compil-page/compil-page.component';
import { PlatformSelectComponent } from './Compil/Components/platform-select/platform-select.component';
import { AppSelectComponent } from './Compil/Components/app-select/app-select.component';
import { CompilConfirmComponent } from './Compil/Components/compil-confirm/compil-confirm.component';
import { CompilResultComponent } from './Compil/Components/compil-result/compil-result.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/app/AuthModule/auth.interceptor';
import { DialogModel } from 'src/app/helpers/dialog-model';

//************************************************ngprime modules*************************************************//
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {TreeModule} from 'primeng/tree';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  declarations: [
    CompilPageComponent,
    PlatformSelectComponent,
    AppSelectComponent,
    CompilConfirmComponent,
    CompilResultComponent
  ],
  imports: [
    CommonModule,
    AppServicesRoutingModule,
    StepsModule,
    ToastModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    FieldsetModule,
    PanelModule,
    TreeModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    GalleriaModule
  ],
  providers:[
    DialogModel,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppServicesModule { }
