
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { IResponseData } from '../../Models/i-response-data';



@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrl: './welcome-user.component.scss'
})
export class WelcomeUserComponent {

 iUser!:IResponseData;
//   iUser!:IUser;


  constructor(private route : ActivatedRoute, private authSvc:AuthService){}

  ngOnInit(){
    this.route.params.subscribe((params:any)=>{
      this.authSvc.getById(params.id)?.subscribe((res=>{
        if(res == undefined){
           this.iUser = {
            dateResponse: new Date(),
            message: "",
            response: {
              id: 0,
              username: "",
              password: "",
              ruolo: "",
              nome: "",
              cognome: "",
              email: "",
              fotoProfilo: "",
              dataNascita: false,
            }
          }
        }
        console.log(res);

        this.iUser = res;
      }))
    })
  //   let stringUser:string|null = localStorage.getItem("accessData");
  //   if(!stringUser) return;

  //   let user:IAuthData = JSON.parse(stringUser)
  //   this.iUser = user.user
  // }

}
}

