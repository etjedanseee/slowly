
export type themeType = 'white' | 'dark'

export type appLangType = 'en' | 'ua'

export interface ILangs {
  text: string,
  lang: appLangType,
  checked: boolean
}