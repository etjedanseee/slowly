import { SexType, interest, ILang } from './../User/user';


export interface IStep1Data {
  sex: SexType,
  birthDate: Date,
  nickName: string
}

// export interface IStep2Data {
//   interests: interest[]
// }

// export interface IStep3Data {
//   languages: ILang[]
// }