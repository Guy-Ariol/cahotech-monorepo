import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HomeComponent } from './pages/home/home.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { PlacingComponent } from './pages/placing/placing.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
  declarations: [AppComponent, HomeComponent, EventListComponent, EventDetailsComponent, PlacingComponent, AdminComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
