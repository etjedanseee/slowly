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
  setFoundUsers: (users: IUser[]) => void,
  setLoading: (b: boolean) => void,
  t: (s: string) => string
}

export const getFilteredPenpals = async ({ ageRange, includesBiography, interests, langs, sex, zodiac, setFoundUsers, excludeIds, setLoading, t }: getFilteredPenpalsProps) => {
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

    let filteredUsers = includesBiography
      ? users.filter(user => !!user.profile.biography.length)
      : users
    filteredUsers = filterUsersBySex(filteredUsers, sex)
    filteredUsers = filterUsersByLangs(filteredUsers, langs)
    filteredUsers = filterUsersByAgeRange(filteredUsers, ageRange)
    filteredUsers = filterUsersByInterests(filteredUsers, interests)
    filteredUsers = filteredUsers.filter(user => zodiac.includes(user.info.zodiac))
    filteredUsers = filteredUsers.filter(user => !excludeIds.includes(user.id))
    // console.log('filteredUsers', filteredUsers)

    if (!filteredUsers.length) {
      toast.info(t('didntFindFriends'))
      setFoundUsers([])
    } else {
      setFoundUsers(filteredUsers)
    }
  } catch (e) {
    console.log('getFilteredPenpals error', e)
  } finally {
    setLoading(false)
  }
}