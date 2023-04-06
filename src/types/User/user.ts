import { langType } from "../../utils/consts"

export interface IUser {
  id?: number,
  sex: SexType,
  birthdate: Date,
  nickName: string,
  interests: interest[],
  languages: ILang[]
}

export type appLangType = 'en' | 'ua'

export type SexType = 'male' | 'female' | 'other'

export type interest = 'Language learning' | 'Movies' | 'Pets' | 'Nature' | 'Adventures' | 'Climate' | 'Handmade' | 'Writing' | 'Beauty' | 'Makeup' | 'Fitness' | 'Cosplay' | 'Dancing'

export interface ILang {
  name: string,
  engName: string,
  code: langType,
  isSelected: boolean,
  level: number
}