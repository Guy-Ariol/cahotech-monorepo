import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './pages/fast-test/fast-test.component';
import { AppRoutingModule } from './app-routing.module';

import { EventEmitter } from 'events';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminComponent } from './pages/admin/admin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { RegisterComponent } from './pages/register/register.component';
import { FacebookFill, InstagramOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { NZ_I18N, fr_FR } from 'ng-zorro-antd/i18n';
registerLocaleData(fr);


const icons = [FacebookFill, InstagramOutline];

@NgModule({
  declarations: [AppComponent, TestComponent, AdminComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzGridModule,
    NzLayoutModule,
    ToastrModule.forRoot(),
    NzButtonModule,
    NzIconModule.forRoot(icons),
    HttpClientModule,
    NzModalModule,
    BrowserAnimationsModule

  ],
  providers: [EventEmitter, { provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent],
})

export class AppModule { }
