import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeAdminComponent } from './welcome-admin.component';

const routes: Routes = [{ path: '', component: WelcomeAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeAdminRoutingModule { }
