import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeUserRoutingModule } from './welcome-user-routing.module';
import { WelcomeUserComponent } from './welcome-user.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    WelcomeUserComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    WelcomeUserRoutingModule
  ]
})
export class WelcomeUserModule {


}
