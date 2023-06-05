import { ILang } from "../types/Auth/auth";

export const checkCommonLanguages = (userLangs: ILang[], otherUserLangs: ILang[]) => {
  for (let userLang of userLangs) {
    for (let otherUserLang of otherUserLangs) {
      if (userLang.code === otherUserLang.code) {
        return true
      }
    }
  }
  return false
}