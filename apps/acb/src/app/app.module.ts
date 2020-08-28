import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [AppComponent, CatalogComponent, NewCatalogComponent, NewCompanyComponent, NewUserComponent, OperationalDrawerComponent, AboutComponent, AdminComponent, HomeComponent, LoadComponent, TransfertComponent, UnloadComponent, UsersComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
