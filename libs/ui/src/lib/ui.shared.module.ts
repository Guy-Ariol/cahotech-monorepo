import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule
  ],

  declarations: [
    SignInComponent,
    FooterComponent,

    SignInComponent],

  exports: [
    FooterComponent,
    SignInComponent
  ]
})

export class UiSharedModule { }
