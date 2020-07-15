**Enable EventEmitter**

1. go to app.module.ts
2. add EventEmitter to the provider array
3. add import { EventEmitter } from 'events';

**Determine screen size automatically**
place below code in app.component.ts (like a method)

```javascript
ngOnInit () {
    ...
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
    ...
  }

@HostListener('window:resize', ['$event'])
  private onResize (event) {
    this.utilsProv.setScreenSize(window.innerWidth * window.devicePixelRatio, window.innerHeight)
  }
```

**Enable ngx-toast**

1. go to app.module.ts
2. add ToastrModule.forRoot() to the import array
3. add import { ToastrModule } from 'ngx-toastr';
