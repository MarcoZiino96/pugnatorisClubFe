import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeUserRoutingModule } from './welcome-user-routing.module';
import { WelcomeUserComponent } from './welcome-user.component';
import { IUser } from '../../Models/i-user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@NgModule({
  declarations: [
    WelcomeUserComponent
  ],
  imports: [
    CommonModule,
    WelcomeUserRoutingModule
  ]
})
export class WelcomeUserModule {


}
