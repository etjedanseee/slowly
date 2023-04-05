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

//пригодится
enum LevelLang {
  interested = 0,
  beginning = 1,
  middle = 2,
  advanced = 3,
  fluency = 4,
  native = 5
}

export interface ILang {
  name: string,
  code: langType
  level: number
}

export interface ILangList {
  name: string,
  engName: string,
  code: langType,
  isSelected: boolean,
  level: number | null
}