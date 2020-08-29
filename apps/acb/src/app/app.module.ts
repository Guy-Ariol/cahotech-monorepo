import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NewCatalogComponent } from './components/new-catalog/new-catalog.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { OperationalDrawerComponent } from './components/operational-drawer/operational-drawer.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadComponent } from './pages/load/load.component';
import { TransfertComponent } from './pages/transfert/transfert.component';
import { UnloadComponent } from './pages/unload/unload.component';
import { UsersComponent } from './pages/users/users.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppRoutingModule } from './app-routing.module';
import { EventEmitter } from 'events';
import { ToastrModule } from 'ngx-toastr';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GuardService } from './services/guard.service';


/** database access key
 *
 */
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
    CatalogComponent,
    NewCatalogComponent,
    NewCompanyComponent,
    NewUserComponent,
    OperationalDrawerComponent,
    AboutComponent,
    AdminComponent,
    HomeComponent,
    LoadComponent,
    TransfertComponent,
    UnloadComponent, UsersComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),

    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzIconModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    NzButtonModule

  ],
  providers: [EventEmitter],
  bootstrap: [AppComponent],
})
export class AppModule { }
