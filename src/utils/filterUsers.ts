import { ILang, IUser, SexType, interest } from "../types/Auth/auth"
import { calcAge } from "./calcAge"

export const filterUsersById = (users: IUser[], excludeIds: string[]) => {
  return users.filter(user => !excludeIds.includes(user.id))
}

export const filterUsersByAgeRange = (users: IUser[], ageRange: number[]) => {
  const filteredByAge = users.filter(user => {
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
  return filteredByAge
}

export const filterUsersByLang = (users: IUser[], language: ILang, langProficiency: number) => {
  return users.filter(user => user.languages.find(lang => lang.engName === language.engName && lang.level === langProficiency));
}

export const filterUsersByLangs = (users: IUser[], langs: ILang[]) => {
  const langsNames = langs.map(lang => lang.engName)
  const resUsers: IUser[] = []

  for (let user of users) {
    const isUserInArray = resUsers.find(resUser => resUser.id === user.id)
    if (isUserInArray) continue
    for (let userLang of user.languages) {
      if (langsNames.includes(userLang.engName) && !isUserInArray) {
        resUsers.push(user)
        break
      }
    }
  }
  return resUsers
}

export const filterUsersByInterests = (users: IUser[], interests: interest[]) => {
  const resUsers: IUser[] = []
  for (let user of users) {
    const isUserInArray = resUsers.find(resUser => resUser.id === user.id)
    if (isUserInArray) continue
    for (let userInterest of user.interests) {
      if (interests.includes(userInterest) && !isUserInArray) {
        resUsers.push(user)
        break
      }
    }
  }
  return resUsers
}

export const filterUsersBySex = (users: IUser[], preferenceSex: SexType[]) => {
  return users.filter(user => preferenceSex.includes(user.info.sex));
}  