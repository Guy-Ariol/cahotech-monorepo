import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConscienceComponent } from './pages/conscience/conscience.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'conscience', component: ConscienceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
