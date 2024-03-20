import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authSvc: AuthService){ }

  collapsed:boolean = false;
  isLoggedIn$!:boolean;
  isNavbarTransparent:boolean = true;
  isNavbarBlack:boolean = false;

  ngOnInit(){
    this.authSvc.isLoggedIn$.subscribe(data=> this.isLoggedIn$ = data)
  }
  logOut():void{
    this.authSvc.logout();
  }

}
