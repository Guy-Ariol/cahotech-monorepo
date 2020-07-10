import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { GoogleMapsComponent } from './google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    CommonModule,
    NzInputModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAiuQQaJV0TRP_soHCWh3F_NyBijUrPjgQ",
      libraries: ["places"]
    })
  ],

  declarations: [
    GoogleMapsComponent
  ],

  exports: [
    GoogleMapsComponent]
})

export class GoogleMapsModule { }
