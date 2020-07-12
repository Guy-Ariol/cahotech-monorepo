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


@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzGridModule,
    NzLayoutModule,
    ToastrModule.forRoot()
  ],
  providers: [EventEmitter],
  bootstrap: [AppComponent],
})
export class AppModule {}
