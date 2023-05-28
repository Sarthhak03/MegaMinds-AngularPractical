import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    SummaryViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
