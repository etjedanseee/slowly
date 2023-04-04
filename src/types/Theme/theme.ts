import { langType } from './../User/user';

export type themeType = 'white' | 'dark'


export interface ILangs {
  text: string,
  lang: langType,
  checked: boolean
}