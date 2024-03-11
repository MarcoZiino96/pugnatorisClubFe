import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeAdminRoutingModule } from './welcome-admin-routing.module';
import { WelcomeAdminComponent } from './welcome-admin.component';


@NgModule({
  declarations: [
    WelcomeAdminComponent
  ],
  imports: [
    CommonModule,
    WelcomeAdminRoutingModule
  ]
})
export class WelcomeAdminModule { }
