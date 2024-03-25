import { AbbonamentoService } from './../../../Services/abbonamento-service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { Component, Inject } from '@angular/core';
import { IAbbonamento } from '../../../Models/interfaceAbbonamento/i-abbonamento';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  abbonamenti!:IAbbonamento[];

  constructor (
    private authSvc:AuthService,
    private abbonamentoSvc:AbbonamentoService,
    private route:ActivatedRoute,
    @Inject('Swal') private swal: any
  ){}

  ngOnInit(){
    this.route.params.subscribe((params:any) => {
      this.authSvc.getAbbonamenti(params.id).subscribe((res)=>{
        this.abbonamenti = res.response
      })
    })
  }

  deleteAbbonamento(id:number){
    this.abbonamentoSvc.delete(id).subscribe(()=>{
      this.abbonamenti = this.abbonamenti.filter(res => res.id != id)
      this.swal.fire({
        title: "Good job!",
        text: "Abbonamento eliminato con  successo!",
        icon: "success"
      })
    })
  }

}
