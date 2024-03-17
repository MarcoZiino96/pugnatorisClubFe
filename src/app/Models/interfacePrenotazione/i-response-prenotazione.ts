import { IPrenotazione } from "./i-prenotazione";

export interface IResponsePrenotazione {
  dateResponse: Date;
  message:string;
  response:IPrenotazione;
}
