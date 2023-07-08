import supabase from "../supabaseClient"
import { ILang, IUser, SexType, interest } from "../types/Auth/auth"
import { toast } from 'react-toastify';
import { filterUsersByAgeRange, filterUsersById, filterUsersByLang, filterUsersBySex } from "./filterUsers";

export interface getUsersForMailingProps {
  userCountry: string,
  excludeIds: string[]
  isIncludeMyCountryToSearch: boolean,
  preferenceSex: SexType[],
  selectedLangProficiency: number,
  selectedLearningLang: ILang,
  selectedNumOfRecipients: number,
  ageRange: number[],
  selectedTopic: interest,
  setUsersForMailing: (users: IUser[]) => void,
  t: (s: string) => string
}

export const getUsersForMailing = async ({ isIncludeMyCountryToSearch, setUsersForMailing, preferenceSex, ageRange, selectedLangProficiency, selectedLearningLang, selectedNumOfRecipients, selectedTopic, excludeIds, userCountry, t }: getUsersForMailingProps) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .contains('interests', [selectedTopic])

    if (error) {
      throw new Error(error.message)
    }

    const Users = data as IUser[]

    const filteredByCountry = isIncludeMyCountryToSearch
      ? Users
      : Users.filter(user => user.geo.location.country !== userCountry)

    const filteredByAge = filterUsersByAgeRange(filteredByCountry, ageRange)
    const filteredById = filterUsersById(filteredByAge, excludeIds)
    const filteredBySex = filterUsersBySex(filteredById, preferenceSex)
    const filteredByLang = filterUsersByLang(filteredBySex, selectedLearningLang, selectedLangProficiency)

    if (!filteredByLang.length) {
      setUsersForMailing([])
      toast.error(t('noUsersToSend'))
    } else if (filteredByLang.length < selectedNumOfRecipients) {
      setUsersForMailing(filteredByLang)
    } else {
      setUsersForMailing(filteredByLang.slice(0, selectedNumOfRecipients))
    }
  } catch (e) {
    console.log('getUsersForMailing error', e)
  }
}