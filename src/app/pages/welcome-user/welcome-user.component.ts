
import { Component } from '@angular/core';
import { IAuthData } from '../../Models/i-auth-data';
import { IUser } from '../../Models/i-user';




@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.scss'
})
export class WelcomeUserComponent {


  iUser!:IUser;

  ngOnInit(){
   let stringUser:string|null = localStorage.getItem("accessData");
    if(!stringUser) return;
    let user:IAuthData = JSON.parse(stringUser)
     this.iUser = user.user
 }
}






