import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppServicesRoutingModule } from './app-services-routing.module';
import { CompilPageComponent } from './Compil/Pages/compil-page/compil-page.component';
import { PlatformSelectComponent } from './Compil/Components/platform-select/platform-select.component';
import { AppSelectComponent } from './Compil/Components/app-select/app-select.component';
import { CompilConfirmComponent } from './Compil/Components/compil-confirm/compil-confirm.component';

import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//************************************************ngprime modules*************************************************//
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
@NgModule({
  declarations: [
    CompilPageComponent,
    PlatformSelectComponent,
    AppSelectComponent,
    CompilConfirmComponent
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
    FieldsetModule
  ]
})
export class AppServicesModule { }
