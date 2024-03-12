import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeUserComponent } from './welcome-user.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
{
   path: '', component: WelcomeUserComponent
},
{
  path: 'edit', component: EditComponent, title: 'Edit - PugnatorisClub'
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeUserRoutingModule { }
