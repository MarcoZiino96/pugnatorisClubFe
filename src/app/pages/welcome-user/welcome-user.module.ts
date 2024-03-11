import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeUserRoutingModule } from './welcome-user-routing.module';
import { WelcomeUserComponent } from './welcome-user.component';


@NgModule({
  declarations: [
    WelcomeUserComponent
  ],
  imports: [
    CommonModule,
    WelcomeUserRoutingModule
  ]
})
export class WelcomeUserModule { }
