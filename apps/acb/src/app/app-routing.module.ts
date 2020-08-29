import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoadComponent } from './pages/load/load.component';
import { TransfertComponent } from './pages/transfert/transfert.component';
import { UnloadComponent } from './pages/unload/unload.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AboutComponent } from './pages/about/about.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'load', component: LoadComponent, canActivate: [GuardService] },
  { path: 'transfert', component: TransfertComponent, canActivate: [GuardService] },
  { path: 'unload', component: UnloadComponent, canActivate: [GuardService] },
  { path: 'users', component: UsersComponent, canActivate: [GuardService] },
  { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
