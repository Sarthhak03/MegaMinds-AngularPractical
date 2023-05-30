import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { FormViewComponent } from './components/detail-view/form-view/form-view.component';
import { ListViewComponent } from './components/detail-view/list-view/list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    SummaryViewComponent,
    FormViewComponent,
    ListViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TabViewModule,
    ButtonModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
