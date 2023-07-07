import supabase from "../supabaseClient"
import { ILang, IUser, SexType, interest } from "../types/Auth/auth"
import { calcAge } from "./calcAge"
import { toast } from 'react-toastify';

interface getUsersForMailingProps {
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

    const filteredByAge = filteredByCountry.filter(user => {
      const userAge = calcAge(new Date(user.info.birthDate))
      if (userAge < ageRange[0]) {
        return false
      }
      return userAge > ageRange[1]
        ? ageRange[1] === 65
          ? true
          : false
        : true
    })

    const filteredById = filteredByAge.filter(user => !excludeIds.includes(user.id))

    const filteredBySex = filteredById.filter(user => preferenceSex.includes(user.info.sex));

    const filteredByLang = filteredBySex.filter(user => user.languages.find(lang => lang.engName === selectedLearningLang.engName && lang.level === selectedLangProficiency)
    );

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