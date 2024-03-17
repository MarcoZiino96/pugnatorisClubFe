import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IResponseCorso } from '../Models/interfaceCorso/i-response-corso';
import { Observable, catchError } from 'rxjs';
import { IResponsePrenotazione } from '../Models/interfacePrenotazione/i-response-prenotazione';
import { IPrenotazione } from '../Models/interfacePrenotazione/i-prenotazione';
import { IRespSingleCorso } from '../Models/interfaceCorso/i-resp-single-corso';
import { ITurno } from '../Models/interfaceTurno/i-turno';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  backendUrl: string = `${environment.backEndUrl}`;


  constructor(private http:HttpClient, @Inject('Swal') private swal: any) {}

  getAll(): Observable<IResponseCorso>{
    return this.http.get<IResponseCorso>(`${this.backendUrl}/corso`)
  }

  getById(id:number):Observable<IRespSingleCorso>{
    return this.http.get<IRespSingleCorso>(`${environment.backEndUrl}/corso/${id}`)
    .pipe(catchError(error=>{
      if (error.error.message === "Il corso non è presente" ){
        this.swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Corso non trovato"
        });
      }
      throw error;
    }))
  }

  getImgByCategories(categoria: string): string{

    switch (categoria) {
      case 'BOXE':
        return '../../assets/img/boxe.jpeg';
      case 'KICKBOXING':
        return '../../assets/img/kick-boxing.jpeg';
      case 'MUAY_THAI':
        return '../../assets/img/muay-thay.jpeg';
      case 'TAEKWONDO':
        return '../../assets/img/taekwondo.jpeg';
      case 'KARATE':
        return '../../assets/img/karate.jpeg';
      case 'JUDO':
        return '../../assets/img/judo.jpeg';
      case 'AIKIDO':
        return '../../assets/img/aikido.jpeg';
      case 'JIU_JITSU_BRASILIANO':
        return '../../assets/img/jiu-jitsu-brasiliano.jpeg';
      case 'KUNG_FU':
        return '../../../assets/img/kung-fu.png';
      case 'WUSHU':
        return '../../assets/img/wushu.jpeg';
      case 'CAPOEIRA':
        return '../../../assets/img/capoeira.png';
      case 'KRAV_MAGA':
        return '../../../assets/img/krav-maga.png';
      case 'KENDO':
        return '../../../assets/img/kendo.png';
      case 'SANSHOU':
        return '../../../assets/img/sanshou.png';
      case 'ESKRIMA':
        return '../../assets/img/eskrima.jpeg';
      default:
        return 'https://picsum.photos/200/300?random=1';
    }
  }

  getTurniCorso(id:number):Observable<ITurno[]>{
    return this.http.get<ITurno[]>(`${this.backendUrl}/corso/turni/${id}`)
  }

prenotazione(prenotazione:IPrenotazione):Observable<IResponsePrenotazione>{
  return this.http.post<IResponsePrenotazione>(`${this.backendUrl}/prenotazione/create`, prenotazione)
}
}
