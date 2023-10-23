import supabase from "../supabaseClient"
import { ILang, IUser, SexType, ZodiacType, interest } from "../types/Auth/auth"
import { filterUsersByAgeRange, filterUsersByInterests, filterUsersByLangs, filterUsersBySex } from "./filterUsers"
import { toast } from 'react-toastify'

export interface getFilteredPenpalsProps {
  includesBiography: boolean,
  langs: ILang[],
  interests: interest[],
  ageRange: number[],
  sex: SexType[],
  zodiac: ZodiacType[],
  excludeIds: string[],
  setFindedUsers: (users: IUser[]) => void,
  setLoading: (b: boolean) => void,
  t: (s: string) => string
}

export const getFilteredPenpals = async ({ ageRange, includesBiography, interests, langs, sex, zodiac, setFindedUsers, excludeIds, setLoading, t }: getFilteredPenpalsProps) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from('Users')
      .select('*')

    if (error) {
      toast.error(t('getPenpalsError'))
      throw new Error(error.message)
    }

    const users = data as IUser[]

    //filteredByBiography
    let filteredUsers = includesBiography
      ? users.filter(user => !!user.profile.biography.length)
      : users
    //filteredBySex
    filteredUsers = filterUsersBySex(filteredUsers, sex)
    //filteredByLang
    filteredUsers = filterUsersByLangs(filteredUsers, langs)
    //filteredByAge
    filteredUsers = filterUsersByAgeRange(filteredUsers, ageRange)
    //filteredByInterests
    filteredUsers = filterUsersByInterests(filteredUsers, interests)
    //filteredByZodiac
    filteredUsers = filteredUsers.filter(user => zodiac.includes(user.info.zodiac))
    //filteredByIds
    filteredUsers = filteredUsers.filter(user => !excludeIds.includes(user.id))
    // console.log('filteredUsers', filteredUsers)

    if (!filteredUsers.length) {
      toast.info(t('didntFindFriends'))
      setFindedUsers([])
    } else {
      setFindedUsers(filteredUsers)
    }
  } catch (e) {
    console.log('getFilteredPenpals error', e)
  } finally {
    setLoading(false)
  }
}