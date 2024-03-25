import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IAbbonamento } from '../Models/interfaceAbbonamento/i-abbonamento';
import { IResponseAbbonamento } from '../Models/interfaceAbbonamento/i-response-abbonamento';

@Injectable({
  providedIn: 'root'
})
export class AbbonamentoServiceService {

  backendUrl: string = `${environment.backEndUrl}`;

  constructor(private http:HttpClient) {}

  create(abbonamento:IAbbonamento){
    return this.http.post<IResponseAbbonamento>(`${this.backendUrl}/abbonamneto/create`, abbonamento);
  }
}
