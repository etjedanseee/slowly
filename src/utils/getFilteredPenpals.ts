import supabase from "../supabaseClient"
import { ILang, IUser, SexType, ZodiacType, interest } from "../types/Auth/auth"
import { filterUsersByAgeRange, filterUsersByInterests, filterUsersByLangs, filterUsersBySex } from "./filterUsers"

export interface getFilteredPenpalsProps {
  includesBiography: boolean,
  langs: ILang[],
  interests: interest[],
  ageRange: number[],
  sex: SexType[],
  zodiac: ZodiacType[],
  excludeIds: string[],
  setFindedUsers: (users: IUser[]) => void,
  setLoading: (b: boolean) => void
}

export const getFilteredPenpals = async ({ ageRange, includesBiography, interests, langs, sex, zodiac, setFindedUsers, excludeIds, setLoading }: getFilteredPenpalsProps) => {
  try {
    setLoading(true)
    const { data, error } = await supabase
      .from('Users')
      .select('*')

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    const users = data as IUser[]

    const filteredByBiography = includesBiography
      ? users.filter(user => !!user.profile.biography.length)
      : users
    const filteredBySex = filterUsersBySex(filteredByBiography, sex)
    const filteredByLang = filterUsersByLangs(filteredBySex, langs)
    const filteredByAge = filterUsersByAgeRange(filteredByLang, ageRange)
    const filteredByInterests = filterUsersByInterests(filteredByAge, interests)
    const filteredByZodiac = filteredByInterests.filter(user => zodiac.includes(user.info.zodiac))
    const filteredByIds = filteredByZodiac.filter(user => !excludeIds.includes(user.id))
    // console.log('filteredUsers', filteredByIds)

    if (!filteredByIds.length) {

    } else {
      setFindedUsers(filteredByIds)
    }
  } catch (e) {
    console.log('getFilteredPenpals error', e)
  } finally {
    setLoading(false)
  }
}