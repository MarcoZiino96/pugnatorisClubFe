import { ICorso } from './../../../Models/interfaceCorso/i-corso';
import { Component, Inject } from '@angular/core';
import { CorsoService } from '../../../Services/corso.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { IUser } from '../../../Models/interfaceUtente/i-user';
import { ITurno } from '../../../Models/interfaceTurno/i-turno';
import { IResponseCorso } from '../../../Models/interfaceCorso/i-response-corso';
import { IRespSingleCorso } from '../../../Models/interfaceCorso/i-resp-single-corso';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrl: './prenotazione.component.scss'
})
export class PrenotazioneComponent {


  iUser!:IUser
  iTurno!:ITurno[]

  iCorso: IRespSingleCorso ={
    dateResponse: new Date(),
    message: '',
    response:{
    id: 0,
    categoria:'',
    descrizione: '',
    numeroMassimoPartecipanti: 0,
    costoMensile: 0,
    durata: '',
    insegnante: null
    }
  }

  constructor(
     private corsoSvc:CorsoService,
     private authSvc:AuthService,
     @Inject('Swal') private swal: any,
     private route: ActivatedRoute
     ){}

  ngOnInit(){

   this.route.params.subscribe((params:any)=>{
    this.authSvc.getById(params.idUtente).subscribe((res=>{
      this.iUser = res.response
      console.log(this.iUser);
    }))
   })

   this.route.params.subscribe((params:any)=>{
    this.corsoSvc.getById(params.idCorso).subscribe((res=>{
      this.iCorso = res
      this.getTurniCorso(this.iCorso.response.id)
    }))
   })



  }

  getTurniCorso(id:number){
    this.corsoSvc.getTurniCorso(id).subscribe((res)=>{
       this.iTurno = res
       console.log(this.iTurno);
    })
  }

  getImgByCategories(categoria:string){
    return this.corsoSvc.getImgByCategories(categoria)
   }

}
