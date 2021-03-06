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

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { UiSharedModule } from "@cahotech-monorepo/ui";
import { GoogleMapsModule } from "../../../../libs/ui/src/lib/google-maps/google-maps.module";

import {
  LockOutline, UserOutline, PlusOutline, HomeOutline, MenuOutline, PhoneOutline, MailOutline, CameraOutline,
  ArrowLeftOutline, DeleteOutline
} from '@ant-design/icons-angular/icons';

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
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ReleaseComponent } from './pages/release/release.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { ReactiveFormsModule } from '@angular/forms';
import { DocComponent } from './components/doc/doc.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BillComponent } from './components/bill/bill.component';
import { CashboxComponent } from './components/cashbox/cashbox.component';
import { NzModalModule } from 'ng-zorro-antd/modal';


registerLocaleData(fr);

const icons = [LockOutline, UserOutline, PlusOutline, HomeOutline, MenuOutline, PhoneOutline, MailOutline, CameraOutline, ArrowLeftOutline, DeleteOutline]

const firebaseConfig = {
  apiKey: "AIzaSyAZmwKH69f3URXJLAIfCEUfinEyfb5XaT0",
  authDomain: "cahotech-napata.firebaseapp.com",
  databaseURL: "https://cahotech-napata.firebaseio.com",
  projectId: "cahotech-napata",
  storageBucket: "cahotech-napata.appspot.com",
  messagingSenderId: "832448908741",
  appId: "1:832448908741:web:5800615c7136161ad90fac",
  measurementId: "G-M50NX0EMC1"
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LandlordComponent,
    RenterComponent,
    AdminFormsComponent,
    AdminGenericListingComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ReleaseComponent,
    SuperAdminComponent,
    DocComponent,
    BillComponent,
    CashboxComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiSharedModule,
    GoogleMapsModule,
    ReactiveFormsModule,

    NzCarouselModule,

    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzAutocompleteModule,
    NzCheckboxModule,
    AppRoutingModule,
    NzIconModule.forRoot(icons),
    ToastrModule.forRoot({ positionClass: 'bottom_center' }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NzCollapseModule,
    NzPopconfirmModule,
    NzPageHeaderModule,
    NzTabsModule,
    NzSelectModule,
    NzTagModule,
    NzMessageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NzModalModule
  ],

  providers: [{ provide: NZ_I18N, useValue: fr_FR }, EventEmitter],

  bootstrap: [AppComponent],
})
export class AppModule { }
