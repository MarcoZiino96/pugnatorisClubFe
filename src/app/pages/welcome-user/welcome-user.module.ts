import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeUserRoutingModule } from './welcome-user-routing.module';
import { WelcomeUserComponent } from './welcome-user.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WelcomeUserComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    WelcomeUserRoutingModule,
    ReactiveFormsModule
  ]
})
export class WelcomeUserModule {


}
