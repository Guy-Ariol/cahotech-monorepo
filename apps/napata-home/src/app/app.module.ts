import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
