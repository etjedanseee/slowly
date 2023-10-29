import { ILang, IUserInfo, IUserProfile, LetterLengthType, ResponseTimeType, SexType, ZodiacType } from "../types/Auth/auth"
import { appLangType } from "../types/Theme/theme"

export type langType = 'en' | 'ua' | 'de' | 'es' | 'it' | 'fr'

export const writingLangs: ILang[] = [
  { name: 'English', engName: 'English', isSelected: false, level: 0, code: 'en' },
  { name: 'Українська', engName: 'Ukrainian', isSelected: false, level: 0, code: 'ua' },
  { name: 'Français', engName: 'French', isSelected: false, level: 0, code: 'fr' },
  { name: 'Deutsch', engName: 'German', isSelected: false, level: 0, code: 'de' },
  { name: 'Italiano', engName: 'Italian', isSelected: false, level: 0, code: 'it' },
  { name: 'Español', engName: 'Spanish', isSelected: false, level: 0, code: 'es' },
]

export const letterLengths: LetterLengthType[] = ['any', 'short', 'shortMedium', 'medium', 'mediumLong', 'long']
export const responseTimeArr: ResponseTimeType[] = ['soonPossible', 'withinWeek', 'within2Week', 'within3Week', 'withinMonth', 'overMonth']
export const sexArr: SexType[] = ['male', 'female', "other"]

export const initialUserProfile: IUserProfile = {
  biography: '',
  letterLength: 'any',
  responseTime: 'soonPossible',
  sexPreference: ['female', 'male', 'other'],
  ageRange: [0, 65]
}

export const initialUserInfo: IUserInfo = {
  avatarUrl: '',
  birthDate: '',
  nickName: '',
  sex: 'male',
  zodiac: 'Aquarius'
}

export const msInDay = 86400000

export const appLangsArr: appLangType[] = ['en', 'ua']

export const levelLangNames = ['Interested', 'Beginning', 'Average', 'Advanced', 'Fluency', 'Native language']

export const ageOptionsLeft = [0, 20, 25, 30, 35, 40, 45, 50, 55, 60];
export const ageOptionsRight = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

export const zodiacs: ZodiacType[] = ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius']

export const sortFriendsByNames = ['recent', 'alphabet', 'frequency', 'unread', 'distance']
