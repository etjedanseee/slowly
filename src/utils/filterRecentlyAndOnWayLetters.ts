import { IChatList, ILetter, IUser } from "../types/Auth/auth"

export const filterRecenntlyAndOnWayLetters = (chatList: IChatList[], user: IUser) => {
  const resRecentlyLetters: ILetter[] = []
  const resLettersOnWay: ILetter[] = []
  chatList.forEach(chat => {
    const filteredRecentlyLetters = chat.messages.filter(mess => {
      return +new Date(mess.deliveredDate) < Date.now() && mess.receiverId === user?.id
    })
    const filteredlettersOnWay = chat.messages.filter(mess => {
      return +new Date(mess.deliveredDate) > Date.now() && mess.receiverId === user?.id
    })
    if (filteredRecentlyLetters.length) {
      resRecentlyLetters.push(...filteredRecentlyLetters)
    }
    if (filteredlettersOnWay.length) {
      resLettersOnWay.push(...filteredlettersOnWay)
    }
  })

  return [resRecentlyLetters, resLettersOnWay]
}