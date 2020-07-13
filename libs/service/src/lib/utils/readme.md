Enable EventEmitter
go to app.module.ts 
add EventEmitter to the provider array
do not forget to add import { EventEmitter } from 'events';

Determine screen size automatically
place code centrally in app.component.ts (like a method)
 @HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }


Enable ngx-toast 
go to app.module.ts
add ToastrModule.forRoot() to the import array
do not forget to add import { ToastrModule } from 'ngx-toastr';
