import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';

import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LandlordComponent } from './pages/landlord/landlord.component';
import { RenterComponent } from './pages/renter/renter.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LandlordComponent,
    RenterComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule],

  providers: [{ provide: NZ_I18N, useValue: fr_FR }],

  bootstrap: [AppComponent],
})
export class AppModule { }
