import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IUser } from '../../Models/interfaceUtente/i-user';

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.scss'
})
export class WelcomeAdminComponent {

  iUsers!:IUser[]
  constructor(private authSvc:AuthService){}


  ngOnInit(){
    this.authSvc.getAllUtenti().subscribe((users) =>{
      this.iUsers = users.response
      console.log(this.iUsers);

    })
  }
}
