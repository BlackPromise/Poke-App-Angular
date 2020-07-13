import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { MainCardViewComponent } from './components/main-card-view/main-card-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    DetailViewComponent,
    MainCardViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
