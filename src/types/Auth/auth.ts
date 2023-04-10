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

export type interest = 'Pets' | 'Adventure' | 'Business' | 'Career' | 'Cars' | 'Casual' | 'Coding' | 'Cooking' | 'Environment' | 'Fitness' | 'Food' | 'Future' | 'Gaming' | 'Humor' | 'Ideas' | 'Language' | 'Life' | 'Movies' | 'Music' | 'Nature' | 'Politics' | 'Relationships' | 'Sex' | 'Sports' | 'Startup' | 'Technology' | 'Travel' | 'COVID-19' | 'Climate' | 'Handcraft' | 'Writing' | 'Beauty' | 'Singing' | 'Makeup' | 'Cosplay' | 'Dancing' | 'Astrology' | 'Gardening' | 'Collecting' | 'Aviation' | 'Shopping' | 'Design' | 'Fashion' | 'Architecture' | 'Television' | 'Photography' | 'Fiction' | 'Reading' | 'Investing' | 'Economics' | 'Finance' | 'Space' | 'New Age' | 'Culture' | 'Art' | 'Feminism' | 'Religion' | 'Psychology' | 'Health' | 'Depression' | 'History' | 'Education' | 'School Life' | 'Science' | 'Family' | 'Parenting' | 'LGBT' | 'Poetry' | 'Vegan' | 'Anime' | 'Philosophy' | 'Magic' | 'Storytelling' | 'News' | 'Law' | 'Sustainability' | 'Sci-Fi' | 'Deaf' | 'Fantasy' | 'DIY' | 'Board Games' | 'Illustration' | 'Archeology' | 'Theatre' | 'Wine' | 'Farming' | 'Theme Parks' | 'Disabilities' | 'Martial Arts' | 'Museums'

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