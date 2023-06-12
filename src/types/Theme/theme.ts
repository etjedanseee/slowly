
export type themeType = 'white' | 'dark'

export type appLangType = 'en' | 'ua'

export interface IAppLangs {
  name: string,
  lang: appLangType,
  checked: boolean
}