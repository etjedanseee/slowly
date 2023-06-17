import supabase from "../supabaseClient"
import { ILang, IUser, SexType, interest } from "../types/Auth/auth"

interface getUsersForMailingProps {
  userCountry: string,
  excludeIds: string[]
  isIncludeUserCountryToSearch: boolean,
  preferenceSex: SexType[],
  selectedLangProficiency: number,
  selectedLearningLang: ILang,
  selectedNumOfRecipients: number,
  selectedTopic: interest,
  setUsersForMailing: (users: IUser[]) => void,
}

export const getUsersForMailing = async ({ isIncludeUserCountryToSearch, setUsersForMailing, preferenceSex, selectedLangProficiency, selectedLearningLang, selectedNumOfRecipients, selectedTopic, excludeIds, userCountry }: getUsersForMailingProps) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .contains('interests', [selectedTopic])

    if (error) {
      throw new Error(error.message)
    }

    const Users = data as IUser[]

    const filteredByCountry = isIncludeUserCountryToSearch
      ? Users.filter(user => user.geo.location.country !== userCountry)
      : Users

    const filteredById = filteredByCountry.filter(user => !excludeIds.includes(user.id))

    const filteredBySex = filteredById.filter(user => preferenceSex.includes(user.info.sex));

    const filteredByLang = filteredBySex.filter(user => user.languages.find(lang => lang.engName === selectedLearningLang.engName && lang.level === selectedLangProficiency)
    );

    if (!filteredByLang.length) {
      setUsersForMailing([])
    } else if (selectedNumOfRecipients > filteredByLang.length) {
      setUsersForMailing(filteredByLang)
    } else {
      setUsersForMailing(filteredByLang.slice(0, selectedNumOfRecipients))
    }
  } catch (e) {
    console.log('getUsersForMailing error', e)
  }
}