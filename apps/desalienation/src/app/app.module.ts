import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConscienceComponent } from './pages/conscience/conscience.component';
import { EducationComponent } from './pages/education/education.component';
import { ArchivesComponent } from './pages/archives/archives.component';
import { TransmissionComponent } from './pages/transmission/transmission.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, ConscienceComponent, EducationComponent, ArchivesComponent, TransmissionComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
