import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConscienceComponent } from './pages/conscience/conscience.component';
import { EducationComponent } from './pages/education/education.component';
import { ArchivesComponent } from './pages/archives/archives.component';
import { TransmissionComponent } from './pages/transmission/transmission.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtikgM0hsu6EoP2MAUhCS6o8nFiqb4Ulc",
  authDomain: "napata-pro.firebaseapp.com",
  databaseURL: "https://napata-pro.firebaseio.com",
  projectId: "napata-pro",
  storageBucket: "napata-pro.appspot.com",
  messagingSenderId: "47760720483",
  appId: "1:47760720483:web:36fea9b720e72d57106e56",
  measurementId: "G-6S11NTE5VP"
};

@NgModule({
  declarations: [AppComponent, ConscienceComponent, EducationComponent, ArchivesComponent, TransmissionComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
