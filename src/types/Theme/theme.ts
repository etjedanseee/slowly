import { appLangType } from "../Auth/auth"

export type themeType = 'white' | 'dark'


export interface ILangs {
  text: string,
  lang: appLangType,
  checked: boolean
}