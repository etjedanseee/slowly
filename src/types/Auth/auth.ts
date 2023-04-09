import { langType } from "../../utils/consts"

export interface IUser {
  id: string,
  email: string,
  info: IUserInfo,
  interests: interest[],
  languages: ILang[],
  geo: IUserGeo
}

export interface IUserInfo {
  avatarUrl: string,
  sex: SexType,
  birthDate: string,
  nickName: string,
  zodiac: ZodiakType
}

export type SexType = 'male' | 'female' | 'other'

export type interest = 'Language learning' | 'Movies' | 'Pets' | 'Nature' | 'Adventures' | 'Climate' | 'Handmade' | 'Writing' | 'Beauty' | 'Makeup' | 'Fitness' | 'Cosplay' | 'Dancing'

export interface ILang {
  name: string,
  engName: string,
  code: langType,
  isSelected: boolean,
  level: number
}

export interface IСoordinates {
  latitude: number,
  longitude: number
}

export interface ILocationData {
  address: {
    state: string;
    town: string;
  }
}

interface ILocation {
  country: string;
  city: string;
}

export interface IUserGeoByCoords {
  coord: IСoordinates,
  location: ILocation
}

export interface IUserGeoByIp {
  ip: string,
  location: ILocation
}

export type IUserGeo = IUserGeoByCoords | IUserGeoByIp

export type ZodiakType = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'