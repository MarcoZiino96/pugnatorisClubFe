import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authSvc: AuthService){ }

  collapsed:boolean = false;
  isLoggedIn$!:boolean;

  ngOnInit(){
    this.authSvc.isLoggedIn$.subscribe(data=> this.isLoggedIn$ = data)
  }
  logOut():void{
    this.authSvc.logout();
  }

}
