import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './pages/fast-test/fast-test.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/fast-test' },
  { path: 'fast-test', component: TestComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
