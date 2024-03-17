
import { Component } from '@angular/core';
import { IAuthData } from '../../Models/interfaceUtente/i-auth-data';
import { IUser } from '../../Models/interfaceUtente/i-user';
import { CorsoService } from '../../Services/corso.service';
import { ICorso } from '../../Models/interfaceCorso/i-corso';





@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.scss'
})
export class WelcomeUserComponent {

  iUser!:IUser;
  iCorsi!:ICorso[];

  constructor(private corsoSvc:CorsoService){}

  ngOnInit(){
   let stringUser:string|null = localStorage.getItem("accessData");
    if(!stringUser) return;
    let user:IAuthData = JSON.parse(stringUser)
     this.iUser = user.user

     this.getAllCorsi();
 }

 getAllCorsi(){
  this.corsoSvc.getAll().subscribe(data =>{
   return  this.iCorsi = data.response
  })
 }

 getImgByCategories(categoria:string){
  return this.corsoSvc.getImgByCategories(categoria)
 }

}






