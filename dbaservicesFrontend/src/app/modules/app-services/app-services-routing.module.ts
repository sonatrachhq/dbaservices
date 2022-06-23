import { CompilResultComponent } from './Compil/Components/compil-result/compil-result.component';

import { CompilConfirmComponent } from './Compil/Components/compil-confirm/compil-confirm.component';
import { AppSelectComponent } from './Compil/Components/app-select/app-select.component';
import { PlatformSelectComponent } from './Compil/Components/platform-select/platform-select.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompilPageComponent } from './Compil/Pages/compil-page/compil-page.component';

const routes: Routes = [
  {path:'compil', component:CompilPageComponent,
  children:[
    {path:'platform', component:PlatformSelectComponent},
    {path:'application', component:AppSelectComponent},
    {path:'confirmCompil', component:CompilConfirmComponent},
    {path:'resultCompil', component:CompilResultComponent}
  ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppServicesRoutingModule { }
