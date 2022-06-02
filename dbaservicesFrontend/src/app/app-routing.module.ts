import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';

const routes: Routes = [
  {
    path: 'appServices',
    loadChildren: () => import('./modules/app-services/app-services.module')
      .then(mod => mod.AppServicesModule)
  },
  {
    path: 'dbServices',
    loadChildren: () => import('./modules/db-services/db-services.module')
      .then(mod => mod.DbServicesModule)
  },
  {
    path: 'otherServices',
    loadChildren: () => import('./modules/other-services/other-services.module')
      .then(mod => mod.OtherServicesModule)
  },
 {path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
