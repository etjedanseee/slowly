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
      toast.error(t('getPenpalsError'))
      throw new Error(error.message)
    }

    const Users = data as IUser[]

    let filteredUsers = isIncludeMyCountryToSearch
      ? Users
      : Users.filter(user => user.geo.location.country !== userCountry)
    filteredUsers = filterUsersByAgeRange(filteredUsers, ageRange)
    filteredUsers = filterUsersById(filteredUsers, excludeIds)
    filteredUsers = filterUsersBySex(filteredUsers, preferenceSex)
    filteredUsers = filterUsersByLang(filteredUsers, selectedLearningLang, selectedLangProficiency)

    if (!filteredUsers.length) {
      setUsersForMailing([])
      toast.error(t('noUsersToSend'))
    } else if (filteredUsers.length < selectedNumOfRecipients) {
      setUsersForMailing(filteredUsers)
    } else {
      setUsersForMailing(filteredUsers.slice(0, selectedNumOfRecipients))
    }
  } catch (e) {
    console.log('getUsersForMailing error', e)
  }
}