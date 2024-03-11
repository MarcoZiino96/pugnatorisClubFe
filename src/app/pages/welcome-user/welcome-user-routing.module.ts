import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeUserComponent } from './welcome-user.component';

const routes: Routes = [
  {
    path: '', component: WelcomeUserComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeUserRoutingModule { }
