import { CorsoService } from './../../../Services/corso.service';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IResponsePrenotazione } from '../../../Models/interfacePrenotazione/i-response-prenotazione';
import { PrenotazioneService } from '../../../Services/prenotazione.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  showPrenotazioni!: boolean;
  myPrenotazioni!: IResponsePrenotazione

  constructor(
    private authSvc: AuthService,
    @Inject('Swal') private swal: any,
    private route: ActivatedRoute,
    private corsoSvc: CorsoService,
    private prenotazioneSvc: PrenotazioneService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {

        this.authSvc.getPrenotazioni(params.id).subscribe((res=> {
          if (!res) {
            this.swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Problemi di comunicazione con il server, controlla la tua conessione"
            });
          }
          else if (res.response.length === 0) {
            this.showPrenotazioni = false
          } else {
            this.myPrenotazioni = res
            this.showPrenotazioni = true
          }
        }))


    })
  }

  deletePrenotazione(id: number) {
    this.prenotazioneSvc.deletePrenotazione(id).subscribe((res => {
      this.myPrenotazioni.response = this.myPrenotazioni.response.filter(res =>
        res.id != id
      )
      this.swal.fire({
        title: "Good job!",
        text: "Prenotazione eliminata con  successo!",
        icon: "success"
      })
      if (this.myPrenotazioni.response.length === 0) {
        this.showPrenotazioni = false;
      }
    }))
  }

  getImgByCategories(categoria: string):string{
      return this.corsoSvc.getImgByCategories(categoria)
  }
}
