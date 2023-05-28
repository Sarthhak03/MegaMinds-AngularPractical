import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    SummaryViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
