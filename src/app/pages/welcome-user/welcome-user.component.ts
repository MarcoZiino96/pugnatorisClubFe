import { Component } from '@angular/core';
import { IUser } from '../../Models/i-user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.scss'
})
export class WelcomeUserComponent {

  iUser!:IUser;

  constructor(private route : ActivatedRoute, private authSvc:AuthService){}

  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.authSvc.getById(params.id).subscribe((res=>{
        this.iUser = res;
      }))
    })
  }

}
