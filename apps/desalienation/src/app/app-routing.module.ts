import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConscienceComponent } from './pages/conscience/conscience.component';
import { HomeComponent } from './pages/home/home.component';
import { EducationComponent } from './pages/education/education.component';
import { ArchivesComponent } from './pages/archives/archives.component';
import { TransmissionComponent } from './pages/transmission/transmission.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'conscience', component: ConscienceComponent },
  { path: 'education', component: EducationComponent },
  { path: 'archives', component: ArchivesComponent },
  { path: 'transmission', component: TransmissionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
