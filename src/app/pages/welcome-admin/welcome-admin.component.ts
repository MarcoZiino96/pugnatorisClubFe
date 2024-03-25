import { Component, Inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ICompleteUser } from '../../Models/interfaceUtente/i-complete-user';

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrl: './welcome-admin.component.scss'
})
export class WelcomeAdminComponent {

  iUsers!:ICompleteUser[]

  constructor(
    private authSvc:AuthService,
    @Inject('Swal') private swal: any
    ){}


  ngOnInit(){
    this.authSvc.getAllUtenti().subscribe((users) =>{
      this.iUsers = users.response
    })
  }

  deleteUtente(id:number){
    this.authSvc.deleteUtente(id).subscribe(()=>{
      this.iUsers = this.iUsers.filter(user => user.id != id)
      this.swal.fire({
        title: "Good job!",
        text: "Utente eliminato con  successo!",
        icon: "success"
      })
    })
  }
}
