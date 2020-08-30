import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandlordComponent } from './pages/landlord/landlord.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RenterComponent } from './pages/renter/renter.component';
import { ReleaseComponent } from './pages/release/release.component';
import { SuperAdminComponent } from './pages/super-admin/super-admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'bailleur', component: LandlordComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'locataire', component: RenterComponent },
  { path: 'release', component: ReleaseComponent },
  { path: 'super-admin', component: SuperAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
