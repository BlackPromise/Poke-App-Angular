import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';


const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
  },
  {
    path: 'detail',
    component: DetailViewComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
