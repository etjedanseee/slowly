import { appLangType } from "../User/user"

export type themeType = 'white' | 'dark'


export interface ILangs {
  text: string,
  lang: appLangType,
  checked: boolean
}