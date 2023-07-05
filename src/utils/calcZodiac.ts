import { ZodiacType } from "../types/Auth/auth";
import { zodiacs } from "./consts";


export const calcZodiac = (date: string): ZodiacType => {
  const d = new Date(date)
  const month = d.getMonth() + 1;
  const day = d.getDate()

  if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
    return zodiacs[0];
  } else if ((month === 2 && day <= 19) || (month === 1 && day >= 21)) {
    return zodiacs[1];
  } else if ((month === 3 && day <= 20) || (month === 2 && day >= 20)) {
    return zodiacs[2];
  } else if ((month === 4 && day <= 20) || (month === 3 && day >= 21)) {
    return zodiacs[3];
  } else if ((month === 5 && day <= 21) || (month === 4 && day >= 21)) {
    return zodiacs[4];
  } else if ((month === 6 && day <= 21) || (month === 5 && day >= 22)) {
    return zodiacs[5];
  } else if ((month === 7 && day <= 22) || (month === 6 && day >= 22)) {
    return zodiacs[6];
  } else if ((month === 8 && day <= 23) || (month === 7 && day >= 23)) {
    return zodiacs[7];
  } else if ((month === 9 && day <= 23) || (month === 8 && day >= 24)) {
    return zodiacs[8];
  } else if ((month === 10 && day <= 23) || (month === 9 && day >= 24)) {
    return zodiacs[9];
  } else if ((month === 11 && day <= 22) || (month === 10 && day >= 24)) {
    return zodiacs[10];
  } else if ((month === 12 && day <= 21) || (month === 11 && day >= 23)) {
    return zodiacs[11];
  }

  return zodiacs[0]
}