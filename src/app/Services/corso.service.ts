import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IResponseCorso } from '../Models/interfaceCorso/i-response-corso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  backendUrl: string = `${environment.backEndUrl}`;


  constructor(private http:HttpClient) {}

  getAll(): Observable<IResponseCorso>{
    return this.http.get<IResponseCorso>(`${this.backendUrl}/corso`)
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
}
