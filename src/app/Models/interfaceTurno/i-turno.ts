import { LocalTime } from "@js-joda/core";

export interface ITurno {
  giornoLezione: string;
  inizioLezione: LocalTime;
  fineLezione: LocalTime;
}
