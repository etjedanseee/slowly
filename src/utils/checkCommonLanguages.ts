import { ILang } from "../types/Auth/auth";

// export const checkCommonLanguages = (userLangs: ILang[], otherUserLangs: ILang[]) => {
//   for (let userLang of userLangs) {
//     for (let otherUserLang of otherUserLangs) {
//       if (userLang.code === otherUserLang.code) {
//         return true
//       }
//     }
//   }
//   return false
// }

export const checkCommonLanguages = (userLangs: ILang[], otherUserLangs: ILang[]): ILang[] => {
  const commonLanguages: ILang[] = []
  for (let userLang of userLangs) {
    for (let otherUserLang of otherUserLangs) {
      if (userLang.code === otherUserLang.code && !commonLanguages.find(l => l.code === userLang.code)) {
        commonLanguages.push(userLang)
      }
    }
  }
  return commonLanguages
}