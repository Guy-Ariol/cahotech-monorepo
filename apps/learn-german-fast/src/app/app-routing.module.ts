import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './pages/fast-test/fast-test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/fast-test' },
  { path: 'fast-test', component: TestComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
