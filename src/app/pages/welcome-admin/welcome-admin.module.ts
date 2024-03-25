import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeAdminRoutingModule } from './welcome-admin-routing.module';
import { WelcomeAdminComponent } from './welcome-admin.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    WelcomeAdminComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    WelcomeAdminRoutingModule
  ]
})
export class WelcomeAdminModule { }
