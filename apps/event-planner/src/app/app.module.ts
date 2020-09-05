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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
// import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

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
    ReactiveFormsModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,

    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    // MatSelectModule,
    DragDropModule
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}],
  bootstrap: [AppComponent],
})
export class AppModule { }
