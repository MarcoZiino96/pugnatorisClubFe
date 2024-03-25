import { ICorso } from "../interfaceCorso/i-corso";
import { IUser } from "../interfaceUtente/i-user";

export interface IAbbonamento {
  durata:string;
  corso:number;
  utente:number;
}
