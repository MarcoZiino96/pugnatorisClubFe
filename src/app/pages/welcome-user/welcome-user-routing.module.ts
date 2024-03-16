import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeUserComponent } from './welcome-user.component';
import { EditComponent } from './edit/edit.component';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';

const routes: Routes = [
{
   path: '', component: WelcomeUserComponent
},
{
  path: 'edit/:id', component: EditComponent, title: 'Edit - PugnatorisClub'
},
{
  path: 'prenotazione/:id/:id', component: PrenotazioneComponent, title: 'Prenotazione - PugnatorisClub'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeUserRoutingModule { }
