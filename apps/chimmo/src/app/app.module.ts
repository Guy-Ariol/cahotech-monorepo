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

import { UiSharedModule } from "@cahotech-monorepo/ui";
import { GoogleMapsModule } from "../../../../libs/ui/src/lib/google-maps/google-maps.module";

import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AdminFormsComponent } from './components/admin-forms/admin-forms.component';
import { AdminGenericListingComponent } from './components/admin-generic-listing/admin-generic-listing.component';
import { EventEmitter } from 'events';
import { ToastrModule } from 'ngx-toastr';


registerLocaleData(fr);

const icons = [PlusOutline]

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LandlordComponent,
    RenterComponent,
    AdminFormsComponent,
    AdminGenericListingComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiSharedModule,
    GoogleMapsModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzDatePickerModule,
    NzAutocompleteModule,
    NzCheckboxModule,
    AppRoutingModule,
    NzIconModule.forRoot(icons),
    ToastrModule.forRoot()

  ],

  providers: [{ provide: NZ_I18N, useValue: fr_FR }, EventEmitter],

  bootstrap: [AppComponent],
})
export class AppModule { }
