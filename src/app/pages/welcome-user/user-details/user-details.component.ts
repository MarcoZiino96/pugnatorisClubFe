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

  myPrenotazioni: IResponsePrenotazione = {
    dateResponse: new Date(),
    message: '',
    response: [
      {
        corso: null,
        dataPrenotazione: new Date(),
        dataScadenza: new Date(),
        id: 0,
        turno: null,
        utente: null,
      }
    ]
  }

  constructor(
    private authSvc: AuthService,
    @Inject('Swal') private swal: any,
    private route: ActivatedRoute,
    private prenotazioneSvc: PrenotazioneService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.authSvc.getPrenotazioni(params.id).subscribe((res => {
        if (!res) {
          this.swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Problemi di comunicazione con il server, controlla la tua conessione"
          });
        }
        if (res) {
          this.myPrenotazioni = res
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
    }))
  }
}
