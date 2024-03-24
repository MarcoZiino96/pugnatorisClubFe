import { IUser } from "./i-user";

export interface IResponseArrayData {
  dateResponse: Date;
  message:string;
  response:IUser[];
}
